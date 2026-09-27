# 🦅 Angry Birds // 16-Bit Retro Arcade Edition

[![React 19](https://img.shields.io/badge/React-19.x-e63946?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-f59e0b?style=for-the-badge&logo=typescript&logoColor=black)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-ffd166?style=for-the-badge&logo=vite&logoColor=black)](https://vite.dev/)
[![Design](https://img.shields.io/badge/Aesthetic-16--Bit%20Pixel%20Art-22c55e?style=for-the-badge)](https://fonts.google.com/specimen/Press+Start+2P)
[![Color Palette](https://img.shields.io/badge/Palette-Strictly%20No%20Blue%20or%20Purple-b45309?style=for-the-badge)](#-color-palette-compliance)
[![Audio](https://img.shields.io/badge/Audio-Native%20Web%20Audio%20API-dc2626?style=for-the-badge)](#-synthesized-8-bit-sound-engine)

A premium, interactive 16-bit pixel art website and landing page paying homage to the classic Angry Birds series. Built with physics-driven slingshot mechanics on HTML5 Canvas, zero external audio dependencies (pure Web Audio API synthesizer), retro arcade CRT scanline filters, and a handcrafted warm sunset aesthetic.

---

## 📸 Screenshots & Artwork

| Hero Slingshot Battle | The Flock Character Select |
| :---: | :---: |
| ![Hero Banner](/public/assets/hero-pixel.jpg) | ![Flock Lineup](/public/assets/flock-select.jpg) |

| King Pig Citadel Siege | Retro Cartridge Vault |
| :---: | :---: |
| ![Citadel Fortress](/public/assets/pig-citadel.jpg) | ![Arcade Box Art](/public/assets/game-arcade.jpg) |

---

## 🌟 Key Features

### 🕹️ 1. Playable Slingshot Miniature Game (`<MiniGame />`)
- **Physics Slingshot Engine**: Built directly on HTML5 Canvas with realistic rubber band elasticity, tension pull, and dynamic dotted trajectory arc calculations.
- **3 Destructible Materials**:
  - **Wood**: Breaks down under velocity, creating flying splinter particles.
  - **Stone**: Absorbs heavy damage, requiring strategic toppling of lower pillars.
  - **TNT Barrels**: Detonates upon collision or falling debris with chain reaction shockwaves that launch nearby blocks and pigs!
- **3 Handcrafted Levels**:
  - *Level 1: Piggy Watchtower* — Basic wooden outpost with a snoozing minion pig.
  - *Level 2: TNT Redoubt* — Precarious scaffolding stacked on explosive TNT crates.
  - *Level 3: King Pig's Citadel* — Multi-story stone fortress guarded by Helmet Pig and the royal King Pig.
- **Mid-Air Special Bird Abilities**:
  - ⚡ **Chuck**: Tap in mid-air for a 2.4x supersonic mach speed dash!
  - 💣 **Bomb**: Tap in mid-air or wait for impact to detonate a 360° thermal fireball!
- **Scoring & Star Ratings**: Earn 1 to 3 stars based on score and shots remaining. High scores automatically persist in `localStorage`.
- **Celebrations**: Victorious clears trigger arpeggiated 8-bit fanfare and particle confetti.

---

### 🦅 2. All 9 Flock Heroes & Signature Abilities (`<BirdsRoster />`)
Explore each feathered champion with animated pixel avatars, combat metrics (Damage, Speed, Ballistic Mass, Penetration), and an **interactive "Test Battle Cry!"** button:

| Bird | Title | Signature Ability | Tactical Target |
| :--- | :--- | :--- | :--- |
| 🔴 **Red** | Fearless Commander | **Battle Cry Shockwave** | Destabilizes stone foundations & watchtowers |
| ⚡ **Chuck** | Mach Speedster | **Supersonic Mach Sprint** | Slices through dense timber barricades |
| 💣 **Bomb** | Demolitionist | **Thermal Concussive Kaboom** | Bunkers, TNT caches & iron vaults |
| 🥚 **Matilda** | Aerial Bombardier | **High-Yield Egg Drop** | Vertical trenches & low ceilings |
| 💥 **Terence** | Colossal Wrecking Ball | **Absolute Crushing Mass** | Bulldozes entire fortresses without slowing down |
| 🪃 **Hal** | Boomerang Sniper | **Reverse Trajectory Swoop** | Shielded rear pigs & reverse-angle targets |
| 🎈 **Bubbles** | Inflatable Titan | **10x Balloon Expansion** | Enclosed spaces & basement collapse |
| 🔮 **Stella** | Anti-Gravity Sorceress | **Bubble Vortex Trap** | Crowd control & levitating heavy debris |
| 🧊 **The Blues** | Triple Trouble | **Trio Splinter Shuttle** | Shatters glass domes and ice barriers |

---

### 📜 3. Chronicles of Piggy Island (`<AboutLore />`)
- **The 4-Act Story Saga**:
  - *Act I: The Midnight Egg Heist* — King Pig's royal breakfast scheme.
  - *Act II: The Forge of Justice* — Building the legendary oak slingshot.
  - *Act III: Cracking the Citadel* — The feathered airborne siege.
  - *Act IV: The 16-Bit Remaster* — Rebuilt for retro arcade nostalgia.
- **Interactive Bad Piggies Dossier**:
  - Profiles for **Minion Pig**, **Corporal Helmet Pig**, **Foreman Mustache Pig**, and **King Pig Smooth Cheeks**.
  - Displays HP, armor ratings, structural weaknesses, and intercepted quotes.
  - **"Poke Pig! 🐽" Button**: Interactive touch/click that triggers comedic 8-bit pig oinks and physical recoil!

---

### 🎮 4. Retro Cartridge Vault (`<GamesShowcase />`)
- **5 Classic Releases**:
  1. *Angry Birds Arcade (1986 Classic Edition)*
  2. *Bad Piggies Workshop: Construction Chaos*
  3. *Citadel Siege: The Golden Egg Raid*
  4. *Desert Badlands (Wind & Cactus Fury)*
  5. *Feathered Legends RPG (16-Bit Turn-Based)*
- **Inspect Specs Modal**: Real-time modal viewing cartridge history, full feature set, platform specifications, and secret retro cheat codes (e.g. `UP, UP, DOWN, DOWN, LEFT, RIGHT, B, A`).

---

### 👥 5. Community & Leaderboards (`<Community />`)
- **VIP Golden Egg Club**: Newsletter subscription with animated stamp confirmation.
- **Hall of Fame**: Real-time arcade leaderboard tracking top scores.
- **Retro Social Hub**: Discord Arcade, Subreddit, Feather Wire, and Stream channels.

---

### 🔊 6. Synthesized 8-Bit Web Audio Engine (`src/utils/audio.ts`)
Zero external MP3/WAV file downloads. The sound engine leverages the browser's native **Web Audio API** to generate authentic chiptune waveforms:
- `playSlingshotPull(tension)`: Frequency-swept square/sawtooth oscillator simulating tension.
- `playSlingshotRelease()`: Snappy whip-crack pitch decay.
- `playBirdCry(type)`: Custom pitch envelopes for Red, Chuck, Bomb, Matilda, and Hal.
- `playPigPop()`: Dual-tone squeak followed by a filtered noise pop.
- `playTntExplosion()`: Low-pass filtered white noise burst with heavy sub-bass rumble.
- `playVictoryFanfare()`: Arpeggiated C-major victory chord (`C4 -> E4 -> G4 -> C5 -> E5`).
- Master audio toggle in the header with persistent state.

---

### 📺 7. CRT Monitor Mode
- Toggleable scanline shader overlay with vignette shadow and phosphor tube warmth.
- Activated via the `[CRT ON/OFF]` button in the top navigation bar.

---

## 🎨 Color Palette Compliance

> [!IMPORTANT]
> **Strict Requirement Met**: Neither blue (`#0000ff`) nor purple (`#800080` / `#a855f7`) are present anywhere in the codebase, stylesheets, or generated artwork.

```
Warm Earth / Slingshot Dark Wood : #120b07  #20130c  #2b160b
Cardinal Red / Flock Fury        : #e63946  #ff384d  #991b1b
Chuck Yellow / Lightning Speed   : #ffd166  #facc15  #fef08a
Slingshot Amber / Golden Egg     : #f59e0b  #d97706  #b45309
Piggy Emerald Green              : #22c55e  #16a34a  #15803d
```

---

## 📁 Project Architecture

```
angry-bird/
├── public/
│   └── assets/
│       ├── hero-pixel.jpg          # 16-Bit Hero panoramic banner
│       ├── flock-select.jpg        # Character select screen lineup
│       ├── pig-citadel.jpg         # King Pig Castle & Golden Eggs
│       ├── game-arcade.jpg         # 1986 Arcade Edition box art
│       └── game-piggies.jpg        # Bad Piggies Workshop box art
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Retro navigation, CRT & Sound toggles
│   │   ├── Hero.tsx                # Slingshot hero & quick-launcher
│   │   ├── AboutLore.tsx           # 4-Act saga & interactive pig dossier
│   │   ├── GamesShowcase.tsx       # Cartridge vault & specs modal
│   │   ├── BirdsRoster.tsx         # 9 bird profiles & ability audition
│   │   ├── MiniGame.tsx            # Playable HTML5 Canvas physics game
│   │   ├── Community.tsx           # VIP newsletter & hall of fame
│   │   ├── Footer.tsx              # Full directory links & catapult button
│   │   └── PixelSprites.tsx        # Handcrafted SVG pixel art components
│   ├── utils/
│   │   └── audio.ts                # Web Audio API 8-bit sound synthesizer
│   ├── App.tsx                     # Main layout & state integration
│   ├── index.css                   # Custom 16-bit design system & utilities
│   └── main.tsx                    # Application entry point
├── index.html                      # Pixel fonts & metadata
├── package.json                    # Project dependencies
└── vite.config.ts                  # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation & Launch

1. Clone or navigate into the project directory:
   ```bash
   cd angry-bird
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Building for Production

To build the optimized static production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🎯 Slingshot Mini-Game Controls

- **Aim & Tension**: Click (or tap) and drag the bird backwards from the slingshot fork.
- **Trajectory Dots**: Shows the predicted parabolic arc before releasing.
- **Fling**: Release the mouse button (or finger) to launch the bird!
- **Special Power**: While the bird is in mid-air:
  - Click anywhere on the canvas to trigger **Chuck's Supersonic Mach Sprint** or **Bomb's Instant Thermal Detonation**!
- **Level Selection**: Click buttons `1`, `2`, or `3` to challenge different fortresses.
- **Reload / Restart**: Click the `Restart` button at any time to reload your shots.

---

## 📜 Retro Arcade Cheat Codes

| Game | Code | Effect |
| :--- | :--- | :--- |
| **Angry Birds Arcade 1986** | `UP, UP, DOWN, DOWN, LEFT, RIGHT, B, A` | Unlocks Mighty Eagle |
| **Bad Piggies Workshop** | `HOLD L+R AND PRESS START` | Infinite TNT Barrels |
| **Citadel Siege Raid** | `PRESS SELECT 5 TIMES AT LEVEL 3` | Weakens Stone Pillars |
| **Feathered Legends RPG** | `PRESS START, X, Y, A` | Max Flock Mana |

---

## ⚖️ Disclaimer

This project is an unofficial fan tribute created for educational and entertainment purposes. *Angry Birds* and *Bad Piggies* are registered trademarks of Rovio Entertainment / SEGA. All rights belong to their respective owners. Handcrafted with 16-bit pixel nostalgia.
