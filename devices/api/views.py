import socket
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def show_devices(request):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(("192.168.1.85", 4444))  
        s.sendall(b"devices")
        
        data = s.recv(1024 * 1024).decode()
        s.close()
        
        result = json.loads(data)
        return Response(result)
    except Exception as e:
        return Response({"status": "error", "message": str(e)})

@api_view(['GET'])
def device_detail(request, device_id):
    return Response({"id": device_id, "name": "Details not implemented yet"})