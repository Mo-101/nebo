"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch" // Assuming shadcn/ui Switch
import { Input } from "@/components/ui/input"
import { MoonIcon, SunIcon, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="page-content bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">Settings</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Customize your GeoExplorer experience.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Application Preferences</h3>
          <div className="space-y-6">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</Label>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setTheme("dark")}
                  variant={theme === "dark" ? "secondary" : "outline"}
                  className="flex-1"
                >
                  <MoonIcon className="mr-2 h-4 w-4" /> Dark
                </Button>
                <Button
                  onClick={() => setTheme("light")}
                  variant={theme === "light" ? "secondary" : "outline"}
                  className="flex-1"
                >
                  <SunIcon className="mr-2 h-4 w-4" /> Light
                </Button>
              </div>
            </div>

            <div>
              <Label
                htmlFor="default-map-view"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Default Map View
              </Label>
              <Select defaultValue="nigeria">
                <SelectTrigger id="default-map-view">
                  <SelectValue placeholder="Select default view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">Nigeria (National)</SelectItem>
                  <SelectItem value="last_viewed">Last Viewed Location</SelectItem>
                  <SelectItem value="user_defined">User Defined Coordinates</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* More settings from original HTML can be added here */}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { id: "weather-alerts", label: "Weather Alerts", description: "Severe weather notifications" },
              { id: "ai-updates", label: "AI Detection Updates", description: "When new patterns are detected" },
              { id: "system-updates", label: "System Updates", description: "New features and improvements" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={item.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
                <Switch id={item.id} defaultChecked />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Account & Security</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Key Management
              </Label>
              <div className="flex space-x-2">
                <Input id="api-key" type="password" defaultValue="****************" disabled className="flex-1" />
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white">
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
