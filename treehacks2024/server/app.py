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


app = Flask(__name__)
CORS(app)
model = load_model('server/models/skin.h5')

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
    'akiec'
    'vasc',
    'df'
]

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # image_url = "https://i.ibb.co/wdLSW6G/ISIC-0024533.jpg"
    # image_url = "https://i.ibb.co/b2ByTMv/ISIC-0025030.jpg" # bkl
    # image_url = "https://i.ibb.co/b1wVkWn/ISIC-0030932.jpg" # mel
    image_url = data.get('url')
    print(image_url)

    img_array = download_and_preprocess_image(image_url)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_label = lesion_type_dict[lesion_ID[predicted_class]]
    print(prediction, predicted_class)

    return jsonify({'predicted_label': predicted_label})

def download_and_preprocess_image(image_url, image_size=(100, 100)):
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