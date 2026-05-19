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
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# ─────────────────────────────────────────
# HOME
# ─────────────────────────────────────────
def home_view(request):
    return HttpResponse("Django project Running 🚀")


def spa(request):
    return HttpResponse("Django spa Running 🚀")


# ─────────────────────────────────────────
# TOKEN WITH COOKIES
# ─────────────────────────────────────────
class TokenObtainPairCookieView(APIView):
    def post(self, request):
        try:
            serializer = TokenObtainPairSerializer(data=request.data)
            if serializer.is_valid():
                tokens = serializer.validated_data
                response = Response({
                    "message": "Login successful",
                    "username": request.data.get("username"),
                    "access": str(tokens.get("access")),
                    "refresh": str(tokens.get("refresh"))
                }, status=status.HTTP_200_OK)

                # Set tokens as cookies
                response.set_cookie(
                    key="access_token",
                    value=str(tokens.get("access")),
                    max_age=7 * 24 * 60 * 60,
                    secure=False,
                    httponly=False,
                    samesite="Lax"
                )

                response.set_cookie(
                    key="refresh_token",
                    value=str(tokens.get("refresh")),
                    max_age=30 * 24 * 60 * 60,
                    secure=False,
                    httponly=False,
                    samesite="Lax"
                )

                return response

            # Debug: log validation errors
            print(f"Serializer errors: {serializer.errors}")
            return Response(
                {"error": "Invalid credentials", "details": serializer.errors},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            print(f"Login error: {str(e)}")
            return Response(
                {"error": f"Login failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TokenRefreshCookieView(APIView):
    def post(self, request):
        from rest_framework_simplejwt.serializers import TokenRefreshSerializer
        from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

        refresh_token = request.COOKIES.get("refresh_token") or request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"error": "Refresh token not provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
            if serializer.is_valid():
                tokens = serializer.validated_data
                response = Response(
                    {"message": "Token refreshed", "access": str(tokens.get("access"))},
                    status=status.HTTP_200_OK
                )

                response.set_cookie(
                    key="access_token",
                    value=str(tokens.get("access")),
                    max_age=7 * 24 * 60 * 60,
                    secure=False,
                    httponly=False,
                    samesite="Lax"
                )

                return response
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except (TokenError, InvalidToken) as e:
            return Response(
                {"error": f"Token error: {str(e)}"},
                status=status.HTTP_401_UNAUTHORIZED
            )


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