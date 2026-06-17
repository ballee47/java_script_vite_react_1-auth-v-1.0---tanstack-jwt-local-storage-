from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from bilal_ecommerce_project.views import (
    LogoutView,
    home_view,
    spa,
    MeAPIView,
    register_user,
    TokenObtainPairCookieView,
    TokenRefreshCookieView,
    csrf_token_view,
)
from products.views import CategoryViewSet, ProductViewSet




# ─────────────────────────────────────
# ROUTER
# ─────────────────────────────────────
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')


# ─────────────────────────────────────
# URL PATTERNS
# ─────────────────────────────────────
urlpatterns = [
    path('admin/', admin.site.urls),

    # HOME
    path('', home_view, name='home'),

    # API ROUTER
    path('api/', include(router.urls)),

    # ───────── AUTH (COOKIE JWT) ─────────
    path(
        'api/token/',
        TokenObtainPairCookieView.as_view(),
        name='token_obtain_pair'
    ),

    path(
        'api/token/refresh/',
        TokenRefreshCookieView.as_view(),
        name='token_refresh'
    ),

    # ───────── USER ─────────
    path(
        'api/me/',
        MeAPIView.as_view(),
        name='me'
    ),

    path(
        'api/register/',
        register_user,
        name='register'
    ),

    # ───────── CSRF COOKIE ENDPOINT ─────────
    path(
        'api/csrf/',
        csrf_token_view,
        name='csrf_token'
    ),

    path(
        'api/logout/',
        LogoutView.as_view(),
        name='logout'
    ),
]

# ─────────────────────────────────────
# MEDIA (DEV ONLY)
# ─────────────────────────────────────
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

# ─────────────────────────────────────
# SPA FALLBACK (React Router)
# ─────────────────────────────────────
urlpatterns += [
    re_path(r'^(?!api/).*$', spa),
]