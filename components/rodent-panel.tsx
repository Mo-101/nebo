"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input" // Assuming you have an Input component
import { PawPrint, XIcon, UploadCloud, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react"
import Image from "next/image"
import { useState, type ChangeEvent } from "react"

interface RodentPanelProps {
  isVisible: boolean
  onClose: () => void
}

interface DetectionResult {
  hasRodents: boolean
  confidence: number
  imageUrl: string
}

export function RodentPanel({ isVisible, onClose }: RodentPanelProps) {
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      setResult(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        // Simulate API call
        setTimeout(() => {
          const hasRodents = Math.random() > 0.3
          const confidence = Math.floor(Math.random() * 30 + 70)
          setResult({ hasRodents, confidence, imageUrl: reader.result as string })
          setIsLoading(false)
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isVisible) return null

  return (
    <div className={`floating-panel bottom-4 left-4 w-80 ${result?.hasRodents ? "rodent-detected-panel" : ""}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 flex items-center">
          <PawPrint className="mr-2 h-5 w-5" /> Rodent Detection
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
      <div className="mb-4">
        <Label
          htmlFor="rodent-image-upload-panel"
          className="file-upload-area w-full bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors block"
        >
          <UploadCloud className="text-3xl text-gray-400 dark:text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Upload image</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPEG, PNG up to 5MB</p>
          <Input
            id="rodent-image-upload-panel"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </Label>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="loading-spinner mx-auto mb-2"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing image...</p>
        </div>
      )}

      {result && !isLoading && (
        <div id="rodent-results">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Detection Results</h4>
            <span
              className={`text-xs px-2 py-1 rounded-full ${result.hasRodents ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300" : "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"}`}
            >
              {result.confidence}% confidence
            </span>
          </div>
          {imagePreview && (
            <div className="mb-3 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Uploaded for rodent detection"
                width={280}
                height={200}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {result.hasRodents ? (
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 dark:text-red-400 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-600 dark:text-red-300">Rodent activity detected</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Our AI detected signs of rodent presence.</p>
                  <div className="mt-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-xs">
                    <Lightbulb className="inline mr-1 h-3 w-3 text-yellow-500 dark:text-yellow-300" />
                    Recommended: Sanitation check, pest control.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 dark:text-green-400 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-300">No rodent activity detected</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Our AI found no clear signs of rodent presence.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
