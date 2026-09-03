# AI Apprentice iTech

**Preserving Taiwan's Craft Mastery Through Technology**

AI + AR enables a 20-year-old beginner to learn a master's 40 years of expertise in just 3 months.

| Metric | Data |
|--------|------|
| Skilled workers lost per year | 8,000 |
| Learning efficiency improvement | 400% |
| Annual market size | NT$17 billion |
| Jobs created | 10,000+ |

---

## Current Product Focus: iTech Construction Execution Platform

The live product page at [itech.kairosaitech.com](https://itech.kairosaitech.com/) applies the AI + AR approach to structural rebar work. The structural drawing is the single source of truth: drawings are parsed into bar schedules and cut lists, AR guides crews placing rebar on site, and computer vision verifies the as-built state before the pour. The Rebar Estimation Automation System (AutoCAD 2021 plugin plus cross-platform desktop app) is shipping today; AR field guidance and AI verification are in development.

### Audit Log and Per-Action Timestamps

Every action on the platform is written to an audit log so inspection no longer depends on memory:

- **Timestamp on every action** — drawing import, cut list generation, AR placement, AI verification, correction, and as-built sign-off each record UTC time, operator, and device, to the second.
- **Append-only, hash-chained log** — entries can never be edited or deleted; each entry is chained by SHA-256 hash so any tampering is detectable.
- **Rule citation on every decision** — each pass/fail result records the code clause it was checked against.
- **One-click export** — PDF / CSV by site, floor, or time range, with the full timeline, for supervising engineers and public agencies.

### Built-in Rebar Rule Library: EU, USA, Taiwan

Verification rules are not a black box. Three code baselines ship built in and are configurable per project:

| Item | EU | USA | Taiwan |
|------|----|-----|--------|
| Design code | EN 1992-1-1 (Eurocode 2) + national annexes | ACI 318-19 | MOI Design Code for Concrete Structures (Building Technical Regulations, Ch. 6) |
| Rebar material | EN 10080; B500A / B / C | ASTM A615 (Gr. 40/60/80), ASTM A706 | CNS 560; SD280 / SD420 / SD490 (W = weldable) |
| Execution & tolerances | EN 13670 | ACI 117, ACI 301 | Public Works General Specifications, Ch. 03210 |
| Minimum cover | c_nom = c_min + 10 mm; c_min ≥ bar Ø, by exposure class (XC1 ≈ 15 mm to XS3 ≈ 45 mm) | Against ground 75 mm; exposed #6+ 50 mm, #5- 40 mm; interior beams/columns 40 mm, slabs 20 mm | Cast against soil 75 mm; exposed D19+ 50 mm, D16- 40 mm; interior beams/columns 40 mm, slabs 20 mm |
| Clear bar spacing | ≥ max(bar Ø, aggregate + 5 mm, 20 mm) | ≥ max(25 mm, d_b, 4/3 × max aggregate); columns ≥ max(40 mm, 1.5 d_b) | Same as USA |
| Hooks & min bend diameter | Mandrel ≥ 4Ø (Ø ≤ 16 mm), 7Ø (Ø > 16 mm) | 6 d_b (#3–#8), 8 d_b (#9–#11); 135° seismic stirrup hook, 6 d_b ≥ 75 mm | 6 d_b (D10–D25), 8 d_b (D29–D36); 135° seismic stirrup hook, 6 d_b ≥ 75 mm |
| Lap splice | l₀ = α-factors × l_b,rqd, ≥ max(15Ø, 200 mm) | Class B = 1.3 l_d, ≥ 300 mm | Class B = 1.3 l_d, ≥ 300 mm |
| Cover tolerance | EN 13670: −10 mm / +10 to +20 mm by member depth | d ≤ 200 mm ±10 mm; d > 200 mm ±13 mm; reduction ≤ 1/3 of specified cover | Same as USA |

These are basic rules for quick field checks. Actual verification follows the latest edition of each code, its national annex, and the project contract.

### Version Log

The product page keeps a version log on the page and in [CHANGELOG.md](CHANGELOG.md). Current release: **v1.3 (2026-09)** — audit log with per-action timestamps and the EU / USA / Taiwan rebar rule library.

The sections below are the original AI Apprentice business plan for the broader craft-skills vision.

---

## The Problem: Taiwan's Manufacturing Survival Crisis

Taiwan's manufacturing industry faces an unprecedented talent gap. Senior masters are retiring en masse while younger generations refuse to enter the industry, putting traditional craftsmanship at risk of extinction.

### Critical Talent Shortage
- 35% of masters (age 60+) will retire within 5 years
- Only 12% of young people are willing to enter manufacturing
- 8,000 senior technicians lost annually

### Low Transfer Efficiency
- Traditional learning cycle: 2-5 years
- Beginner error rate: 15-25%
- Tacit knowledge is hard to transfer: "feel the touch," "listen to the sound," "rely on experience"

### Industry Transformation Pressure
- Manufacturing workforce shortage: 120,000 (vacancy rate 4.2%)
- Cost competition from Southeast Asia and China
- Loss of technical advantage = loss of survival

**Estimated economic losses:** Skills gap NT$42B + Efficiency loss NT$18B + Quality instability NT$9.5B

---

## The Solution: Three Core Technology Innovations

AI Apprentice iTech transforms masters' tacit knowledge into quantifiable, easily learnable, and transferable digital assets through innovative technology.

### 1. Quantifying Tacit Knowledge

AI analyzes 100+ master operations to establish precise parameters:

- Sound frequency: 800-1200 Hz
- Duration: 2.3 ± 0.3 seconds
- Movement speed: 15 cm/sec
- Torch angle: 45° ± 5°

Tech: MediaPipe + Neural Network Models

### 2. Real-time AR Guidance

Apprentices use AR glasses or smartphones. The camera captures movements while AI compares them against standards in real-time, providing visual guidance through AR overlay:

- Green skeleton = Correct movement
- Red skeleton = Incorrect movement
- Arrows indicate correction direction
- Voice provides real-time prompts

60 FPS low-latency ensures a smooth learning experience. Tech: Three.js + WebXR

### 3. AI Smart Scoring

The system automatically generates detailed learning reports with comprehensive scores, detailed analysis, error pinpointing, and improvement suggestions:

- Movement accuracy: 85 points (Good)
- Timing mastery: 65 points (Needs improvement)
- Fluency: 58 points (Key focus area)

Tech: DTW time-series comparison + GPT suggestion generation

---

## Complete Learning Flow

1. **Master Recording** — Multi-angle video capture of complete skill details
2. **AI Analysis & Optimization** — Auto-extract key points, build digital skill packages
3. **Apprentice Practice** — Watch tutorial → AR practice → AI scoring feedback
4. **Skill Certification** — Achieve 80+ score to earn certification

### Core Performance Comparison

| Metric | Traditional | AI Apprentice | Improvement |
|--------|------------|---------------|-------------|
| Learning period | 2-5 years | 3-9 months | ↓ 75% |
| Error rate | 15-25% | 6-10% | ↓ 60% |
| Master's time | 2-3 hrs/day | 0.5-1 hr/day | ↓ 70% |
| Material waste | NT$150-300K/person | NT$30-60K/person | ↓ 80% |

### Customer Value

Savings per trainee: **NT$3.49M/person** (Master's time NT$640K + Error losses NT$600K + Time cost NT$2.25M)

Pricing: NT$300K/year → Customer ROI: **1,063%**

---

## Competitive Advantages

| Method | Advantage | Disadvantage | iTech Edge |
|--------|-----------|-------------|------------|
| Traditional apprenticeship | Hands-on teaching | 2-5 years, not scalable | AI 4x faster + replicable |
| Tutorial videos | Low cost | No interaction, can't spot errors | AR real-time guidance + AI scoring |
| VR training | Immersive | High cost NT$500K-1M | 1/10 the cost + real operation |
| Written SOP | Easy to store | Can't describe motion details | Visual + quantified standards |

**Competitor Comparison:**
- **Strivr (US)** (valued at $1B): VR standardized processes, cost NT$500K-1M vs iTech NT$50-100K
- **SkillSaver (Japan)**: Recording only vs iTech real-time guidance + AI scoring; project-based vs platform model

**Four Moats:** Skill database (network effects), AI model advantage (proprietary training data), government relations, master network

---

## Business Model

AI Apprentice adopts a diversified revenue model — building brand through government projects, expanding to enterprise clients for stable revenue, and achieving scalable growth through individual subscriptions.

### Phase 1: System Licensing (Year 1-3, Primary)

**B2G Government Plans**
- Basic: NT$3M (setup) + NT$600K/year (maintenance)
- Advanced: NT$5M (setup) + NT$1M/year (maintenance)

**B2B Enterprise Plans**
- Small (<50 employees): NT$150K/year
- Medium (50-200 employees): NT$300K/year
- Large (>200 employees): NT$500K-1M/year

### Phase 2: Content Production Services (Year 2+)

- Basic skill (10 min): NT$80K/module
- Advanced skill (30 min): NT$200K/module
- Expert skill (60 min+): NT$500K/module
- Gross margin: 34-50%

### Phase 3: SaaS Subscription + Platform Ecosystem (Year 3+)

- Single skill: NT$1,500
- Monthly subscription: NT$599/month
- Annual subscription: NT$5,990/year
- Platform ecosystem (Year 4+): Masters upload skills, platform takes 30% commission

### Phase 4: B2C Optimization + Automation (Year 3-5+)

- AI skill optimization solutions
- Integration of humanoid robots toward fully automated factories

---

## Unit Economics

| Metric | Industry Standard | AI Apprentice |
|--------|------------------|---------------|
| Gross margin | >70% | **80-84%** |
| LTV/CAC | >3 | **16-38** |
| Payback period | <12 months | **3-8 months** |
| Customer retention | >80% | **90%+** |
| Net retention (NRR) | >100% | **125%+** |

---

## Market Size

| Segment | Size | Description |
|---------|------|-------------|
| TAM | NT$10B | Total Taiwan manufacturing digital training market |
| SAM | NT$5B | Serviceable market |
| SOM | NT$500M | Year 1-3 obtainable market target |

### Go-to-Market Strategy

| Phase | Timeline | Strategy |
|-------|----------|----------|
| Phase 1 | Year 1-2 | B2G government market — workforce development agencies & vocational training centers |
| Phase 2 | Year 2-4 | B2B enterprise clients — CNC, mold, metal/welding/sheet metal factories |
| Phase 3 | Year 5+ | B2C multi-industry — Southeast Asia, Japan, and US markets |

### Taiwan Industry Deployment

| Industry | Year 10 SOM | Priority |
|----------|-------------|----------|
| CNC machining | NT$466M | P0 |
| Mold manufacturing | NT$340M | P1 |
| Welding | NT$193M | P1 |
| Auto repair | NT$187M | P2 |
| Plumbing & electrical | NT$126M | P2 |
| Lathe operation | NT$120M | P2 |
| Sheet metal | NT$100M | P3 |
| Baking/Chinese cuisine | NT$80M | P3 |
| Beauty & hairdressing | NT$60M | P3 |
| Traditional crafts | NT$35M | P3 |

---

## Global Market Outlook

| Region | TAM (USD) | Year 10 SOM (USD) | Share |
|--------|-----------|-------------------|-------|
| Asia Pacific | $8B | $600M | 40% |
| North America | $3.5B | $525M | 35% |
| Europe | $2.5B | $300M | 20% |
| Others | $1B | $75M | 5% |
| **Global** | **$15B** | **$1.5B** | **100%** |

**Year 10 Key Metrics:** $1.5B global revenue, across 15 countries, serving 5,000 enterprises, training 300,000 skilled workers

### Global Expansion Milestones

1. **Year 3** — Asia Pacific launch: Singapore regional HQ, overseas revenue 20%
2. **Year 5** — Multi-region expansion: 6 Southeast Asian countries + Japan licensing, overseas revenue 35%
3. **Year 7** — Cross-continental growth: US subsidiary + European pilots, overseas revenue 55%
4. **Year 10** — Global leadership: 15-country coverage, NASDAQ IPO, overseas revenue 80%

---

## Funding Plan

**Total requirement: NT$3M (6-month execution period)**

| Item | Amount | Share |
|------|--------|-------|
| Product development | NT$1.2M | 40% |
| Content production | NT$600K | 20% |
| Market validation | NT$620K | 20.7% |
| Team & personnel | NT$480K | 16% |
| Operations | NT$100K | 3.3% |

### 6-Month Execution Timeline

- **Month 1-2 (Launch)**: Team assembly & requirements interviews, technical POC validation, infrastructure setup
- **Month 3-5 (Development)**: AI model intensive training, complete AR system development, CNC tool-setting skill production, system integration & testing
- **Month 6 (Validation)**: Vocational center pilot (20 trainees), enterprise POC (3 companies), validation report, LOI signing

### Key Milestones

| Timeline | Milestone | Validation Metric |
|----------|-----------|-------------------|
| Month 2 | Technical POC complete | AI model accuracy >85% |
| Month 3 | MVP Alpha | Internal demo ready |
| Month 4 | MVP Beta | Customer trial begins |
| Month 5 | Pilot execution | 20+ trainee usage data |
| Month 6 | Validation complete | 3 quantified metrics achieved |

---

## Success Criteria

| Metric | Passing Standard | Weight |
|--------|-----------------|--------|
| Technical feasibility | Learning efficiency ≥300% improvement | 40% |
| Market demand | Obtain ≥2 LOIs | 40% |
| Product completeness | Core feature completion ≥80% | 20% |

---

## 10-Year Development Roadmap

### Year 1-2 | Government Validation
- Clients: 2 → 18 (government + enterprise pilots)
- Revenue: NT$14M → NT$48.7M
- Skills: 50 → 100

### Year 3-4 | Enterprise Expansion
- Clients: 100 → 280 enterprises
- Revenue: NT$103M → NT$195M
- Region: Taiwan + Southeast Asia pilots

### Year 5-7 | Ecosystem Building
- Clients: 500 → 1,500
- Revenue: NT$300M → NT$613M
- Region: Asia Pacific + Japan + US pilots

### Year 8-10 | Global Leadership
- Clients: 2,000 → 5,000
- Revenue: NT$1.5B → NT$3.87B
- Region: 15 countries, 20+ industries

### Ultimate Vision (Year 10)

- Top 3 global skill transfer platform
- Market cap NT$30-45B
- Serving 300K+ users, 5,000+ enterprises
- Leading the "skills → automation" industry revolution
- Preserving 10,000+ human craft skills

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | Django, FastAPI, Celery, Redis, PostgreSQL |
| AI/ML | PyTorch, TensorFlow, MediaPipe, OpenCV |
| Frontend | React, TypeScript, Three.js, WebXR |
| Deployment | Docker, Ansible, GCP/AWS, Kubernetes |

---

## Team

Team members graduated from National Tsing Hua University with expertise spanning Computer Science, Law, and Economics. The team has end-to-end experience building AI systems from 0 to 1.

**Competition Results:**
- Legal Tech Hackathon 2022 — Compliance Special Award (Team Lead)
- ITRI AI Data Science Talent Program — Final Presentation Competition 3rd Place (Team Lead + LSTM Model)

**Industry Experience:**
- Semiconductor wafer process AI optimization
- Solar panel AIoT system deployment
- Startup software company 0-to-1 development

---

## Contact Us

We welcome investors, enterprise partners, and government agencies interested in AI Apprentice iTech to get in touch.

Website: [Kairos.ai](https://www.kairosaitech.com/?lang=zh-TW)
