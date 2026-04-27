from django.contrib import admin
from .models import Product, Category



# Register your models here.

admin.site.register(Product)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type', 'slug')
    list_filter = ('type',)
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}



admin.site.register(Category)
