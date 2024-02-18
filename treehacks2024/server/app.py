from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
import requests
from flask_cors import CORS
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import to_categorical
from keras.preprocessing.image import img_to_array
import numpy as np
import predictionguard as pg
import os


app = Flask(__name__)
CORS(app)
os.environ['PREDICTIONGUARD_TOKEN'] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"
model = load_model('server/models/skin_v2.h5')

lesion_type_dict = {
    'nv': 'Melanocytic nevi',
    'mel': 'Melanoma',
    'bkl': 'Benign keratosis-like lesions ',
    'bcc': 'Basal cell carcinoma',
    'akiec': 'Actinic keratoses',
    'vasc': 'Vascular lesions',
    'df': 'Dermatofibroma'
}

lesion_ID = [
    'nv',
    'mel',
    'bkl',
    'bcc',
    'akiec',
    'vasc',
    'df'
]

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # image_url = "https://i.ibb.co/wdLSW6G/ISIC-0024533.jpg" # nv
    # image_url = "https://i.ibb.co/b2ByTMv/ISIC-0025030.jpg" # bkl
    # image_url = "https://i.ibb.co/b1wVkWn/ISIC-0030932.jpg" # mel
    # https://i.ibb.co/QjgXcLb/ISIC-0033254.jpg # vasc
    image_url = data.get('url')
    print(image_url)

    img_array = download_and_preprocess_image(image_url)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_label = lesion_type_dict[lesion_ID[predicted_class]]
    print(prediction, predicted_class)

    prompt = """### System:
    You are a profession Dermatologist who has been in the industry for 40 years.
    You will receive a input of a skin disease name of a patient.
    State it if the disease is cancerous or not.
    Explain what that is to a patient, in very simple term, so people that without a biology background can still understand.
    Tell them it's still important to get advise from a professional Doctor.
    Print complete sentenses, don't print something that is cut in the middle.

    ### User:
    I was using a skin disease classifier, and it says I may have {disease}.

    ### Respond:
    """.format(disease=predicted_label)

    prompt_response = pg.Completion.create(
        model="Neural-Chat-7B",
        prompt=prompt
    )['choices'][0]['text']


    return jsonify({'predicted_label': predicted_label, 'prompt_response': prompt_response})

def download_and_preprocess_image(image_url, image_size=(224, 224)):
    response = requests.get(image_url)
    img = cv2.imdecode(np.frombuffer(response.content, np.uint8), -1)
    if img is not None:
        img = cv2.resize(img, image_size)
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    else:
        print("Error downloading image")
        return None

if __name__ == '__main__':
    app.run(debug=True)