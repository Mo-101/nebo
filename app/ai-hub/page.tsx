"use client" // For router and potential client-side interactions

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MapPin, TreePine, Droplet, Flame, Bot, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Land Use Analysis",
    description: "Analyze satellite imagery to classify land use patterns across Nigeria.",
    icon: <MapPin className="text-indigo-400 dark:text-indigo-300 text-xl" />,
    bgColor: "bg-indigo-500/20",
  },
  {
    title: "Deforestation Tracking",
    description: "Monitor changes in forest cover over time with AI-powered analysis.",
    icon: <TreePine className="text-green-400 dark:text-green-300 text-xl" />,
    bgColor: "bg-green-500/20",
  },
  {
    title: "Water Body Detection",
    description: "Identify and monitor rivers, lakes, and reservoirs with automated detection.",
    icon: <Droplet className="text-yellow-400 dark:text-yellow-300 text-xl" />,
    bgColor: "bg-yellow-500/20",
  },
  {
    title: "Disaster Prediction",
    description: "Predict and analyze potential flood and erosion risks using AI models.",
    icon: <Flame className="text-red-400 dark:text-red-300 text-xl" />,
    bgColor: "bg-red-500/20",
  },
]

export default function AiHubPage() {
  const router = useRouter()

  const handleOpenChat = () => {
    router.push("/?showChat=true")
  }

  return (
    <div className="page-content bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">GeoAI Hub</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Leverage artificial intelligence to analyze geographical data, get insights, and make informed decisions
            about Nigeria's landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className={`${feature.bgColor} p-3 rounded-full mr-4`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <Button
                variant="link"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 p-0"
              >
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Ask the GeoAI Assistant</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get instant answers to your questions about Nigeria's geography, climate, and more.
          </p>
          <Button
            onClick={handleOpenChat}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
          >
            <Bot className="mr-2 h-5 w-5" /> Open Chat
          </Button>
        </div>
      </div>
    </div>
  )
}
