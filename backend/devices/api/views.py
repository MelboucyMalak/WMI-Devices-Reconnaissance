

import socket
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def show_devices(request):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(("127.0.0.1", 4444))  
        s.sendall(b"devices")

          #for receiving data m sockets
        data = ""   #y5dem empty string where we sstore all the data
        while True:   #t7bes 3nd break
         part = s.recv(4096).decode()   # s. the socket recv limite 4096 t3 data from the vm  , decode converts data into text
         if not part:    #si pas vide (5laso data) 5rji mlboucle
           break
         data += part

        s.close()
        print("Received data:", repr(data[:200]))

        result = json.loads(data)
        devices = []
        for d in result:
         devices.append({
          "id": d["id"],
          "name": d["name"]
        })

        return Response(devices)
    except Exception as e:
     return Response({"status": "error", "message": str(e)})
    


@api_view(['GET'])
def device_detail(request):                  # http://127.0.0.1:8000/devices/device_details/?id=ACPI%5CACPI0003%5C0
    device_id = request.GET.get("id")
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(("127.0.0.1", 4444))
        s.sendall(f"device:{device_id}".encode())
        
        data = ""
        while True:
            part = s.recv(4096).decode()
            if not part:
                break
            data += part

        s.close()
        print("Received data:", repr(data[:200]))

        result = json.loads(data)
        return Response(result)
    except Exception as e:
        return Response({"status": "error", "message": str(e)})