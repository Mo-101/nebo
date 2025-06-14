"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

// Ensure Cesium is available on the window object
declare global {
  interface Window {
    Cesium: any
  }
}

export interface CesiumMapRef {
  viewer: any // Cesium.Viewer
  flyToNigeria: () => void
  setBaseLayer: (layerKey: string) => void
  setTerrain: (terrainKey: string) => void
  toggleWeatherOverlay: (show: boolean) => void
  // Add other imperative methods as needed
}

interface CesiumMapProps {
  onReady?: (viewer: any) => void
  initialWeatherOverlay?: boolean
}

const CesiumMap = forwardRef<CesiumMapRef, CesiumMapProps>((_props, ref) => {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null) // Stores Cesium.Viewer instance
  const weatherOverlayEntityRef = useRef<any>(null)

  // Bing Maps Access Token (Replace with your actual key or use environment variable)
  const BING_MAPS_API_KEY = process.env.NEXT_PUBLIC_BING_MAPS_API_KEY || "YOUR_BING_MAPS_API_KEY_HERE"

  // Cesium Ion Access Token
  const CESIUM_ION_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMmRmYzcxNC0yZjM5LTQ0NzUtYWRkYi1kMjc1NzYwYTQ0NjYiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MTU2NTMyNjN9.1fW--_-6R3TApPF2tAlOfXrqJadYPdwKqpPVkPetHP4"
  const { initialWeatherOverlay = false } = _props
  useEffect(() => {
    if (typeof window !== "undefined" && window.Cesium && cesiumContainerRef.current && !viewerRef.current) {
      // Show loading overlay
      const loadingOverlay = document.getElementById("loadingOverlay")
      if (loadingOverlay) {
        loadingOverlay.style.display = "flex"
      }

      console.log("Initializing Cesium with token")
      
      // Set Cesium Ion access token
      window.Cesium.Ion.defaultAccessToken = CESIUM_ION_ACCESS_TOKEN
      
      // Configure Cesium for better CORS handling
      window.Cesium.RequestScheduler.requestsByServer = {}

      // Create the Cesium viewer with minimal UI and try with a simpler terrain provider first
      const viewer = new window.Cesium.Viewer(cesiumContainerRef.current, {
        terrainProvider: new window.Cesium.EllipsoidTerrainProvider(),
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        timeline: false,
        animation: false,
        navigationHelpButton: false,
        geocoder: false,
        infoBox: false,
        selectionIndicator: false,
        shouldAnimate: true,
      })
      viewerRef.current = viewer

      // Load imagery using more reliable OpenStreetMap provider
      const loadImagery = async () => {
        try {
          // Add OpenStreetMap as the base layer for reliability
          const imageryLayer = viewer.imageryLayers.addImageryProvider(
            new window.Cesium.OpenStreetMapImageryProvider({
              url: "https://a.tile.openstreetmap.org/"
            })
          )
          
          // Try to load Cesium World Terrain after base map is loaded
          try {
            const terrainProvider = new window.Cesium.CesiumTerrainProvider({
              url: window.Cesium.IonResource.fromAssetId(1)
            })
            viewer.terrainProvider = terrainProvider
          } catch (terrainError) {
            console.log("Using default ellipsoid terrain due to error:", terrainError)
          }

          // Zoom to Nigeria
          viewer.camera.flyTo({
            destination: window.Cesium.Cartesian3.fromDegrees(8.6753, 9.082, 1500000),
            orientation: {
              heading: window.Cesium.Math.toRadians(0),
              pitch: window.Cesium.Math.toRadians(-45),
              roll: 0.0,
            },
            duration: 1.0
          })

          // Hide loading overlay after imagery is loaded
          if (loadingOverlay) {
            loadingOverlay.style.display = "none"
          }
        } catch (error) {
          console.error("Error loading imagery:", error)
          // Hide loading overlay even if there's an error
          if (loadingOverlay) {
            loadingOverlay.style.display = "none"
          }

          // Fall back to default view of Nigeria
          viewer.camera.setView({
            destination: window.Cesium.Cartesian3.fromDegrees(8.6753, 9.082, 1500000),
            orientation: {
              heading: window.Cesium.Math.toRadians(0),
              pitch: window.Cesium.Math.toRadians(-45),
              roll: 0.0,
            },
          })
        }
      }

      loadImagery()

      // Sample entities (cities in Nigeria)
      const cities = [
        { name: "Lagos", lon: 3.3792, lat: 6.5244 },
        { name: "Abuja", lon: 7.4951, lat: 9.0579 },
        { name: "Kano", lon: 8.5167, lat: 12.0 },
      ]
      cities.forEach((city) => {
        viewer.entities.add({
          name: city.name,
          position: window.Cesium.Cartesian3.fromDegrees(city.lon, city.lat),
          point: {
            pixelSize: 10,
            color: window.Cesium.Color.INDIGO,
            outlineColor: window.Cesium.Color.WHITE,
            outlineWidth: 2,
          },
          label: {
            text: city.name,
            font: "14pt sans-serif",
            style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new window.Cesium.Cartesian2(0, -5),
            fillColor: window.Cesium.Color.WHITE,
            outlineColor: window.Cesium.Color.BLACK,
          },
        })
      })

      // Sample weather overlay (simulated)
      weatherOverlayEntityRef.current = viewer.entities.add({
        rectangle: {
          coordinates: window.Cesium.Rectangle.fromDegrees(2.5, 4.0, 14.5, 13.5),
          material: new window.Cesium.StripeMaterialProperty({
            evenColor: window.Cesium.Color.WHITE.withAlpha(0.3),
            oddColor: window.Cesium.Color.BLUE.withAlpha(0.3),
            repeat: 10.0,
          }),
          stRotation: window.Cesium.Math.toRadians(45),
          classificationType: window.Cesium.ClassificationType.TERRAIN,
        },
        show: initialWeatherOverlay,
      })
    }
  }, [])

  useEffect(() => {

    return () => {
      // Cleanup Cesium viewer on component unmount
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    viewer: viewerRef.current,
    flyToNigeria: () => {
      if (viewerRef.current) {
        viewerRef.current.camera.flyTo({
          destination: window.Cesium.Cartesian3.fromDegrees(8.6753, 9.082, 1500000),
          orientation: {
            heading: window.Cesium.Math.toRadians(0),
            pitch: window.Cesium.Math.toRadians(-45),
            roll: 0.0,
          },
          duration: 2.0,
        })
      }
    },
    setBaseLayer: (layerKey: string) => {
      if (viewerRef.current && window.Cesium) {
        const imageryLayers = viewerRef.current.imageryLayers
        imageryLayers.removeAll()
        if (layerKey === "bing") {
          if (!BING_MAPS_API_KEY || BING_MAPS_API_KEY === "YOUR_BING_MAPS_API_KEY_HERE") {
            console.warn("Bing Maps API Key is not set. Using default imagery.")
            imageryLayers.addImageryProvider(
              new window.Cesium.OpenStreetMapImageryProvider({
                url: "https://a.tile.openstreetmap.org/",
              })
            )
            return
          }
          imageryLayers.addImageryProvider(
            new window.Cesium.BingMapsImageryProvider({
              url: "https://dev.virtualearth.net",
              key: BING_MAPS_API_KEY,
              mapStyle: window.Cesium.BingMapsStyle.AERIAL,
            })
          )
        } else if (layerKey === "osm") {
          imageryLayers.addImageryProvider(
            new window.Cesium.OpenStreetMapImageryProvider({
              url: "https://a.tile.openstreetmap.org/",
            })
          )
        } else if (layerKey === "esri") {
          imageryLayers.addImageryProvider(
            new window.Cesium.ArcGisMapServerImageryProvider({
              url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            })
          )
        }
      }
    },
    setTerrain: (terrainKey: string) => {
      if (viewerRef.current && window.Cesium) {
        if (terrainKey === "cesium") {
          viewerRef.current.terrainProvider = new window.Cesium.CesiumTerrainProvider({
            url: window.Cesium.IonResource.fromAssetId(1)
          })
        } else {
          viewerRef.current.terrainProvider = new window.Cesium.EllipsoidTerrainProvider()
        }
      }
    },
    toggleWeatherOverlay: (show: boolean) => {
      if (weatherOverlayEntityRef.current) {
        weatherOverlayEntityRef.current.show = show
      }
    },
  }), [viewerRef, weatherOverlayEntityRef, BING_MAPS_API_KEY])

  return (
    <>
      <div id="cesiumContainer" ref={cesiumContainerRef} className="w-full h-full" />
      <div id="loadingOverlay" className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ display: "none" }}>
        <div className="bg-slate-800 p-6 rounded-lg shadow-xl text-center">
          <h1 className="text-xl font-bold text-white mb-2">Loading...</h1>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
      <div id="toolbar" ref={toolbarRef} className="absolute bottom-4 right-4 z-10"></div>
    </>
  )
})

CesiumMap.displayName = "CesiumMap"
export default CesiumMap
