import socket
import struct
import mss
import cv2
import numpy as np

HOST = "0.0.0.0"
PORT = 9999
JPEG_QUALITY = 60   # lower = faster/smaller, higher = better quality

def main():
    with mss.mss() as sct:
        monitor = sct.monitors[1]  # primary monitor

        server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_sock.bind((HOST, PORT))
        server_sock.listen(1)
        print(f"[server] listening on {HOST}:{PORT}, waiting for viewer...")

        conn, addr = server_sock.accept()
        print(f"[server] viewer connected from {addr}")

        encode_params = [int(cv2.IMWRITE_JPEG_QUALITY), JPEG_QUALITY]

        try:
            while True:
                frame = np.array(sct.grab(monitor))  # BGRA
                frame_bgr = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)

                ok, jpg = cv2.imencode(".jpg", frame_bgr, encode_params)
                if not ok:
                    continue

                data = jpg.tobytes()
                # length-prefix so the client knows how many bytes to read
                conn.sendall(struct.pack(">L", len(data)) + data)

        except (ConnectionResetError, BrokenPipeError):
            print("[server] viewer disconnected")
        finally:
            conn.close()
            server_sock.close()

if __name__ == "__main__":
    main()