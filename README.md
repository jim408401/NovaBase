# NovaBase

NovaBase is an interactive bilingual astronomy exploration site centered on a 3D Milky Way and Solar System experience. It is built with React, TypeScript, Vite, and Three.js, with a first version focused on the Milky Way, the Solar System, planets, and stars.

The project is designed as a science learning experience rather than a marketing landing page: users can rotate, zoom, filter, and select celestial objects to explore structured educational content.

## Features

- Interactive 3D Milky Way and Solar System scene
- Galaxy, Solar System, Planets, and Stars sections
- Clickable celestial objects with information panels
- Traditional Chinese and English language switching
- Planet, star, and galaxy-region filters
- Orbit animation with speed control
- Low-power rendering mode
- Textured planets, glowing Sun, starfield sky sphere, and Bloom post-processing
- Moons for Earth, Mars, Jupiter, and Saturn
- Textured Saturn ring
- Asteroid belt and galaxy dust details
- Responsive desktop and mobile interface

## Tech Stack

- React 18
- TypeScript
- Vite
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Framer Motion
- Lucide React

## Getting Started

Make sure Node.js is installed. This project has been tested with Node `v22.18.0`.

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy blocks `npm.ps1`.

```powershell
cd C:\Users\A25228\Documents\NovaBase
npm.cmd install
npm.cmd run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Available Scripts

Start the local development server:

```powershell
npm.cmd run dev
```

Run TypeScript checks and create a production build:

```powershell
npm.cmd run build
```

Preview the production build:

```powershell
npm.cmd run preview
```

## Project Structure

```text
NovaBase/
  public/
    textures/          # Planet, Sun, starfield, and Saturn ring textures
  src/
    components/        # UI components and the Three.js scene
    data/              # Celestial data and localized UI copy
    App.tsx            # Main app state and layout composition
    main.tsx           # React entry point
    styles.css         # Global styling and responsive layout
    types.ts           # Shared TypeScript types
```

## 3D Architecture

The main 3D scene is implemented in `src/components/SpaceScene.tsx`.

The rendering architecture includes:

- `Canvas` from React Three Fiber as the WebGL container
- `OrbitControls` for drag rotation and scroll zoom
- `TextureLoader` for planet and sky textures
- `MeshStandardMaterial` for lit planet surfaces
- `MeshBasicMaterial` for the Sun and background sky sphere
- `EffectComposer`, `RenderPass`, `UnrealBloomPass`, and `OutputPass` for cinematic post-processing
- Pivot-based orbit groups for planets and moons
- `Points` systems for galaxy dust, asteroid belts, and distant stars
- ACES filmic tone mapping and sRGB output color space

## Content Model

Celestial data lives in `src/data/celestial.ts`, with shared types in `src/types.ts`.

Each celestial object includes:

- `id`
- `type`
- `name.zh` and `name.en`
- `summary.zh` and `summary.en`
- `facts`
- `visual`

The `visual` object can define:

- Color
- Texture path
- Size
- Position
- Orbit radius and speed
- Rotation speed
- Roughness and metalness
- Saturn ring texture
- Moon data

## Build Notes

Three.js, post-processing, and high-resolution textures can make the JavaScript bundle relatively large. Vite may show a chunk size warning during production builds. This does not prevent the app from running.

Future production optimizations could include:

- Lazy-loading the 3D scene
- Splitting large routes or feature areas into separate chunks
- Compressing or resizing texture assets
- Using KTX2 or Basis compressed textures
- Loading lower-resolution textures in low-power mode

## Roadmap

- Add more Milky Way structures, such as spiral arms, nebulae, star clusters, and black holes
- Add search across celestial objects
- Add a richer planet comparison mode
- Add timelines for stellar life cycles, galaxy formation, and orbital motion
- Connect optional public astronomy data sources
- Improve automatic low-power detection

## License

No license has been selected yet. Add a license before publishing the project publicly.
