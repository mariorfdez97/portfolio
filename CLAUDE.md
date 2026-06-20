# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal portfolio website for Mario Rodríguez Fernández. No build system, bundler, or package manager — open `index.html` directly in a browser or serve it with any static file server.

To preview locally:
```
npx serve .
# or
python -m http.server 8080
```

## Architecture

Single-page application with one HTML file and two CSS files:

- `index.html` — all content and section structure (navbar, hero, portfolio, resume, about, contact, footer)
- `assets/css/style.css` — base styles, layout, typography, section-specific rules
- `assets/css/enhanced.css` — supplemental/override styles added later
- `assets/js/script.js` — all interactivity, initialized on `DOMContentLoaded`
- `assets/images/` — project screenshots and personal photo

## JavaScript structure

`script.js` uses a module-function pattern: one init function per feature, all called from `DOMContentLoaded`. Key functions:

- `initNavigation` — sticky navbar, hamburger menu, active link highlighting on scroll
- `initParallax` — hero text parallax on scroll and mouse move
- `initScrollAnimations` — IntersectionObserver fade-in for sections/items
- `initPortfolioFilters` — category filter buttons for portfolio grid (`data-category` / `data-filter` attributes)
- `initDevParticles` — canvas-based floating code symbols on hero background
- `initDevElements` — CSS-animated floating symbols overlaid on hero (separate from canvas)
- `initSectionParticles` — subtle canvas dot particles on dark sections
- `initScrollProgress` — fixed top progress bar
- `initBackToTop` — scroll-triggered back-to-top button
- `initContactForm` — form submit handler (currently simulated, no real backend)
- `initCustomCursor` — custom cursor on desktop (>768px)

## Portfolio filter system

Each `.portfolio-item` has a `data-category` attribute (`mockup`, `packaging`, `photography`). Filter buttons use `data-filter` matching those values, plus `all`. Adding a new project requires both a new `.portfolio-item` div and ensuring the category exists as a filter button.

## Deployment

Deployed via GitHub Pages. The `CNAME` file sets the custom domain. Push to `main` to deploy.
