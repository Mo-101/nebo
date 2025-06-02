# NEBO - Futuristic Next.js with CesiumJS Integration

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Powered by CesiumJS](https://img.shields.io/badge/Powered%20by-CesiumJS-blue?style=for-the-badge&logo=cesium)](https://cesium.com/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

NEBO is a cutting-edge, futuristic web application that integrates Next.js 15 with CesiumJS for immersive 3D mapping experiences. The platform features a sleek, modern UI with interactive floating panels, real-time data visualization, and a responsive design that works across devices.

## Features

- **SSR-Safe CesiumJS Integration**: Fully server-side rendering compatible 3D mapping
- **Interactive Floating Panels**: Modular UI components for displaying various data types
- **AI Assistant Chat**: Built-in conversational AI interface for user interaction
- **Weather & Environmental Data**: Real-time weather visualization on 3D terrain
- **Rodent Detection System**: Simulated detection system with risk assessment
- **Dark Mode Support**: Full theme customization with system preference detection
- **Responsive Design**: Optimized for desktop and mobile experiences

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/           # UI component library
│   └── ...           # Feature-specific components
└── lib/              # Utility functions and configuration
```

## Technology Stack

- **Frontend**: Next.js 15.2.4, React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **UI Components**: Radix UI primitives
- **3D Visualization**: CesiumJS
- **State Management**: React hooks and context
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

The following environment variables are used in this project:

```
NEXT_PUBLIC_CESIUM_ION_TOKEN=your_cesium_token_here
```

## Architecture

This application follows a modular component architecture with clear separation of concerns:

- **Core Map Component**: Handles all CesiumJS interactions and terrain visualization
- **Floating Panels**: Encapsulated UI components that can be toggled independently
- **Shared UI Library**: Reusable UI components for consistent design language
- **SSR Safety**: All client-side components properly marked with 'use client' directive

## License

MIT