# andrewjstuart.com

Source for my personal site — a living resume rather than a traditional project
portfolio. Built with plain HTML/CSS/JS, no build step or dependencies.

**Live:** https://andrewjstuart.com

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
  main.js          Theme/accent toggles, scroll reveal, scrollspy, terminal easter egg
assets/            Favicon, images
```

## Local preview

No build step — open `index.html` directly, or serve the folder with any static
server, e.g.:

```sh
npx serve .
```

## Deployment

Pushing to `main` publishes via GitHub Pages automatically.
