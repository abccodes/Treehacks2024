============================================================================
# Overview

This project focuses on the development of a full-stack machine learning project for the classification of skin cancer, leveraging the comprehensive Skin Cancer MNIST: HAM10000 dataset. The dataset, curated by Maderna in 2018, provides a diverse collection of dermatoscopic images crucial for training and testing our algorithms. It encompasses over 10,000 labeled images of skin lesions, categorized into seven different diagnostic categories, making it an invaluable resource for advancing research and development in the field of dermatology and automated diagnostic systems.

The utilization of the Skin Cancer MNIST: HAM10000 dataset enables our project to approach the complexity of skin cancer diagnosis with a robust and varied dataset, essential for improving the accuracy and reliability of our classification model. Our methodology incorporates deep learning techniques to analyze and learn from the dermatoscopic images, aiming to provide a tool that supports dermatologists in the early detection and classification of skin cancers. For detailed information on the dataset and its composition, please refer to the original dataset made available by Maderna (2018) on Kaggle at Skin Cancer MNIST: HAM10000.
------------------

![Tech Diagram](https://github.com/abccodes/Treehacks2024/assets/79234681/b7d61612-b74e-4f56-9a54-860d6b0fabc5)

------------------

![Overall Diagram](https://github.com/abccodes/Treehacks2024/assets/79234681/8a3d4574-b091-4c2d-b23a-35fa0c20d968)

------------------

============================================================================

# Convex + TypeScript + ESLint + Vite + React + Clerk + Tailwind + shadcn/ui

This template provides a minimal setup to get Convex working, with TypeScript,
ESLint and React using [Vite](https://vitejs.dev/). It uses [Clerk](https://clerk.dev/) for user authentication.

Start by editing `convex/myFunctions.ts` and interact with your React app.

See Convex docs at https://docs.convex.dev/home

## Setting up

```
npm create convex@latest -t react-vite-clerk-shadcn
```

Then:

1. Follow steps 1 to 3 in the [Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started)
2. Paste the Issuer URL as `CLERK_JWT_ISSUER_DOMAIN` to your dev deployment environment variable settings on the Convex dashboard (see [docs](https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances))
3. Paste your publishable key as `VITE_CLERK_PUBLISHABLE_KEY="<your publishable key>"` to the `.env.local` file in this directory.

If you want to sync Clerk user data via webhooks, check out this [example repo](https://github.com/thomasballinger/convex-clerk-users-table/).


============================================================================

# Setup Server: Classifier and Prediction Guard Intel LLM

```
cd treehacks2024
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

# run the server

```
cd treehacks2024
source venv/bin/activate
python server/app.py
```

# exit venv

```
exit
```

============================================================================


#Inspiration

DermaDetect was born out of a commitment to improve healthcare equity for underrepresented and economically disadvantaged communities, including seniors, other marginalized populations, and those impacted by economic inequality.

Recognizing the prohibitive costs and emotional toll of traditional skin cancer screenings, which often result in benign outcomes, we developed an open-source AI-powered application to provide preliminary skin assessments.

This innovation aims to reduce financial burdens and emotional stress, offering immediate access to health information and making early detection services more accessible to everyone, regardless of their societal status.

#What it does

AI-powered analysis: Fine-tuned Resnet50 Convolutional Neural Network classifier that predicts skin lesions as benign versus cancerous by leveraging the open-source HAM10000 dataset.

Protecting patient data confidentiality: Our application uses OAuth technology (Clerk and Convex) to authenticate and verify users logging into our application, protecting patient data when users upload images and enter protected health information (PHI).

Understandable and age-appropriate information: Prediction Guard LLM technology offers clear explanations of results, fostering informed decision-making for users while respecting patient data privacy.

Journal entry logging: Using the Convex backend database schema allows users to make multiple journal entries, monitor their skin, and track moles over long periods.

Seamless triaging: Direct connection to qualified healthcare providers eliminates unnecessary user anxiety and wait times for concerning cases.

#How we built it

Machine learning model TensorFlow, Keras: Facilitated our model training and model architecture, Python, OpenCV, Prediction Guard LLM, Intel Developer Cloud, Pandas, NumPy, Sklearn, Matplotlib

Frontend TypeScript, Convex, React.js, Shadcn (Components), FramerMotion (Animated components), TailwindCSS

Backend TypeScript, Convex Database & File storage, Clerk (OAuth User login authentication), Python, Flask, Vite, InfoBip (Twillio-like service)

#Challenges we ran into
We had a lot of trouble cleaning and applying the HAM10000 skin images dataset. Due to long run times, we found it very challenging to make any progress on tuning our model and sorting the data. We eventually started splitting our dataset into smaller batches and training our model on a small amount of data before scaling up which worked around our problem. We also had a lot of trouble normalizing our data, and figuring out how to deal with a large Melanocytic nevi class imbalance. After much trial and error, we were able to correctly apply data augmentation and oversampling methods to address the class imbalance issue.

One of our biggest challenges was setting up our backend Flask server. We encountered so many environment errors, and for a large portion of the time, the server was only able to run on one computer. After many Google searches, we persevered and resolved the errors.

#Accomplishments that we're proud of
We are incredibly proud of developing a working open-source, AI-powered application that democratizes access to skin cancer assessments.

Tackling the technical challenges of cleaning and applying the HAM10000 skin images dataset, dealing with class imbalances, and normalizing data has been a journey of persistence and innovation.

Setting up a secure and reliable backend server was another significant hurdle we overcame. The process taught us the importance of resilience and resourcefulness, as we navigated through numerous environmental errors to achieve a stable and scalable solution that protects patient data confidentiality.

Integrating many technologies that were new to a lot of the team such as Clerk for authentication, Convex for user data management, Prediction Guard LLM, and Intel Developer Cloud.

Extending beyond the technical domain, reflecting a deep dedication to inclusivity, education, and empowerment in healthcare.

#What we learned
Critical importance of data quality and management in AI-driven applications. The challenges we faced in cleaning and applying the HAM10000 skin images dataset underscored the need for meticulous data preprocessing to ensure AI model accuracy, reliability, and equality.

How to Integrate many different new technologies such as Convex, Clerk, Flask, Intel Cloud Development, Prediction Guard LLM, and Infobip to create a seamless and secure user experience.

#What's next for DermaDetect
Finding users to foster future development and feedback.

Partnering with healthcare organizations and senior communities for wider adoption.

Continuously improving upon data curation, model training, and user experience through ongoing research and development.

