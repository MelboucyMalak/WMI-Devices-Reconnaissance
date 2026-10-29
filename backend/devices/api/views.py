from devices.wmi_scripts import (
    get_devices, 
    get_device, 
    enable_device, 
    disable_device, 
    restart_device,
    get_system_info
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from urllib.parse import unquote


@api_view(['GET'])
def show_devices(request):
    """Get all devices from WMI"""
    devices = get_devices()
    return Response(devices)


@api_view(['GET'])
def device_detail(request, device_id):
    """Get details for a specific device"""
    # Decode the URL-encoded device ID
    decoded_id = unquote(device_id)
    device = get_device(decoded_id)
    return Response(device)


@api_view(['POST'])
def enable_device_endpoint(request, device_id):
    """Enable a specific device (requires admin)"""
    # Decode the URL-encoded device ID
    decoded_id = unquote(device_id)
    result = enable_device(decoded_id)
    
    if result.get("success"):
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def disable_device_endpoint(request, device_id):
    """Disable a specific device (requires admin)"""
    # Decode the URL-encoded device ID
    decoded_id = unquote(device_id)
    result = disable_device(decoded_id)
    
    if result.get("success"):
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def restart_device_endpoint(request, device_id):
    """Restart a specific device (requires admin)"""
    # Decode the URL-encoded device ID
    decoded_id = unquote(device_id)
    result = restart_device(decoded_id)
    
    if result.get("success"):
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def system_info(request):
    """Get system information"""
    info = get_system_info()
    return Response(info)
