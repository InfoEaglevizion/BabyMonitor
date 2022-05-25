from rest_framework import serializers
from BabyAPI.models import Baby


class BabySerializer(serializers.ModelSerializer):
    class Meta:
        model = Baby
        fields = ('BabyEntryId',
                  'Pipi',
                  'Caca',
                  'Milk',
                  'MilkQuantity')
