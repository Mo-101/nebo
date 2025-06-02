"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  
  return (
    <header className="nav-blur h-14 px-4 sm:px-6 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="font-bold text-xl tracking-tight flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NEBO
          </span>
          <span className="text-xs bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
            BETA
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
