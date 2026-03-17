# Zahir Hussain - Portfolio

Personal portfolio of **Zahir Hussain**, Applied AI Engineer & ML Researcher.  
Live at → [zahir-portfolio.pages.dev](https://zahir-portfolio.pages.dev)

---

## About

A minimal, dark-themed portfolio built with React and Vite. Designed to present AI engineering work, research projects, and professional experience in a clean two-language interface.

---

## Features

- 🌐 **Bilingual** — Full DE / EN language switcher, German default
- 📄 **CV Modal** — Download Lebenslauf (DE) or CV (EN) directly
- 🖥️ **Responsive** — Desktop-first with a dedicated mobile layout and optimised content per screen size
- 🗂️ **Sections** — Hero · About · Experience · Projects · Skills · Contact · Publication
- 📬 **Contact Form** — Powered by Formspree
- 📍 **Location Popup** — Scroll-aware, opens up or down based on card position
- 🔒 **Easter Egg** — Hidden keyboard interaction at the footer (try it)

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + inline styles |
| Animations | CSS keyframes + React state transitions |
| Forms | Formspree |
| Deployment | Cloudflare Pages |

---

## Project Structure

```
portfolio/
├── public/
│   ├── dp.png              # Portrait image
│   ├── english-cv.pdf      # EN CV
│   └── deutsch-cv.pdf      # DE Lebenslauf
├── src/
│   └── App.jsx             # Single-file React app
├── index.html
└── vite.config.js
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Deployment

Deployed automatically via **Cloudflare Pages** on push to `main`.

To deploy manually:
```bash
npm run build
# Upload /dist to Cloudflare Pages
```

---

## Customisation

All content — translations, projects, experience, skills — lives in the `translations` object at the top of `src/App.jsx`. Both `en` and `de` keys follow the same structure, so updating either language is straightforward.

---

## License

This portfolio and its content are personal and not open for reuse without permission.  
The codebase structure may be referenced for learning purposes.

---

*Built with React & TailwindCSS*
