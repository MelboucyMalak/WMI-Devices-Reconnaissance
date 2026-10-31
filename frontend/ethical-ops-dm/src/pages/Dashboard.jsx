import { useState, useEffect } from 'react';
import { devicesAPI } from '../services/api';

function Dashboard() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sysInfo, deviceList] = await Promise.all([
        devicesAPI.getSystemInfo(),
        devicesAPI.getAllDevices()
      ]);
      
      setSystemInfo(sysInfo);
      setDevices(deviceList);
      setError(null);
    } catch (err) {
      setError('Failed to fetch system data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deviceStats = {
    total: devices.length,
    ok: devices.filter(d => d.status === 'OK').length,
    error: devices.filter(d => d.status === 'Error').length,
    byClass: devices.reduce((acc, device) => {
      const cls = device.class || 'Unknown';
      acc[cls] = (acc[cls] || 0) + 1;
      return acc;
    }, {}),
  };

  const topClasses = Object.entries(deviceStats.byClass)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          HOME / DASHBOARD
        </div>
        <h1 className="text-3xl font-bold text-white">System Dashboard</h1>
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-400">
          Loading system information...
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {/* System Information Card */}
          <div className="bg-primary rounded-lg border border-primary-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">System Information</h2>
            
            {systemInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard 
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Computer"
                  value={systemInfo.hostname}
                  subtext={`${systemInfo.manufacturer} ${systemInfo.model}`}
                />
                
                <InfoCard 
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  }
                  label="Processor"
                  value={systemInfo.cpu_name}
                  subtext={`${systemInfo.cpu_cores} Cores / ${systemInfo.cpu_threads} Threads`}
                />
                
                <InfoCard 
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  }
                  label="Memory"
                  value={`${systemInfo.total_memory_gb} GB`}
                  subtext="Total Physical RAM"
                />
                
                <InfoCard 
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Operating System"
                  value={systemInfo.os_name}
                  subtext={`${systemInfo.os_architecture} - ${systemInfo.os_version}`}
                />
              </div>
            )}
          </div>

          {/* Device Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              label="Total Peripherals"
              value={deviceStats.total}
              color="white"
            />
            <StatCard 
              label="Healthy"
              value={deviceStats.ok}
              color="green"
            />
            <StatCard 
              label="With Errors"
              value={deviceStats.error}
              color="red"
            />
          </div>

          {/* Top Device Classes */}
          <div className="bg-primary rounded-lg border border-primary-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Peripherals by Class</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topClasses.map(([className, count]) => (
                <div key={className} className="bg-dark rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1">{className}</div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-dark rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="text-accent-green">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-400 mb-1">{label}</div>
          <div className="text-white font-semibold truncate" title={value}>{value}</div>
          {subtext && (
            <div className="text-xs text-gray-500 mt-1 truncate" title={subtext}>{subtext}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colorClasses = {
    white: 'text-white',
    green: 'text-accent-green',
    red: 'text-red-400',
  };

  return (
    <div className="bg-primary rounded-lg border border-primary-light p-6">
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className={`text-4xl font-bold ${colorClasses[color]}`}>{value}</div>
    </div>
  );
}

export default Dashboard;
