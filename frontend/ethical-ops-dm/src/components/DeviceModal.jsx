import { useState } from 'react';
import { devicesAPI } from '../services/api';

function DeviceModal({ device, onClose, onDeviceUpdated }) {
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState(null);

  const handleAction = async (action) => {
    if (!device.device_id) return;

    const confirmMessage = 
      action === 'disable' ? 'Are you sure you want to disable this device?' :
      action === 'enable' ? 'Are you sure you want to enable this device?' :
      'Are you sure you want to restart this device?';

    if (!window.confirm(confirmMessage)) return;

    setLoading(true);
    setActionResult(null);

    try {
      let result;
      if (action === 'enable') {
        result = await devicesAPI.enableDevice(device.device_id);
      } else if (action === 'disable') {
        result = await devicesAPI.disableDevice(device.device_id);
      } else if (action === 'restart') {
        result = await devicesAPI.restartDevice(device.device_id);
      }

      setActionResult({ success: true, message: result.message || 'Action completed successfully' });
      
      // Notify parent to refresh device list
      if (onDeviceUpdated) {
        setTimeout(() => onDeviceUpdated(), 2000);
      }
    } catch (error) {
      setActionResult({ 
        success: false, 
        message: error.response?.data?.error || 'Action failed. Make sure you have administrator privileges.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-primary border border-primary-light rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-light">
          <h2 className="text-2xl font-bold text-white">Peripheral Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Device Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Name" value={device.name} />
            <InfoItem label="Status" value={device.status}>
              <span className={`inline-block px-3 py-1 rounded text-sm ${
                device.status === 'OK' 
                  ? 'bg-accent-green/20 text-accent-green' 
                  : device.status === 'Error'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {device.status || 'Unknown'}
              </span>
            </InfoItem>
            
            <InfoItem label="Class" value={device.class} />
            <InfoItem label="Manufacturer" value={device.manufacturer} />
            <InfoItem label="Caption" value={device.caption} fullWidth />
            <InfoItem label="Driver/Service" value={device.driver} />
            <InfoItem label="System Name" value={device.system_name} />
            <InfoItem label="MAC Address" value={device.mac_address || 'N/A'} fullWidth />
            <InfoItem label="Device ID" value={device.device_id} fullWidth mono />
          </div>

          {/* Action Result */}
          {actionResult && (
            <div className={`p-4 rounded-lg ${
              actionResult.success 
                ? 'bg-accent-green/20 text-accent-green border border-accent-green/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              <div className="flex items-start gap-2">
                {actionResult.success ? (
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm">{actionResult.message}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-primary-light">
            <button
              onClick={() => handleAction('enable')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Enable'}
            </button>
            <button
              onClick={() => handleAction('disable')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Disable'}
            </button>
            <button
              onClick={() => handleAction('restart')}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg hover:bg-accent-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Restart'}
            </button>
          </div>

          {/* Warning */}
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-yellow-500">
                Device control requires administrator privileges. Disabling critical devices may affect system stability.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-primary-light">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-light/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, children, fullWidth = false, mono = false }) {
  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <label className="text-sm text-gray-400 block mb-1">{label}</label>
      {children || (
        <p className={`text-white ${mono ? 'font-mono text-xs' : ''} break-all`}>
          {value || 'N/A'}
        </p>
      )}
    </div>
  );
}

export default DeviceModal;
