function DeviceModal({ device, onClose }) {

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