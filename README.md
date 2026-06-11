# Portfolio

A terminal-themed personal portfolio website with interactive visual effects and system-inspired CLI aesthetics. Built with React, Vite, and WebGL, this portfolio blends generative graphics with a command-line interface to create an immersive, non-traditional web experience.

## Overview

This is a personal portfolio for **Shaik Ajhaj**, a student engineer and builder focused on software, hardware, robotics, AI, and community impact.

The site embraces a CLI/system-inspired design language where every section is presented as terminal commands and output. The experience centers on two core moments:

1. **Landing Phase**: An interactive animated entry experience with an Arabic quote and a hidden discovery button triggered by cursor exploration over a generative dithered WebGL background.
2. **Portfolio Phase**: A full-screen terminal overlay with nested sections covering about, projects, hackathons, events, volunteering, experience, skills, roadmap, and contact information.

The interaction model prioritizes exploration and performance, with smooth animations, shader-based effects, and keyboard accessibility throughout.

## Features

### Core Implemented Features

- **Landing Page with Generative Background**: WebGL-powered dithered background with Perlin noise-based flow fields and mouse interaction. The background responds to cursor movement, creating an "exploration" feel where specific empty pockets reveal a hidden entry button.

- **Arabic Quote Overlay**: Displays an inspirational Arabic quote with translation during the landing phase, with smooth fade transitions between phases.

- **Terminal-Style Navigation**: Fixed status bar navbar with live system time, path indicators, and responsive hamburger menu for mobile. Primary links (About, Projects, Experience, Contact) are always visible on desktop.

- **Interactive ASCII Art Hero Section**: A neofetch-style system information display with an ASCII robot logo, identity stats (role, location, domains, tech stack, mission), and color palette visualization.

- **Faulty Terminal Overlay Effect**: Full-screen canvas-based effect with falling binary characters ("0" and "1"), glitch lines, and mouse-reactive distortion. Characters are pushed away from the cursor and change color when the cursor approaches.

- **Project Archive (Mission Archive)**: Tree-style directory listing of projects with descriptions, tech stacks, and links to GitHub repositories and live demos.

- **Hackathons & Events Sections**: Dedicated sections for hackathon participation and hosted/attended events.

- **Volunteered & Experience Sections**: Information about volunteering roles and professional/academic experience.

- **Skills Section**: Categorized technical skills display.

- **Roadmap/Update Tracker**: Visual grid showing planned features with status badges (planned, in-progress, experimental).

- **Contact Section**: Social links and contact information with icons (GitHub, LinkedIn, Instagram, email).

- **Responsive Design**: Mobile-first approach with hamburger navigation, hidden desktop elements on small screens, and smooth layout adjustments.

- **Accessibility**: Keyboard navigation support, ARIA labels, skip-to-portfolio link for reduced-motion users, and semantic HTML.

### Visual & Performance Features

- **WebGL Shader Effects**: Bayer dithering algorithm, Perlin noise generation, smoothstep easing, vignette effects, and mouse-based geometry warping.
- **Canvas-Based CRT Effects**: Scanlines, flicker animation, curvature, and character interaction layers.
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query; disables animations and streamlines transitions for accessibility.
- **High-Performance Rendering**: Canvas scaled down for reduced fragment shader load, throttled mouse sampling, and frame skipping optimizations.

## Tech Stack

- **Frontend**: React 19.2.6, React Router 7.17.0
- **Build Tool**: Vite 8.0.12
- **Styling**: Custom CSS (31KB design system)
- **Effects**: WebGL (custom shaders), Canvas 2D
- **Icons**: React Icons 5.6.0
- **Dev Tools**: ESLint, React Fast Refresh

## Project Structure
