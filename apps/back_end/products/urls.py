from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet


router = DefaultRouter()
router.register('product', ProductViewSet, basename='Product_model')

# Include router URLs
urlpatterns = [
    path('', include(router.urls)),
]




