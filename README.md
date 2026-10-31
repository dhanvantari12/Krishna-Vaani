# 🪷 Krishna Vaani — Daily Bhagavad Gita Wisdom

**A message from Krishna, for a brighter you.**

Krishna Vaani is a free, responsive website that shares uplifting teachings from the **Bhagavad Gita**. Visitors can discover a verse, read its meaning and a positive reflection, and explore the message in **English, Hindi, or Marathi**—without signing up or logging in.

🌐 **Live website:** [Visit Krishna Vaani](https://dhanvantari12.github.io/Krishna-Vaani/)

## ✨ Features

- **Fresh message on each visit:** Displays a Bhagavad Gita verse when the website opens.
- **Get Another Message:** Explore another verse with one click.
- **Three languages:** Read meanings and reflections in English, Hindi, and Marathi.
- **Sanskrit verses and references:** Each message includes its Bhagavad Gita chapter and verse reference.
- **Smart verse rotation:** A shuffled queue helps avoid repeated verses during a browsing cycle.
- **Copy and share:** Copy a message or share a link to a specific verse.
- **Favorites:** Save and revisit favorite verses in the same browser using local storage.
- **Responsive layout:** Designed for mobile phones, tablets, and desktop screens.
- **No login required:** Visitors can use the website freely.
- **Supporting pages:** About Us, Scripture Sources, Privacy Policy, Contact Us, and a custom 404 page.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| HTML5 | Website structure and content |
| CSS3 | Styling and responsive layout |
| JavaScript (Vanilla JS) | Message rotation, language switching, sharing, and favorites |
| JSON | Bhagavad Gita message collection |
| Browser `localStorage` | Saved favorites, language preference, and message rotation state |
| Git & GitHub | Version control and source-code hosting |
| GitHub Pages | Free static website deployment |

## 📁 Project Structure

```text
Krishna-Vaani/
├── index.html           # Main website
├── style.css            # Styles and responsive design
├── script.js            # Website functionality
├── messages.json        # Bhagavad Gita verse collection
├── about.html           # About the project
├── sources.html         # Scripture sources
├── privacy.html         # Privacy policy
├── contact.html         # Contact information
├── 404.html             # Custom page-not-found screen
├── robots.txt           # Search engine crawler guidance
├── sitemap.xml          # Sitemap for search engines
└── assets/
    ├── krishna.webp     # Optimized Krishna illustration
    └── favicon.png      # Website icon
```

> Some repositories may also contain the original `krishna.png` and a Google Search Console verification file.

## 🚀 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/dhanvantari12/Krishna-Vaani.git
   ```

2. Open the project folder:

   ```bash
   cd Krishna-Vaani
   ```

3. Start a local web server (Python 3):

   ```bash
   python -m http.server 8000
   ```

4. Open **http://localhost:8000/** in your browser.

> Use a local web server instead of opening `index.html` directly, because JavaScript loads `messages.json` using `fetch()`.

## 💡 How It Works

1. The website loads the messages from `messages.json`.
2. JavaScript selects a verse from a shuffled queue.
3. The page displays the Sanskrit verse, chapter/verse reference, meaning, and reflection.
4. Visitors can change languages without changing the selected verse.
5. Visitors can request another message, copy or share the current message, and save favorites.
6. Preferences and favorites are stored locally in the visitor's browser.

## 📖 Content and Purpose

Krishna Vaani is intended to make Bhagavad Gita teachings more accessible through short, encouraging reflections. The reflections are presented separately from the verse meanings; they are **not direct quotations from the scripture**.

For information about the scripture and references, see the [Scripture Sources page](https://dhanvantari12.github.io/Krishna-Vaani/sources.html).

## 🔒 Privacy

Krishna Vaani does not require user accounts. Favorites and language preferences are stored locally in the browser using `localStorage`.

Read the [Privacy Policy](https://dhanvantari12.github.io/Krishna-Vaani/privacy.html) for more information.

## 🌱 Future Possibilities

- Expand the collection with additional reviewed Bhagavad Gita verses.
- Continue improving accessibility and mobile performance.
- Add optional features based on visitor feedback.

## 👩‍💻 Project & Credits

Created as a **WebNest Studio** project.

**GitHub:** [dhanvantari12](https://github.com/dhanvantari12)  
**Website:** [Krishna Vaani](https://dhanvantari12.github.io/Krishna-Vaani/)

---

*Made with devotion 🪷*

**ॐ श्री कृष्णाय नमः**
