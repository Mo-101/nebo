"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal, LocateFixed } from "lucide-react"
import type { CesiumMapRef } from "./cesium-map" // Ensure this path is correct

interface ControlPanelProps {
  mapRef: React.RefObject<CesiumMapRef>
  initialWeatherOverlay?: boolean
  onWeatherOverlayChange?: (checked: boolean) => void
}

export function ControlPanel({ mapRef, initialWeatherOverlay = false, onWeatherOverlayChange }: ControlPanelProps) {
  const handleBaseLayerChange = (value: string) => {
    mapRef.current?.setBaseLayer(value)
  }

  const handleTerrainChange = (value: string) => {
    mapRef.current?.setTerrain(value)
  }

  const handleFlyToNigeria = () => {
    mapRef.current?.flyToNigeria()
  }

  const handleWeatherOverlayToggle = (checked: boolean) => {
    mapRef.current?.toggleWeatherOverlay(checked)
    if (onWeatherOverlayChange) onWeatherOverlayChange(checked)
  }

  return (
    <div className="floating-panel top-4 left-4 w-64">
      <h3 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-300 flex items-center">
        <SlidersHorizontal className="mr-2 h-5 w-5" /> Map Controls
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="base-layer-select" className="block text-sm font-medium mb-1">
            Base Layer
          </Label>
          <Select defaultValue="bing" onValueChange={handleBaseLayerChange}>
            <SelectTrigger id="base-layer-select">
              <SelectValue placeholder="Select base layer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bing">Bing Maps Aerial</SelectItem>
              <SelectItem value="osm">OpenStreetMap</SelectItem>
              <SelectItem value="esri">ESRI World Imagery</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="terrain-select" className="block text-sm font-medium mb-1">
            Terrain
          </Label>
          <Select defaultValue="cesium" onValueChange={handleTerrainChange}>
            <SelectTrigger id="terrain-select">
              <SelectValue placeholder="Select terrain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cesium">Cesium World Terrain</SelectItem>
              <SelectItem value="none">No Terrain</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Overlays</Label>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="weather-overlay"
                defaultChecked={initialWeatherOverlay}
                onCheckedChange={(checked) => handleWeatherOverlayToggle(Boolean(checked))}
              />
              <Label htmlFor="weather-overlay" className="ml-2 block text-sm">
                Weather
              </Label>
            </div>
            {/* Add more overlays here if needed, e.g., Roads */}
          </div>
        </div>
        <Button
          onClick={handleFlyToNigeria}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
        >
          <LocateFixed className="mr-2 h-4 w-4" /> Center on Nigeria
        </Button>
      </div>
    </div>
  )
}
