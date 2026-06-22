# 🎓 Rajalakshmi Engineering College — Official Website
### Premium Flask Web Application | Dark Theme | Animations | 360° Tour | AI Chatbot

---

## 🚀 Quick Start

```bash
# 1. Navigate to project folder
cd college_website

# 2. Install Python dependencies
pip install flask openpyxl

# 3. Add your assets (see Asset Setup below)

# 4. Launch!
python app.py

# 5. Open browser → http://localhost:5000
```

---

## 📁 Full Project Structure

```
college_website/
│
├── app.py                    ← Flask app + all routes + chatbot API + Excel saving
├── requirements.txt          ← flask, openpyxl
├── chatbot_leads.xlsx        ← Auto-created — stores name/email/phone from chatbot
├── README.md                 ← This file
│
├── static/
│   ├── css/
│   │   └── main.css          ← Full dark-theme premium CSS (2500+ lines)
│   ├── js/
│   │   └── main.js           ← GSAP, cursor, particles, countup, chatbot, tilt
│   │
│   ├── images/               ← ⚠️ COPY YOUR IMAGES HERE
│   │   ├── logo.png
│   │   ├── life.jpg
│   │   ├── life1.jpg
│   │   ├── sports.jpg
│   │   ├── alumni.jpg
│   │   ├── alumni1.jpg
│   │   ├── placement.jpg
│   │   ├── dr_babu.jpg
│   │   ├── innovation.jpg
│   │   ├── diwali.jpg
│   │   └── investiture.jpg
│   │
│   └── videos/               ← ⚠️ COPY YOUR 360° VIDEOS HERE
│       ├── architecture_block.MP4
│       ├── BRIDGE FROM D BLOCK TO C BLOCK.MP4
│       ├── canteen.MP4
│       ├── civil_lab.MP4
│       ├── idea_factory.MP4
│       └── idea_factory_lab.MP4
│
└── templates/
    ├── base.html             ← Navbar + chatbot widget + footer + page transition
    ├── index.html            ← Homepage: hero, stats, carousel, events, quote, recruiters
    ├── about.html            ← Leadership, legacy, collaborations
    ├── academics.html        ← Departments, curriculum highlights
    ├── admissions.html       ← Application form
    ├── placements.html       ← Stats, top recruiters, placed students
    ├── research.html         ← Research centers, publications
    ├── life.html             ← Gallery, events calendar, Instagram CTA
    ├── facilities.html       ← All 9 facility categories
    ├── alumni.html           ← Network stats, notable alumni, register CTA
    ├── tour360.html          ← Interactive 360° video player with switcher
    ├── contact.html          ← Contact form + map + social links
    ├── naac.html             ← Accreditation details
    └── anti_ragging.html     ← Policy + online complaint form
```

---

## 🖼️ Asset Setup

### Copy Your Images
```bash
cp /path/to/your/images/*.jpg  static/images/
cp /path/to/your/images/logo.png static/images/
```

### Copy Your 360° Videos
```bash
# IMPORTANT: Keep exact filenames (spaces included)
cp "/path/to/360-videos/architecture_block.MP4"             "static/videos/"
cp "/path/to/360-videos/BRIDGE FROM D BLOCK TO C BLOCK.MP4" "static/videos/"
cp "/path/to/360-videos/canteen.MP4"                        "static/videos/"
cp "/path/to/360-videos/civil_lab.MP4"                      "static/videos/"
cp "/path/to/360-videos/idea_factory.MP4"                   "static/videos/"
cp "/path/to/360-videos/idea_factory_lab.MP4"               "static/videos/"
```

---

## ✨ Feature Overview

| Feature | Technology | Description |
|---|---|---|
| **Stunning Dark UI** | Custom CSS | Purple/gold theme, Playfair + Space Grotesk fonts |
| **Smooth Page Transitions** | Vanilla JS | Slide overlay between every page |
| **Custom Cursor** | CSS + JS | Purple/gold magnetic cursor (desktop) |
| **Particle Hero** | CSS Keyframes | 30 animated floating particles |
| **GSAP Animations** | GSAP 3 + ScrollTrigger | Hero entrance, parallax orbs |
| **Scroll Animations** | AOS.js | Section reveals with stagger |
| **Card 3D Tilt** | Vanilla JS | Perspective tilt on hover for cards |
| **Magnetic Buttons** | Vanilla JS | Buttons follow cursor on hover |
| **Animated Counters** | Custom JS | CountUp on scroll for all stats |
| **Typewriter Effect** | Vanilla JS | Hero subtext cycles through phrases |
| **Life Carousel** | Swiper.js | Auto-playing image slider with nav |
| **Recruiter Strip** | CSS Animation | Infinite horizontal scroll |
| **360° Tour** | HTML5 Video | Multi-location switcher + progress bar |
| **AI Chatbot** | Flask + Fetch API | Multi-step onboarding → smart keyword responses |
| **Excel Lead Saving** | openpyxl | Name/email/phone saved to `chatbot_leads.xlsx` |
| **Quick Replies** | Chatbot JS | One-tap topic buttons after onboarding |
| **Back to Top** | JS | Smooth scroll, appears after 400px |
| **Easter Egg** | Konami Code | ↑↑↓↓←→←→BA unlocks gradient mode |
| **Social Links** | HTML | Real REC Instagram/Facebook/Twitter/LinkedIn |
| **Google Map** | Embed | Campus location embedded on contact page |
| **13 Full Pages** | Jinja2 | Every nav link leads to a themed page |
| **Mobile Responsive** | Bootstrap 5 | Works on all screen sizes |

---

## 🤖 Chatbot Keywords

The chatbot responds to these keywords in any message:

| Keyword | Topic |
|---|---|
| `admission` | Admissions info |
| `placement` | Placement stats & companies |
| `fee` | Fee structure |
| `course` / `branch` | Programs offered |
| `hostel` | Hostel facilities |
| `sports` | Sports facilities |
| `naac` | Accreditation |
| `transport` | Bus routes |
| `library` | Library resources |
| `contact` | Address & phone |
| `scholarship` | Scholarship info |
| `events` | Campus events |
| `research` | Research centers |

---

## 🔗 Social Media Links (Official REC)

- 📸 Instagram: https://www.instagram.com/rajalakshmi_engineering_college
- 👍 Facebook: https://www.facebook.com/RajalakshmiEngineeringCollege
- 🐦 Twitter/X: https://twitter.com/rec_thandalam
- 💼 LinkedIn: https://www.linkedin.com/school/rajalakshmi-engineering-college
- 📺 YouTube: https://www.youtube.com/@RajalakshmiEngineeringCollege

---

## 🛠️ Customization Guide

### Change Theme Colors
Edit `/static/css/main.css` — `:root` variables:
```css
--rec-purple: #6B21A8;        /* Main purple */
--rec-purple-light: #9333EA;  /* Lighter purple */
--rec-gold: #F59E0B;          /* Gold accent */
```

### Add Chatbot Responses
Edit `app.py` → `chatbot()` function → `responses` dict:
```python
responses = {
  'your_keyword': 'Your response text here.',
  ...
}
```

### View Collected Leads
Open `chatbot_leads.xlsx` — each row is one chat session with timestamp, name, email, phone.

### Add Google Analytics
In `base.html`, uncomment and add your GA4 ID in the `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Videos not loading | Check filenames match exactly (caps, spaces) |
| Images not showing | Ensure files are in `static/images/` |
| Port already in use | Run `python app.py` — Flask defaults to 5000 |
| Excel not created | Run `python -c "from app import init_excel; init_excel()"` |
| `ModuleNotFoundError` | Run `pip install flask openpyxl` |

---

## 📞 College Contact

- **Address:** Thandalam, Chennai - 602 105, Tamil Nadu, India  
- **Phone:** 044-26810103  
- **Email:** info@rajalakshmi.org  
- **Website:** www.rec.ac.in

---

*Built with ❤️ for Rajalakshmi Engineering College — Chennai's Premier Engineering Institute*
