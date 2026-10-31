from django.urls import path, re_path
from . import views


urlpatterns = [
    path('list/', views.show_devices, name='list'),
    path('system-info/', views.system_info, name='system-info'),
    re_path(r'^(?P<device_id>.+)/$', views.device_detail, name='device-detail'),
]
