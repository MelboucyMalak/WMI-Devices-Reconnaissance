import socket
import wmi
import json


def get_devices():
   
    try:
        devices = []
        result = create_socket("devices")
        for d in result:
            devices.append({
                "device_id": d.get("device_id", "Unknown"),  #unknown as a default 
                "name": d.get("name", "Unknown"),
                "caption": d.get("caption", ""),
                "class": d.get("class", ""),
                "manufacturer": d.get("manufacturer", ""),
                "status": d.get("status", "Unknown"),
                "driver": d.get("driver", ""),
                "mac_address": d.get("mac_address", ""),
                "system_name": d.get("system_name", ""),

            })
        return devices
    except Exception as e:
        return [{"error": str(e)}]


def get_device(device_id):
    try:
        result = create_socket(f"device:{device_id}")
        if result.get("device_id") == device_id:
            return {
                "device_id": result.get("device_id", "Unknown"),
                "name": result.get("name", "Unknown"),
                "caption": result.get("caption", ""),
                "class": result.get("class", ""),
                "manufacturer": result.get("manufacturer", ""),
                "status": result.get("status", "Unknown"),
                "driver": result.get("driver", ""),
                "mac_address": result.get("mac_address", ""),
                "system_name": result.get("system_name", ""),
                "hardware_id": result.get("hardware_id", []),
                "config_manager_error_code": result.get("config_manager_error_code", None),
                }
        return {"error": "Device not found"}
    except Exception as e:
        return {"error": str(e)}



def get_system_info():
    try:
        result = create_socket("system_info")
        print("SYSTEM INFO FROM VM:", result)
        
        # Computer System
        cs = result.get("computer_system")
        
        # Operating System
        os_info = result.get("operating_system")
        
        # Processor
        cpu = result.get("processor")[0]
        
        return {
            "hostname": cs.get("name", "Unknown"),
            "manufacturer": cs.get("manufacturer", "Unknown"),
            "model": cs.get("model", "Unknown"),
            "total_memory_gb": round(int(cs.get("total_physical_memory", 0)) / (1024**3), 2),
            "os_name": os_info.get("caption", "Unknown"),
            "os_version": os_info.get("version", "Unknown"),
            "os_architecture": os_info.get("os_architecture", "Unknown"),
            "cpu_name": cpu.get("name", "Unknown"),
            "cpu_cores": cpu.get("number_of_cores", 0),
            "cpu_threads": cpu.get("number_of_logical_processors", 0),
        }
    except Exception as e:
        return {"error": str(e)}


def create_socket(command):  # imtermediaire  between the vm and the django server (command tkon devices or device)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  #af_inet uses ipv4 and sock_stream uses tcp
        s.connect(("127.0.0.1", 4444))   #connects to the server at ip and port hdok
        s.sendall(command.encode())   #sends the command to the vm (devices or device:id)

        #for receiving data m sockets
        data = ""   #y5dem empty string where we sstore all the data
        while True:   #t7bes 3nd break
            part = s.recv(4096).decode()   # s. the socket recv limite 4096 t3 data from the vm  , decode converts data into text
            if not part:    #si pas vide (5laso data) 5rji mlboucle
                break
            data += part

        s.close()
        print("Received data:", repr(data[:200]))  #displays 1st 200 char

        result = json.loads(data)
        return result