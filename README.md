# Gen AI Hackathon

## Deploy

- [Gen ai mech-hackathon.vercel](https://gen-ai-mech-hackathon.vercel.app/)

## Overview

The Gen AI Hackathon project aims to utilize machine learning for healthcare by developing a web application that can detect various diseases such as asthma, cancer, diabetes, and stroke. The application provides real-time diagnosis based on predictive modeling. If a disease is detected, the user receives preventive measures and can engage in further conversation with a llm chatbot specialized in that disease.

## Features

- Real-time disease detection using machine learning
- Personalized preventive measures for detected diseases
- Interactive llm chatbot for further consultation
- User authentication with sign-up and sign-in functionality
- Easy-to-use interface with intuitive navigation

## Step-by-Step Process in llm

1. User signs up or signs in to the platform.
2. On the home page, the user can navigate to the diagnosis page.
3. In the diagnosis page, the user fills out a form providing necessary information.
4. Based on the input, the application predicts whether the user has any of the specified diseases.
5. If a disease is detected, preventive measures are provided to the user.
6. The user can engage in further conversation with a disease-specific llm chatbot on the chat page.

## Unique Idea Brief

We have worked on both aspects of the problem statement, i.e, Disease Diagnosis , treatment Recommendation.

The disease diagnosis part consists of the identification of disease based on information received from user through form-filling. Then ML model specific to that disease is used for the diagnosis of the particular disease.

The recommendation process plans out a detailed report regarding causes, symptoms, medical prescription and changes to be made in living style.

There is a LLM based chat-doctor finetuned on dataset (link mentioned at last), which can given guidance on general medical related questions.

## [Video](https://youtu.be/jwQfrptToTA)

<video width="100%" height="100%" controls autoplay>
  <source src="https://www.youtube.com/watch?v=jwQfrptToTA" type="video/mp4">
</video>

## Workflow

![WorkFlow](/image/explain.png)

## Frontend

### Sign Up Page

![1](/image/1.png)

### Home Page

![2](/image/2.png)

## Diagnosis Page

![3](/image/3.png)

## Form Page

![4](/image/4.png)

![6](/image/6.png)

![7](/image/7.png)

## Chat Page

![5](/image/5.png)

## Getting Started

1. Clone the repository:

   ```bash
   https://github.com/shivam6862/Gen-AI-Hackathon.git
   cd Gen-AI-Hackathon
   ```

2. Install dependencies and Run the application:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Install dependencies and Run the application:

   ```bash
   cd backend
   python -m venv env [for windows]
   pip install -r requirements.txt
   cd genaimechbackend
   python manage.py runserver
   ```

4. Give .env in `backend/genaimechbackend/genaimechbackend/.env`

   ```bash
   HOST=
   PROJECT_NAME=
   DB_USERNAME=
   PASSWORD=
   SECRET_KEY=
   ```

5. Access the application at [port](http://localhost:3000)

6. The finetuning is done on **Intel/Mistral-7B-v0.1-int4-inc**, the code for fine-tuning is written under medical_finetune.py. The file can be run using below command

```bash
python medical_finetune.py --bf16 True --use_ipex True --max_seq_length 512
```

## Finetuning

- [Dataset](https://huggingface.co/datasets/heliosbrahma/mental_health_conversational_dataset)
- [Model for finetuning](https://huggingface.co/Intel/Mistral-7B-v0.1-int4-inc)
- [Check-points for Fine-tuned model](https://drive.google.com/drive/folders/13D68wowSkwtooYRJAfLYIQ3Q2T70F7hx)
- scikit-learn-intelex
  - [sklearnex](https://pypi.org/project/scikit-learn-intelex/)

## Kaggle dataset

- [Diabetes](https://www.kaggle.com/datasets/akshaydattatraykhare/diabetes-dataset)
- [Asthma](https://www.kaggle.com/datasets/deepayanthakur/asthma-disease-prediction)
- [Stroke](https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset)
- [Cancer](https://www.kaggle.com/datasets/mysarahmadbhat/lung-cancer)

## Contributors

- [Sarvagya Porwal](https://github.com/Sar2580P)
- [Shivam Kumar](https://github.com/shivam6862)
- [Puspendra Mahariya](https://github.com/silent-cipher)

## TEAMID -

```
Team name - genaimech
```
