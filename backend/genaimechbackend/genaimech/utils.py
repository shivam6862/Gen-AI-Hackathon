from rest_framework.response import Response
from .model.prediction import Model, get_predict_percentage_stroke, get_predict_percentage_diabetes, get_predict_percentage_cancer, get_predict_percentage_asthma


def get_response(data, status=200):
    return Response(data, status=status)


def post_response(data, status=201):
    return Response(data, status=status)


model = Model()
print("model", model)


def get_prediction_percentage_asthma(data_of_new_patient):
    prediction_percentage = get_predict_percentage_asthma(
        model, data_of_new_patient)
    return {
        "type": "Success",
        "response": prediction_percentage
    }


def get_prediction_percentage_cancer(data_of_new_patient):
    prediction_percentage = get_predict_percentage_cancer(
        model, data_of_new_patient)
    return {
        "type": "Success",
        "response": prediction_percentage
    }


def get_prediction_percentage_diabetes(data_of_new_patient):
    prediction_percentage = get_predict_percentage_diabetes(
        model, data_of_new_patient)
    return {
        "type": "Success",
        "response": prediction_percentage
    }


def get_prediction_percentage_stroke(data_of_new_patient):
    prediction_percentage = get_predict_percentage_stroke(
        model, data_of_new_patient)
    return {
        "type": "Success",
        "response": prediction_percentage
    }


def post_chat(message, status=201):
    try:
        response = {
            'response': "Account login issue, password problem",
            'type': 'SUCCESS'
        }
        return Response(response, status=status)
    except Exception as e:
        return Response({'message': str(e)}, status=500)


def get_all_chat(status=200):
    print("get_all_chat")
    ressponse = {
        'type': 'Success',
        'response': []
    }
    return Response(ressponse, status=status)


def new__chat(data, status=201):
    print("data", data)
    response = {
        'type': 'Success',
        'response': {
            'chatName': data
        }
    }
    return Response(response, status=status)


def get__chat(pk, status=200):
    print("pk", pk)
    data = {
        'type': 'Success',
        'response': []
    }
    return Response(data, status=status)
