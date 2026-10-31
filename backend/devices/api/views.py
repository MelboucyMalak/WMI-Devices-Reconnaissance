from devices.wmi_scripts import (
    get_devices, 
    get_device, 
    get_system_info,
    create_socket
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from urllib.parse import unquote
import socket
import json

# @api_view(['GET'])
# def show_devices(request):
#     """Get all devices from WMI"""
#     devices = get_devices()
#     return Response(devices)


# @api_view(['GET'])
# def device_detail(request, device_id):
#     """Get details for a specific device"""
#     # Decode the URL-encoded device ID
#     decoded_id = unquote(device_id)
#     device = get_device(decoded_id)
#     return Response(device)



# @api_view(['GET'])
# def system_info(request):
#     """Get system information"""
#     info = get_system_info()
#     return Response(info)

@api_view(['GET'])
def show_devices(request):
    try:

        devices = get_devices()
        return Response(devices)
    except Exception as e:
        return Response({"status": "error", "message": str(e)})
    


@api_view(['GET'])
def device_detail(request):  
    try:                # http://127.0.0.1:8000/devices/device_details/?id=ACPI%5CACPI0003%5C0
     device_id = request.GET.get('id')  #n5rjo l id m url
     device = get_device(device_id)
     return Response(device)
    except Exception as e:
      return Response({"status": "error", "message": str(e)})




@api_view(['GET'])
def system_info(request):
    info = get_system_info()
    return Response(info)
