# House of Aura — Website Build Plan

**A Luxury Salon Digital Experience**
Full-stack cinematic website with immersive scroll animations, 3D features, and premium UI design.

---

## Project Overview

**House of Aura** is not a standard salon website. It is a premium digital experience built to communicate prestige, artistry, and the transformative power of great craft. Every section should feel like entering a private atelier — composed, intentional, and alive.

The name itself is the design brief:

- **"House"** — structure, establishment, a fashion house. Permanent. Authoritative. Refined.
- **"Aura"** — the luminous presence around a person, a glow, the intangible quality a great stylist gives you. Warm, radiant, mystical.

Together: a luxury establishment that gives you that ineffable glow.

---

## A — Brand Identity

---

### A.1 — Salon Concept

| Concept Option | Identity |
|---|---|
| Luxury Barbershop & Salon | Dark, bold, masculine energy with editorial warmth |
| Modern Unisex Studio | Clean lines, fashion-forward, gender-neutral editorial |
| Afro Hair Specialist | Cultural richness, deep tones, texture and heritage |
| Premium Grooming Lounge | Spa-like calm, restrained, curated |
| Celebrity Hair Studio | Drama, confidence, red-carpet presence |

> The name "House of Aura" works best with a **Premium Unisex Salon** or **Luxury Barbershop** concept — both allow the dark, warm, editorial aesthetic to breathe.

---

### A.2 — House of Aura Color Scheme

The palette was built specifically for this name. Every color has a reason.

```
────────────────────────────────────────────────────────────
  ROLE                    HEX           NAME
────────────────────────────────────────────────────────────
  Background (Base)       #09090E       Deep Obsidian
  Surface (Cards/Panels)  #101018       Midnight Layer
  Primary Accent          #D4A85C       Aura Gold
  Secondary Accent        #9B8DC4       Aura Violet
  Body Text               #EDE8E0       Warm Ivory
  Muted / Secondary Text  #7D7891       Dusk Lavender
  Borders / Dividers      #1C1B28       Obsidian Border
  Pure Heading White      #FAFAF8       Ghost White
────────────────────────────────────────────────────────────
```

#### Why This Palette Works for "House of Aura"

**Obsidian (#09090E)** — This is the canvas the aura glows against. Not flat black — a blue-black that gives depth, like a night sky. Luxury backgrounds are never pure #000000.

**Aura Gold (#D4A85C)** — This is the warmth. The candlelight. The "House" prestige. It reads like warm light against skin — not yellow, not brassy. Amber-toned gold that feels earned, not decorative.

**Aura Violet (#9B8DC4)** — The cool edge of the glow. Auras in visual art always have a warm center and a cool outer rim. This violet adds that mystical quality without being loud. Used sparingly — borders, subtle highlights, hover states.

**Warm Ivory (#EDE8E0)** — Body text that reads like warm lamplight on cream paper. Not stark white, which reads clinical. This softness communicates luxury.

**Dusk Lavender (#7D7891)** — Muted secondary text. Purple-tinted gray — connects the violet and the obsidian in a seamless family.

**Obsidian Border (#1C1B28)** — Card borders, dividers, and section separators. Dark enough to be subtle, purple-tinted enough to feel intentional.

![House of Aura Color Palette](https://placehold.co/900x200/09090E/D4A85C?text=House+of+Aura+%7C+Obsidian+%C2%B7+Aura+Gold+%C2%B7+Aura+Violet+%C2%B7+Warm+Ivory)

#### Color Usage Rules

| Color | Used For | Frequency |
|---|---|---|
| Obsidian (#09090E) | Page background | Always |
| Midnight Layer (#101018) | Cards, modals, panels | Often |
| Aura Gold (#D4A85C) | CTAs, headings, accents, hover states | Controlled |
| Aura Violet (#9B8DC4) | Borders, subtle glows, secondary UI elements | Sparingly |
| Warm Ivory (#EDE8E0) | Body text, descriptions | Always |
| Dusk Lavender (#7D7891) | Captions, metadata, secondary labels | As needed |
| Ghost White (#FAFAF8) | Large display headings only | Rarely |

---

### A.3 — Typography

| Role | Font | Pairing Reason |
|---|---|---|
| Display / Hero Headings | **Playfair Display** | Timeless, editorial. High contrast serifs feel expensive. |
| Subheadings | **Cormorant Garamond** | Thin, elegant, fashion-magazine quality |
| Body / UI Copy | **DM Sans** | Clean, modern, readable. Neutral without being boring |
| Accent / Pull Quotes | **Libre Baskerville** | Old-world authority for testimonials and brand statements |

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&family=Libre+Baskerville:ital@0;1&display=swap');

:root {
  --font-display:  'Playfair Display', Georgia, serif;
  --font-sub:      'Cormorant Garamond', Georgia, serif;
  --font-body:     'DM Sans', system-ui, sans-serif;
  --font-accent:   'Libre Baskerville', Georgia, serif;
}
```

---

### A.4 — Mood Board Reference

![Dark Luxury Salon Interior](https://placehold.co/900x450/09090E/D4A85C?text=Mood+Reference+%7C+Luxury+Interior+%E2%80%94+Obsidian+%2B+Warm+Gold+Lighting)

![Editorial Fashion Salon Aesthetic](https://placehold.co/900x450/101018/9B8DC4?text=Mood+Reference+%7C+Aura+Violet+Accent+%E2%80%94+Mystical+Premium+Atmosphere)

---

---

## B — Design Warning: The Anti-AI Rule

> **READ THIS BEFORE WRITING A SINGLE LINE OF CSS.**
>
> This section is not optional. Violating these rules produces a site that looks generic,
> machine-made, and untrustworthy — the opposite of what "House of Aura" represents.

---

### B.1 — The Problem: What AI-Generated Sites Look Like

A site that looks AI-generated has recognizable patterns:

- A hero section with a purple-to-pink gradient overlay
- Bright accent colors spread across every section with no restraint
- Every section has a different background color in a repeating pattern
- Glowing neon cards with heavy drop shadows
- Icons replaced with emoji in headings and section titles
- A color palette that uses 6+ colors at full saturation simultaneously
- Gradient buttons. Gradient text. Gradient backgrounds. Gradient everything.
- Cards that all look identical, stacked in a 3-column grid, every section
- Hover effects that are overbuilt — too much motion, too much color change
- Font pairings that look like they were chosen from the first Google Fonts suggestion

None of that appears on House of Aura. Not a single element.

---

### B.2 — Color Discipline

**Rule: The palette has 8 colors. No new colors are introduced during development.**

```
WHAT RESTRAINT LOOKS LIKE:

  Background sections alternate between:
    - #09090E (base)
    - #101018 (slightly lighter)
  
  NOT between:
    - White, then navy, then black, then dark green, then purple...

  Accent gold (#D4A85C) appears on:
    - CTAs, active states, icon accents, hover indicators
  
  NOT on:
    - Section backgrounds, full-width color blocks, card fills, borders everywhere
```

Think of Aura Gold as a spotlight — it's powerful because it appears in the dark, not because it's everywhere. Violet (#9B8DC4) is even more reserved. It is a whisper, not a declaration.

---

### B.3 — Gradient Rules

**Rule: Gradients are allowed in exactly three places. Nowhere else.**

| Allowed Use | Gradient | Purpose |
|---|---|---|
| Hero video overlay | `linear-gradient(to top, #09090E 0%, transparent 60%)` | Fade video into background for text legibility |
| Section fade transitions | `linear-gradient(to bottom, transparent, #09090E)` | Smooth section boundaries |
| Subtle card border | `border-image: linear-gradient(...)` | Optional premium card border detail |

**Never use:**
- Full-width gradient background sections
- Gradient text (text-clip gradient fill)
- Gradient buttons
- Multi-color gradient overlays
- "Glow" effects created with `box-shadow: 0 0 80px rgba(212, 168, 92, 0.8)` — this reads as fake premium, not real premium

> If you find yourself writing a gradient that uses more than two colors, stop. That is a design decision that should have been made in Figma, not in a CSS file.

---

### B.4 — No Emojis. Use Icon Fonts.

**Rule: Zero emojis are used anywhere on the House of Aura website — not in headings, not in lists, not in CTAs, not in footers.**

Emojis are platform-rendered, inconsistent across operating systems, and communicate informality. They instantly break the premium illusion.

**Use icon fonts instead. Recommended libraries:**

| Library | Install | Style |
|---|---|---|
| **Lucide** (recommended) | `npm install lucide-react` | Clean, consistent, minimal line icons |
| **Phosphor Icons** | `npm install @phosphor-icons/react` | Beautiful, multiple weights |
| **Tabler Icons** | CDN or npm | 5800+ outline icons, highly consistent |
| **Font Awesome 6** | CDN or npm | Industry standard, large library |

```jsx
// CORRECT — using Lucide React
import { Scissors, Star, Calendar, ArrowRight, MapPin } from 'lucide-react'

// In your component
<Scissors size={20} strokeWidth={1.5} className="text-aura-gold" />

// WRONG
<h2>✂️ Our Services</h2>
```

**Icon sizing rules for this project:**

- Navigation icons: `16px`
- Section accent icons: `20px`
- Feature/service icons: `24px`
- Hero accent icons: `28px` maximum
- `strokeWidth: 1.5` — thin strokes read as premium

---

### B.5 — The "Real Developer" Standard

A site that looks like a real developer built it has these qualities:

**Spacing is deliberate.** Every margin and padding is derived from a spacing scale — not guessed. Set a base unit of `8px` and derive everything from it: `8, 16, 24, 32, 48, 64, 96, 128px`.

**Typography has hierarchy.** There are no more than 4 type styles in active use at any one time. If a new type style is needed, an existing one must be retired.

**Interactions are proportionate.** A button hover changes opacity or shows a subtle border. It does not change background color, scale, shadow, and text color all at once. Each element has one primary interaction response.

**Components are consistent.** Every card uses the same border radius. Every section uses the same inner padding. The grid does not change without reason.

**The layout has negative space.** White space — or in this case, obsidian space — is a design element. Dense layouts feel cheap. Luxury breathes.

**Nothing is there by accident.** Every element earns its place. If it cannot be justified by the user experience, it is removed.

---

### B.6 — Engagement: How to Make It Feel Alive Without AI Clichés

Engagement comes from movement and surprise — not from color overload.

| Technique | Implementation | Engages Because |
|---|---|---|
| Cinematic hero entrance | Video background + text reveal | Stops users cold on first load |
| Scroll-reactive text | GSAP SplitText letter-by-letter | Makes users want to re-read the page |
| Hover depth on artist cards | Grayscale-to-color + slight scale | Creates personal discovery moment |
| Before/after drag | Interactive reveal slider | Users actively participate |
| Booking step transitions | Smooth slide between steps | Feels intentional, not transactional |
| Cursor personality | Custom gold circle with lag easing | Site feels aware of the user |
| Pinned section storytelling | GSAP ScrollTrigger pin | Creates a cinematic pause moment |
| Sound of silence | No autoplay audio, no notification sounds | Luxury does not demand attention |

> Engagement is earned through restraint and surprise. Not through noise.

---

---

## Phase 1: Creative Direction

> Before touching code, every visual decision is locked. Development begins only when the brand is resolved.

---

### 1.1 — Brand Personality (House of Aura)

**Direction: Dark Mystique with Editorial Warmth**

The experience should feel like:
- Walking into a private salon at dusk
- Black lacquered walls, warm amber pendant lighting
- A stylist who speaks in carefully chosen words
- The music is low, the products smell expensive

This is not a barbershop chain. This is a house. An atelier.

---

### 1.2 — CSS Design Tokens

```css
:root {
  /* Colors */
  --color-bg:           #09090E;
  --color-surface:      #101018;
  --color-border:       #1C1B28;
  --color-gold:         #D4A85C;
  --color-violet:       #9B8DC4;
  --color-text:         #EDE8E0;
  --color-text-muted:   #7D7891;
  --color-heading:      #FAFAF8;

  /* Typography */
  --font-display:       'Playfair Display', Georgia, serif;
  --font-sub:           'Cormorant Garamond', Georgia, serif;
  --font-body:          'DM Sans', system-ui, sans-serif;
  --font-accent:        'Libre Baskerville', Georgia, serif;

  /* Spacing scale (base-8) */
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Animation */
  --ease-luxury:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-reveal:        cubic-bezier(0.76, 0, 0.24, 1);
  --duration-fast:      0.3s;
  --duration-base:      0.6s;
  --duration-slow:      1.2s;
}
```

---

## Phase 2: User Experience & Journey Map

Forget conventional navigation. The user does not browse — they are guided.

---

### 2.1 — The Storytelling Flow

```
STANDARD LAYOUT              HOUSE OF AURA
──────────────────           ─────────────────────────────────────────────
Home                         [1]  Hero            Cinematic entrance
About                        [2]  Services         Scroll-reveal cards
Services                     [3]  Before & After   Interactive drag gallery
Contact                      [4]  The Artists      Full-screen portraits
                             [5]  The Experience   Pinned scroll storytelling
                             [6]  Products         3D floating showcase
                             [7]  Testimonials     3D floating card space
                             [8]  Booking          Multi-step luxury flow
                             [9]  Footer           Minimal, signature close
```

---

### 2.2 — Section Breakdown

---

#### Section 1 — Hero

**Objective:** Arrest attention in under 3 seconds.

| Element | Specification |
|---|---|
| Background | Looped slow-motion video — scissors, braiding, salon ambiance |
| Video overlay | `linear-gradient(to top, #09090E 0%, transparent 55%)` |
| Display font | Playfair Display, weight 700, size clamp(52px, 8vw, 120px) |
| Headline | *"House of Aura."* — then line break — *"Where presence is crafted."* |
| Text animation | Character-by-character GSAP reveal, slight upward translate |
| CTA button | Ghost button — thin 1px gold border, no fill, hover fills gold |
| CTA text | "Book Your Appointment" — DM Sans, tracking 0.1em |
| Cursor | Custom gold ring, 40px diameter, eased follow |
| Scroll indicator | Thin vertical line with animated downward arrow — no text |

![Hero Section](https://placehold.co/900x500/09090E/D4A85C?text=HERO+%7C+Cinematic+Full-Screen+Video+%2B+Playfair+Display+Character+Reveal)

---

#### Section 2 — Signature Services

**Objective:** Present services with craft and elegance, not a menu list.

- Cards enter from bottom as user scrolls past threshold
- Each card: obsidian surface (#101018), 1px border (#1C1B28), Lucide icon at top left
- Service name in Playfair Display, description in DM Sans
- Hover: thin gold underline slides in from left, icon transitions to gold
- No card shadows — luxury does not need drop shadows to feel elevated

Services: Haircuts — Braiding — Coloring — Dreadlocks — Shaves — Grooming

---

#### Section 3 — Before & After Showcase

**Objective:** Let the work speak. Make the user participate.

- Full-width drag-to-reveal slider — before image on left, after on right
- Drag handle: thin vertical line with a small gold diamond at center
- Multiple transformation pairs, horizontally scrollable
- Captions in Cormorant Garamond — stylist name, service type

![Before and After Slider](https://placehold.co/900x400/101018/EDE8E0?text=Before+%26+After+%7C+Interactive+Drag+Reveal+%7C+Hair+Transformation+Gallery)

---

#### Section 4 — Meet the Artists

**Objective:** Build trust through human presence and editorial craft.

- Portrait photographs fill full-screen columns — 2 or 3 up
- Default state: desaturated (grayscale) — the artist is waiting
- Hover: color blooms in from center outward, name and specialty appear
- Click: side drawer opens with full bio, specialties, booking CTA
- Font for names: Playfair Display italic — reads like a fashion byline

---

#### Section 5 — The Experience

**Objective:** Sell the feeling, not a feature list.

A scroll-pinned section. The section locks in place while the user scrolls.

Each scroll tick reveals one line of text:

```
Complimentary drinks on arrival.
Products chosen for your hair, not a shelf.
A space designed around quiet.
Artists who listen before they cut.

This is House of Aura.
```

Text in Cormorant Garamond Light, large. Off-white. Measured.

---

#### Section 6 — Products (3D Showcase)

**Objective:** Highlight premium products as objects of desire.

3D product models float and rotate slowly. Users can drag to rotate manually.
The background is near-black — the product is lit from above, as in a studio.

---

#### Section 7 — Testimonials

**Objective:** Social proof that feels as premium as the rest of the site.

- Cards arranged in a subtle 3D perspective grid — slightly rotated on Z and Y axes
- Each card: surface dark (#101018), thin gold-tinted left border (2px)
- Quote in Libre Baskerville italic, client name in small caps DM Sans
- Scroll-triggered staggered entrance — each card translates in from a different vector

---

#### Section 8 — Booking Flow

**Objective:** Make the act of booking feel like an event in itself.

```
Step 1  —  Choose Your Artist
Step 2  —  Select a Service
Step 3  —  Pick a Date
Step 4  —  Choose a Time
Step 5  —  Confirmation
```

- Framer Motion `AnimatePresence` handles step transitions — slide + fade
- Progress bar: thin gold line that fills from left to right
- Each step fades out as next fades in — smooth, unhurried
- Confirmation step: short text animation + checkmark icon (Lucide)
- No page reload. Fully client-side state.

---

### 2.3 — Wireframe Phase Reference

![Wireframe Layout](https://placehold.co/900x500/09090E/9B8DC4?text=Phase+2+%7C+Figma+Wireframes+%E2%80%94+All+9+Sections+%7C+Desktop+%2B+Mobile)

---

## Phase 3: Visual Features

> These are the details that separate a memorable site from a forgettable one.

---

### 3.1 — Smooth Scrolling with Lenis

```bash
npm install @studio-freight/lenis
```

```javascript
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

Lenis is the foundation. Without it, every animation beneath it loses half its premium feel.

---

### 3.2 — Scroll Animations with GSAP + ScrollTrigger

```bash
npm install gsap
```

| Effect | Code Pattern | Applied In |
|---|---|---|
| Text character reveal | `SplitText` + staggered `y: 80` from | Hero, Services |
| Image clip reveal | `clipPath: "inset(0 100% 0 0)"` → `inset(0 0% 0 0)` | Gallery, Artists |
| Section pin | `ScrollTrigger.pin: true` | The Experience |
| Stagger fade entrance | `stagger: 0.12` | Cards, Testimonials |
| Horizontal parallax | `xPercent: -15` scrubbed | Background layers |
| Gold line draw | SVG `stroke-dashoffset` animation | Dividers, CTAs |

![GSAP ScrollTrigger Reference](https://placehold.co/900x400/09090E/D4A85C?text=GSAP+ScrollTrigger+%7C+Reveal+%C2%B7+Pin+%C2%B7+Stagger+%C2%B7+Parallax+%C2%B7+Clip)

---

### 3.3 — Text Animations

```javascript
// Hero headline: character-by-character entrance
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText, ScrollTrigger)

const split = new SplitText('.hero-headline', { type: 'chars' })

gsap.from(split.chars, {
  opacity: 0,
  y: 60,
  rotationX: -90,
  stagger: 0.03,
  duration: 0.9,
  ease: 'back.out(1.7)',
  delay: 0.5,
})
```

The headline **HOUSE OF AURA** does not appear — it assembles. Letter by letter. Then holds.

---

### 3.4 — Image Reveal

```javascript
gsap.from('.image-reveal', {
  clipPath: 'inset(0 100% 0 0)',
  duration: 1.4,
  ease: 'expo.inOut',
  scrollTrigger: {
    trigger: '.image-reveal',
    start: 'top 72%',
  }
})
```

Images emerge from behind an invisible wall. Not a fade — a reveal. The difference is felt.

---

### 3.5 — Custom Cursor

```css
* { cursor: none; }

.cursor-ring {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.12s var(--ease-luxury),
              opacity 0.3s ease,
              width 0.3s ease,
              height 0.3s ease;
}

/* On interactive element hover */
.cursor-ring.expanded {
  width: 60px;
  height: 60px;
  opacity: 0.5;
}
```

The cursor lags slightly behind the mouse — this creates the sense of something suspended in light, like the aura itself.

---

### 3.6 — Parallax

```javascript
gsap.to('.hero-video-layer', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
})
```

---

### 3.7 — Video Background

```html
<div class="hero-media">
  <video autoplay muted loop playsinline class="hero-video">
    <source src="/video/aura-hero.mp4" type="video/mp4" />
  </video>
  <div class="hero-overlay"></div>
</div>
```

```css
.hero-overlay {
  background: linear-gradient(to top, var(--color-bg) 0%, transparent 60%);
  /* ONLY gradient used in this section */
}
```

**Footage to source (free):**
- Pexels: search "haircut slow motion", "braiding", "barber"
- Mixkit: search "salon", "grooming"
- Target file size: under 8MB (compress with Handbrake before deploying)

---

## Phase 4: 3D Features

> The 3D layer is where the site becomes unforgettable. This is the technical ceiling — everything above is polish; this is spectacle.

---

### 4.1 — 3D Product Showcase

```bash
npm install three @react-three/fiber @react-three/drei
```

```jsx
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { useRef } from 'react'

function SalonProduct({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.4
  })

  return <primitive ref={ref} object={scene} />
}

export default function ProductCanvas() {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 8, 5]} intensity={1.2} color="#D4A85C" />
      <Environment preset="studio" />
      <SalonProduct modelPath="/models/product.glb" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
```

![3D Product Showcase](https://placehold.co/900x400/09090E/D4A85C?text=3D+Showcase+%7C+Three.js+%2B+React+Three+Fiber+%7C+Rotating+Salon+Products)

---

### 4.2 — Interactive Scissors

```javascript
// Scissors mesh responds to mouse movement
const mouse = { x: 0, y: 0 }
document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3
})

function animate() {
  scissorsMesh.rotation.y += (mouse.x - scissorsMesh.rotation.y) * 0.08
  scissorsMesh.rotation.x += (mouse.y - scissorsMesh.rotation.x) * 0.08
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
```

The scissors follow the cursor with damped easing — they lag, they breathe. They feel alive.

---

### 4.3 — Floating Particles

```javascript
const particleCount = 3000
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 18
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const material = new THREE.PointsMaterial({
  color: 0xD4A85C,  // Aura Gold
  size: 0.008,
  transparent: true,
  opacity: 0.6,
})

const particles = new THREE.Points(geometry, material)
scene.add(particles)

// Slow drift
function animateParticles() {
  particles.rotation.y += 0.0003
  particles.rotation.x += 0.0001
  requestAnimationFrame(animateParticles)
}
```

Gold particles drift across the dark background. At 0.008 size and 60% opacity, they read subconsciously as light on hair — ambient, refined.

---

## Phase 5: Tech Stack

```
Core Framework:        React 18 + Vite
Language:              TypeScript
Routing:               React Router DOM v6
Styling:               Tailwind CSS (with CSS custom properties alongside)
Animations:            GSAP 3 + ScrollTrigger + SplitText
Smooth Scroll:         @studio-freight/lenis
UI Transitions:        Framer Motion
Icons:                 Lucide React
3D Engine:             Three.js + React Three Fiber + @react-three/drei
CMS:                   Sanity.io
Booking:               Custom React multi-step form (or Calendly API embed)
Deployment:            Vercel
Version Control:       Git + GitHub
```

### Install Commands

```bash
# Scaffold with Vite + React + TypeScript
npm create vite@latest house-of-aura -- --template react-ts
cd house-of-aura

# Tailwind CSS setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Routing
npm install react-router-dom

# Animation stack
npm install gsap @studio-freight/lenis framer-motion

# Icons (no emojis — icon library only)
npm install lucide-react

# 3D stack
npm install three @react-three/fiber @react-three/drei

# CMS (Sanity — no Next.js dependency)
npm install @sanity/client @sanity/image-url

# Utilities
npm install clsx tailwind-merge
```

---

## Phase 6: Project File Structure

```
house-of-aura/
├── index.html                          Vite entry HTML
├── vite.config.ts                      Vite configuration
├── tailwind.config.ts                  Tailwind configuration
│
├── src/
│   ├── main.tsx                        Entry point — providers, Lenis, Router
│   ├── App.tsx                         Root component, React Router routes
│   ├── index.css                       CSS custom properties, base reset
│   │
│   ├── pages/
│   │   ├── Home.tsx                    Main page (all sections assembled)
│   │   └── Booking.tsx                 Standalone booking page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              Minimal top nav, glass effect on scroll
│   │   │   └── Footer.tsx              Signature minimal footer
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx                Video bg + GSAP text reveal
│   │   │   ├── Services.tsx            Scroll-animated service cards
│   │   │   ├── BeforeAfter.tsx         Interactive drag slider
│   │   │   ├── Artists.tsx             Full-screen portrait grid
│   │   │   ├── Experience.tsx          Pinned scroll storytelling
│   │   │   ├── Products3D.tsx          React Three Fiber canvas
│   │   │   ├── Testimonials.tsx        3D perspective floating cards
│   │   │   └── Booking.tsx             Multi-step animated form
│   │   │
│   │   └── ui/
│   │       ├── Cursor.tsx              Custom gold cursor ring
│   │       ├── SmoothScroll.tsx        Lenis provider wrapper
│   │       ├── SplitText.tsx           GSAP text split utility
│   │       ├── ImageReveal.tsx         Clip-path reveal wrapper
│   │       ├── GoldDivider.tsx         Animated SVG line divider
│   │       └── Button.tsx              Ghost button component
│   │
│   └── lib/
│       ├── gsap.ts                     Plugin registrations
│       ├── sanity.ts                   Sanity client config (@sanity/client)
│       └── utils.ts                    clsx + tailwind-merge
│
├── public/
│   ├── video/
│   │   └── aura-hero.mp4               Compressed cinematic hero video
│   └── models/
│       ├── clipper.glb                 3D barber clipper model
│       └── product.glb                 3D hair product model
│
└── sanity/
    └── schemas/
        ├── artist.ts
        ├── service.ts
        ├── testimonial.ts
        └── beforeAfter.ts
```

---

## Phase 7: 7-Week Production Timeline

---

### Week 1 — Research & Brand Lock

| Task | Output |
|---|---|
| Competitor analysis (8-10 luxury salon sites) | Research notes |
| Moodboard — Figma or Pinterest | Visual direction locked |
| Final color palette confirmed | Token sheet |
| Video footage sourced (Pexels / Mixkit) | `/public/video/` |
| Artist photography sourced or commissioned | `/public/images/artists/` |
| Copywriting: headlines, service copy, bios, taglines | Copy doc |

![Research Phase](https://placehold.co/900x350/09090E/D4A85C?text=Week+1+%7C+Research+%C2%B7+Moodboard+%C2%B7+Brand+Lock)

---

### Week 2 — UI Design in Figma

| Task | Output |
|---|---|
| Desktop wireframes — all 9 sections | Figma file |
| Mobile wireframes — all 9 sections | Figma file |
| High-fidelity desktop mockups | Figma screens |
| High-fidelity mobile mockups | Figma screens |
| Design system: type scale, spacing, components | Figma design system page |
| Animation notes: what moves, when, and how | Annotation layer in Figma |

![Figma Design Phase](https://placehold.co/900x350/101018/EDE8E0?text=Week+2+%7C+Figma+%E2%80%94+Desktop+%2B+Mobile+High-Fidelity+Mockups)

---

### Week 3 — Frontend Development

- [ ] React + Vite setup, Tailwind config, CSS token sheet
- [ ] Fonts installed and configured (Playfair Display, Cormorant Garamond, DM Sans)
- [ ] Static markup for all sections — semantic HTML, no animations yet
- [ ] Lucide icon integration (no emojis anywhere)
- [ ] Hero video background with correct overlay gradient
- [ ] Before/After slider — static drag interaction
- [ ] Booking multi-step form — state logic, no transitions yet
- [ ] Sanity CMS schema + initial content entry

---

### Week 4 — Animation Layer

- [ ] Lenis installed and wired as a provider in `main.tsx`
- [ ] GSAP + SplitText — hero headline character reveal
- [ ] GSAP ScrollTrigger — services card stagger
- [ ] Image clip-path reveal — artists and gallery sections
- [ ] The Experience section — pinned scroll with line-by-line reveal
- [ ] Testimonials — 3D perspective entrance animation
- [ ] Booking step transitions — Framer Motion AnimatePresence
- [ ] Custom cursor — gold ring with eased mouse follow
- [ ] Scroll-triggered gold line dividers — SVG stroke-dashoffset

![Animation Phase](https://placehold.co/900x350/09090E/D4A85C?text=Week+4+%7C+GSAP+%2B+Lenis+%7C+Reveals+%C2%B7+Pins+%C2%B7+Character+Splits+%C2%B7+Cursor)

---

### Week 5 — 3D Integration

- [ ] 3D model assets sourced from Sketchfab — `.glb` format
- [ ] React Three Fiber Canvas setup
- [ ] Product showcase — slow auto-rotation, studio lighting in Aura Gold
- [ ] Interactive scissors — damped mouse-follow rotation
- [ ] Ambient particle system — gold particles, low opacity, slow drift
- [ ] Performance testing — maintain 60fps on mid-range devices
- [ ] Mobile fallback — replace 3D canvas with static image on low-power devices

![3D Integration Phase](https://placehold.co/900x350/09090E/9B8DC4?text=Week+5+%7C+Three.js+%2B+React+Three+Fiber+%7C+Products+%C2%B7+Scissors+%C2%B7+Particles)

---

### Week 6 — Optimization & QA

- [ ] Manual `<img loading="lazy">` with `srcset` for responsive images — WebP format via `vite-imagetools`
- [ ] Hero video compressed to under 8MB (Handbrake: H.264, CRF 28)
- [ ] All below-fold sections lazy-loaded
- [ ] 3D canvas deferred until section is near viewport
- [ ] Lighthouse audit — target: Performance 90+, Accessibility 95+
- [ ] Cross-browser QA: Chrome, Firefox, Safari, Edge
- [ ] Real device mobile testing — not just dev tools emulator
- [ ] ARIA labels on all interactive elements
- [ ] Color contrast audit — all text against backgrounds
- [ ] SEO: meta titles, descriptions, OG images, `sitemap.xml`

---

### Week 7 — Deployment & Handoff

- [ ] Vercel project created, environment variables set
- [ ] Custom domain connected and SSL verified
- [ ] Vercel Analytics enabled
- [ ] Final full-device QA pass
- [ ] CMS training for client: adding artists, services, testimonials in Sanity
- [ ] Handoff documentation — how to update content, deploy, manage
- [ ] TikTok build content: screen recording of the site, build process documentation

---

## Phase 8: Design Rules & Final Checklist

---

### The Rules (Summary)

**Always:**
- Use the 8-color palette and nothing outside it
- Use Lucide icons — no emojis, no decorative Unicode characters
- Build spacing from the base-8 scale
- Test every animation on a real mobile device
- Use `cubic-bezier` easing — never `linear` for UI motion
- Compress every media asset before deployment

**Never:**
- Add gradient backgrounds outside the three permitted uses
- Use more than one CTA color — gold only, every time
- Stack card sections with alternating background colors
- Add drop shadows — they read as fake premium
- Use system fonts — every typeface is deliberate
- Add hover states that change more than one property simultaneously
- Use autoplay audio

---

### The "House of Aura" Quality Gate

Before this site ships, every item below must be true:

- [ ] The hero stops you the first time you see it
- [ ] The text reveals make you want to scroll more
- [ ] Scrolling feels like silk — no stutter, no jump
- [ ] The artist section makes the stylists feel like talent, not staff
- [ ] The booking flow feels like making a reservation at a private members club
- [ ] On mobile, it still feels premium — not compressed and cluttered
- [ ] The 3D product section makes someone want to screenshot it
- [ ] There is not a single emoji anywhere on the page
- [ ] The color palette is instantly recognizable as intentional
- [ ] A fellow developer opens DevTools and says: *"This is clean"*

---

## Key Resources

| Resource | URL |
|---|---|
| GSAP Documentation | https://gsap.com/docs |
| GSAP SplitText | https://gsap.com/docs/v3/Plugins/SplitText |
| React Three Fiber | https://docs.pmnd.rs/react-three-fiber |
| Lenis Smooth Scroll | https://lenis.darkroom.engineering |
| Lucide React Icons | https://lucide.dev/guide/packages/lucide-react |
| Sanity CMS | https://www.sanity.io/docs |
| Framer Motion | https://www.framer.com/motion |
| Sketchfab (3D models) | https://sketchfab.com |
| Pexels Video | https://www.pexels.com/videos |
| Mixkit Video | https://mixkit.co |
| Vercel Deployment | https://vercel.com/docs |

---

> **Project:** House of Aura
> **Type:** Luxury Salon Digital Experience
> **Stack:** React 18 + Vite — TypeScript — Tailwind CSS — GSAP — Lenis — Framer Motion — Lucide — Three.js — Sanity — Vercel
> **Timeline:** 7 Weeks
> **Design Direction:** Dark Mystique with Editorial Warmth

---

*"The details are not the details. They make the design."*
— Charles Eames

