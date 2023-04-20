from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=128)
    amount = models.IntegerField()
    price = models.FloatField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name + " - " + str(self.amount)
