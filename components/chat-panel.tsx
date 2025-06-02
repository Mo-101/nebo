"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Bot, XIcon, Send } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface ChatMessage {
  id: string
  sender: "user" | "bot"
  text: string
}

interface ChatPanelProps {
  isVisible: boolean
  onClose: () => void
}

export function ChatPanel({ isVisible, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm your DeepTrack MouthPiece.. Like the One Piece. How can I help you with Mastomys Natalensis data today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseText = "I'm your DeepTrack MouthPiece. I can help you analyze Mastomys Natalensis data about Nigeria."
      const lowerCaseMessage = newUserMessage.text.toLowerCase()
      if (lowerCaseMessage.includes("weather")) {
        responseText =
          "Weather data is available for locations across Nigeria. You can check current conditions and forecasts using the weather panel or page."
      } else if (
        lowerCaseMessage.includes("lagos") ||
        lowerCaseMessage.includes("abuja") ||
        lowerCaseMessage.includes("kano")
      ) {
        responseText = `The city of ${newUserMessage.text.split(" ")[0]} is an important location in Nigeria. Would you like specific geographical or demographic information about this city?`
      } else if (lowerCaseMessage.includes("population")) {
        responseText =
          "Nigeria has an estimated population of over 223 million people as of 2023, making it the most populous country in Africa."
      }

      const newBotMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
      }
      setMessages((prev) => [...prev, newBotMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (!isVisible) return null

  return (
    <div className="floating-panel bottom-4 right-4 w-80">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 flex items-center">
          <Bot className="mr-2 h-5 w-5" /> DeepTrack MouthPiece
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
      <div className="h-64 overflow-y-auto mb-3 flex flex-col space-y-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot-message">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ask about Mastomys Natalensis  ..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
