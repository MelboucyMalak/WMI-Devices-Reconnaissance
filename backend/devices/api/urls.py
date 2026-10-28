

from django.urls import path

from . import views


urlpatterns = [
    path('list/', views.show_devices, name='list'),   #shows a liste of connected devices
    path('device_details/', views.device_detail, name='device-detail'),
]