from ..llm.storage_creation import DocStore
from ..llm.utils import *
import json


def generate_prescription(disease):
    print('Generating prescription')
    A = DocStore()
    q1 = f'Tell me about disease {disease}. What are its symptoms?'
    q2 = f'What are the common treatments for {disease}?'
    q3 = f'What are the common causes of {disease}?'

    print(q1, q2, q3)

    w1, w2, w3 = A.search_index(q1), A.search_index(q2), A.search_index(q3)
    a1, s1 = w1['response'], w1['source']
    a2, s2 = w2['response'], w2['source']
    a3, s3 = w3['response'], w3['source']
    sources = s1 | s2 | s3
    print("a1", a1)
    print("a2", a2)
    print("a3", a3)
    print("sources", sources)

    return {
        'symptoms': a1,
        'treatments': a2,
        'causes': a3,
        'source': list(sources),
        'type': 'Success',
    }


def chatbot(question):
    template = '''
You are a doctor. A patient comes to you with a complaint, you need to respond to the patient's complaint.

Patient: {patient_complaint}

answer in less than 200 words be precise and to the point.

give in continuous text without any bullet points or numbering.
'''
    prompt = template.format(patient_complaint=question)
    res = Settings.llm.complete(prompt)
    return res.text
