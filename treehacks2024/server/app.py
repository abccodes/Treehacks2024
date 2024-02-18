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
import random
from dotenv import load_dotenv
from infobip_api_client.api_client import ApiClient, Configuration
import http.client
import json
    
load_dotenv('.env.local')


app = Flask(__name__)
CORS(app)
os.environ['PREDICTIONGUARD_TOKEN'] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"
model = load_model('server/models/skin_v2.h5')
infobip_client_config = Configuration(
    host=os.getenv("INFOBIP_BASE_URL"),
    api_key={"APIKeyHeader": os.getenv("INFOBIP_API_KEY")},
    api_key_prefix={"APIKeyHeader": os.getenv("INFOBIP_API_PREFIX")},
)
infobip_api_client = ApiClient(infobip_client_config)

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
    # data = request.get_json()
    # image_url = data.get('url')
    images = [
    'https://i.ibb.co/VpG4mfT/ISIC-0029075.jpg',
    'https://i.ibb.co/RcqFMJj/ISIC-0029079.jpg',
    'https://i.ibb.co/wpJyRYr/ISIC-0029082.jpg',
    'https://i.ibb.co/h7jhJpj/ISIC-0029086.jpg',
    'https://i.ibb.co/ZWg0n7r/ISIC-0029089.jpg',
    'https://i.ibb.co/5FBtsH3/ISIC-0029094.jpg',
    'https://i.ibb.co/wC0NR8R/ISIC-0029100.jpg',
    'https://i.ibb.co/vHWtMg5/ISIC-0029107.jpg',
    'https://i.ibb.co/wJyt7TS/ISIC-0029112.jpg',
    'https://i.ibb.co/yfQ5tcK/ISIC-0029118.jpg']
    image_url = random.choice(images)

    img_array = download_and_preprocess_image(image_url)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_label = lesion_type_dict[lesion_ID[predicted_class]]
    print(prediction, predicted_class)

    prompt = """### System:
    You are a profession Dermatologist who has been in the industry for 40 years.
    You will receive a input of a skin disease name of a patient.
    State it if the disease is cancerous or not. If it's cancerous, show your care and concern to the user and ask them to ask for a doctor's advise as soon as possible.
    Explain what that is to a patient, in very simple term, so people that without a biology background can still understand.
    Don't mention the user has no biology background.
    Tell them it's still important to get advise from a professional Doctor.
    No number list or bullet points, 3 complete sentenses only.

    ### User:
    I was using a skin disease classifier, and it says I may have {disease}. Explain it within 3 complete sentenses only.

    ### Respond:
    """.format(disease=predicted_label)

    prompt_response = pg.Completion.create(
        model="Neural-Chat-7B",
        prompt=prompt
    )['choices'][0]['text']

    is_healthy = predicted_class in [0, 2, 5, 6]

    if not is_healthy:
        sms_prompt = """### System:
        You are a SMS agent.
        Write an SMS message to inform a physician whose patient got identified a skin symptom with potential cancerous characteristics on our app Skin.ai.
        You will receive a input about the skin disease name of the patient. Share that information to the physician
        Keep the message clean and concise. No number list or bullet points, 3 complete sentenses only.
        Start with this and complete the paragraph: Hi, your patient {name} might have...

        ### User:
        A person was using a skin disease classifier, and it says he or she may have {disease}. Tell this to his or her physician.

        ### Respond:
        """.format(name="John Doe", disease=predicted_label)

        sms_message_prompt_response = pg.Completion.create(
        model="Neural-Chat-7B",
        prompt=sms_prompt
        )['choices'][0]['text']

        conn = http.client.HTTPSConnection("l3vqgj.api.infobip.com")
        payload = json.dumps({
            "messages": [
                {
                    "destinations": [{"to":"19174368930"}],
                    "from": "Skin.ai",
                    "text": sms_message_prompt_response
                }
            ]
        })
        headers = {
            'Authorization': f"{os.getenv('INFOBIP_API_PREFIX')} {os.getenv('INFOBIP_API_KEY')}",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        conn.request("POST", "/sms/2/text/advanced", payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))

    return jsonify({'predicted_label': predicted_label, 'prompt_response': prompt_response, 'image_url': image_url, 'is_healthy': is_healthy})

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