from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_response, post_response, post_chat, get_all_chat, new__chat, get__chat, get_prediction_percentage_asthma, get_prediction_percentage_cancer, get_prediction_percentage_diabetes, get_prediction_percentage_stroke, get_prescription

from .util.auth import insert_signup, user_signin


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/', 'method': 'GET', 'body': None,
            'description': 'Returns an array of routes'},
        {'Endpoint': '/genaimech/', 'method': 'GET',
         'body': None, 'description': 'Returns an array of genaimech'},
        {'Endpoint': '/genaimech/', 'method': 'POST',
            'body': {'name': 'string', 'age': 'integer'}, 'description': 'Creates a new genaimech'},
        {'Endpoint': '/chat/<str:pk>/', 'method': 'POST',
            'body': {'message': 'string'}, 'description': 'Creates a new message in a chat'},
        {'Endpoint': '/chat/', 'method': 'GET',
            'body': None, 'description': 'Returns an array of chat'},
        {'Endpoint': '/chat/', 'method': 'POST',
            'body': {'chatName': 'string'}, 'description': 'Creates a new chat'},
        {'Endpoint': '/chat/<str:pk>/', 'method': 'GET',
            'body': None, 'description': 'Returns a chat with the given id'},
        {'Endpoint': '/form/<str:diagnosis>/', 'method': 'POST',
            'body': {'data': 'string'}, 'description': 'Returns the percentage of the diagnosis'},
        {'Endpoint': '/signup/', 'method': 'POST',
            'body': {'username': 'string', 'email': 'string', 'password': 'string'}, 'description': 'Creates a new user'},
        {'Endpoint': '/signin/', 'method': 'POST',
            'body': {'username': 'string', 'password': 'string'}, 'description': 'Signin a user'},
        {'Endpoint': '/prescription/', 'method': 'GET',
            'body': {'diseases': 'string'}, 'description': 'Returns a prescription for the diseases'}
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def getGenaimech(request):
    if request.method == 'GET':
        return get_response('Get all genaimech')
    elif request.method == 'POST':
        return post_response('Create new genaimech')
    return get_response('Hello World')


@api_view(['POST'])
def chat(request, pk):
    print(pk)
    message = request.data['message']
    return post_chat(message)


@api_view(['GET'])
def getallchats(request):
    return get_all_chat()


@api_view(['POST'])
def newchat(request):
    chatName = request.data['chatName']
    return new__chat(chatName)


@api_view(['GET'])
def getchat(request, pk):
    return get__chat(pk)


@api_view(['POST'])
def postForm(request, diagnosis):
    data = request.data['data']
    print("data", data)
    if diagnosis == 'asthma':
        return get_response(get_prediction_percentage_asthma(data))
    elif diagnosis == 'cancer':
        return get_response(get_prediction_percentage_cancer(data))
    elif diagnosis == 'diabetes':
        return get_response(get_prediction_percentage_diabetes(data))
    elif diagnosis == 'stroke':
        return get_response(get_prediction_percentage_stroke(data))
    else:
        return get_response('Invalid diagnosis')


@api_view(['POST'])
def signup(request):
    return insert_signup(request)


@api_view(['POST'])
def signin(request):
    return user_signin(request)


@api_view(['GET'])
def getPrescription(request):
    diseases = request.data['diseases']
    return get_prescription(diseases)
