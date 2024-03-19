from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_response, post_response, post_chat, get_all_chat, new__chat, get__chat


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/', 'method': 'GET', 'body': None,
            'description': 'Returns an array of routes'},
        {'Endpoint': '/genaimech/', 'method': 'GET',
         'body': None, 'description': 'Returns an array of genaimech'},
        {'Endpoint': '/genaimech/', 'method': 'POST',
            'body': {'name': 'string', 'age': 'integer'}, 'description': 'Creates a new genaimech'},

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
