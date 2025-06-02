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
        {/* Add debugging script to detect and report errors */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(message, source, lineno, colno, error) {
            console.error('Global error:', message, error);
            const errorDisplay = document.getElementById('error-display');
            const errorMessage = document.getElementById('error-message');
            if (errorDisplay) {
              errorDisplay.classList.remove('hidden');
              errorDisplay.classList.add('block');
            }
            if (errorMessage) {
              errorMessage.innerText = message;
            }
          };

          // Utility function to show loading indicator when needed
          window.showLoadingIndicator = function() {
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) {
              loadingIndicator.classList.remove('hidden');
              loadingIndicator.classList.add('flex');
            }
          };
          
          // Utility function to hide loading indicator
          window.hideLoadingIndicator = function() {
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) {
              loadingIndicator.classList.add('hidden');
              loadingIndicator.classList.remove('flex');
            }
          };
          
          console.log('Debug script loaded - using Tailwind classes');
        `}} />
      </head>
      <body className={`${inter.className} bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden`}>
        {/* Error display for debugging - using Tailwind classes for consistent hydration */}
        <div id="error-display" className="hidden fixed top-0 left-0 right-0 p-4 bg-red-600 text-white z-[9999]">
          <div>Error loading application: <span id="error-message"></span></div>
        </div>
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow pt-16 pb-8 overflow-hidden">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        
        {/* Fallback content if Cesium fails to load - using Tailwind classes for consistent hydration */}
        <div id="loading-indicator" className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex-col items-center">
          <div className="text-2xl mb-4">Loading application...</div>
        </div>

        {/* CesiumJS Script */}
        <Script
          src="https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Cesium.js"
          strategy="beforeInteractive"
        />
        
        {/* Modern script handling for Cesium initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Modern approach to check Cesium loading with better async handling
              (async function() {
                try {
                  // Check for Cesium availability with Promise-based timeout
                  const checkCesium = () => {
                    return new Promise((resolve) => {
                      // If Cesium is already available, resolve immediately
                      if (window.Cesium) {
                        resolve(true);
                        return;
                      }

                      // Set a brief timeout to check again (Cesium might still be loading)
                      setTimeout(() => {
                        if (window.Cesium) {
                          resolve(true);
                        } else {
                          resolve(false);
                        }
                      }, 2000); // 2-second check
                    });
                  };

                  // Wait for Cesium check to complete
                  const cesiumAvailable = await checkCesium();
                  
                  if (cesiumAvailable) {
                    console.log('✅ Cesium 3D engine initialized successfully');
                  } else {
                    console.error('❌ Cesium 3D engine failed to initialize');
                    
                    // Show error with Tailwind classes
                    const errorDisplay = document.getElementById('error-display');
                    const errorMessage = document.getElementById('error-message');
                    
                    if (errorDisplay) {
                      errorDisplay.classList.remove('hidden');
                      errorDisplay.classList.add('block');
                    }
                    
                    if (errorMessage) {
                      errorMessage.innerText = 'Unable to initialize 3D map - please check your connection and reload';
                    }
                  }
                } catch (e) {
                  console.error('Error in Cesium initialization process:', e);
                }
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
