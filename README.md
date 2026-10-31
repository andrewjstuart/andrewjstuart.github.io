# andrewjstuart.com

Source for my personal site — a living resume rather than a traditional project
portfolio. Built with plain HTML/CSS/JS, no build step or dependencies.

**Live:** https://andrewjstuart.com

## Features

- Light/dark theme toggle and an accent color picker (8 presets)
- Selectable hero background pattern: waveform, grid, rings, noise, or none
- Typed-out terminal-style tagline and monospace section labels
- Scroll-reveal animations and scrollspy nav, with `prefers-reduced-motion`
  respected throughout
- Interactive terminal easter egg (native `<dialog>`, PowerShell-styled)
- All picker choices persist via `localStorage` and apply pre-paint (no flash)

## Stack

- HTML5 + CSS3 (custom properties for theming)
- Vanilla JS (no frameworks, no bundler)
- Hosted on GitHub Pages with a custom domain (see `CNAME`)

## Structure

```
index.html        Page markup (hero, about, skills, experience, projects, contact)
css/
  variables.css    Design tokens, light/dark theme + accent color overrides
  style.css        Layout and component styles
js/
  main.js          Theme/accent/pattern toggles, typed tagline, scroll reveal,
                    scrollspy, terminal easter egg
assets/
  favicon.svg      Site icon
  images/          Profile photo + SVG masks used by the hero background patterns
```

## Local preview

No build step — open `index.html` directly, or serve the folder with any static
server, e.g.:

```sh
npx serve .
```

## Deployment

Pushing to `main` publishes via GitHub Pages automatically.
