"use client";

import { useState, useEffect } from 'react';
import { MouseIcon, MapPinIcon, AlertTriangleIcon, BarChart3Icon, X as CloseIcon, ActivityIcon } from 'lucide-react';

interface RodentPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

interface RodentData {
  totalDetections: number;
  highRiskAreas: number;
  latestSighting: {
    location: string;
    timestamp: string;
    confidence: number;
  };
  densityMap: {
    region: string;
    density: number;
    change: number;
  }[];
  activityTrend: {
    time: string;
    value: number;
  }[];
}

export default function RodentPanel({ isVisible, onClose }: RodentPanelProps) {
  const [rodentData, setRodentData] = useState<RodentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching rodent data
  useEffect(() => {
    if (!isVisible) return;

    const fetchRodentData = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Sample data for demonstration
      const sampleData: RodentData = {
        totalDetections: 348,
        highRiskAreas: 5,
        latestSighting: {
          location: "Ikeja, Lagos",
          timestamp: "2025-06-02T18:45:12",
          confidence: 0.89
        },
        densityMap: [
          { region: "Ikeja", density: 42, change: 5 },
          { region: "Yaba", density: 38, change: -2 },
          { region: "Lekki", density: 15, change: 0 },
          { region: "Surulere", density: 28, change: 3 },
          { region: "Apapa", density: 22, change: -1 }
        ],
        activityTrend: [
          { time: "06:00", value: 12 },
          { time: "09:00", value: 8 },
          { time: "12:00", value: 5 },
          { time: "15:00", value: 7 },
          { time: "18:00", value: 15 },
          { time: "21:00", value: 22 },
          { time: "00:00", value: 18 },
          { time: "03:00", value: 14 }
        ]
      };
      
      setRodentData(sampleData);
      setLoading(false);
    };

    fetchRodentData();
  }, [isVisible]);

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-400';
    if (change < 0) return 'text-green-400';
    return 'text-gray-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return '↑';
    if (change < 0) return '↓';
    return '–';
  };

  if (!isVisible) return null;

  return (
    <div className="floating-panel bottom-4 left-4 w-96 bg-black/40 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="font-semibold text-white flex items-center">
          <MouseIcon size={18} className="mr-2" />
          Rodent Detection System
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <CloseIcon size={18} />
        </button>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : rodentData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <div className="text-amber-400 text-sm font-semibold mb-1">Total Detections</div>
                <div className="text-2xl font-bold">{rodentData.totalDetections}</div>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <div className="text-red-400 text-sm font-semibold mb-1">High Risk Areas</div>
                <div className="text-2xl font-bold">{rodentData.highRiskAreas}</div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPinIcon size={16} className="text-blue-400 mr-1" />
                <div className="text-sm font-semibold">Latest Sighting</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{rodentData.latestSighting.location}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(rodentData.latestSighting.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-medium flex items-center">
                  {Math.round(rodentData.latestSighting.confidence * 100)}% confidence
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <BarChart3Icon size={16} className="text-purple-400 mr-1" />
                <div className="text-sm font-semibold">Density Map</div>
              </div>
              <div className="space-y-2">
                {rodentData.densityMap.map((item, index) => (
                  <div key={index} className="bg-gray-800/30 p-2 rounded">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{item.region}</div>
                      <div className="flex items-center">
                        <span className="mr-2">{item.density}</span>
                        <span className={getChangeColor(item.change)}>
                          {getChangeIcon(item.change)} {Math.abs(item.change)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-amber-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.min((item.density / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <ActivityIcon size={16} className="text-green-400 mr-1" />
                <div className="text-sm font-semibold">Activity Trend (24h)</div>
              </div>
              <div className="h-24 flex items-end justify-between bg-gray-800/30 p-2 rounded">
                {rodentData.activityTrend.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-6 bg-amber-500/80 rounded-sm" 
                      style={{ height: `${(item.value / 25) * 100}%` }}
                    ></div>
                    <div className="text-xs mt-1 text-gray-400">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center p-2 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
              <AlertTriangleIcon size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-xs">Increased activity detected in Ikeja region. Consider deploying additional monitoring stations.</p>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p>Unable to load rodent detection data</p>
          </div>
        )}
      </div>
    </div>
  );
}
