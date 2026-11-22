# markockiadam.com

My personal website: a digital business card and portfolio.
Plain HTML, CSS and JavaScript. No build step. Hosted free on GitHub Pages.

## Change the text

**Almost everything lives in [`content.js`](content.js):** projects, links, journey, and all three languages (EN / PL / FR).
Lines marked `// TODO` still need real info.

- **New project:** copy one `{ ... }` block in `projects` and edit it.
- **Photo:** put a square image in `assets/` (e.g. `assets/adam.jpg`) and set `photo: "assets/adam.jpg"`.
- **Email:** set `email:`. The "Email me" button only appears once this is set.
- **Icons:** `trophy, globe, block, book, heart, chart, star, flag, crown, pick, grid, mail`.

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish on GitHub Pages

1. Merge into `main`.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
3. **Custom domain:** enter `markockiadam.com` (the `CNAME` file is already here) and tick **Enforce HTTPS** once it's available.

### DNS (at the place you bought the domain)

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | markockiadam.github.io |

DNS can take up to 24 h. Until it's set up, the github.io address redirects to the domain, so the site won't load before DNS works.

## What's inside

| File | What it does |
|------|--------------|
| `index.html` | Page structure |
| `styles.css` | All styling (day + night themes) |
| `content.js` | All text and links |
| `js/sky.js` | The animated pixel sky (WebGL) |
| `js/meadow.js` | Pixel grass at the bottom |
| `js/icons.js` | Pixel icons |
| `js/main.js` | Languages, heatmap, hotbar, achievements, sound |

Keyboard: press **1–6** to jump between sections, like a hotbar.
