# apps/back_end/bilal_ecommerce_project/views.py

from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import cloudinary.uploader


# ─────────────────────────────────────────
# HOME
# ─────────────────────────────────────────
def home_view(request):
    return HttpResponse("Django API Running 🚀")


def spa(request):
    return HttpResponse("Django API Running 🚀")


# ─────────────────────────────────────────
# ME — logged in user info
# ─────────────────────────────────────────
class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,           # ✅ added
            "username": request.user.username,
            "email": request.user.email,      # ✅ added
            "is_superuser": request.user.is_superuser,
        })


# ─────────────────────────────────────────
# REGISTER
# ─────────────────────────────────────────
@api_view(['POST'])
def register_user(request):
    data = request.data

    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    # ✅ validate required fields
    if not username or not password:
        return Response(
            {"message": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"message": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ check email uniqueness too
    if email and User.objects.filter(email=email).exists():
        return Response(
            {"message": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email or ""
    )

    return Response({
        "message": "User created successfully",
        "username": user.username,
    }, status=status.HTTP_201_CREATED)


# ─────────────────────────────────────────
# IMAGE UPLOAD — Cloudinary
# ─────────────────────────────────────────
class ImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        image = request.FILES.get('image')

        if not image:
            return Response(
                {"error": "No image provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            upload_result = cloudinary.uploader.upload(image)
            return Response({
                "image_url": upload_result.get("secure_url")
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )