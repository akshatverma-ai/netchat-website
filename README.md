# Netchat Official Android APK Download Website

The official, high-performance download and showcase website for **Netchat** — the decentralized peer-to-peer and mesh messenger for Android.

Built with Vanilla HTML/CSS and JavaScript powered by Vite, featuring a refined pastel glassmorphism theme and ready for instant deployment to Vercel.

---

## Key Features

- **Live Android Application Showcase**: Continuous horizontal moving marquee displaying 8 genuine Android screens (Splash & Init, Chats & Contacts, End-to-End Encrypted Chat, Mesh Groups, Calls & Signaling, Nearby Internet Sharing, Offline Outbox Queue, and Settings & Privacy) with full-resolution click-to-inspect lightbox.
- **Direct Official APK Download**: Clean, single-click direct APK download button with verified version (`v1.0.1`), file size (`14.6 MB`), and Android requirements (`Android 8.0+`).
- **Source-Code Verified Core Features**: Truthful feature breakdown audited directly from the native Android Kotlin/Jetpack Compose codebase.
- **Android Sideloading Guide**: Clear, 4-step sideloading walkthrough for Android 8.0 through Android 15.
- **Interactive FAQ Accordion**: Expandable answers addressing off-grid radio networking, hotspot internet sharing, and direct APK distribution.
- **Vercel Deployment Ready**: Preconfigured with `vercel.json` security headers and optimized caching.

---

## Project Structure

```text
Netchat-Website/
├── index.html              # Main semantic landing page
├── vercel.json             # Vercel deployment configuration & security headers
├── package.json            # Vite configuration and scripts
├── .gitignore              # Ignores node_modules, dist, secrets, and APK binaries
├── public/
│   ├── favicon.svg         # SVG favicon
│   ├── logo.svg            # Official Netchat logo
│   └── screenshots/        # High-resolution authentic Android screenshots
└── src/
    ├── config.js           # Centralized release metadata & download configuration
    ├── main.js             # Showcase marquee, lightbox, and navigation logic
    └── style.css           # Pastel glassmorphism design system
```

---

## Local Development & Build

### 1. Run Local Dev Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## License

Proprietary — All rights reserved © 2026 Netchat.
