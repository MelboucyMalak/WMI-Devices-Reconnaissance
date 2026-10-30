import socket
import json

HOST = "127.0.0.1"
PORT = 4444

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b"devices")

    chunks = []
    while True:
        data = s.recv(4096)
        if not data:
            break
        chunks.append(data)

devices = json.loads(b"".join(chunks).decode("utf-8"))

for device in devices:
    print(device)