from bson import ObjectId
from rest_framework.response import Response
from ..models import User
import hashlib
import random
import string
import uuid
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
import environ
env = environ.Env()
environ.Env.read_env()


def encrypt_password(password, salt):
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest()


def generate_salt():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))


def generate_login_token(email, SECRET_KEY, _id):
    return hashlib.sha256((email + SECRET_KEY + str(_id)).encode()).hexdigest()


def insert_signup(data):
    name = data.data.get('name')
    phone_number = data.data.get('phone_number')
    email = data.data.get('email')
    password = data.data.get('password')

    salt = generate_salt()
    hashed_password = encrypt_password(password, salt)

    user = User.objects.filter(email=email)
    if user:
        return Response({'status': 400, 'message': 'User already exists!'}, status=400)

    try:
        User.objects.create(name=name, phone_number=phone_number,
                            email=email, hashed_password=hashed_password, salt=salt)
    except:
        return Response({'status': 400, 'message': 'Error during User creation!'}, status=400)

    return Response({'status': 200, 'message': 'User added successfully!'}, status=200)


def user_signin(data):
    email = data.data.get('email')
    password = data.data.get('password')
    user = User.objects.filter(email=email)
    if not user:
        return Response({'status': 400, 'message': 'User does not exists!'}, status=400)

    user = user[0]
    hashed_password = encrypt_password(password, user.salt)
    if hashed_password != user.hashed_password:
        return Response({'status': 400, 'message': 'Invalid password!'}, status=400)

    SECRET_KEY = env('SECRET_KEY')
    _id = user._id
    login_token = generate_login_token(
        email, SECRET_KEY, _id)

    return Response({'status': 200, 'message': 'User logged in successfully!',
                     'name': user.name,
                     'phone_number': user.phone_number,
                     'email': user.email,
                     'login_token': login_token,
                     'id': str(_id)
                     }, status=200)
