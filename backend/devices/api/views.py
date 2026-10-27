

from devices.wmi_scripts import get_devices, get_device
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response




@api_view(['GET'])
def show_devices(request):
    devices=get_devices() 


    return Response(devices)




@api_view(['GET'])
def device_detail(request, device_id):
    device=get_device(device_id)

    return Response(device)