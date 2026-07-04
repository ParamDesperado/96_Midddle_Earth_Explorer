<div align="center">

<img src="https://em-content.zobj.net/source/apple/354/ring_1f48d.png" width="80" alt="One Ring" />

# 🏔️ Middle-earth Explorer

**The most beautiful Lord of the Rings encyclopedia on the web.**
Browse every book, movie, and character from Tolkien's universe — fully offline, no API key needed.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-66fcf1?style=for-the-badge&labelColor=0b0c10)](https://your-website.com)
[![Data Source](https://img.shields.io/badge/Data-The_One_API-45a29e?style=for-the-badge&labelColor=0b0c10)](https://the-one-api.dev)
[![License](https://img.shields.io/badge/License-MIT-c8a84b?style=for-the-badge&labelColor=0b0c10)](LICENSE)

</div>

---

## ✨ Features

| Feature | Details |
|---|---|
| 📖 **Books** | All 3 original Tolkien volumes with synopses |
| 🎬 **Movies** | Full stats: awards, box office, budget, runtime |
| ⚔️ **Characters** | 900+ characters with race-colored tags, birth/death, realm & wiki links |
| 🔍 **Live Search** | Instant client-side character search (press `/` to focus) |
| 📄 **Pagination** | First / Prev / Next / Last navigation |
| 📊 **Revenue Bars** | Animated box office comparison bars |
| 💫 **Particle FX** | Floating ambient particles in the background |
| 📵 **Fully Offline** | Zero API calls — all data pre-scraped into local JSON files |
| ♿ **Accessible** | ARIA roles, labels, and keyboard navigation throughout |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup with ARIA accessibility
- **Vanilla CSS3** — Glassmorphism, custom properties, keyframe animations
- **Vanilla JavaScript (ES2020)** — No frameworks, no dependencies, no build step
- **Data** — Static JSON scraped from [The One API](https://the-one-api.dev/)

---

## 🚀 Running Locally

This app reads local JSON files via `fetch()`. Because of browser security (CORS), you need to serve it from a local server — **not** just by opening the HTML file directly.

**If you have Python** (usually pre-installed on Mac/Linux):

```bash
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

**If you have Node.js:**

```bash
npx serve .
```

---

## 📁 Project Structure

```
📦 Middle-earth Explorer
├── index.html          ← Application markup
├── style.css           ← Full design system & animations
├── script.js           ← App logic, search & pagination
├── books.json          ← Pre-scraped book data
├── movies.json         ← Pre-scraped movie data
├── characters.json     ← Pre-scraped character data (~900 entries)
└── scrape.py           ← Data scraping script (for reference)
```

---

## 👨‍💻 Built By

<div align="center">

### Built by **Param Sangani**

### 🌐 Check out my portfolio & other projects:

## **[→ your-website.com ←](https://your-website.com)**

*I build premium web tools, games, and data projects.*
*If you like this project, visit my site — there's more where this came from.*

</div>

---

## 📜 Credits & Attribution

- **Story & Characters**: © J.R.R. Tolkien / The Tolkien Estate
- **Film Content**: © New Line Cinema / WingNut Films
- **API Data**: [The One API](https://the-one-api.dev/) by [gitHub/gitfrosh](https://github.com/gitfrosh)

---

<div align="center">
<sub>Built with ❤️ and a healthy obsession with Middle-earth</sub>
</div>
