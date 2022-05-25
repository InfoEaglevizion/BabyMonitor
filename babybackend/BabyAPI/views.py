from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from BabyAPI.models import Baby
from BabyAPI.serializers import BabySerializer

# Create your views here.


@csrf_exempt
def babyApi(request, id=0):
    if request.method == 'POST':
        baby_data = JSONParser().parse(request)
        baby_serializer = BabySerializer(data=baby_data)
        print(baby_data)

        if baby_serializer.is_valid():
            baby_serializer.save()
            return JsonResponse("Saved successfuly ", safe=False)

        return JsonResponse("The data is not saved", safe=False)
