

from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
import cloudinary.uploader
from rest_framework.parsers import MultiPartParser, FormParser





#home


def home_view(request):
    return HttpResponse("Django API Running 🚀")


def spa(request):
    return HttpResponse("Django API Running 🚀")


#logging in user info API
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "username": user.username
            })
        return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)

# Logged-in user info API
class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "is_superuser": request.user.is_superuser
        })


# resigter

@api_view(['POST'])
def register_user(request):
    data = request.data

    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    
    if User.objects.filter(username=username).exists():
        return Response({"message": "User already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    return Response({
        "message": "User created successfully",
        "username": user.username
    }, status=status.HTTP_201_CREATED)






class ImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        image = request.FILES.get('image')

        if not image:
            return Response({"error": "No image provided"}, status=400)

        try:
            upload_result = cloudinary.uploader.upload(image)

            return Response({
                "image_url": upload_result.get("secure_url")
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)