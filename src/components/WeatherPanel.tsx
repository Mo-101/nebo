"use client";

import { useState, useEffect } from 'react';
import { CloudRainIcon, Thermometer, Wind, X as CloseIcon, Droplets } from 'lucide-react';

interface WeatherPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  rainfall: number;
  forecast: {
    date: string;
    minTemp: number;
    maxTemp: number;
    description: string;
  }[];
}

export default function WeatherPanel({ isVisible, onClose }: WeatherPanelProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching weather data
  useEffect(() => {
    if (!isVisible) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample data for demonstration
      const sampleData: WeatherData = {
        location: "Lagos, Nigeria",
        temperature: 32,
        humidity: 67,
        windSpeed: 12,
        description: "Partly Cloudy",
        rainfall: 0.2,
        forecast: [
          { date: "Today", minTemp: 28, maxTemp: 33, description: "Partly Cloudy" },
          { date: "Tomorrow", minTemp: 29, maxTemp: 34, description: "Scattered Showers" },
          { date: "Wed", minTemp: 27, maxTemp: 32, description: "Rain" },
          { date: "Thu", minTemp: 28, maxTemp: 31, description: "Thunderstorms" },
          { date: "Fri", minTemp: 29, maxTemp: 33, description: "Partly Cloudy" }
        ]
      };
      
      setWeatherData(sampleData);
      setLoading(false);
    };

    fetchWeatherData();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="floating-panel top-4 right-4 w-96 bg-black/40 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="font-semibold text-white flex items-center">
          <CloudRainIcon size={18} className="mr-2" />
          Weather Data
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : weatherData ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="text-xl font-semibold">{weatherData.location}</h4>
              <p className="text-gray-300">{weatherData.description}</p>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-center">
                <Thermometer className="mx-auto mb-1 text-red-400" size={24} />
                <div className="text-xl font-bold">{weatherData.temperature}°C</div>
                <div className="text-xs text-gray-400">Temperature</div>
              </div>
              <div className="text-center">
                <Droplets className="mx-auto mb-1 text-blue-400" size={24} />
                <div className="text-xl font-bold">{weatherData.humidity}%</div>
                <div className="text-xs text-gray-400">Humidity</div>
              </div>
              <div className="text-center">
                <Wind className="mx-auto mb-1 text-green-400" size={24} />
                <div className="text-xl font-bold">{weatherData.windSpeed} km/h</div>
                <div className="text-xs text-gray-400">Wind</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Rainfall</h5>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(weatherData.rainfall * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-right text-sm mt-1">{weatherData.rainfall} mm</div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">5-Day Forecast</h5>
              <div className="grid grid-cols-5 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-2 bg-gray-800/30 rounded">
                    <div className="text-xs font-semibold">{day.date}</div>
                    <div className="text-sm mt-1">{day.minTemp}° | {day.maxTemp}°</div>
                    <div className="text-xs text-gray-400 mt-1">{day.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mt-4 text-center">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p>Unable to load weather data</p>
          </div>
        )}
      </div>
    </div>
  );
}
