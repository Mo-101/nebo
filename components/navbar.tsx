"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Globe,
  MapIcon,
  Bot,
  CloudSun,
  PawPrint,
  SettingsIcon,
  Maximize,
  Minimize,
  MenuIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Map", icon: <MapIcon className="mr-2 h-4 w-4" /> },
  { href: "/ai-hub", label: "AI Hub", icon: <Bot className="mr-2 h-4 w-4" /> },
  { href: "/weather", label: "Weather", icon: <CloudSun className="mr-2 h-4 w-4" /> },
  { href: "/rodent-detection", label: "Rodent Detection", icon: <PawPrint className="mr-2 h-4 w-4" /> },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const NavLinkItem = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
    <Link href={href} passHref>
      <Button
        variant={pathname === href ? "secondary" : "ghost"}
        className="justify-start w-full md:w-auto"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {icon}
        {label}
      </Button>
    </Link>
  )

  return (
    <nav className="nav-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center text-indigo-500 dark:text-indigo-400">
              <Globe className="text-2xl mr-2" />
              <span className="text-xl font-bold">GeoExplorer</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <NavLinkItem key={link.href} {...link} />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <SettingsIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="px-2 pt-8 pb-3 space-y-1">
                  {navLinks.map((link) => (
                    <NavLinkItem key={link.href} {...link} />
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-border">
                  <div className="flex items-center px-2 space-x-2">
                    <Button variant="ghost" size="icon" className="w-full justify-start" asChild>
                      <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                        <SettingsIcon className="mr-2 h-5 w-5" /> Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark")
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toggleFullscreen()
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
