import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider" // Assuming shadcn/ui ThemeProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeoExplorer - Nigeria 3D Mapping Platform",
  description: "A Next.js powered 3D mapping platform for Nigeria using CesiumJS.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CesiumJS and Widgets CSS */}
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow pt-16 pb-8 overflow-hidden">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* CesiumJS Script - Loaded after the rest of the page for better performance */}
        {/* It's often better to manage Cesium as an npm package if possible, but CDN is fine for quick setup. */}
        <Script
          src="https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Cesium.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
