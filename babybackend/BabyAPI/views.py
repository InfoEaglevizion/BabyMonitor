from datetime import datetime
from sqlite3 import Date
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from BabyAPI.models import Baby
from BabyAPI.serializers import BabySerializer
import time
from datetime import timedelta, date


# Create your views here.


@csrf_exempt
def babyApi(request, id=0):
    if request.method == 'POST':
        baby_data = JSONParser().parse(request)
        baby_data['Date'] = time.strftime('%Y-%m-%d %H:%M:%S')
        baby_serializer = BabySerializer(data=baby_data)


        if baby_serializer.is_valid():
            baby_serializer.save()
            return JsonResponse("Saved successfuly ", safe=False)
        
        print(baby_serializer.errors)

        return JsonResponse("The data is not saved", safe=False)

    if request.method == 'GET':
        start_date = date.today()
        end_date = date.today() + timedelta(days=1)
        all_objects= Baby.objects.filter(Date__date__range=(start_date, end_date))
        baby_serializer = BabySerializer(all_objects, many=True)

        ChartData = {}
        total_count = 0
        total_quantity = 0
        for obj in baby_serializer.data:
            total_count += 1
            total_quantity += obj["MilkQuantity"]
            ChartData[datetime.strptime(obj["Date"], '%Y-%m-%dT%H:%M:%SZ').strftime("%H:%M:%S")] = obj["MilkQuantity"]

        return JsonResponse({"TotalCount" : total_count, "TotalQuantity" : total_quantity, "LastDate": all_objects.last().Date, "ChartData": ChartData}, safe=False)


