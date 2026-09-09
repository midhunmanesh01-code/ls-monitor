# Landslide Monitor — AI-Assisted Early Warning & Risk Monitoring System
### Smart India Hackathon (SIH) 2026 Prototype

An explainable landslide-risk decision-support and field-response operational platform designed to complement official forecasting systems (GSI / IMD / SDMA).

---

## 🧭 Core Positioning & Disclaimers

- **Explainable Decision Support**: Combines terrain susceptibility, observed rainfall, empirical I-D thresholds, radar forecasts, historical failure catalogs, and ground-truth field observations.
- **Physical Hazard vs. Vulnerability Exposure**: Explicitly differentiates geological hazard susceptibility from population and critical lifeline exposure to determine actionable **Response Priority**.
- **Official Warning Workflow**: Internal triggers generate draft alerts; public bulletins require digital authorization from the District Collector or designated Incident Commander.
- **Disclaimer**: This prototype is demonstrated in **DEMO MODE** using simulated/replayed data for the **Wayanad Pilot Area (Kerala)**. It does not claim exact temporal/spatial prediction of failure events and does not replace statutory warning agencies.

---

## 🚀 3-Minute SIH Demonstration Flow

The application demonstrates the 6-stage operational disaster lifecycle:

```
1. OBSERVE   → Ingest AWS telemetry, IMD forecasts, and DEM slope models.
2. ASSESS    → Compute empirical 24h/72h Intensity-Duration (I-D) thresholds.
3. EXPLAIN   → Deconstruct risk score into physical vs. exposure components.
4. AUTHORIZE → Transition automated drafts into digitally signed official warnings.
5. VERIFY    → Process ground-truthed field reports with offline queue & sync.
6. PRIORITIZE→ Rank tactical field deployment (NDRF/SDRF/PWD) by compound urgency.
```

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with dark GIS Command-Center theme
- **Geospatial Mapping**: Leaflet + OpenStreetMap + GeoJSON vector layers
- **Data Visualizations**: Recharts (Intensity Hyetographs & Cumulative Thresholds)
- **Icons**: Lucide React
- **Layer Separation**: Clean decoupled `src/services/` layer ready to connect to FastAPI / Postgres backend.

---

## 💻 Running the Prototype

```bash
# Navigate to frontend directory
cd frontend-next

# Install dependencies (already installed)
npm install

# Run the development server
npm run dev

# Run a production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Key Application Routes

| Route | Functionality |
| :--- | :--- |
| `/dashboard` | Main GIS Command Console with live Leaflet map and docked explainable risk panel |
| `/risk-map` | Fullscreen GIS Hazard Map with vector layer filters (Roads, Buildings, Incidents) |
| `/rainfall` | Rainfall & Trigger Monitor with empirical threshold gauges and interactive event replay |
| `/field-reports` | Ground Intel feed, mobile observation submission, offline queue & synchronization |
| `/alerts` | Early Warning Protocol SOP workflow with officer sign-off and audit log |
| `/response-priority` | Tri-factor response priority matrix ranking emergency resource deployment |
| `/historical` | Retrospective validation replay of the July 2024 Wayanad Debris Flow sequence |
