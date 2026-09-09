<div align="center">

  <img src="frontend-next/public/logo.svg" alt="LandSlide Monitor Logo" width="120" />

  # Landslide Monitor (LS-Monitor)

  **AI-Assisted Early Warning, Geotechnical Risk Assessment & Emergency Response Platform**
  *Pilot Deployment: Wayanad District (Meppadi • Vythiri • Mundakkai • Chooralmala)*

  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE.md)

</div>

---

## 🌍 Overview

**Landslide Monitor (LS-Monitor)** is an end-to-end, operations-grade disaster decision-support platform engineered for District Emergency Operations Centres (DEOC) and state disaster management authorities.

Designed around the **July 2024 Wayanad Disaster Sequence (Meppadi–Chooralmala–Mundakkai)**, LS-Monitor integrates real-time Automatic Weather Station (AWS) telemetry, empirical Intensity-Duration (I-D) rainfall failure thresholds, high-resolution GIS hazard overlays, crowd-sourced field truthing with offline sync, and multi-criteria emergency response resource dispatch.

---

## ✨ Key Features & Capabilities

- 🗺️ **DEOC Command Center Dashboard**: Interactive full-screen GIS hazard map with real-time sector risk gauges, triggering factor breakdowns, and infrastructure exposure analytics.
- 📱 **Mobile-Optimized Experience**: Full mobile responsiveness featuring a dedicated bottom navigation bar, touch-friendly bottom sheets for sector risk panels, and collapsible layer toggles.
- ⚡ **Minimalist Loading Screen & Buffering States**: Seamless 3-second startup transition with custom SVG branding and non-blocking background telemetry sync.
- 💀 **Complete Dark-Theme Skeletons**: High-fidelity dark slate skeleton screens across all 7 operational modules for smooth data transitions.
- 🌧️ **Empirical Rainfall Thresholds**: Real-time 24h/72h Intensity-Duration (I-D) hyetograph analytics and animated storm simulation replay.
- 📋 **Offline-First Field Intel**: Ground-truthing observation submission with local queuing, offline status simulation, and geologist verification quarantine.
- 🔔 **Statutory Early Warning Workflow**: Multi-tier alert chain of command (`DRAFT` &rarr; `AWAITING_AUTHORIZATION` &rarr; `AUTHORIZED` &rarr; `DISSEMINATED`).
- 🚒 **Emergency Response Resource Prioritization**: Multi-criteria decision support matrix ranking sectors for NDRF, SDRF, Fire & Rescue, and PWD road clearing deployments.
- 📜 **Historical Disaster Replay**: Retrospective step-by-step case study of the July 28–30, 2024 Wayanad debris flow sequence.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) | Server & client hybrid rendering with React 19 and TypeScript |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) | Dark slate emergency command console theme (`bg-slate-950`) |
| **Geospatial Mapping** | [Leaflet](https://leafletjs.com/) + React-Leaflet | OpenStreetMap cartography, GeoJSON risk zones, and vector overlays |
| **Data Visualizations** | [Recharts](https://recharts.org/) | Rainfall hyetographs, cumulative threshold curves, and risk gauges |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) + [Uvicorn](https://www.uvicorn.org/) | Asynchronous high-performance Python REST API |
| **Icons & Typography** | [Lucide React](https://lucide.dev/) + Inter Font | Modern, clean vector iconography and typography |

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User & Field Officer Client                     │
│                (Next.js 16 • React 19 • Tailwind CSS v4)               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / Telemetry
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Decoupled Service Layer                         │
│   ┌───────────────┬────────────────┬───────────────┬───────────────┐   │
│   │ zones.ts      │ rainfall.ts    │ alerts.ts     │ fieldReports  │   │
│   └───────┬───────┴────────┬───────┴───────┬───────┴───────┬───────┘   │
└───────────┼────────────────┼───────────────┼───────────────┼───────────┘
            ▼                ▼               ▼               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend Microservices                       │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │  /api/health • /api/zones • /api/rainfall • /api/alerts • /api/risk │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Directory Structure

```text
ls-monitor/
├── backend/
│   ├── app/
│   │   ├── models/            # Pydantic schema models
│   │   ├── routes/            # FastAPI route controllers (/api/health, etc.)
│   │   ├── services/          # Analytics & hazard detection services
│   │   ├── utils/             # Helper utilities & loggers
│   │   └── main.py            # FastAPI ASGI entrypoint
│   └── requirements.txt       # Backend dependencies
│
├── frontend-next/             # Modern Next.js App Router Frontend
│   ├── public/
│   │   └── logo.svg           # Custom vector SVG platform logo
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/     # DEOC Command Center GIS Map & Risk Panel
│   │   │   ├── risk-map/      # Fullscreen GIS Hazard Map with Layer Toggles
│   │   │   ├── rainfall/      # 24h/72h I-D Threshold Analytics & Storm Replay
│   │   │   ├── field-reports/ # Offline-First Field Intel & Verification Hub
│   │   │   ├── alerts/        # Early Warning Protocol & Authority Sign-off
│   │   │   ├── response-priority/ # Multi-Criteria Resource Allocation Matrix
│   │   │   ├── historical/    # July 2024 Wayanad Disaster Case Study Replay
│   │   │   ├── globals.css    # Dark Command Palette, Leaflet z-index isolation
│   │   │   ├── layout.tsx     # App Shell layout with Navigation
│   │   │   └── page.tsx       # Root redirect to /dashboard
│   │   ├── components/
│   │   │   ├── common/        # Logo, LoadingScreen, Skeletons, StatusBadges
│   │   │   ├── layout/        # Sidebar, BottomNav, TopHeader
│   │   │   ├── map/           # DynamicMap, MapInner (Leaflet isolation)
│   │   │   ├── rainfall/      # RainfallChart, ThresholdStatus, ReplayControl
│   │   │   ├── field/         # FieldReportCard, FieldReportForm, SyncQueue
│   │   │   ├── alerts/        # AlertCard, AlertTimeline, AlertWorkflow
│   │   │   ├── priority/      # ResponsePriority matrix cards
│   │   │   └── risk/          # RiskPanel, RiskGauge, ContributingFactors
│   │   ├── data/              # Pilot infrastructure, zones & historical frames
│   │   ├── hooks/             # useOffline, useReplay, useSyncQueue
│   │   ├── services/          # Decoupled service layer ready for live API
│   │   └── types/             # TypeScript domain definitions
│   ├── package.json
│   └── tsconfig.json
│
├── LICENSE.md                 # MIT License
└── README.md                  # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** 18.17+ or 20+
- **Python** 3.9+

---

### 2. Frontend Setup (Next.js)

```bash
# Navigate to the frontend directory
cd frontend-next

# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build & verify
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server with live reload
uvicorn app.main:app --reload --port 8000
```

- **API Base URL**: `http://localhost:8000`
- **Health Check**: `http://localhost:8000/api/health`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`

---

## 🗺️ Operational Modules

| Route | Module Name | Core Capabilities |
| :--- | :--- | :--- |
| **`/dashboard`** | **DEOC Command Console** | Live GIS overview, real-time ML risk index gauge, quick sector selector, and geomorphological breakdown. |
| **`/risk-map`** | **GIS Hazard Map** | Multi-layer spatial filters for **Road Networks**, **Vulnerable Structures**, **Historical Scars**, and **Field Intel**. |
| **`/rainfall`** | **Rainfall & Triggers** | 24h & 72h Intensity-Duration (I-D) failure threshold charts, live telemetry, and **Storm Simulation Playback**. |
| **`/field-reports`** | **Field Ground Truthing** | Citizen / field officer observation logging, **Offline Queue**, and Geologist verification approval workflow. |
| **`/alerts`** | **Early Warning Protocol** | Digital authorization workflow enforcing the statutory chain of command (`DRAFT` &rarr; `AUTHORIZED`). |
| **`/response-priority`** | **Resource Prioritization** | Multi-criteria decision support matrix ranking sectors for NDRF, SDRF, Fire & Rescue, and PWD road clearing teams. |
| **`/historical`** | **July 2024 Wayanad Replay** | Chronological disaster simulation of the Chooralmala–Mundakkai debris flow event with frame-by-frame step controls. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
