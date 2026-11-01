# andrewjstuart.com

Source for my personal site — a living resume rather than a traditional project
portfolio. Built with plain HTML/CSS/JS, no build step or dependencies.

**Live:** <https://andrewjstuart.com>

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

```text
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

## File-by-file

- **`index.html`** — All page markup, single file, no templating. Top to
  bottom: an inline `<head>` script (theme/accent/pattern pre-paint setup),
  the `<header>` nav with the three pickers, a `<main>` with one `<section>`
  per area of the page (see below), a `<footer>`, and the back-to-top button
  - terminal-dialog easter egg at the end.
- **`css/variables.css`** — Design tokens only: fonts (`--font-sans`,
  `--font-mono`), spacing/radius scale, font sizes, and `[data-theme]` /
  `[data-accent]` attribute selectors that redefine `--color-*` custom
  properties. Nothing here is layout — it's the palette/scale that
  `style.css` consumes.
- **`css/style.css`** — Everything else: resets, header/nav, hero (including
  the `[data-pattern]` background variants), buttons, section/heading styles,
  skills tag grid, experience timeline, project cards, contact links,
  footer, scroll-reveal animation, and the terminal-dialog UI.
- **`js/main.js`** — One IIFE, no modules/build step. In order: theme toggle,
  profile-image fallback, accent-color popover, hero-pattern popover, typed
  tagline effect, scroll-reveal `IntersectionObserver`, scrollspy nav
  highlighting, header-shadow/back-to-top on scroll, and the interactive
  terminal easter egg (a small fake command parser driving the `<dialog>`).
- **`assets/favicon.svg`** — Site icon.
- **`assets/images/profile.jpg`** — Hero avatar photo (falls back to initials
  if it fails to load).
- **`assets/images/waveform-mask.svg` / `noise-mask.svg`** — Alpha masks used
  by the `waveform` and `noise` hero background patterns; they're tinted via
  `color-mix()` with the current accent color rather than being static images.
- **`CNAME`** — GitHub Pages custom-domain config for `andrewjstuart.com`.

## Sections (`index.html`)

Each major section is an `id`'d `<section>` so nav links and scrollspy can
target it directly:

| id            | Purpose                                                             |
| ------------- | ------------------------------------------------------------------- |
| `#hero`       | Name, typed tagline, GitHub/LinkedIn CTAs, hero background pattern. |
| `#about`      | Short personal summary paragraph.                                   |
| `#highlights` | Skills grid (`.highlight-card` per category, each a `.tag-list`).   |
| `#experience` | Work history as an `<ol class="timeline">`, newest role first.      |
| `#projects`   | Real side projects (`.project-card`); currently just "Intentional". |
| `#contact`    | GitHub/LinkedIn/email icon links.                                   |

All section headings (except the hero `<h1>`) share the `.section-title`
class and render as a terminal path prompt, e.g. `~/about$` — see
`.section-title`, `.prompt-path`, and `.prompt-end` in `style.css`.

## Personalization system

Three independent, persisted choices are each driven by an `data-*` attribute
on `<html>`, read from `localStorage`, and applied by the inline `<head>`
script _before_ first paint (so there's no flash of the wrong look):

- `data-theme` (`light`/`dark`) — toggled by `#theme-toggle`.
- `data-accent` (8 color presets) — chosen via `#accent-toggle` +
  `#accent-popover`.
- `data-pattern` (`waveform`/`grid`/`rings`/`noise`/`none`) — chosen via
  `#pattern-toggle` + `#pattern-popover`, controls the `.hero-bg` style.

Each has matching JS in `main.js` (`applyTheme`, `setAccent`, `setPattern`)
that updates the attribute, writes to `localStorage`, and syncs the
popover's `aria-pressed` states.

## Local preview

No build step — open `index.html` directly, or serve the folder with any static
server, e.g.:

```sh
npx serve .
```

## Deployment

Pushing to `main` publishes via GitHub Pages automatically.
