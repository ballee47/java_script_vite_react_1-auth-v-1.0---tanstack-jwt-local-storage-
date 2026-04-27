from sys import exception
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets


                          #API VIEW USING APIVIEW

# class ProductApiView(APIView):

#   def get(self, request, pk=None):
#      if pk:
#           try:
#                product = Product.objects.get(id=pk)
#                serializer = ProductSerializer(product)
#                return Response({'status': 'success', 'data': serializer.data})
#           except Product.DoesNotExist:
#                return Response({'status': 'error', 'message': 'Product not found'})
#      else:
#           products = Product.objects.all()
#           serializer = ProductSerializer(products, many=True)
#           return Response({'status': 'success', 'data': serializer.data})


#   def post(self, request):
#         all_products1 = request.data
#         serializer_2 = ProductSerializer(data=all_products1)
#         if not serializer_2.is_valid():
#             print(serializer_2.errors)
#             return Response({ 'status': "error", "message": 'something went wrong' })
#         serializer_2.save()
#         return Response({ 'status': "success", "data": serializer_2.data, "msg": "data received successfully" })
#   def put(self, request, pk):
#        try: 
#         product1=Product.objects.get(id=pk)
#        except Product.DoesNotExist:
#               return Response({ 'status': "error", "message": 'Product not found' })
#        serializer2=ProductSerializer(instance=product1,data=request.data)
#        if serializer2.is_valid():
#             serializer2.save()
#             return Response({ 'status': "success", "data": serializer2.data, "msg": "data updated successfully" })
#        return Response({ 'status': "error", "message": 'something went wrong' })
#   def patch(self, request, pk):
#        try: 
#         product1=Product.objects.get(id=pk)
#        except Product.DoesNotExist:
#               return Response({ 'status': "error", "message": 'Product not found' })
#        serializer2=ProductSerializer(instance=product1,data=request.data, partial=True)
#        if serializer2.is_valid():
#             serializer2.save()
#             return Response({ 'status': "success", "data": serializer2.data, "msg": "data updated successfully" })
#        return Response({ 'status': "error", "message": 'something went wrong' })
#   def delete(self, request, pk):
#        try: 
#         product1=Product.objects.get(id=pk)
#         product1.delete()
#         return Response({ 'status': "success", "msg": "data deleted successfully" })
       
#        except exception as e:
#               print(e)
#               return Response({ 'status': "error", "message": "invalid_id" })


                      #GENERIC VIEWS
       

# class Productlistview(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class Productdetailsview(generics.RetrieveAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class Productcreateview(generics.CreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class Productdestroyview(generics.DestroyAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


# class Productupdateview(generics.UpdateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer




               #CLASSSIC API DECORATORS


# @api_view(['GET'])
# def product_list(request):
#     all_products = Product.objects.all()
#     serializers_1 = ProductSerializer(instance=all_products, many=True)
#     return Response({ 'status': "success", "data": serializers_1.data})



# @api_view(['POST'])
# def product_list1(request):
#     # Get the POST data
#     all_products1 = request.data

#     # Initialize serializer correctly
#     serializer_2 = ProductSerializer(data=all_products1)  # use 'data='

#     # Validate data
#     if not serializer_2.is_valid():
#         print(serializer_2.errors)
#         return Response({ 'status': "error", "message": 'something went wrong' })

#     # Save to database
#     serializer_2.save()

#     return Response({ 'status': "success", "data": serializer_2.data, "msg": "data received successfully" })





# @api_view(['PUT'])
# def product_list_update(request,pk):
   
#    try: 
#     product1=Product.objects.get(id=pk)

#    except Product.DoesNotExist:
#           return Response({ 'status': "error", "message": 'Product not found' })
#    serializer2=ProductSerializer(instance=product1,data=request.data)

#    if serializer2.is_valid():
#         serializer2.save()
#         return Response({ 'status': "success", "data": serializer2.data, "msg": "data updated successfully" })
#    return Response({ 'status': "error", "message": 'something went wrong' })




# @api_view(['PATCH'])
# def product_list_update(request,pk):
#    try: 
#     product1=Product.objects.get(id=pk)
#    except Product.DoesNotExist:
#           return Response({ 'status': "error", "message": 'Product not found' })
#    serializer2=ProductSerializer(instance=product1,data=request.data)

#    if serializer2.is_valid():
#         serializer2.save()
#         return Response({ 'status': "success", "data": serializer2.data, "msg": "data updated successfully" })
#    return Response({ 'status': "error", "message": 'something went wrong' })





# @api_view(['DELETE'])
# def product_list_delete(request,pk):
#    try: 

#     product1=Product.objects.get(id=pk)
#     product1.delete()
#     return Response({ 'status': "success", "msg": "data deleted successfully" })
   
#    except exception as e:
#           print(e)
#           return Response({ 'status': "error", "message": "invalid_id" })
   

   

   
            #A GENERIC VIEW MIXING


# Product API

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        return {'request': self.request}


# Category API
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_serializer_context(self):
        return {'request': self.request}