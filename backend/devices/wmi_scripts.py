import pythoncom
import wmi

from backend import devices


def get_devices():
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        devices = []
        for d in c.Win32_PnPEntity():
            devices.append({
  "id": getattr(d, "DeviceID", "Inconnu"),
                "name": getattr(d, "Name", "Inconnu"), 
            })
        return devices
    except Exception as e:
        return [{"error": str(e)}]



#device wa7ed fih y5rjlk les characteristiques ta3o
def get_device(device_id):
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        device = None
        for d in c.Win32_PnPEntity():
            if getattr(d, "DeviceID", "Inconnu") == device_id:
                device = {
                    "id": getattr(d, "DeviceID", "Inconnu"),
                    "name": getattr(d, "Name", "Inconnu"),
                    "friendly_name": getattr(d, "Caption", "Inconnu"),
                    "class": getattr(d, "PNPClass", "Inconnu"),
                    "status": getattr(d, "Status", "Inconnu"),
                    "mac_address": getattr(d, "MACAddress", "Inconnu"),
                    "manufacturer": getattr(d, "Manufacturer", "Inconnu"),
                    "pilote": getattr(d, "Service", "Inconnu"),
                    "system_name": getattr(d, "SystemName", "Inconnu")
                }
        return device
    except Exception as e:
        return [{"error": str(e)}]

