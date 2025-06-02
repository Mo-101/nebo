import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Habitat analysis endpoints
export const analyzeHabitats = async (data: any) => {
  const response = await api.post('/api/habitats', data);
  return response.data;
};

// Movement prediction endpoint
export const predictMovements = async (latitude: number, longitude: number, date: string) => {
  const response = await api.get(`/api/predict-movements?latitude=${latitude}&longitude=${longitude}&date=${date}`);
  return response.data;
};

// Weather and climate data endpoint
export const getWeatherClimateData = async (latitude: number, longitude: number, timeframe: string) => {
  const response = await api.get(`/api/weather-climate?latitude=${latitude}&longitude=${longitude}&timeframe=${timeframe}`);
  return response.data;
};

// Detection patterns endpoint
export const getDetectionPatterns = async () => {
  const response = await api.get('/api/detection-patterns');
  return response.data;
};

// Record detection patterns
export const recordDetectionPattern = async (data: any) => {
  const response = await api.post('/api/detection-patterns', data);
  return response.data;
};

// Anomaly detection
export const detectAnomalies = async (data: any) => {
  const response = await api.post('/api/anomaly-detection', data);
  return response.data;
};

export default api;
