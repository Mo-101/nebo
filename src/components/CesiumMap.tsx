"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { CESIUM_TOKEN, configureCesium, getDefaultViewerOptions, flyToDefaultLocation } from "@/lib/cesium";

interface CesiumMapProps {
  initialWeatherOverlay?: boolean;
}

const CesiumMap = forwardRef<any, CesiumMapProps>(({ initialWeatherOverlay = false }, ref) => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Expose viewer methods to parent components
  useImperativeHandle(ref, () => ({
    viewer: viewerRef.current,
    flyTo: (destination: any, orientation: any) => {
      if (viewerRef.current) {
        viewerRef.current.camera.flyTo({ destination, orientation });
      }
    },
    addEntity: (entityOptions: any) => {
      if (viewerRef.current) {
        return viewerRef.current.entities.add(entityOptions);
      }
      return null;
    },
    toggleWeatherLayer: (visible: boolean) => {
      if (viewerRef.current && viewerRef.current.imageryLayers) {
        // Implementation depends on your weather layer approach
        console.log(`Weather layer visibility set to: ${visible}`);
      }
    }
  }));

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined') return;

    // Wait for Cesium to be available
    if (!window.Cesium) {
      console.warn("Cesium not yet loaded, waiting...");
      const checkInterval = setInterval(() => {
        if (window.Cesium) {
          clearInterval(checkInterval);
          initCesium();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    } else {
      initCesium();
    }

    function initCesium() {
      if (!cesiumContainerRef.current || viewerRef.current) return;
      
      try {
        // Hide loading indicator if visible
        if (typeof window.hideLoadingIndicator === 'function') {
          window.hideLoadingIndicator();
        }

        // Configure Cesium with our token
        window.Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;
        
        // Create the viewer with optimized options
        const viewer = new window.Cesium.Viewer(cesiumContainerRef.current, getDefaultViewerOptions());
        viewerRef.current = viewer;
        
        // Set initial camera position
        flyToDefaultLocation(viewer);
        
        // Add default imagery layer (Bing Maps Aerial)
        viewer.imageryLayers.addImageryProvider(
          new window.Cesium.IonImageryProvider({ assetId: 2 })
        );
        
        // Add terrain with exaggeration for better visualization
        viewer.scene.terrainProvider = window.Cesium.createWorldTerrain({
          requestVertexNormals: true,
          requestWaterMask: true
        });
        
        // Apply weather overlay if requested
        if (initialWeatherOverlay) {
          console.log("Adding weather overlay layer");
          // Implementation depends on your data source
        }

        // Enhance visual quality
        viewer.scene.globe.enableLighting = true;
        viewer.scene.fog.enabled = true;
        viewer.scene.fog.density = 0.0002;
        viewer.scene.skyAtmosphere.show = true;
        
        // Optimize performance
        viewer.scene.globe.maximumScreenSpaceError = 2.0; // Lower for better quality
        
        setIsLoaded(true);
        console.log("✅ Cesium viewer initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Cesium viewer:", error);
        // Show error message to user
        if (typeof window.onerror === 'function') {
          window.onerror(`Failed to initialize 3D map: ${error}`, '', 0, 0, error as Error);
        }
      }
    }

    // Clean up on unmount
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
          viewerRef.current = null;
        } catch (e) {
          console.error("Error cleaning up Cesium viewer:", e);
        }
      }
    };
  }, [initialWeatherOverlay]);

  return (
    <>
      <div 
        id="cesiumContainer" 
        className="h-full w-full relative" 
        ref={cesiumContainerRef} 
        data-status={isLoaded ? 'loaded' : 'loading'}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="text-white text-xl animate-pulse">Initializing 3D Globe...</div>
        </div>
      )}
    </>
  );
});

CesiumMap.displayName = "CesiumMap";

export default CesiumMap;
