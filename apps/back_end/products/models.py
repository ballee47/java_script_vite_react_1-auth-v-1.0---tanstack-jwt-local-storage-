
from django.db import models
from cloudinary.models import CloudinaryField
from rest_framework.views import APIView


class Category(models.Model):
    CATEGORY_CHOICES = [
        ('gaming', 'Gaming'),
        ('food', 'Food'),
        ('electronics', 'Electronics'),
        ('sports', 'Sports'),

    ]


    type = models.CharField(max_length=20, choices=CATEGORY_CHOICES, null=True, blank=True,default='electronics')
    name = models.CharField(max_length=100, null=True, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    image = CloudinaryField('image', blank=True, null=True)


    def __str__(self):
        return f"{self.name} ({self.type})"



class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.name} ({self.category})"