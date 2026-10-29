import pythoncom
import wmi
import subprocess


def get_devices():
    """Get all devices from WMI with full details"""
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        devices = []
        for d in c.Win32_PnPEntity():
            devices.append({
                "device_id": getattr(d, "DeviceID", "Unknown"),
                "name": getattr(d, "Name", "Unknown"),
                "caption": getattr(d, "Caption", ""),
                "class": getattr(d, "PNPClass", ""),
                "manufacturer": getattr(d, "Manufacturer", ""),
                "status": getattr(d, "Status", "Unknown"),
                "driver": getattr(d, "Service", ""),
                "mac_address": getattr(d, "MACAddress", ""),
                "system_name": getattr(d, "SystemName", ""),
            })
        return devices
    except Exception as e:
        return [{"error": str(e)}]
    finally:
        pythoncom.CoUninitialize()


def get_device(device_id):
    """Get a specific device by DeviceID"""
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        for d in c.Win32_PnPEntity():
            if getattr(d, "DeviceID", "") == device_id:
                return {
                    "device_id": getattr(d, "DeviceID", "Unknown"),
                    "name": getattr(d, "Name", "Unknown"),
                    "caption": getattr(d, "Caption", ""),
                    "class": getattr(d, "PNPClass", ""),
                    "manufacturer": getattr(d, "Manufacturer", ""),
                    "status": getattr(d, "Status", "Unknown"),
                    "driver": getattr(d, "Service", ""),
                    "mac_address": getattr(d, "MACAddress", ""),
                    "system_name": getattr(d, "SystemName", ""),
                    "hardware_id": getattr(d, "HardwareID", []),
                    "config_manager_error_code": getattr(d, "ConfigManagerErrorCode", None),
                }
        return {"error": "Device not found"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        pythoncom.CoUninitialize()


def enable_device(device_id):
    """Enable a device using PowerShell"""
    try:
        # Using PowerShell to enable device (requires admin)
        # Use single quotes in PowerShell to avoid escaping issues
        powershell_cmd = f"Enable-PnpDevice -InstanceId '{device_id}' -Confirm:$false"
        
        result = subprocess.run(
            ["powershell", "-Command", powershell_cmd],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            return {"success": True, "message": "Device enabled successfully"}
        else:
            error_msg = result.stderr.strip() if result.stderr else "Failed to enable device"
            return {"success": False, "error": error_msg, "device_id": device_id}
    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Command timed out"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def disable_device(device_id):
    """Disable a device using PowerShell"""
    try:
        # Use single quotes in PowerShell to avoid escaping issues
        powershell_cmd = f"Disable-PnpDevice -InstanceId '{device_id}' -Confirm:$false"
        
        result = subprocess.run(
            ["powershell", "-Command", powershell_cmd],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            return {"success": True, "message": "Device disabled successfully"}
        else:
            error_msg = result.stderr.strip() if result.stderr else "Failed to disable device"
            return {"success": False, "error": error_msg, "device_id": device_id}
    except subprocess.TimeoutExpired:
        return {"success": False, "error": "Command timed out"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def restart_device(device_id):
    """Restart a device (disable then enable)"""
    try:
        # Disable first
        disable_result = disable_device(device_id)
        if not disable_result.get("success"):
            return disable_result
        
        # Wait a moment
        import time
        time.sleep(2)
        
        # Enable again
        enable_result = enable_device(device_id)
        return enable_result
    except Exception as e:
        return {"success": False, "error": str(e)}


def get_system_info():
    """Get system information"""
    pythoncom.CoInitialize()
    try:
        c = wmi.WMI()
        
        # Computer System
        cs = c.Win32_ComputerSystem()[0]
        
        # Operating System
        os_info = c.Win32_OperatingSystem()[0]
        
        # Processor
        cpu = c.Win32_Processor()[0]
        
        return {
            "hostname": cs.Name,
            "manufacturer": cs.Manufacturer,
            "model": cs.Model,
            "total_memory_gb": round(int(cs.TotalPhysicalMemory) / (1024**3), 2),
            "os_name": os_info.Caption,
            "os_version": os_info.Version,
            "os_architecture": os_info.OSArchitecture,
            "cpu_name": cpu.Name,
            "cpu_cores": cpu.NumberOfCores,
            "cpu_threads": cpu.NumberOfLogicalProcessors,
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        pythoncom.CoUninitialize()
