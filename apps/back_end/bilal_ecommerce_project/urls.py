# bilal_ecommerce_project/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from bilal_ecommerce_project.views import home_view, spa, TokenObtainPairCookieView, TokenRefreshCookieView
from rest_framework.routers import DefaultRouter
from products.views import CategoryViewSet, ProductViewSet
from django.conf import settings
from django.conf.urls.static import static
from .views import MeAPIView, register_user

# DRF router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name='home'),

    # API routes
    path('api/', include(router.urls)),

    # 🔐 JWT AUTH — Cookie-based
    path('api/token/', TokenObtainPairCookieView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshCookieView.as_view(), name='token_refresh'),

    path('api/me/', MeAPIView.as_view(), name='me'),
    path('api/register/', register_user),
]

# ✅ Serve media files FIRST
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ✅ SPA fallback LAST
urlpatterns += [
    re_path(r'^(?!api/).*$', spa),
]