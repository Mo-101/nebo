"use client"

import React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="footer-blur h-12 px-4 sm:px-6 flex items-center">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <span>© {new Date().getFullYear()} NEBO</span>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            v0.1.0 Beta
          </span>
        </div>
      </div>
    </footer>
  )
}
