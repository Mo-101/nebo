"use client";

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import '@/app/globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Handle Cesium initialization and error tracking
  useEffect(() => {
    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('Global error:', message, error);
      const errorDisplay = document.getElementById('error-display');
      const errorMessage = document.getElementById('error-message');
      
      if (errorDisplay) {
        errorDisplay.classList.remove('hidden');
        errorDisplay.classList.add('block');
      }
      
      if (errorMessage) {
        errorMessage.innerText = message?.toString() || 'Unknown error';
      }
    };

    // Cesium load check
    const checkCesium = async () => {
      try {
        // Promise-based timeout check for Cesium
        const cesiumAvailable = await new Promise<boolean>((resolve) => {
          // If Cesium is already available, resolve immediately
          if (window.Cesium) {
            resolve(true);
            return;
          }

          // Set a brief timeout to check again
          setTimeout(() => {
            if (window.Cesium) {
              resolve(true);
            } else {
              resolve(false);
            }
          }, 2000);
        });
        
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
    };
    
    // Run check after DOM is fully loaded
    if (document.readyState === 'complete') {
      checkCesium();
    } else {
      window.addEventListener('load', checkCesium);
      return () => window.removeEventListener('load', checkCesium);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js"
          strategy="beforeInteractive"
        />
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white overflow-hidden`}>
        {/* Error display for debugging - using Tailwind classes for consistent hydration */}
        <div id="error-display" className="hidden fixed top-0 left-0 right-0 p-4 bg-red-600 text-white z-[9999]">
          <div>Error loading application: <span id="error-message"></span></div>
        </div>
        
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        
        {/* Loading indicator - using Tailwind classes for consistent hydration */}
        <div id="loading-indicator" className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex-col items-center">
          <div className="text-2xl mb-4">Loading application...</div>
        </div>
      </body>
    </html>
  );
}
