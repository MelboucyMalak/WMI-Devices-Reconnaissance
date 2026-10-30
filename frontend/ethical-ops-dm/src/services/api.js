import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Devices API
export const devicesAPI = {
  getAllDevices: async () => {
    try {
      const response = await api.get('/devices/list/');
      return response.data;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  },

  getDeviceById: async (deviceId) => {
    try {
      // URL encode the device ID to handle special characters
      const encodedId = encodeURIComponent(deviceId);
      const response = await api.get(`/devices/${encodedId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching device ${deviceId}:`, error);
      throw error;
    }
  },

  enableDevice: async (deviceId) => {
    try {
      // URL encode the device ID to handle special characters
      const encodedId = encodeURIComponent(deviceId);
      const response = await api.post(`/devices/${encodedId}/enable/`);
      return response.data;
    } catch (error) {
      console.error(`Error enabling device ${deviceId}:`, error);
      throw error;
    }
  },

  disableDevice: async (deviceId) => {
    try {
      // URL encode the device ID to handle special characters
      const encodedId = encodeURIComponent(deviceId);
      const response = await api.post(`/devices/${encodedId}/disable/`);
      return response.data;
    } catch (error) {
      console.error(`Error disabling device ${deviceId}:`, error);
      throw error;
    }
  },

  restartDevice: async (deviceId) => {
    try {
      // URL encode the device ID to handle special characters
      const encodedId = encodeURIComponent(deviceId);
      const response = await api.post(`/devices/${encodedId}/restart/`);
      return response.data;
    } catch (error) {
      console.error(`Error restarting device ${deviceId}:`, error);
      throw error;
    }
  },

  getSystemInfo: async () => {
    try {
      const response = await api.get('/devices/system-info/');
      return response.data;
    } catch (error) {
      console.error('Error fetching system info:', error);
      throw error;
    }
  },
};

export default api;
