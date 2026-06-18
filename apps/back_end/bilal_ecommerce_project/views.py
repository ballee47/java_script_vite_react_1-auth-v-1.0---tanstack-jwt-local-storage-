# apps/back_end/bilal_ecommerce_project/views.py

from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
import cloudinary.uploader



# ─────────────────────────────────────
# HOME
# ─────────────────────────────────────
def home_view(request):
    return HttpResponse("Django project Running 🚀")


def spa(request):
    return HttpResponse("Django SPA Running 🚀")


# ─────────────────────────────────────
# LOGIN (COOKIE JWT)
# ─────────────────────────────────────
class TokenObtainPairCookieView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {"detail": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        refresh = str(refresh)

        response = Response(
            {"message": "Login successful"},
            status=status.HTTP_200_OK
        )

        # ACCESS TOKEN COOKIE
        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=15 * 60,
        )

        # REFRESH TOKEN COOKIE
        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=7 * 24 * 60 * 60,
        )

        return response


# ─────────────────────────────────────
# REFRESH TOKEN (COOKIE BASED)
# ─────────────────────────────────────
class TokenRefreshCookieView(APIView):

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "No refresh token found"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)

            response = Response(
                {"message": "Token refreshed"},
                status=status.HTTP_200_OK
            )

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
                max_age=15 * 60,
            )

            return response

        except TokenError:
            return Response(
                {"detail": "Invalid refresh token"},
                status=status.HTTP_401_UNAUTHORIZED
            )


# ─────────────────────────────────────
# ME (CURRENT USER) ✅ FIXED + ADDED
# ─────────────────────────────────────
class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        if not user or not user.is_authenticated:
            return Response(
                {"detail": "Not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })


# ─────────────────────────────────────
# REGISTER USER
# ─────────────────────────────────────
@api_view(['POST'])
def register_user(request):
    data = request.data

    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password:
        return Response(
            {"detail": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"detail": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if email and User.objects.filter(email=email).exists():
        return Response(
            {"detail": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email or ""
    )

    return Response(
        {
            "message": "User created successfully",
            "username": user.username
        },
        status=status.HTTP_201_CREATED
    )


# ─────────────────────────────────────
# IMAGE UPLOAD (CLOUDINARY)
# ─────────────────────────────────────
class ImageUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image = request.FILES.get("image")

        if not image:
            return Response(
                {"detail": "No image provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = cloudinary.uploader.upload(image)

            return Response({
                "image_url": result.get("secure_url")
            })

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
# ─────────────────────────────────────
# CSRF TOKEN VIEW
# ─────────────────────────────────────
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse


@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "CSRF cookie set"})



# ─────────────────────────────────────
# LOGOUT VIEW
# ─────────────────────────────────────

from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name="dispatch")
class LogoutView(APIView):

    def post(self, request):
        response = Response({"message": "Logged out successfully"})

        # 🔥 IMPORTANT FIX: must match cookie settings exactly
        response.delete_cookie("access_token", path="/")
        response.delete_cookie("refresh_token", path="/")
        response.delete_cookie("csrftoken", path="/")

        return response