"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  SearchIcon,
  MapPin,
  SunIcon,
  CloudSun,
  CloudRain,
  Zap,
  CloudIcon,
  ArrowUp,
  ArrowDown,
  Droplet,
  Eye,
  Wind,
} from "lucide-react"

interface WeatherData {
  location: string
  condition: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
  pressure: number
  wind_speed: number
  wind_dir: string
  visibility: number
  icon: React.ElementType // Lucide icon component
}

interface ForecastDay {
  day: string
  condition: string
  temp: number
  icon: React.ElementType
}

const initialWeatherState: WeatherData = {
  location: "Lagos",
  condition: "Sunny",
  temp: 28,
  feels_like: 30,
  temp_min: 25,
  temp_max: 32,
  humidity: 78,
  pressure: 1012,
  wind_speed: 12,
  wind_dir: "NE",
  visibility: 10,
  icon: SunIcon,
}

const initialForecast: ForecastDay[] = [
  { day: "Mon", condition: "Sunny", temp: 31, icon: SunIcon },
  { day: "Tue", condition: "Partly Cloudy", temp: 30, icon: CloudSun },
  { day: "Wed", condition: "Rain", temp: 27, icon: CloudRain },
  { day: "Thu", condition: "Thunderstorm", temp: 26, icon: Zap },
  { day: "Fri", condition: "Cloudy", temp: 28, icon: CloudIcon },
]

export default function WeatherPage() {
  const router = useRouter()
  const [location, setLocation] = useState("Lagos")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWeather = () => {
    if (!location) return
    setIsLoading(true)
    setWeatherData(null)
    setForecast(null)
    // Simulate API call
    setTimeout(() => {
      // For demo, just use initial data but update location
      setWeatherData({ ...initialWeatherState, location: location })
      setForecast(initialForecast)
      setIsLoading(false)
    }, 1000)
  }

  const handleViewOnMap = () => {
    router.push("/?showWeather=true&weatherOverlay=true")
  }

  return (
    <div className="page-content bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">Nigeria Weather Intelligence</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time and forecasted weather data for locations across Nigeria.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 md:mb-0">Current Weather</h3>
            <div className="flex">
              <Input
                type="text"
                placeholder="Enter location in Nigeria"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-r-none w-full md:w-64"
              />
              <Button
                onClick={fetchWeather}
                className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
              >
                <SearchIcon className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fetching weather data for {location}...</p>
            </div>
          )}

          {weatherData && !isLoading && (
            <div id="weather-dashboard">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4 text-center">
                  <weatherData.icon className="weather-icon-display mx-auto text-yellow-500 dark:text-yellow-400" />
                  <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-1">{weatherData.condition}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{weatherData.location}, Nigeria</p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">TEMPERATURE</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-slate-800 dark:text-white">{weatherData.temp}°C</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Feels like {weatherData.feels_like}°C</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <ArrowUp className="text-red-500 dark:text-red-400 mr-1 h-4 w-4" /> {weatherData.temp_max}°C
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <ArrowDown className="text-blue-500 dark:text-blue-400 mr-1 h-4 w-4" /> {weatherData.temp_min}°C
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">DETAILS</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      {
                        label: "HUMIDITY",
                        value: `${weatherData.humidity}%`,
                        icon: <Droplet className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />,
                      },
                      { label: "PRESSURE", value: `${weatherData.pressure} hPa` },
                      {
                        label: "WIND",
                        value: `${weatherData.wind_speed} km/h ${weatherData.wind_dir}`,
                        icon: <Wind className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />,
                      },
                      {
                        label: "VISIBILITY",
                        value: `${weatherData.visibility} km`,
                        icon: <Eye className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />,
                      },
                    ].map((detail) => (
                      <div key={detail.label}>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          {detail.icon}
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">5-DAY FORECAST</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {forecast?.map((day) => (
                  <div key={day.day} className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium mb-1 text-slate-800 dark:text-white">{day.day}</p>
                    <day.icon className="weather-icon-display mx-auto text-yellow-500 dark:text-yellow-400 h-8 w-8" />
                    <p className="text-sm text-slate-800 dark:text-white">{day.temp}°C</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!weatherData && !isLoading && (
            <div className="text-center py-8">
              <SearchIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Search for a location to view weather data.</p>
            </div>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Weather Map Overlay</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            View real-time weather data directly on the 3D map, including temperature, precipitation, and wind patterns.
          </p>
          <Button
            onClick={handleViewOnMap}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
          >
            <MapPin className="mr-2 h-5 w-5" /> View on Map
          </Button>
        </div>
      </div>
    </div>
  )
}
