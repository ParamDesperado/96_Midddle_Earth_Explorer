# 🏔️ Middle-earth Explorer

**The most beautiful Lord of the Rings encyclopedia on the web.**
Browse every book, movie, and character from Tolkien's universe — fully offline, no API key needed.

[![Live Demo](https://96-midddle-earth-explorer.vercel.app/)
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

---
## 📜 Credits & Attribution

- **Story & Characters**: © J.R.R. Tolkien / The Tolkien Estate
- **Film Content**: © New Line Cinema / WingNut Films
- **API Data**: [The One API](https://the-one-api.dev/) by [gitHub/gitfrosh](https://github.com/gitfrosh)

---
