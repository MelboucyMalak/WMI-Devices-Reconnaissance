import { useState, useEffect } from 'react';
import { devicesAPI } from '../services/api';
import DeviceModal from '../components/DeviceModal';

function AllDevices() {
  const [peripherals, setPeripherals] = useState([]);
  const [filteredPeripherals, setFilteredPeripherals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const classFilters = ['All', 'HIDClass', 'USB', 'DiskDrive', 'Net', 'Keyboard', 'Mouse', 'Display', 'Bluetooth', 'SoftwareComponent'];

  useEffect(() => {
    fetchPeripherals();
  }, []);

  useEffect(() => {
    // Filter peripherals based on search tags and class filter
    let filtered = peripherals;

    // Apply class filter
    if (selectedClass !== 'All') {
      filtered = filtered.filter(peripheral => 
        peripheral.class === selectedClass
      );
    }

    // Apply search tags filter (AND logic - must match all tags)
    if (searchTags.length > 0) {
      filtered = filtered.filter(peripheral => {
        return searchTags.every(tag => {
          const lowerTag = tag.toLowerCase();
          return (
            peripheral.name?.toLowerCase().includes(lowerTag) ||
            peripheral.class?.toLowerCase().includes(lowerTag) ||
            peripheral.status?.toLowerCase().includes(lowerTag)
          );
        });
      });
    }

    setFilteredPeripherals(filtered);
  }, [searchTags, selectedClass, peripherals]);

  const handleSearchKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && searchQuery.trim()) {
      e.preventDefault();
      if (!searchTags.includes(searchQuery.trim())) {
        setSearchTags([...searchTags, searchQuery.trim()]);
      }
      setSearchQuery('');
    } else if (e.key === 'Backspace' && !searchQuery && searchTags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      setSearchTags(searchTags.slice(0, -1));
    }
  };

  const removeSearchTag = (tagToRemove) => {
    setSearchTags(searchTags.filter(tag => tag !== tagToRemove));
  };

  const clearAllSearchTags = () => {
    setSearchTags([]);
    setSearchQuery('');
  };

  const handleDeviceClick = (peripheral) => {
    setSelectedDevice(peripheral);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
  };

  const handleDeviceUpdated = () => {
    fetchPeripherals();
  };

  const fetchPeripherals = async () => {
    try {
      setLoading(true);
      const data = await devicesAPI.getAllDevices();
      setPeripherals(data);
      setFilteredPeripherals(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch peripherals. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const connectedPeripherals = peripherals.filter(d => d.status === 'OK').length;
  const totalPeripherals = peripherals.length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          HOME / ALL PERIPHERALS
        </div>
        <h1 className="text-3xl font-bold text-white">All Peripherals</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-primary p-6 rounded-lg border border-primary-light">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Peripherals</span>
          </div>
          <div className="text-4xl font-bold text-white">{loading ? '--' : totalPeripherals}</div>
        </div>

        <div className="bg-primary p-6 rounded-lg border border-primary-light">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Connected Peripherals</span>
          </div>
          <div className="text-4xl font-bold text-accent-green">{loading ? '--' : connectedPeripherals}</div>
        </div>
      </div>

      {/* Current Peripherals Section */}
      <div className="bg-primary rounded-lg border border-primary-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Current Peripherals</h2>
          <div className="flex gap-3">
            <button 
              onClick={fetchPeripherals}
              className="px-4 py-2 bg-accent-green text-dark rounded hover:bg-accent-green/90 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Search Bar and Filter */}
        <div className="mb-6 flex gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="relative flex items-center gap-2 flex-wrap px-4 py-2 bg-dark border border-primary-light rounded-lg focus-within:border-accent-green transition-colors min-h-[48px]">
              <svg 
                className="w-5 h-5 text-gray-500 flex-shrink-0"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              
              {/* Search Tags */}
              {searchTags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-accent-green/20 text-accent-green rounded text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeSearchTag(tag)}
                    className="hover:text-accent-green/80"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {/* Input */}
              <input
                type="text"
                placeholder={searchTags.length === 0 ? "Search peripherals... (Press Space or Enter to add tags)" : "Add another search term..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none min-w-[200px]"
              />
              
              {/* Clear All Button */}
              {(searchTags.length > 0 || searchQuery) && (
                <button
                  onClick={clearAllSearchTags}
                  className="text-gray-500 hover:text-gray-300 flex-shrink-0"
                  title="Clear all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Class Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 pr-10 bg-dark border border-primary-light rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-accent-green transition-colors min-w-[180px]"
              style={{ colorScheme: 'dark' }}
            >
              {classFilters.map((classOption) => (
                <option 
                  key={classOption} 
                  value={classOption} 
                  style={{ backgroundColor: '#0f1419', color: '#ffffff' }}
                >
                  {classOption === 'All' ? 'All Classes' : classOption}
                </option>
              ))}
            </select>
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Filter Status */}
        {(searchTags.length > 0 || selectedClass !== 'All') && (
          <div className="mb-4 flex items-center gap-3 text-sm">
            <span className="text-gray-400">
              Found {filteredPeripherals.length} peripheral{filteredPeripherals.length !== 1 ? 's' : ''}
            </span>
            {selectedClass !== 'All' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent-green/20 text-accent-green rounded-full">
                Class: {selectedClass}
                <button
                  onClick={() => setSelectedClass('All')}
                  className="hover:text-accent-green/80"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-primary-light text-sm text-gray-400 font-medium">
          <div className="col-span-6">PERIPHERAL NAME</div>
          <div className="col-span-4">CLASS</div>
          <div className="col-span-2">STATUS</div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="px-4 py-12 text-center text-sm text-gray-500">
            Loading peripherals...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="px-4 py-12 text-center">
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <button 
              onClick={fetchPeripherals}
              className="text-accent-green hover:underline text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Peripheral List */}
        {!loading && !error && filteredPeripherals.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-gray-500">
            {searchTags.length > 0 || selectedClass !== 'All' 
              ? `No peripherals found matching the filters` 
              : 'No peripherals to display.'}
          </div>
        )}

        {!loading && !error && filteredPeripherals.length > 0 && (
          <div className="divide-y divide-primary-light max-h-[600px] overflow-y-auto">
            {filteredPeripherals.map((peripheral, index) => (
              <div 
                key={index}
                className="grid grid-cols-12 gap-4 px-4 py-4 bg-dark hover:bg-primary-light/50 transition-colors cursor-pointer"
                onClick={() => handleDeviceClick(peripheral)}
              >
                <div className="col-span-6 text-gray-300 truncate" title={peripheral.name || 'Unknown'}>
                  {peripheral.name || 'Unknown'}
                </div>
                <div className="col-span-4 text-gray-400 truncate" title={peripheral.class || 'N/A'}>
                  {peripheral.class || 'N/A'}
                </div>
                <div className="col-span-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    peripheral.status === 'OK' 
                      ? 'bg-accent-green/20 text-accent-green' 
                      : peripheral.status === 'Error'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {peripheral.status || 'Unknown'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Device Modal */}
      {showModal && selectedDevice && (
        <DeviceModal 
          device={selectedDevice}
          onClose={handleCloseModal}
          onDeviceUpdated={handleDeviceUpdated}
        />
      )}
    </div>
  );
}

export default AllDevices;