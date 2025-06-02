"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState, type ChangeEvent } from "react"
import { UploadCloud, SearchIcon, CheckCircle2, AlertTriangle, InfoIcon, Lightbulb } from "lucide-react"

interface DetectionResult {
  hasRodents: boolean
  confidence: number
  imageUrl: string
}

const detectionStats = [
  { label: "Accuracy Rate", value: "92%", width: "92%", color: "bg-green-500 dark:bg-green-400" },
  { label: "False Positives", value: "5%", width: "5%", color: "bg-yellow-500 dark:bg-yellow-400" },
  { label: "Processing Speed", value: "1.2s avg", width: "85%", color: "bg-blue-500 dark:bg-blue-400" },
]

const rodentSigns = ["Live rodents in images", "Rodent droppings", "Gnaw marks and damage", "Nests and burrows"]

export default function RodentDetectionPage() {
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

  return (
    <div className="page-content bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">Rodent Detection System</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered detection of rodents in images to support public health initiatives across Nigeria.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <div className="flex-1 mb-6 md:mb-0">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Upload Image for Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our AI will analyze your image for signs of rodents with 92% accuracy.
              </p>

              <Label
                htmlFor="rodent-image-page-upload"
                className="file-upload-area w-full bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors block mb-4"
              >
                <UploadCloud className="text-3xl text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPEG, PNG up to 5MB</p>
                <Input
                  id="rodent-image-page-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <InfoIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                <p>For best results, upload clear images of potential rodent habitats.</p>
              </div>
            </div>

            <div className="flex-1">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing image...</p>
                </div>
              )}
              {!isLoading && result && (
                <div id="rodent-results-page">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Detection Results</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${result.hasRodents ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300" : "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300"}`}
                    >
                      {result.confidence}% confidence
                    </span>
                  </div>
                  {imagePreview && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Uploaded for rodent detection"
                        width={300}
                        height={200}
                        style={{ objectFit: "cover", width: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    {result.hasRodents ? (
                      <div className="flex items-start">
                        <AlertTriangle className="text-red-500 dark:text-red-400 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-red-600 dark:text-red-300">Rodent activity detected</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Our AI detected signs of rodent presence.
                          </p>
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
              {!isLoading && !result && (
                <div id="rodent-placeholder" className="text-center py-8">
                  <SearchIcon className="text-3xl text-gray-400 dark:text-gray-500 mb-4 mx-auto" />
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Image Analyzed</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Upload an image to detect rodents.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">About Rodent Detection</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our AI model is trained to identify various signs of rodent presence including:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
              {rodentSigns.map((sign) => (
                <li key={sign} className="flex items-start">
                  <CheckCircle2 className="text-green-500 dark:text-green-400 mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This tool supports public health initiatives by helping identify potential rodent infestations early.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Detection Statistics</h3>
            <div className="space-y-4">
              {detectionStats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className={`${stat.color} h-2 rounded-full`} style={{ width: stat.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center">
                <Lightbulb className="text-yellow-500 dark:text-yellow-300 mr-3 text-xl flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tip: For best results, take photos in good lighting and focus on areas where rodents are likely to
                  hide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
