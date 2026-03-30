# iTech Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static promotional landing page for AI學徒 iTech with 7 sections, bilingual content, and a contact form — deployable on GitHub Pages.

**Architecture:** Single-page static site with 3 files: `index.html` (semantic HTML structure), `styles.css` (responsive styles with CSS Grid, custom properties for theming), `script.js` (scroll animations via IntersectionObserver, mobile nav toggle, form handling). No build step, no dependencies.

**Tech Stack:** HTML5, CSS3 (Grid, custom properties, media queries), vanilla JavaScript (IntersectionObserver API)

---

### Task 1: Base HTML Structure + Navbar

**Files:**
- Create: `index.html`
- Create: `styles.css`

- [ ] **Step 1: Create index.html with head, meta tags, and empty body structure**

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="AI學徒 iTech — 用科技傳承台灣職人技藝。AI + AR 讓師傅的40年功力，3個月傳給20歲新手。">
  <meta name="keywords" content="AI學徒, iTech, AR培訓, 技能傳承, 台灣製造業, AI training">
  <meta property="og:title" content="AI學徒 iTech — 用科技傳承台灣職人技藝">
  <meta property="og:description" content="AI + AR 讓師傅的40年功力，3個月傳給20歲新手">
  <meta property="og:type" content="website">
  <title>AI學徒 iTech — 用科技傳承台灣職人技藝</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo">AI學徒 iTech</a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span class="hamburger"></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="#problem">問題</a></li>
        <li><a href="#solution">技術</a></li>
        <li><a href="#process">流程</a></li>
        <li><a href="#results">成效</a></li>
        <li><a href="#advantage">優勢</a></li>
        <li><a href="#contact">聯絡</a></li>
      </ul>
    </div>
  </nav>

  <!-- Sections will be added in subsequent tasks -->

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create styles.css with CSS custom properties and navbar styles**

```css
/* ===== Custom Properties ===== */
:root {
  --color-teal: #0D9488;
  --color-navy: #1E3A5F;
  --color-teal-light: #E6FAF5;
  --color-white: #FFFFFF;
  --color-text: #333333;
  --color-green: #10B981;
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", sans-serif;
  --max-width: 1200px;
  --section-padding: 80px;
  --section-padding-mobile: 48px;
}

/* ===== Reset ===== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-stack);
  color: var(--color-text);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

/* ===== Container ===== */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== Section Common ===== */
.section {
  padding: var(--section-padding) 0;
}

.section-alt {
  background-color: var(--color-teal-light);
}

.section-title {
  font-size: 2.5rem;
  color: var(--color-navy);
  margin-bottom: 0.5rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* ===== Navbar ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background 0.3s, box-shadow 0.3s;
}

.navbar.scrolled {
  background: var(--color-navy);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-white);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-white);
  transition: transform 0.3s;
}

.hamburger {
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.nav-toggle.active .hamburger {
  background: transparent;
}

.nav-toggle.active .hamburger::before {
  top: 0;
  transform: rotate(45deg);
}

.nav-toggle.active .hamburger::after {
  top: 0;
  transform: rotate(-45deg);
}

/* ===== Scroll Animation ===== */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .section {
    padding: var(--section-padding-mobile) 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .nav-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--color-navy);
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
  }

  .nav-links.active {
    display: flex;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }
}
```

- [ ] **Step 3: Open index.html in browser and verify navbar renders**

Open `index.html` directly in browser. Navbar should be visible (transparent background, white text). Hamburger should appear at ≤768px width.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add base HTML structure and navbar styles"
```

---

### Task 2: Hero Section

**Files:**
- Modify: `index.html` (add hero section after `</nav>`)

- [ ] **Step 1: Add hero section HTML to index.html after the closing `</nav>` tag**

```html
  <section class="hero" id="hero">
    <div class="container">
      <h1 class="hero-title">用科技傳承台灣職人技藝</h1>
      <p class="hero-subtitle-zh">AI + AR — 讓師傅的 40 年功力，3 個月傳給 20 歲新手</p>
      <p class="hero-subtitle-en">Preserving Taiwan's craft mastery through AI + AR</p>
      <a href="#contact" class="hero-cta">聯絡我們 Contact Us</a>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">8,000</span>
          <span class="stat-label">每年流失技術工</span>
        </div>
        <div class="stat">
          <span class="stat-number">400%</span>
          <span class="stat-label">學習效率提升</span>
        </div>
        <div class="stat">
          <span class="stat-number">170億</span>
          <span class="stat-label">年市場規模</span>
        </div>
        <div class="stat">
          <span class="stat-number">10K+</span>
          <span class="stat-label">創造就業機會</span>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add hero styles to styles.css before the responsive section**

Add before the `/* ===== Scroll Animation ===== */` comment:

```css
/* ===== Hero ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, var(--color-navy) 0%, #0f4c75 50%, var(--color-teal) 100%);
  color: var(--color-white);
  padding: 120px 0 80px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle-zh {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.95;
}

.hero-subtitle-en {
  font-size: 1.1rem;
  opacity: 0.75;
  font-style: italic;
  margin-bottom: 2.5rem;
}

.hero-cta {
  display: inline-block;
  padding: 16px 40px;
  background: var(--color-teal);
  color: var(--color-white);
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: background 0.3s, transform 0.2s;
}

.hero-cta:hover {
  background: #0b7f74;
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 4px;
}
```

Add hero responsive rules inside the existing `@media (max-width: 768px)` block:

```css
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle-zh {
    font-size: 1.2rem;
  }

  .hero-stats {
    gap: 24px;
  }

  .stat-number {
    font-size: 1.8rem;
  }
```

- [ ] **Step 3: Verify hero renders correctly in browser**

Open `index.html`. Hero should fill the viewport with gradient background, centered text, CTA button, and 4 stats.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add hero section with stats and CTA"
```

---

### Task 3: Problem Section

**Files:**
- Modify: `index.html` (add after hero section)
- Modify: `styles.css` (add problem styles)

- [ ] **Step 1: Add problem section HTML after `</section>` of hero**

```html
  <section class="section section-alt" id="problem">
    <div class="container">
      <h2 class="section-title fade-in">台灣製造業生存危機</h2>
      <p class="section-subtitle fade-in">Taiwan's Manufacturing Survival Crisis</p>

      <div class="cards-3 fade-in">
        <div class="card">
          <div class="card-icon">👤</div>
          <h3 class="card-title">人才斷層嚴重</h3>
          <p class="card-en">Critical Talent Gap</p>
          <ul class="card-list">
            <li><strong>35%</strong> 師傅（60歲+）將在5年內退休</li>
            <li>僅 <strong>12%</strong> 年輕人願投入製造業</li>
            <li>年損失 <strong>8,000</strong> 位資深技術工</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-icon">⏱️</div>
          <h3 class="card-title">傳承效率低落</h3>
          <p class="card-en">Low Transfer Efficiency</p>
          <ul class="card-list">
            <li>傳統學習週期：<strong>2-5 年</strong></li>
            <li>新手錯誤率：<strong>15-25%</strong></li>
            <li>隱性知識難傳遞：「要有手感」「聽聲音」「憑經驗」</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-icon">📉</div>
          <h3 class="card-title">產業轉型壓力</h3>
          <p class="card-en">Industry Transformation Pressure</p>
          <ul class="card-list">
            <li>製造業缺工 <strong>12萬人</strong>（缺工率4.2%）</li>
            <li>東南亞/中國人力成本競爭</li>
            <li>技術優勢流失 = 失去生存空間</li>
          </ul>
        </div>
      </div>

      <blockquote class="quote fade-in">
        <p>「最會調模具的李師傅明年退休，他的技術沒人學得會。他走了，那些訂單就接不了了。」</p>
        <cite>— 台中某模具廠老闆</cite>
      </blockquote>

      <div class="loss-stats fade-in">
        <div class="loss-item">
          <span class="loss-number">420億</span>
          <span class="loss-label">技術斷層損失</span>
        </div>
        <div class="loss-item">
          <span class="loss-number">180億</span>
          <span class="loss-label">效率低落損失</span>
        </div>
        <div class="loss-item">
          <span class="loss-number">95億</span>
          <span class="loss-label">品質不穩損失</span>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add problem styles to styles.css before scroll animation section**

```css
/* ===== Cards ===== */
.cards-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 3rem;
}

.card {
  background: var(--color-white);
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.25rem;
  color: var(--color-navy);
  margin-bottom: 4px;
}

.card-en {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 16px;
}

.card-list {
  list-style: none;
  font-size: 0.95rem;
  line-height: 1.8;
}

.card-list li {
  padding-left: 0;
}

/* ===== Quote ===== */
.quote {
  background: var(--color-white);
  border-left: 4px solid var(--color-teal);
  padding: 24px 32px;
  border-radius: 0 12px 12px 0;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  color: var(--color-navy);
}

.quote cite {
  display: block;
  margin-top: 12px;
  font-size: 0.9rem;
  color: #888;
  font-style: normal;
}

/* ===== Loss Stats ===== */
.loss-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.loss-item {
  text-align: center;
}

.loss-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  color: #dc2626;
}

.loss-label {
  font-size: 0.95rem;
  color: #666;
}
```

Add inside the existing `@media (max-width: 768px)` block:

```css
  .cards-3 {
    grid-template-columns: 1fr;
  }

  .loss-stats {
    gap: 24px;
  }

  .loss-number {
    font-size: 2.2rem;
  }
```

- [ ] **Step 3: Verify in browser — 3 cards, quote, loss figures visible**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add problem section with crisis cards and loss stats"
```

---

### Task 4: Solution Section

**Files:**
- Modify: `index.html` (add after problem section)
- Modify: `styles.css` (add solution/feature styles)

- [ ] **Step 1: Add solution section HTML after problem section**

```html
  <section class="section" id="solution">
    <div class="container">
      <h2 class="section-title fade-in">iTech 的三大技術創新</h2>
      <p class="section-subtitle fade-in">Three Core Technology Innovations</p>

      <div class="features fade-in">
        <div class="feature">
          <div class="feature-number">01</div>
          <div class="feature-content">
            <h3 class="feature-title">隱性知識顯性化</h3>
            <p class="feature-en">Quantifying Tacit Knowledge</p>
            <p class="feature-desc">AI 分析師傅 100 次操作後，建立精確參數，將「要有手感」「聽聲音」等隱性知識轉化為可量化標準。</p>
            <div class="feature-metrics">
              <span class="metric">聲音頻率 800-1200 Hz</span>
              <span class="metric">持續時間 2.3 ± 0.3 秒</span>
              <span class="metric">移動速度 15 cm/秒</span>
              <span class="metric">焊槍角度 45° ± 5°</span>
            </div>
            <div class="tech-tags">
              <span class="tag">MediaPipe</span>
              <span class="tag">Neural Networks</span>
            </div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-number">02</div>
          <div class="feature-content">
            <h3 class="feature-title">AR 即時指導</h3>
            <p class="feature-en">Real-time AR Guidance</p>
            <p class="feature-desc">學徒使用 AR 眼鏡或手機，攝影機捕捉動作後 AI 即時比對標準，透過 AR 疊加視覺化指導。60 FPS 低延遲確保流暢學習體驗。</p>
            <div class="feature-metrics">
              <span class="metric correct">✓ 綠色骨架 = 動作正確</span>
              <span class="metric incorrect">✗ 紅色骨架 = 動作錯誤</span>
              <span class="metric">→ 箭頭指示修正方向</span>
              <span class="metric">🔊 語音即時提示</span>
            </div>
            <div class="tech-tags">
              <span class="tag">Three.js</span>
              <span class="tag">WebXR</span>
            </div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-number">03</div>
          <div class="feature-content">
            <h3 class="feature-title">AI 智慧評分</h3>
            <p class="feature-en">AI Smart Scoring</p>
            <p class="feature-desc">系統自動生成詳細學習報告，提供綜合評分、細項分析、錯誤定位與改善建議。</p>
            <div class="feature-metrics">
              <span class="metric">動作準確度 85分（優良）</span>
              <span class="metric">時機掌握 65分（需改善）</span>
              <span class="metric">流暢度 58分（重點加強）</span>
            </div>
            <div class="tech-tags">
              <span class="tag">DTW</span>
              <span class="tag">GPT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add feature styles to styles.css before scroll animation section**

```css
/* ===== Features ===== */
.features {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.feature {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.feature-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-teal);
  opacity: 0.3;
  min-width: 80px;
  line-height: 1;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.5rem;
  color: var(--color-navy);
  margin-bottom: 4px;
}

.feature-en {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 16px;
}

.feature-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.metric {
  background: var(--color-teal-light);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--color-navy);
}

.metric.correct {
  background: #dcfce7;
  color: #166534;
}

.metric.incorrect {
  background: #fee2e2;
  color: #991b1b;
}

.tech-tags {
  display: flex;
  gap: 8px;
}

.tag {
  background: var(--color-navy);
  color: var(--color-white);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}
```

Add inside the existing `@media (max-width: 768px)` block:

```css
  .feature {
    flex-direction: column;
    gap: 12px;
  }

  .feature-number {
    font-size: 2rem;
  }
```

- [ ] **Step 3: Verify in browser — 3 feature blocks with metrics and tech tags**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add solution section with 3 tech innovations"
```

---

### Task 5: How It Works Section

**Files:**
- Modify: `index.html` (add after solution section)
- Modify: `styles.css` (add process styles)

- [ ] **Step 1: Add process section HTML after solution section**

```html
  <section class="section section-alt" id="process">
    <div class="container">
      <h2 class="section-title fade-in">完整學習流程</h2>
      <p class="section-subtitle fade-in">How It Works</p>

      <div class="process-steps fade-in">
        <div class="step">
          <div class="step-icon">📹</div>
          <div class="step-number">1</div>
          <h3 class="step-title">師傅錄製</h3>
          <p class="step-en">Master Recording</p>
          <p class="step-desc">多角度拍攝操作影片，捕捉完整技能細節</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-icon">🔍</div>
          <div class="step-number">2</div>
          <h3 class="step-title">AI 分析優化</h3>
          <p class="step-en">AI Analysis</p>
          <p class="step-desc">自動提取關鍵點，建立數位技能包</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-icon">🥽</div>
          <div class="step-number">3</div>
          <h3 class="step-title">學徒練習</h3>
          <p class="step-en">Apprentice Practice</p>
          <p class="step-desc">觀看教學 → AR 跟練 → AI 評分反饋</p>
        </div>
        <div class="step-arrow">→</div>
        <div class="step">
          <div class="step-icon">🏆</div>
          <div class="step-number">4</div>
          <h3 class="step-title">技能認證</h3>
          <p class="step-en">Skill Certification</p>
          <p class="step-desc">達到 80 分標準後獲得技能認證</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add process styles to styles.css before scroll animation section**

```css
/* ===== Process Steps ===== */
.process-steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
}

.step {
  flex: 1;
  max-width: 220px;
  text-align: center;
  background: var(--color-white);
  padding: 32px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.step-icon {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.step-number {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background: var(--color-teal);
  color: var(--color-white);
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.step-title {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 4px;
}

.step-en {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--color-teal);
  margin-top: 60px;
  font-weight: 700;
}
```

Add inside the existing `@media (max-width: 768px)` block:

```css
  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .step {
    max-width: 100%;
    width: 100%;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin-top: 0;
  }
```

- [ ] **Step 3: Verify in browser — 4 steps with arrows between them**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add how-it-works process section"
```

---

### Task 6: Results Section

**Files:**
- Modify: `index.html` (add after process section)
- Modify: `styles.css` (add table styles)

- [ ] **Step 1: Add results section HTML after process section**

```html
  <section class="section" id="results">
    <div class="container">
      <h2 class="section-title fade-in">驚人成效</h2>
      <p class="section-subtitle fade-in">Proven Results</p>

      <div class="results-table-wrap fade-in">
        <table class="results-table">
          <thead>
            <tr>
              <th>指標 Metric</th>
              <th>傳統方式 Traditional</th>
              <th>AI學徒 iTech</th>
              <th>改善幅度 Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>學習週期 <span class="table-en">Learning Period</span></td>
              <td>2-5 年</td>
              <td class="highlight">3-9 個月</td>
              <td><span class="improvement">↓ 75%</span></td>
            </tr>
            <tr>
              <td>錯誤率 <span class="table-en">Error Rate</span></td>
              <td>15-25%</td>
              <td class="highlight">6-10%</td>
              <td><span class="improvement">↓ 60%</span></td>
            </tr>
            <tr>
              <td>師傅時間 <span class="table-en">Master's Time</span></td>
              <td>2-3 小時/天</td>
              <td class="highlight">0.5-1 小時/天</td>
              <td><span class="improvement">↓ 70%</span></td>
            </tr>
            <tr>
              <td>廢料成本 <span class="table-en">Material Waste</span></td>
              <td>15-30 萬/人</td>
              <td class="highlight">3-6 萬/人</td>
              <td><span class="improvement">↓ 80%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add table styles to styles.css before scroll animation section**

```css
/* ===== Results Table ===== */
.results-table-wrap {
  overflow-x: auto;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.results-table thead {
  background: var(--color-navy);
  color: var(--color-white);
}

.results-table th,
.results-table td {
  padding: 16px 24px;
  text-align: left;
  font-size: 0.95rem;
}

.results-table tbody tr {
  border-bottom: 1px solid #eee;
}

.results-table tbody tr:last-child {
  border-bottom: none;
}

.results-table .highlight {
  color: var(--color-teal);
  font-weight: 600;
}

.table-en {
  display: block;
  font-size: 0.8rem;
  color: #999;
  font-weight: normal;
}

.improvement {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
}
```

- [ ] **Step 3: Verify in browser — table with colored improvement badges**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add results comparison table section"
```

---

### Task 7: Competitive Edge Section

**Files:**
- Modify: `index.html` (add after results section)
- Modify: `styles.css` (add advantage styles)

- [ ] **Step 1: Add competitive edge section HTML after results section**

```html
  <section class="section section-alt" id="advantage">
    <div class="container">
      <h2 class="section-title fade-in">差異化競爭優勢</h2>
      <p class="section-subtitle fade-in">Competitive Advantages</p>

      <div class="results-table-wrap fade-in">
        <table class="results-table">
          <thead>
            <tr>
              <th>方案 Method</th>
              <th>優點 Advantage</th>
              <th>缺點 Disadvantage</th>
              <th>iTech 差異化</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>傳統師徒制</td>
              <td>手把手教學</td>
              <td>2-5年，無法規模化</td>
              <td><span class="edge-tag">AI 加速 4 倍 + 可複製</span></td>
            </tr>
            <tr>
              <td>教學影片</td>
              <td>成本低</td>
              <td>無互動，看不出錯</td>
              <td><span class="edge-tag">AR 即時指導 + AI 評分</span></td>
            </tr>
            <tr>
              <td>VR 訓練</td>
              <td>沉浸感強</td>
              <td>成本高 50-100萬</td>
              <td><span class="edge-tag">成本僅 1/10 + 真實操作</span></td>
            </tr>
            <tr>
              <td>文字 SOP</td>
              <td>易保存</td>
              <td>無法描述動作細節</td>
              <td><span class="edge-tag">視覺化 + 量化標準</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="moats fade-in">
        <div class="moat-card">
          <div class="moat-icon">🗄️</div>
          <h3 class="moat-title">技能數據庫</h3>
          <p class="moat-en">Skill Database</p>
          <p class="moat-desc">網絡效應，越用越強，累積專屬台灣製造業的技能知識庫</p>
        </div>
        <div class="moat-card">
          <div class="moat-icon">🧠</div>
          <h3 class="moat-title">AI 模型優勢</h3>
          <p class="moat-en">AI Model Edge</p>
          <p class="moat-desc">針對台灣製造業專屬數據訓練，精準度持續提升</p>
        </div>
        <div class="moat-card">
          <div class="moat-icon">🏛️</div>
          <h3 class="moat-title">政府關係</h3>
          <p class="moat-en">Government Relations</p>
          <p class="moat-desc">優先建立行業標準，取得政府背書與資源支持</p>
        </div>
        <div class="moat-card">
          <div class="moat-icon">🤝</div>
          <h3 class="moat-title">師傅網絡</h3>
          <p class="moat-en">Master Network</p>
          <p class="moat-desc">信任後主動推薦，口碑傳播形成社群效應</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add advantage styles to styles.css before scroll animation section**

```css
/* ===== Edge Tags ===== */
.edge-tag {
  display: inline-block;
  background: var(--color-teal);
  color: var(--color-white);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* ===== Moat Cards ===== */
.moats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 3rem;
}

.moat-card {
  background: var(--color-white);
  padding: 28px 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--color-teal);
}

.moat-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.moat-title {
  font-size: 1.1rem;
  color: var(--color-navy);
  margin-bottom: 4px;
}

.moat-en {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 8px;
}

.moat-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}
```

Add inside the existing `@media (max-width: 768px)` block:

```css
  .moats {
    grid-template-columns: repeat(2, 1fr);
  }
```

Add inside the existing `@media (max-width: 480px)` block:

```css
  .moats {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 3: Verify in browser — comparison table and 4 moat cards**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add competitive edge section with moat cards"
```

---

### Task 8: Contact Section + Footer

**Files:**
- Modify: `index.html` (add after advantage section)
- Modify: `styles.css` (add form and footer styles)

- [ ] **Step 1: Add contact section and footer HTML after advantage section**

```html
  <section class="section" id="contact">
    <div class="container">
      <h2 class="section-title fade-in">讓我們一起用科技傳承技藝</h2>
      <p class="section-subtitle fade-in">Let's Preserve Craftsmanship Together</p>

      <form class="contact-form fade-in" id="contactForm">
        <div class="form-group">
          <label for="name">姓名 Name</label>
          <input type="text" id="name" name="name" required placeholder="您的姓名">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required placeholder="you@example.com">
        </div>
        <div class="form-group">
          <label for="role">身份 Role</label>
          <select id="role" name="role" required>
            <option value="" disabled selected>請選擇 Select</option>
            <option value="enterprise">企業 Enterprise</option>
            <option value="government">政府機構 Government</option>
            <option value="individual">個人 Individual</option>
            <option value="investor">投資人 Investor</option>
            <option value="other">其他 Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">訊息 Message</label>
          <textarea id="message" name="message" rows="5" placeholder="請輸入您的訊息..."></textarea>
        </div>
        <button type="submit" class="form-submit">送出 Submit</button>
      </form>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 AI學徒 iTech. All rights reserved.</p>
    </div>
  </footer>
```

- [ ] **Step 2: Add form and footer styles to styles.css before scroll animation section**

```css
/* ===== Contact Form ===== */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--font-stack);
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-teal);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.form-submit {
  width: 100%;
  padding: 14px;
  background: var(--color-teal);
  color: var(--color-white);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.form-submit:hover {
  background: #0b7f74;
}

/* ===== Footer ===== */
.footer {
  background: var(--color-navy);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 24px 0;
  font-size: 0.9rem;
}
```

- [ ] **Step 3: Verify in browser — form with all fields and footer**

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: add contact form and footer"
```

---

### Task 9: JavaScript — Scroll Animations, Navbar, and Form

**Files:**
- Create: `script.js`

- [ ] **Step 1: Create script.js with all interactive behavior**

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // ===== Sticky navbar background on scroll =====
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== Scroll-triggered fade-in animations =====
  var fadeElements = document.querySelectorAll('.fade-in');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ===== Contact form — mailto fallback =====
  var contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var role = document.getElementById('role').value;
    var message = document.getElementById('message').value;

    var subject = encodeURIComponent('AI學徒 iTech — 聯絡表單 from ' + name);
    var body = encodeURIComponent(
      '姓名 Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      '身份 Role: ' + role + '\n\n' +
      '訊息 Message:\n' + message
    );

    window.location.href = 'mailto:contact@itech.com?subject=' + subject + '&body=' + body;
  });
});
```

- [ ] **Step 2: Verify in browser**

Test all interactive features:
1. Scroll down — navbar should get navy background
2. Resize to ≤768px — hamburger appears, toggles mobile menu
3. Click nav link — smooth scrolls to section, mobile menu closes
4. Scroll past sections — elements fade in
5. Fill and submit contact form — opens email client with pre-filled content

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add scroll animations, mobile nav, and form handling"
```

---

### Task 10: Add .gitignore and Final Polish

**Files:**
- Create: `.gitignore`
- Modify: `index.html` (add favicon meta tag)

- [ ] **Step 1: Create .gitignore**

```
.superpowers/
.DS_Store
```

- [ ] **Step 2: Add favicon fallback to index.html head section**

Add inside `<head>` after the `<meta property="og:type">` tag:

```html
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>">
```

- [ ] **Step 3: Final visual check in browser at desktop and mobile widths**

Verify:
- All 7 sections render correctly
- Responsive layout at 768px and 480px breakpoints
- All animations trigger on scroll
- Navbar sticks and changes background
- Contact form submits via mailto
- No horizontal scrollbar at any width

- [ ] **Step 4: Commit**

```bash
git add .gitignore index.html
git commit -m "chore: add gitignore and favicon"
```
