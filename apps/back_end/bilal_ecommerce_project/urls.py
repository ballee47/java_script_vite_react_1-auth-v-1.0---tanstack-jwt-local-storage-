from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from bilal_ecommerce_project.views import (
    home_view,
    spa,
    LogoutView,
    MeAPIView,
    register_user,
    TokenObtainPairCookieView,
    TokenRefreshCookieView,
    csrf_token_view,
)

from products.views import (
    CategoryViewSet,
    ProductViewSet,
)

# -----------------------------
# Router
# -----------------------------
router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"products", ProductViewSet, basename="product")

# -----------------------------
# URLs
# -----------------------------
urlpatterns = [
    path("admin/", admin.site.urls),

    path("", home_view, name="home"),

    path("api/v1/", include([

        # Authentication
        path(
            "auth/login/",
            TokenObtainPairCookieView.as_view(),
            name="login",
        ),

        path(
            "auth/refresh/",
            TokenRefreshCookieView.as_view(),
            name="refresh",
        ),

        path(
            "auth/logout/",
            LogoutView.as_view(),
            name="logout",
        ),

        path(
            "auth/register/",
            register_user,
            name="register",
        ),

        path(
            "auth/me/",
            MeAPIView.as_view(),
            name="me",
        ),

        path(
            "auth/csrf/",
            csrf_token_view,
            name="csrf",
        ),

        # Business Resources
        path("", include(router.urls)),

    ])),
]

# -----------------------------
# Media (Development)
# -----------------------------
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )

# -----------------------------
# SPA Fallback
# -----------------------------
urlpatterns += [
    re_path(r"^(?!api/).*$", spa),
]