"use client"

import { Button } from "@/components/ui/button"
import { CloudSun, XIcon, LocateFixed, Droplet, Wind, Thermometer } from "lucide-react"
import { useState, useEffect } from "react"

interface WeatherPanelProps {
  isVisible: boolean
  onClose: () => void
  initialData?: WeatherData | null
}

interface WeatherData {
  location: string
  condition: string
  temp: number
  feels_like: number
  icon: string // Lucide icon name
  humidity?: number
  wind_speed?: number
  wind_dir?: string
}

export function WeatherPanel({ isVisible, onClose, initialData }: WeatherPanelProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (initialData) {
      setWeatherData(initialData)
      setIsLoading(false)
    } else if (isVisible && !weatherData) {
      // Fetch default if visible and no data
      setIsLoading(true)
      // Simulate fetching default weather data for Abuja
      setTimeout(() => {
        setWeatherData({
          location: "Abuja",
          condition: "Partly Cloudy",
          temp: 28,
          feels_like: 30,
          icon: "CloudSun",
          humidity: 75,
          wind_speed: 10,
          wind_dir: "SW",
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [isVisible, initialData])

  if (!isVisible) return null

  const IconComponent = CloudSun // Default, should map weatherData.icon

  return (
    <div className="floating-panel top-4 right-4 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 flex items-center">
          <CloudSun className="mr-2 h-5 w-5" /> Weather Data
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <div id="weather-content" className="text-center py-4">
        {isLoading ? (
          <>
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading weather data...</p>
          </>
        ) : weatherData ? (
          <>
            <div className="flex items-center justify-center mb-3">
              <IconComponent className="text-3xl text-yellow-500 dark:text-yellow-400 mr-3" />
              <div>
                <p className="text-xl font-bold">{weatherData.temp}°C</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{weatherData.condition}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center justify-center">
              <LocateFixed className="mr-2 h-4 w-4" />
              {weatherData.location}, Nigeria
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center justify-center">
              <Thermometer className="mr-2 h-4 w-4" />
              Feels like {weatherData.feels_like}°C
            </p>
            {weatherData.humidity && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center justify-center">
                <Droplet className="mr-2 h-4 w-4" />
                Humidity {weatherData.humidity}%
              </p>
            )}
            {weatherData.wind_speed && (
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
                <Wind className="mr-2 h-4 w-4" />
                Wind {weatherData.wind_speed} km/h {weatherData.wind_dir}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No weather data available.</p>
        )}
      </div>
    </div>
  )
}
