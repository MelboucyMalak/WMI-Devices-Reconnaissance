from django.shortcuts import render


from django.http import JsonResponse
import socket

HOST = "192.168.1.85" 
PORT = 4444

def start_session(request):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((HOST, PORT))
        s.sendall(b"hello")
        response = s.recv(1024).decode()
        s.close()
        return JsonResponse({"status": "success", "response": response})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})