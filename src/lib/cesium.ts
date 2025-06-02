// Cesium token helper for consistent access across components
export const CESIUM_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNWYyZmQ2MS1iM2M4LTRjZWYtYjcyZi0xOWJmNWNhN2IzODIiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MjMyOTM0NDJ9.YkpcRuaSqVjkANLeToX-KLgoHvhybOq5j9ID03U5Vpw"

// Typescript helper for Cesium global access
declare global {
  interface Window {
    Cesium: any;
    CESIUM_BASE_URL: string;
    showLoadingIndicator: () => void;
    hideLoadingIndicator: () => void;
  }
}

// Cesium configuration helpers
export const configureCesium = () => {
  if (typeof window !== 'undefined' && window.Cesium) {
    window.Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;
    console.log('Cesium configured with token');
    return true;
  }
  return false;
};

// Viewer options for consistent configuration
export const getDefaultViewerOptions = () => ({
  terrainProvider: typeof window !== 'undefined' && window.Cesium ? 
    window.Cesium.createWorldTerrain() : undefined,
  homeButton: false,
  sceneModePicker: false,
  timeline: false,
  animation: false,
  navigationHelpButton: false,
  geocoder: false,
  infoBox: false,
  selectionIndicator: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  projectionPicker: false,
  creditContainer: document.createElement('div'), // Hide credits for cleaner UI
});

// Camera position helper
export const flyToDefaultLocation = (viewer: any) => {
  if (!viewer || !window.Cesium) return;
  
  viewer.camera.flyTo({
    destination: window.Cesium.Cartesian3.fromDegrees(8.6753, 9.082, 1500000),
    orientation: {
      heading: window.Cesium.Math.toRadians(0),
      pitch: window.Cesium.Math.toRadians(-45),
      roll: 0.0
    }
  });
};
