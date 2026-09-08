# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Settime (formerly AI學徒 iTech) — a product page / strategy documentation project for an AI + AR construction-execution platform. Business strategy documentation lives alongside a static marketing/product landing page (vanilla HTML/CSS/JS, no build step) for the AI + AR construction-execution product line.

## Repository Contents

- `README.md` — Full business plan covering problem, solution, market, business model, financials, and 10-year roadmap
- `AI學徒-iTech商業策略書簡報.pdf` — Business strategy presentation deck (Chinese)
- `index.html`, `styles.css`, `script.js`, `hero3d.js`, `i18n.js` — the product landing page: static HTML/CSS with a scroll-scrubbed Three.js hero and client-side i18n (8 languages)

## Planned Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | Django, FastAPI, Celery, Redis, PostgreSQL |
| AI/ML | PyTorch, TensorFlow, MediaPipe, OpenCV |
| Frontend | React, TypeScript, Three.js, WebXR |
| Deployment | Docker, Ansible, GCP/AWS, Kubernetes |

## Key Domain Concepts

- **隱性知識顯性化**: Converting implicit craft knowledge (hand feel, sound, experience) into quantifiable AI parameters
- **AR即時指導**: Real-time AR overlay guidance using skeleton tracking (green=correct, red=incorrect)
- **AI智慧評分**: Automated scoring using DTW time-series comparison + GPT-generated improvement suggestions
- Target industries: CNC machining, mold making, welding, auto repair, plumbing, sheet metal

## Language

All business documentation is in Traditional Chinese (繁體中文). The README and PDF are written for a Taiwanese audience (investors, government, enterprise clients).
