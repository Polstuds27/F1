# VELOCÉ — The Art of Velocity

A responsive, independent Formula-inspired automotive editorial. Built with React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Vite.

## Local development

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and creates the production site in `dist`. `npm run preview` serves that build.

## Experience

Seven composed sections, responsive navigation, four keyboard-accessible machine studies, a keyboard-accessible image gallery with focus trapping and restoration, subtle scroll reveals and hero parallax. Reduced-motion preferences disable parallax, smooth scrolling, and hover transforms. All navigation and calls to action lead to the relevant on-page experience.

V—01 is a fictional design concept. Editorial specifications express design principles rather than verified vehicle performance. The website is independent and unaffiliated with Formula 1.

## Assets

Three original photographs were created with the built-in image generation tool and converted to optimized WebP. See [image-prompts.md](image-prompts.md) for the production prompts. Assets are stored in `public/images/`. Fonts are Barlow Condensed and DM Sans from Google Fonts, with system fallbacks; editorial italic type uses Georgia.

## Verification

TypeScript check and Vite production build passed. Local development server returned HTTP 200. Browser visual and interaction QA were unavailable because browser security review denied access to the local preview. Responsive layouts and keyboard handling are implemented but have not been verified in a browser.
