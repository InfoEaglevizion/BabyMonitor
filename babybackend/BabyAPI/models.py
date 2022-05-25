from django.db import models

# Create your models here.


class Baby(models.Model):
    BabyEntryId = models.AutoField(primary_key=True)
    Pipi = models.BooleanField()
    Caca = models.BooleanField()
    Milk = models.BooleanField()
    MilkQuantity = models.IntegerField()
