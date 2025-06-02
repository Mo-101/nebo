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

const CesiumMap = forwardRef<CesiumMapRef, CesiumMapProps>(({ onReady, initialWeatherOverlay = false }, ref) => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null) // Stores Cesium.Viewer instance
  const weatherOverlayEntityRef = useRef<any>(null)

  // Cesium Ion Access Token (Replace with your actual token, consider environment variable)
  const CESIUM_ION_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNWYyZmQ2MS1iM2M4LTRjZWYtYjcyZi0xOWJmNWNhN2IzODIiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MjMyOTM0NDJ9.YkpcRuaSqVjkANLeToX-KLgoHvhybOq5j9ID03U5Vpw"
  // Bing Maps API Key (Replace with your actual key)
  const BING_MAPS_API_KEY = "YOUR_BING_MAPS_API_KEY_HERE" // IMPORTANT: Replace this!

  useEffect(() => {
    if (typeof window !== "undefined" && window.Cesium && cesiumContainerRef.current && !viewerRef.current) {
      window.Cesium.Ion.defaultAccessToken = CESIUM_ION_ACCESS_TOKEN

      const viewer = new window.Cesium.Viewer(cesiumContainerRef.current, {
        terrainProvider: window.Cesium.createWorldTerrain(),
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

      // Initial view to Nigeria
      viewer.camera.setView({
        destination: window.Cesium.Cartesian3.fromDegrees(8.6753, 9.082, 1500000),
        orientation: {
          heading: window.Cesium.Math.toRadians(0),
          pitch: window.Cesium.Math.toRadians(-45),
          roll: 0.0,
        },
      })

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

      if (onReady) {
        onReady(viewer)
      }
    }

    return () => {
      // Cleanup Cesium viewer on component unmount
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [onReady, initialWeatherOverlay, CESIUM_ION_ACCESS_TOKEN, BING_MAPS_API_KEY]) // Dependencies

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
          if (BING_MAPS_API_KEY === "YOUR_BING_MAPS_API_KEY_HERE") {
            console.warn("Bing Maps API Key is not set. Using default imagery.")
            imageryLayers.addImageryProvider(
              new window.Cesium.OpenStreetMapImageryProvider({
                url: "https://a.tile.openstreetmap.org/",
              }),
            )
            return
          }
          imageryLayers.addImageryProvider(
            new window.Cesium.BingMapsImageryProvider({
              url: "https://dev.virtualearth.net",
              key: BING_MAPS_API_KEY,
              mapStyle: window.Cesium.BingMapsStyle.AERIAL,
            }),
          )
        } else if (layerKey === "osm") {
          imageryLayers.addImageryProvider(
            new window.Cesium.OpenStreetMapImageryProvider({
              url: "https://a.tile.openstreetmap.org/",
            }),
          )
        } else if (layerKey === "esri") {
          imageryLayers.addImageryProvider(
            new window.Cesium.ArcGisMapServerImageryProvider({
              url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
            }),
          )
        }
      }
    },
    setTerrain: (terrainKey: string) => {
      if (viewerRef.current && window.Cesium) {
        if (terrainKey === "cesium") {
          viewerRef.current.terrainProvider = window.Cesium.createWorldTerrain()
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
  }))

  return <div id="cesiumContainer" ref={cesiumContainerRef} className="w-full h-full" />
})

CesiumMap.displayName = "CesiumMap"
export default CesiumMap
