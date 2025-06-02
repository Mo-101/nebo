// Global type definitions

// Extended Window interface with our custom global functions
declare global {
  interface Window {
    Cesium: any; // Cesium global object
    showLoadingIndicator: () => void; // Custom loading indicator function
  }
}

export {}; // This makes the file a module
