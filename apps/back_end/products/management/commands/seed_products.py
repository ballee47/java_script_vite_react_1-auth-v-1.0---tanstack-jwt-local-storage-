from django.core.management.base import BaseCommand
from faker import Faker
from products.models import Product
import random

class Command(BaseCommand):
    help = "Seed fake products"

    def handle(self, *args, **kwargs):
        fake = Faker()

        products = []
        for _ in range(100):
            products.append(Product(
                name=fake.company(),
                description=fake.text(),
                price=random.uniform(10.0, 500.0),
                stock=random.randint(1, 100),
            ))

        Product.objects.bulk_create(products)

        self.stdout.write(self.style.SUCCESS("Fake products added successfully!"))