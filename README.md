# House of Aura — Luxury Salon Web Application

A cinematic, interactive, and high-performance React web application for **House of Aura**, a premier luxury salon. Built with a focus on immersive user experience (UX), premium aesthetics, fluid scroll animations, and interactive 3D elements.

## Features

- 🌌 **Cinematic Hero**: Large bold typography, custom character reveals, subtle background parallax, and fade-outs driven by GSAP scroll triggers.
- ✨ **The Experience Section**: A scroll-tied narrative experience revealing core values lines sequentially on screen.
- 💇 **Signature Services**: A structured overview of premium cuts, styling, dreadlocks, braiding, color transformations, and private consultations.
- 🧪 **Interactive 3D Product Catalog ("Objects of Desire")**: Powered by Three.js and React Three Fiber. Features physically realistic glass refraction, gold foil accents, liquid cores, and custom environment mapping reflections.
- 🎚️ **Drag-to-Reveal Before/After Transformations**: An intuitive image slider showing stunning side-by-side hair transitions.
- 👥 **Meet the Artists Showcase**: Team profiles with premium, responsive image cards that transition from grayscale to full-color on hover.
- 🗓️ **Sanity-Backed Booking & Content**: Content schema configured for services, stylists, before/after transformations, and reviews.

## Technology Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Animations**: GSAP (GreenSock) + GSAP ScrollTrigger
- **3D Graphics**: Three.js + React Three Fiber (R3F) + `@react-three/drei`
- **Styling**: Modern CSS variables & Tailwind CSS (v4)
- **CMS**: Sanity (Client & Image URL integration ready)

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) installed.

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   cd House_Of_Aura
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Directory Structure

```
├── public/                 # Static assets (images, icons, etc.)
│   └── images/
│       ├── artists/        # Sourced artist portrait photography
│       └── before-after/   # Before/after transition photos
├── src/
│   ├── components/
│   │   ├── sections/       # Layout sections (Hero, Services, Products3D, etc.)
│   │   └── ui/             # Reusable UI controls (Button, ImageReveal, etc.)
│   ├── lib/
│   │   └── gsap.ts         # GSAP registration config
│   ├── styles/
│   │   └── variables.css   # Color tokens and design system tokens
│   ├── App.tsx             # Main routing and entry layout
│   └── main.tsx            # React application mount
└── sanity/                 # Sanity CMS config and schemas
```
