import pythoncom
import wmi

def get_devices():
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        devices = []
        for d in c.Win32_PnPEntity():
            devices.append({
                 "id": getattr(d, "DeviceID", "Inconnu"),
                "name": getattr(d, "Name", "Inconnu"),
                "class": getattr(d, "PNPClass", "Inconnu"),
                "status": getattr(d, "Status", "Inconnu"),
                "mac_address": getattr(d, "MACAddress", "Inconnu"),  "service": getattr(d, "Service", "Inconnu"),
                "system_name": getattr(d, "SystemName", "Inconnu"),
                
            })
        return devices
    except Exception as e:
        return [{"error": str(e)}]

def get_pc_model():
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        system = c.Win32_ComputerSystem()[0]
        return system.Model
    except Exception as e:
        return "Inconnu"

def get_device(device_id):
    return {"id": device_id, "name": "Details not implemented yet"}