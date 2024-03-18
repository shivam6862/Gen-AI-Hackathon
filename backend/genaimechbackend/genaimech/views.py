from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import get_response, post_response


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
