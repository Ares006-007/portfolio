# Portfolio

A terminal-themed personal portfolio website with interactive visual effects and a CLI/system-inspired design language. Built by Shaik Mohammad Ajhaj.

---

## Overview

This is a full-featured portfolio experience designed as an interactive terminal system. The project merges a landing page with an immersive dithering shader effect, a hidden discovery mechanism, and a comprehensive CLI-styled portfolio interface.

The portfolio is for **Shaik Mohammad Ajhaj**, an 18-year-old builder and student engineer based in Bengaluru. Work spans AI/ML, hardware prototyping, robotics, aerospace, automation, and full-stack web development. Deep involvement in hackathon organization, youth tech communities, and event operations.

---

## Features

### Implemented

- **Landing Page with Dithering Effect**: WebGL-powered shader-based dithering background with Bayer matrix pattern, noise flow, and mouse interaction
- **Discovery Mechanism**: Hidden entrance button tied to shader density sampling; appears when cursor finds "empty pockets" in the dithering effect
- **Animated Launch Overlay**: ASCII transition sequence into the portfolio
- **Arabic Quote Intro**: Opening quote with translation: "مَن طَلَبَ العُلا سَهِرَ الليالي" (He who seeks greatness must endure the sleepless nights)
- **Terminal-Style Navigation**: Fixed CLI status bar with system-like branding, live clock, and collapsible menu
- **Portfolio Sections**:
  - Hero / System Profile (neofetch-style identity card with ASCII art)
  - About (identity data stream with hex offsets)
  - Projects (tree-style mission archive with descriptions, tech stacks, and links)
  - Hackathons (log-style competition history)
  - Events (systemctl-style event operations dashboard)
  - Volunteering (event participation history)
  - Experience (active processes and completed runs)
  - Skills (htop-style system resource visualization with progress bars)
  - Contact (nmap-style endpoint scanning)
  - Roadmap (planned features tracker)
- **Responsive Design**: Mobile hamburger menu, collapsible navigation
- **CRT Terminal Effect**: Faulty terminal overlay with scanlines, glitch artifacts, flicker animation, and mouse-reactive character distortion
- **Performance Optimizations**: Throttled shader sampling, reduced WebGL resolution scaling, efficient DOM animation loops
- **Accessibility**: Keyboard navigation, reduced motion support, ARIA labels, skip links
- **Smooth Scrolling**: System-wide scroll behavior with styled scrollbar
- **Design System**: Comprehensive CSS variables for colors, typography, spacing, and transitions

---

## Tech Stack

- **React** (v19.2.6) — UI component framework
- **React Router DOM** (v7.17.0) — Multi-page routing (Landing → Portfolio)
- **Vite** (v8.0.12) — Fast build tool and dev server
- **WebGL** — Real-time dithering and shader effects (custom GLSL)
- **Canvas API** — CRT terminal character effects and glitch rendering
- **React Icons** (v5.6.0) — Social media icons (GitHub, LinkedIn, Instagram, Email)
- **JavaScript (ES Modules)** — Modern JS without build-time transpilation
- **CSS 3** — Custom properties, grid, flexbox, animations, filters

**Fonts**:
- Inter (body text)
- JetBrains Mono (terminal/monospace)
- Amiri (Arabic script support)

---

## Project Structure

```
portfolio/
├── index.html              # Root HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── src/
│   ├── main.jsx           # React entry point
│   ├── index.css           # Global design system (CSS variables, base styles, sections)
│   ├── App.jsx            # Router setup (Landing / Portfolio routes)
│   ├── pages/
│   │   ├── Landing.jsx    # Intro page with dither effect, quote, discovery button
│   │   └── Portfolio.jsx  # Main portfolio container with all sections
│   ├── components/
│   │   ├── Navbar.jsx          # CLI status bar with live clock and navigation
│   │   ├── Hero.jsx            # System profile / neofetch-style intro
│   │   ├── About.jsx           # Identity data stream section
│   │   ├── Projects.jsx        # Mission archive (tree view)
│   │   ├── Hackathons.jsx      # Competition log
│   │   ├── Events.jsx          # Event operations (systemctl style)
│   │   ├── Volunteered.jsx     # Volunteering history
│   │   ├── Experience.jsx      # Work history and active roles
│   │   ├── Skills.jsx          # Tech stack (htop-style)
│   │   ├── Roadmap.jsx         # Planned features with status tracker
│   │   ├── Contact.jsx         # Social links (nmap scan style)
│   │   ├── DitherBackground.jsx # WebGL dithering shader + interaction
│   │   ├── FaultyTerminal.jsx  # CRT overlay with glitch effects
│   │   └── AsciiLaunchOverlay.jsx # Launch sequence animation
│   └── data/
│       └── content.js      # Centralized portfolio content (identity, projects, etc.)
└── public/                 # Static assets (if any)
```

### Key Files

- **`index.css`**: Complete design system with color palette, typography scale, spacing, animations, and component styles. All visual consistency lives here.
- **`content.js`**: Single source of truth for all portfolio data — update here to reflect changes across all sections.
- **`DitherBackground.jsx`**: Custom WebGL shader system that generates the landing effect. Fragment shader handles Bayer dithering, Perlin-like noise, and mouse density sampling.
- **`FaultyTerminal.jsx`**: Canvas-based CRT terminal effect running in the background of the portfolio. Independent from main content, responsive to mouse movement.

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ares006-007/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (runs on http://localhost:5173 by default)
npm run dev
```

- Open browser to `http://localhost:5173`
- Landing page will display dithering effect and hidden button discovery
- Click hidden button or skip link to enter portfolio
- Edit files in `src/` and changes will hot-reload

### Build

```bash
# Compile for production
npm run build

# Output goes to dist/
```

### Preview

```bash
# Preview production build locally
npm run preview
```

### Linting

```bash
# Run ESLint to check code quality
npm run lint
```

---

## Design & Concept

### Terminal Identity

The entire interface adopts a **terminal/CLI aesthetic** inspired by Unix systems. Every section is styled as a command output:

- Hero is `sys_profile --identity --fetch`
- About is `./scripts/decrypt_profile.sh --target=self`
- Projects is `tree -h -L 2 ./mission_archive/`
- Skills is `htop -u shaik -t sys_inventory`
- Contact is `nmap -p- -sV shaik.local`

### Visual Language

- **Dark background** (#050508) with minimal color accent (purple #6c3bff)
- **Monospace typography** for system/data blocks
- **Borders and grids** for structure and readability
- **Dithering** as a core visual metaphor — suggests depth, hidden information, exploration
- **Scanlines and glitch** overlay reinforces nostalgic terminal vibe
- **Live clock** in navbar to emphasize "system running now" feeling

### Interaction Model

- **Discovery-driven**: Landing page hides the entrance; users must explore the dithering effect to find it
- **System-like responsiveness**: Menu responds to keyboard (Escape), navigation updates appear as "logs" or "systemctl status"
- **Mouse reactivity**: CRT overlay responds to cursor movement with character distortion and glow
- **Reduced motion support**: Respects user preference; disables animations and transitions

---

## Planned Updates

Upcoming features tracked in the roadmap and visible in the portfolio:

| Feature | Status | Description |
|---------|--------|-------------|
| Live now / current status | deployed | Real-time indicator of current activities |
| Command palette / fake shell input | building | Interactive CLI navigation |
| Event ops dashboard | building | Internal views for hackathon management |
| Mission log / build log | queued | Chronological project registry |
| Comment section | queued | Guestbook visitor logs |
| System map | queued | Visual portfolio architecture map |
| Music player | queued | Lo-fi embedded audio controls |
| Game mode | queued | Hidden easter egg interactive mode |
| Theme modes | queued | Different terminal themes (Cyber, Retro, Monochrome) |
| Project deep-dive drawers | queued | In-depth case studies |

---

## Author & Contact

**Shaik Mohammad Ajhaj**

- **GitHub**: https://github.com/Ares006-007
- **LinkedIn**: https://www.linkedin.com/in/shaik-ajhaj
- **Email**: shaikajhaj@gmail.com
- **Instagram**: https://www.instagram.com/_ajaz_x_o1o/

---

## License

This project is part of a personal portfolio. Feel free to draw inspiration, but please attribute and link back to the original.

---

## Live Demo

Visit the deployed portfolio: https://portfolio-chi-puce-82.vercel.app
