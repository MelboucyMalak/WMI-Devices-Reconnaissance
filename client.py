import socket
import json

#devices
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

#screen
import socket
import struct
import cv2
import numpy as np

HOST = "192.168.56.101"   # change to the server's real IP once off localhost
PORT = 9999

def recv_exact(sock, n):
    buf = b""
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            return None
        buf += chunk
    return buf

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((HOST, PORT))
    print(f"[client] connected to {HOST}:{PORT}")

    try:
        while True:
            header = recv_exact(sock, 4)
            if header is None:
                break
            (length,) = struct.unpack(">L", header)

            data = recv_exact(sock, length)
            if data is None:
                break

            frame = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
            cv2.imshow("Remote Desktop", frame)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
    finally:
        sock.close()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
