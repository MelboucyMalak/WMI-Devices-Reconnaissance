# WMI Devices Reconnaissance - System Monitoring & Device Control

## Tech Stack

### Frontend
- **React** with **Vite** for fast development
- **Tailwind CSS** with custom dark theme
- **React Router** for navigation
- **Axios** for API calls
- **State Management**: React hooks (useState, useEffect)

### Backend
- **Django** with Django REST Framework
- **WMI** (Windows Management Instrumentation) for device data
- **pywin32** for Windows API access
- **Django Channels** (installed, ready for WebSocket)
- **CORS enabled** for cross-origin requests

## Team Setup Instructions

### Prerequisites
- **Python 3.12+**
- **Node.js 18+**
- **Windows OS** (required for WMI access)

### Backend Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd WMI-Devices-Reconnaissance/backend
```

2. **Install Python dependencies**
```bash
pip install django djangorestframework django-cors-headers pywin32 wmi
```

3. **Run post-install for pywin32**
```bash
python C:\Users\<YourUser>\AppData\Local\Programs\Python\Python312\Scripts\pywin32_postinstall.py -install
```

4. **Apply migrations**
```bash
python manage.py migrate
```

5. **Run the server (AS ADMINISTRATOR for device control)**
```bash
# Right-click PowerShell → Run as Administrator
python manage.py runserver
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend/ethical-ops-dm
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:5173 (or 5174 if 5173 is busy)
```

## What Was Built

### Phase 1: Backend Foundation
- **Database Models**: `TargetMachine` and `Device` models for multi-machine support
- **Enhanced WMI Scripts**: Full device data extraction (manufacturer, driver, MAC, status, etc.)
- **Device Control Functions**: Enable, disable, and restart devices via PowerShell
- **System Info API**: CPU, RAM, OS, hostname information
- **New API Endpoints**:
  - `GET /devices/list/` - All devices with full details
  - `GET /devices/system-info/` - System information
  - `GET /devices/<device_id>/` - Specific device details
  - `POST /devices/<device_id>/enable/` - Enable device (requires admin)
  - `POST /devices/<device_id>/disable/` - Disable device (requires admin)
  - `POST /devices/<device_id>/restart/` - Restart device (requires admin)

### Phase 2: Frontend Controls
- **Dashboard Page**: System overview with CPU, RAM, OS info, and device statistics
- **Enhanced Device List**: Multi-tag search, class filter, clickable rows
- **Device Detail Modal**: Full device information with control buttons
- **Device Control UI**: Enable/Disable/Restart buttons with confirmation
- **Real-time Feedback**: Success/error messages, auto-refresh after actions
- **Responsive Design**: Dark theme, hover effects, loading states

## New Backend Dependencies
```
django-cors-headers==4.3.1
pywin32==312
wmi==1.5.1
channels==4.0.0  # Pre-installed for Phase 3
```

## New Frontend Dependencies
```
axios==1.7.7
```

## Important Notes

⚠️ **Device Control Requires Admin Access**: The backend MUST run as administrator for enable/disable/restart features to work. Without admin rights, these operations will fail.

⚠️ **Windows Only**: WMI (Windows Management Instrumentation) only works on Windows. The backend cannot run on Linux/Mac.

⚠️ **URL Encoding**: Device IDs contain special characters (`\`, `&`) and are URL-encoded in API calls. The backend automatically decodes them.

## Project Structure
```
WMI-Devices-Reconnaissance/
├── backend/
│   ├── devices/
│   │   ├── models.py          # TargetMachine & Device models
│   │   ├── wmi_scripts.py     # WMI functions & device control
│   │   └── api/
│   │       ├── views.py       # API endpoints
│   │       └── urls.py        # URL routing
│   └── psys/
│       └── settings.py        # Django config with CORS
└── frontend/ethical-ops-dm/
    └── src/
        ├── pages/
        │   ├── Dashboard.jsx       # System info dashboard
        │   └── AllDevices.jsx      # Device list with controls
        ├── components/
        │   ├── DeviceModal.jsx     # Device detail modal
        │   └── layout/
        │       └── Sidebar.jsx     # Navigation
        └── services/
            └── api.js              # Axios API client
```

## Features

### Current Features
✅ Real-time device monitoring from Windows WMI  
✅ System information dashboard (CPU, RAM, OS)  
✅ Device search with multi-tag support  
✅ Class-based filtering (USB, Network, Bluetooth, etc.)  
✅ Device enable/disable/restart controls  
✅ Full device details (manufacturer, driver, status, MAC)  
✅ Dark themed responsive UI  

### Coming Soon (Phase 3)
⏳ WebSocket real-time updates  
⏳ Multi-machine monitoring  
⏳ Machine registration and heartbeat  
⏳ Live device status changes  

## Troubleshooting

**Problem**: Device control fails  
**Solution**: Make sure backend is running as Administrator

**Problem**: CORS errors  
**Solution**: Check that frontend URL is in `CORS_ALLOWED_ORIGINS` in `settings.py`

**Problem**: "pywin32" import error  
**Solution**: Run the pywin32 post-install script (see Backend Setup step 3)

**Problem**: Devices not showing  
**Solution**: Verify backend is running on http://127.0.0.1:8000

## Development

- **Backend**: http://127.0.0.1:8000
- **Frontend**: http://localhost:5173 (or 5174)
- **API Docs**: Use `/devices/list/` to see available endpoints

## License

[Your License Here]
