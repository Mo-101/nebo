"use client";

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MessageSquareText, Cloud, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CesiumMap from "../components/CesiumMap";

// Dynamically import panels to ensure they only load on client side
const ChatPanel = dynamic(() => import('../components/ChatPanel'), { ssr: false });
const WeatherPanel = dynamic(() => import('../components/WeatherPanel'), { ssr: false });
const RodentPanel = dynamic(() => import('../components/RodentPanel'), { ssr: false });

export default function HomePage() {
  // State for panel visibility
  const [showChatPanel, setShowChatPanel] = useState<boolean>(false);
  const [showWeatherPanel, setShowWeatherPanel] = useState<boolean>(false);
  const [showRodentPanel, setShowRodentPanel] = useState<boolean>(false);
  
  // Reference to the Cesium map instance
  const mapRef = useRef<any>(null);
  
  // Function to toggle panels
  const togglePanel = (panel: 'chat' | 'weather' | 'rodent') => {
    switch (panel) {
      case 'chat':
        setShowChatPanel(prev => !prev);
        break;
      case 'weather':
        setShowWeatherPanel(prev => !prev);
        // If the map reference is valid, toggle weather layer
        if (mapRef.current) {
          mapRef.current.toggleWeatherLayer(!showWeatherPanel);
        }
        break;
      case 'rodent':
        setShowRodentPanel(prev => !prev);
        break;
    }
  };

  return (
    <main className="h-screen w-screen bg-slate-900 overflow-hidden relative">
      {/* Main map component */}
      <CesiumMap ref={mapRef} initialWeatherOverlay={showWeatherPanel} />
      
      {/* Control panel for toggling features */}
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <Button 
          onClick={() => togglePanel('chat')}
          variant="glass"
          className={`${showChatPanel ? 'bg-indigo-500/30 border-indigo-400/50' : ''}`}
        >
          <MessageSquareText className="mr-1" />
          AI Hub
        </Button>
        <Button 
          onClick={() => togglePanel('weather')}
          variant="glass"
          className={`${showWeatherPanel ? 'bg-blue-500/30 border-blue-400/50' : ''}`}
        >
          <Cloud className="mr-1" />
          Weather
        </Button>
        <Button 
          onClick={() => togglePanel('rodent')}
          variant="glass"
          className={`${showRodentPanel ? 'bg-red-500/30 border-red-400/50' : ''}`}
        >
          <Bug className="mr-1" />
          Rodent Detection
        </Button>
      </div>
      
      {/* Floating panels - rendered conditionally */}
      {showChatPanel && <ChatPanel isVisible={showChatPanel} onClose={() => setShowChatPanel(false)} />}
      {showWeatherPanel && <WeatherPanel isVisible={showWeatherPanel} onClose={() => setShowWeatherPanel(false)} />}
      {showRodentPanel && <RodentPanel isVisible={showRodentPanel} onClose={() => setShowRodentPanel(false)} />}
    </main>
  );
}
