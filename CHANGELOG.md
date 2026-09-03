# 版本紀錄 Version Log

iTech 產品頁（https://itech.kairosaitech.com/）的版本紀錄。日期為該版本主要變更合併至 `main` 的日期；頁面上的「版本紀錄」區塊為本檔的摘要。

Version log for the iTech product page. Dates are when the version's main changes landed on `main`; the on-page "Version log" block is a summary of this file.

---

## v1.3 — 2026-09-03 · 稽核日誌與規範規則庫 / Audit log & rule library

### 新增 Added
- **稽核日誌（Audit log）**：新增「稽核與規範」區塊，說明平台對每一個動作（施工圖匯入、下料、AR 就位、AI 驗證、修正、竣工簽章）寫入精確到秒的時間戳記、操作者與裝置，存入僅可追加、逐筆雜湊鏈結的日誌，並可依案場、樓層或時間區間匯出。
  New "Audit & Codes" section: every action (drawing import, cut list, AR placement, AI verification, correction, as-built signature) gets a timestamp to the second plus operator and device, written to an append-only, hash-chained log that exports by site, floor or time range.
- **示意稽核日誌面板**：以樣本資料呈現一天的時間軸（匯入 → 下料 → 就位 → 偏差 → 複驗 → 簽章）。
  Sample audit-log panel showing one day's timeline (import → cut list → placement → deviation → re-verify → sign-off).
- **鋼筋規則庫（EU / USA / 台灣）**：新增三地基本規則對照表 — 設計規範、鋼筋材料標準、施工與容許誤差規範、最小保護層、鋼筋淨間距、彎鉤與最小彎曲直徑、搭接長度、保護層容許誤差。
  Rebar rule library table for the EU, the USA and Taiwan: design code, rebar material standard, execution & tolerance spec, minimum cover, clear bar spacing, hooks & minimum bend diameter, lap splice length, cover tolerance.
  - EU: EN 1992-1-1 (Eurocode 2), EN 10080, EN 13670
  - USA: ACI 318-19, ACI 117 / ACI 301, ASTM A615 / A706
  - Taiwan: 內政部《混凝土結構設計規範》, CNS 560, 公共工程施工綱要規範第 03210 章
- **常見問題 Q6**：「iTech 如何記錄與稽核現場的每一個動作？」（頁面 + FAQPage JSON-LD）。
  FAQ Q6 "How does iTech record and audit every action on site?" on the page and in the FAQPage JSON-LD.
- **頁面版本紀錄區塊** 與本 `CHANGELOG.md`。
  On-page version-log block and this `CHANGELOG.md`.
- 導覽列新增「稽核 / Audit」連結。
  "Audit" link in the navigation bar.

### 變更 Changed
- 8 個語系（繁中、英、日、西、法、德、義、葡）各新增 66 個翻譯鍵。
  66 new translation keys in each of the 8 locales (zh-TW, en, ja, es, fr, de, it, pt).
- meta description / keywords、SoftwareApplication JSON-LD 描述與 `llms.txt` 提及稽核日誌與規則庫。
  Meta description / keywords, the SoftwareApplication JSON-LD description and `llms.txt` now mention the audit log and rule library.
- 導覽列：容器加寬至 1320px、連結間距 28px → 22px，西/葡語「常見問題」改為 FAQ、德語「免費試點」縮短為 Pilotprojekt，修正西、葡語導覽列原本就超出容器的問題；桌面版切換為漢堡選單的斷點由 1200px 調整為 1280px（實測）。
  Nav bar: container widened to 1320px, link gap 28px → 22px, Spanish/Portuguese FAQ label shortened to "FAQ" and German pilot label to "Pilotprojekt" — this also fixes the pre-existing Spanish/Portuguese overflow; desktop-to-hamburger breakpoint moved from 1200px to 1280px (measured).

### 備註 Notes
- 規則表為基本規則摘要，供現場快速核對；實際檢核以各國最新版規範、國家附錄與工程契約為準。
  The rule table is a summary of basic rules for quick field checks; actual verification follows the latest edition of each code, its national annex and the project contract.

---

## v1.2 — 2026-08-29 · 產品模組上線與多語系 / Live product module & i18n

- 鋼筋估算自動化系統（AutoCAD 2021 外掛 + 跨平台桌面版）產品區塊（2026-08-07）。
  Rebar Estimation Automation System product section (AutoCAD 2021 plugin + cross-platform desktop app).
- 捲動驅動的 Three.js 3D 鋼筋籠首頁場景；Three.js 改為本地 vendored（2026-08-09）。
  Scroll-scrubbed Three.js rebar-cage hero; Three.js vendored instead of CDN-loaded.
- 免費試點申請表單（2026-08-15）。
  Free pilot application form.
- 以品牌內嵌 SVG 示意圖取代圖庫照片（2026-08-15）。
  Stock imagery replaced with branded inline SVG illustrations.
- 新增西、法、德、義、葡語，共 8 個語系；i18n 鍵值一致性 CI 檢查（2026-08-15 ～ 08-17）。
  Spanish, French, German, Italian and Portuguese added (8 locales total); i18n key-parity CI check.
- 常見問題區塊、FAQPage JSON-LD、sitemap hreflang、`llms.txt`（2026-08-29）。
  FAQ section, FAQPage JSON-LD, sitemap hreflang, `llms.txt`.

---

## v1.1 — 2026-05-27 · 轉向營造執行平台 / Construction-execution pivot

- 全站文案改寫為 AI + AR 營造執行平台（施工圖 → 下料 → AR 綁紮 → CV 驗證 → 竣工紀錄）。
  All copy rewritten for the AI + AR construction execution platform (drawing → cut list → AR placement → CV verification → as-built record).
- SEO：robots.txt、sitemap、canonical、Open Graph、hreflang（2026-04-08）。
  SEO: robots.txt, sitemap, canonical URL, Open Graph, hreflang.
- 聯絡資訊更新為 kairos.ai.tech@gmail.com；頁尾加入 Kairos.ai 連結。
  Contact email updated; Kairos.ai links in the footer.

---

## v1.0 — 2026-03-30 · 首發 / Initial launch

- 靜態產品頁（HTML / CSS / JS，無建置步驟）：導覽列、首頁、問題、方案、流程、成效、優勢、聯絡表單、頁尾。
  Static product page (HTML / CSS / JS, no build step): navbar, hero, problem, solution, process, results, advantages, contact form, footer.
- 繁體中文、英文、日文三語系切換。
  Traditional Chinese, English and Japanese language switcher.
- 捲動動畫、行動版導覽、mailto 表單送出。
  Scroll animations, mobile nav, mailto form submission.
