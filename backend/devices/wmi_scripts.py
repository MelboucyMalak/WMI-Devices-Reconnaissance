import pythoncom
import wmi

def get_devices():
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        devices = []
        for d in c.Win32_PnPEntity():
            devices.append({
                "name": getattr(d, "Name", "Inconnu"),
                "class": getattr(d, "PNPClass", "Inconnu"),
                "status": getattr(d, "Status", "Inconnu")
            })
        return devices
    except Exception as e:
        return [{"error": str(e)}]

def get_device(device_id):
   
    return {"id": device_id, "name": "Details not implemented yet"}