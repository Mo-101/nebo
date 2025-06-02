"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import CesiumMap, { type CesiumMapRef } from "@/components/cesium-map"
import { WeatherPanel } from "@/components/weather-panel"
import { ChatPanel } from "@/components/chat-panel"
import { RodentPanel } from "@/components/rodent-panel"
import PageLoading from "./loading" // Ensure this path is correct

// Helper to manage panel states based on search params
function usePanelStateManager() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [showWeatherPanel, setShowWeatherPanel] = useState(searchParams.get("showWeather") === "true")
  // Fix: Ensure showChatPanel defaults to true correctly (the OR operator was causing TypeScript issues)
  const [showChatPanel, setShowChatPanel] = useState(() => searchParams.get("showChat") === "true" ? true : true) // Always true by default
  const [showRodentPanel, setShowRodentPanel] = useState(searchParams.get("showRodent") === "true")
  const [initialWeatherOverlay, setInitialWeatherOverlay] = useState(searchParams.get("weatherOverlay") === "true")

  // Clear search params after reading them to prevent them from persisting on navigation
  useEffect(() => {
    if (searchParams.toString() !== "") {
      // Create a new URLSearchParams object without the processed params
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.delete("showWeather")
      newSearchParams.delete("showChat")
      newSearchParams.delete("showRodent")
      newSearchParams.delete("weatherOverlay")

      // Replace current history entry if any params were processed
      if (newSearchParams.toString() !== searchParams.toString()) {
        router.replace(`/?${newSearchParams.toString()}`, { scroll: false })
      }
    }
  }, [searchParams, router])

  return {
    showWeatherPanel,
    setShowWeatherPanel,
    showChatPanel,
    setShowChatPanel,
    showRodentPanel,
    setShowRodentPanel,
    initialWeatherOverlay,
    setInitialWeatherOverlay,
  }
}

function MapPageContent() {
  const mapRef = useRef<CesiumMapRef>(null)
  const {
    showWeatherPanel,
    setShowWeatherPanel,
    showChatPanel,
    setShowChatPanel,
    showRodentPanel,
    setShowRodentPanel, // Assuming you might add a trigger for this
    initialWeatherOverlay,
    setInitialWeatherOverlay,
  } = usePanelStateManager()

  // Example: Toggle weather panel from another component or effect
  // useEffect(() => {
  //   setShowWeatherPanel(true); // Or based on some condition
  // }, [setShowWeatherPanel]);

  // Weather overlay can now be controlled directly by other components or via URL params

  return (
    <div className="w-full h-full relative">
      <CesiumMap ref={mapRef} initialWeatherOverlay={initialWeatherOverlay} />
      <WeatherPanel
        isVisible={showWeatherPanel}
        onClose={() => setShowWeatherPanel(false)}
        initialData={
          showWeatherPanel && initialWeatherOverlay
            ? { location: "Map Overlay", condition: "Active", temp: 0, feels_like: 0, icon: "CloudSun" }
            : undefined
        }
      />
      <ChatPanel isVisible={showChatPanel} onClose={() => setShowChatPanel(false)} />
      <RodentPanel isVisible={showRodentPanel} onClose={() => setShowRodentPanel(false)} />
      {/* Add other floating panels here */}
    </div>
  )
}

export default function MapPage() {
  console.log('Rendering MapPage component');
  return (
    <Suspense fallback={<PageLoading />}>
      <MapPageContent />
    </Suspense>
  )
}
