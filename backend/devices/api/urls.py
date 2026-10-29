from django.urls import path, re_path
from . import views


urlpatterns = [
    path('list/', views.show_devices, name='list'),
    path('system-info/', views.system_info, name='system-info'),
    # Use re_path with .+ to match device IDs with special characters (including encoded ones)
    re_path(r'^(?P<device_id>.+)/enable/$', views.enable_device_endpoint, name='device-enable'),
    re_path(r'^(?P<device_id>.+)/disable/$', views.disable_device_endpoint, name='device-disable'),
    re_path(r'^(?P<device_id>.+)/restart/$', views.restart_device_endpoint, name='device-restart'),
    re_path(r'^(?P<device_id>.+)/$', views.device_detail, name='device-detail'),
]
