import imp
from django.conf.urls import url
from BabyAPI import views

urlpatterns = [
    url(r'^baby/$', views.babyApi),
    url(r'^baby/([0-9])$', views.babyApi)
]
