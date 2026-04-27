from rest_framework import serializers
from .models import Product, Category



class CategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )

    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    # ✅ FIX: Always return full Cloudinary URL
    def get_image(self, obj):
        request = self.context.get('request')

        if obj.image:
            url = obj.image.url

            # ensure absolute URL (important for React)
            if request:
                return request.build_absolute_uri(url)
            return url

        return None

    def validate_price(self, value):
        if value < 200:
            raise serializers.ValidationError("Price must be at least 200.")
        return value

    def validate_name(self, value):
        for i in value:
            if i.isdigit():
                raise serializers.ValidationError("Name should not contain numbers.")
        return value