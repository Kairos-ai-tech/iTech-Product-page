# AI學徒 iTech — Promotional Landing Page Design Spec

## Overview

A static promotional landing page for AI學徒 iTech, an AI+AR platform that digitizes and preserves Taiwan's manufacturing craft skills. The page targets multiple audiences (enterprises, government, individuals, investors) with a single scroll layout and a contact form CTA.

- **Language:** Bilingual — Traditional Chinese primary, English secondary (inline, not toggled)
- **Hosting:** GitHub Pages (no build step, no backend)
- **Style:** Teal/navy color scheme matching existing PDF brand identity

## File Structure

```
iTech-Product-page/
├── index.html        # Main page
├── styles.css        # All styles
├── script.js         # Scroll animations, mobile nav, form handling
├── assets/           # Icons, images (if any)
└── README.md         # (existing)
```

## Sections (7 total)

### 1. Hero 主視覺

- Full-viewport hero with gradient background (teal → navy)
- Main tagline: 「用科技傳承台灣職人技藝」
- Subtitle: "AI + AR — 讓師傅的40年功力，3個月傳給20歲新手"
- English subtitle: "Preserving Taiwan's craft mastery through AI + AR"
- 4 key stats in a horizontal bar:
  - 8,000 每年流失技術工
  - 400% 學習效率提升
  - 170億 年市場規模
  - 10K+ 創造就業機會
- Primary CTA button: 「聯絡我們 Contact Us」→ scrolls to contact section
- Sticky navbar at top: logo/brand name + section links (問題 / 技術 / 流程 / 成效 / 優勢 / 聯絡) + collapses to hamburger on mobile

### 2. Problem 台灣製造業生存危機

- Section heading with brief intro paragraph
- 3 cards side-by-side (stack on mobile):
  - **人才斷層嚴重** — 35% masters retiring in 5 years, only 12% youth willing, 8,000 lost/year
  - **傳承效率低落** — 2-5 year learning cycle, 15-25% error rate, tacit knowledge ("手感、聽聲音、憑經驗")
  - **產業轉型壓力** — 120K worker shortage (4.2%), SE Asia/China cost competition
- Blockquote: 「最會調模具的李師傅明年退休，他的技術沒人學得會。他走了，那些訂單就接不了了。」— 台中某模具廠老闆
- 3 loss figures in large type: 420億 技術斷層 / 180億 效率低落 / 95億 品質不穩

### 3. Solution iTech的三大技術創新

- Section heading with intro: transforms tacit knowledge into quantifiable, learnable, transferable digital assets
- 3 feature blocks, each with icon, title, description, and tech tags:

**① 隱性知識顯性化 Quantifying Tacit Knowledge**
- AI analyzes 100+ master operations to extract precise parameters
- Example metrics: sound frequency 800-1200Hz, duration 2.3±0.3s, speed 15cm/s, angle 45°±5°
- Tech: MediaPipe + Neural Networks

**② AR即時指導 Real-time AR Guidance**
- AR glasses or phone camera captures movements, AI compares in real-time
- Visual overlay: green skeleton = correct, red = incorrect, arrows = correction direction, voice prompts
- 60 FPS low-latency
- Tech: Three.js + WebXR

**③ AI智慧評分 AI Smart Scoring**
- Auto-generated learning reports with scores, detailed analysis, error pinpointing, improvement suggestions
- Example scores: accuracy 85 (good), timing 65 (needs work), fluency 58 (focus area)
- Tech: DTW time-series comparison + GPT

### 4. How It Works 完整學習流程

- Horizontal 4-step flow (vertical on mobile) with connecting lines/arrows:
  1. **師傅錄製** Master Recording — Multi-angle video capture of complete skill details
  2. **AI分析優化** AI Analysis — Auto-extract key points, build digital skill packages
  3. **學徒練習** Apprentice Practice — Watch tutorial → AR practice → AI scoring feedback
  4. **技能認證** Skill Certification — Achieve 80+ score to earn certification

### 5. Results 驚人成效

- Comparison table with 4 rows:

| Metric | Traditional | AI學徒 | Improvement |
|--------|------------|--------|-------------|
| 學習週期 Learning Period | 2-5 years | 3-9 months | ↓ 75% |
| 錯誤率 Error Rate | 15-25% | 6-10% | ↓ 60% |
| 師傅時間 Master's Time | 2-3 hrs/day | 0.5-1 hr/day | ↓ 70% |
| 廢料成本 Material Waste | 15-30萬/person | 3-6萬/person | ↓ 80% |

- Visual emphasis on the improvement percentages (large, colored)

### 6. Competitive Edge 差異化競爭優勢

- Comparison table vs alternatives:

| Method | Advantage | Disadvantage | iTech Edge |
|--------|-----------|-------------|------------|
| 傳統師徒制 | Hands-on | 2-5 years, not scalable | AI 4x faster + replicable |
| 教學影片 | Low cost | No interaction | AR guidance + AI scoring |
| VR訓練 | Immersive | Cost 50-100萬 | 1/10 cost + real operation |
| 文字SOP | Easy to store | Can't describe motion | Visual + quantified standards |

- 4 moat cards:
  - 技能數據庫 — Network effects, grows with usage
  - AI模型優勢 — Taiwan manufacturing-specific training data
  - 政府關係 — Industry standard setting, government backing
  - 師傅網絡 — Trust-driven referrals, community effects

### 7. Contact 聯絡我們

- Heading: 「讓我們一起用科技傳承技藝」
- Simple form fields:
  - 姓名 Name (text input)
  - Email (email input)
  - 身份 Role (dropdown: 企業 Enterprise / 政府機構 Government / 個人 Individual / 投資人 Investor / 其他 Other)
  - 訊息 Message (textarea)
  - Submit button: 「送出 Submit」
- Form action: `mailto:` link as fallback (no backend). Optionally integrate Formspree if user sets up an account.
- Footer below: copyright, brand name

## Visual Design

### Color Palette (from PDF)
- **Primary teal:** #0D9488 (headings, CTAs, accents)
- **Dark navy:** #1E3A5F (hero background, text)
- **Light teal background:** #E6FAF5 (card backgrounds, alternating sections)
- **White:** #FFFFFF (main background)
- **Text:** #333333 (body text)
- **Accent green:** #10B981 (positive metrics, improvement numbers)

### Typography
- Headings: system sans-serif stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`)
- Body: same stack
- Chinese text renders well with system fonts; no custom font loading needed

### Layout
- Max content width: 1200px, centered
- Section padding: 80px vertical (48px on mobile)
- Cards: CSS Grid, 3 columns → 1 column on mobile
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Animations
- Scroll-triggered fade-in using `IntersectionObserver` in script.js
- Navbar becomes opaque on scroll
- No heavy animation libraries

## Form Handling

Since GitHub Pages has no backend, the contact form uses one of:
1. **`mailto:` link** — opens user's email client with pre-filled fields (zero setup)
2. **Formspree** — free tier, form submissions forwarded to email (requires signup)

Default to `mailto:` for simplicity. Can switch to Formspree by changing the form's `action` attribute.

## Deployment

- Push to GitHub repo
- Enable GitHub Pages in repo settings (source: main branch, root `/`)
- No build step required
