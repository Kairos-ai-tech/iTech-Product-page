# Settime

**AI + AR Construction Execution Platform for Structural Rebar**

Settime treats the structural drawing as the single source of truth for a
construction site: it automatically parses drawings into rebar bar-schedules
and cut-lists, drives fabrication directly, overlays AR guidance so field
crews place rebar to spec, and uses computer vision to verify as-built
against as-designed before the pour — producing an auditable record a
government inspector or general contractor can actually trust.

Built by [Kairos.ai](https://www.kairosaitech.com/?lang=zh-TW) for Taiwan's
construction market (營造/鋼筋施工).

---

## The Pipeline

```
Structural drawing (single source of truth)
        │
        ▼
AI drawing parsing ──► bar schedule / cut list / bend list
        │
        ▼
Fabrication ──► QR-tagged rebar, delivered by pour zone
        │
        ▼
AR-guided field placement ──► 3D overlay on formwork (green = correct, red = deviation)
        │
        ▼
CV as-built verification ──► pass/fail per requirement, signed pre-pour snapshot
        │
        ▼
Tamper-evident audit trail ──► hash-chained, timestamped, exportable record
```

## Shipping Today

**Rebar Estimation Automation System** — an AutoCAD 2021 plugin plus a
cross-platform desktop app (Avalonia) that converts structural drawings
directly into shop drawings and a material-list workbook (`.xlsm`), importing
natively into a fabricator's existing macro tooling (GTA/CCM). Beam/column
recognition ≥ 90%, with a tunable Style Guide rules engine for firm-specific
drafting conventions.

## In Development

- **AR field guidance** — a 3D rebar layout overlaid on formwork through a
  tablet or headset; crews place to spec against live spacing, lap-length,
  and hook-orientation cues (ARKit/RealityKit).
- **AI as-built verification** — computer vision compares placed rebar
  against the design, flags deviations, and produces a signed pre-pour
  snapshot (PyTorch/Open3D).
- **Tamper-evident audit trail** — every action in the pipeline is written
  to a SHA-256 hash-chained, append-only, UTC-timestamped record with
  monotonic sequence numbers, built to satisfy large contractor groups and
  government-tender compliance/audit requirements.

## Who It's For

Construction companies, rebar fabricators, structural engineering firms,
and public agencies that need an auditable as-built record — plus
developers/owners and investors evaluating the platform.

## Why Not the Alternatives

| Current method | Upside | Gap | Settime |
|---|---|---|---|
| Manual 2D drawing reading | Familiar workflow | Easy to misread, no field verification | Automated parsing + AR alignment |
| BIM viewers (Navisworks) | 3D visualization | Office tool, no field guidance | Brings AR into the field |
| Manual site inspection | Experience-based judgment | Limited sampling, caught after the pour | 100% continuous verification |
| Manual estimation | Matches existing process | Slow, error-prone, version drift | Drawing-to-estimate in seconds |

## Moats

- **As-built database** — every job site adds as-built data; the model
  improves with use, building a Taiwan-specific data advantage.
- **Local CV model** — trained on real Taiwanese job-site footage, tuned to
  domestic rebar specs and field practice.
- **Public-works relationships** — built to meet public-project audit
  requirements, with a hand in shaping smart-construction as-built
  standards.
- **Fabricator/contractor network** — an in-house shop-drawing automation
  engine that plugs directly into the existing fabricator and contractor
  supply chain.

## Roadmap

Rebar/structural construction is the current focus. The underlying
drawing-to-execution approach is built to extend into adjacent trades:
CNC machining, mold making, welding, auto repair, plumbing, and sheet
metal.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Drawing automation | AutoCAD 2021 plugin, .NET, Avalonia (cross-platform desktop) |
| AR field guidance | ARKit, RealityKit |
| Computer vision | PyTorch, Open3D |
| Web / product page | Vanilla HTML/CSS/JS, Three.js + WebXR (scroll-scrubbed 3D hero) |
| Audit trail | SHA-256 hash chaining, append-only JSONL storage |

## Repository Contents

- `index.html`, `styles.css`, `script.js`, `hero3d.js`, `i18n.js` — the
  product landing page: static HTML/CSS with a scroll-scrubbed Three.js hero
  and client-side i18n (8 languages: 繁體中文, English, 日本語, Español,
  Français, Deutsch, Italiano, Português).
- `llms.txt` — a machine-readable summary of the product for AI answer
  engines (AEO/GEO).
- `sitemap.xml`, `robots.txt` — standard SEO crawl configuration, with
  explicit allow-rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  etc.).

## Team

Team members graduated from National Tsing Hua University with expertise
spanning Computer Science, Law, and Economics, with end-to-end experience
building AI systems from 0 to 1.

**Competition Results:**
- Legal Tech Hackathon 2022 — Compliance Special Award (Team Lead)
- ITRI AI Data Science Talent Program — Final Presentation Competition 3rd
  Place (Team Lead + LSTM Model)

**Industry Experience:**
- Semiconductor wafer process AI optimization
- Solar panel AIoT system deployment
- Startup software company 0-to-1 development

## Contact Us

We welcome contractors, fabricators, structural engineers, developers,
government agencies, and investors interested in Settime to get in touch.

- Free pilot program: apply via the [product page](https://itech.kairosaitech.com/#pilot)
  with company name, email, and construction type.
- Email: kairos.ai.tech@gmail.com
- Website: [Kairos.ai](https://www.kairosaitech.com/?lang=zh-TW)
