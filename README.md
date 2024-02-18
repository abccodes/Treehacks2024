==========================================================================================================================================================
==========================================================================================================================================================


This project focuses on the development of a machine learning model for the classification of skin cancer, leveraging the comprehensive Skin Cancer MNIST: HAM10000 dataset. The dataset, curated by Maderna in 2018, provides a diverse collection of dermatoscopic images crucial for training and testing our algorithms. It encompasses over 10,000 labeled images of skin lesions, categorized into seven different diagnostic categories, making it an invaluable resource for advancing research and development in the field of dermatology and automated diagnostic systems.

The utilization of the Skin Cancer MNIST: HAM10000 dataset enables our project to approach the complexity of skin cancer diagnosis with a robust and varied dataset, essential for improving the accuracy and reliability of our classification model. Our methodology incorporates deep learning techniques to analyze and learn from the dermatoscopic images, aiming to provide a tool that supports dermatologists in the early detection and classification of skin cancers. For detailed information on the dataset and its composition, please refer to the original dataset made available by Maderna (2018) on Kaggle at Skin Cancer MNIST: HAM10000.


==========================================================================================================================================================
==========================================================================================================================================================


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


==========================================================================================================================================================
==========================================================================================================================================================


# Server -> Classifier and Prediction Guard Intel LLM

# how to backend install

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

