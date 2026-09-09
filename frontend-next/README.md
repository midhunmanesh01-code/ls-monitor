# Landslide Monitor — AI-Assisted Early Warning & Risk Monitoring System
### District Emergency Operations Centre (DEOC) • Wayanad Pilot

An explainable landslide-risk decision-support and field-response operational platform engineered for disaster management authorities and emergency response agencies.

---

## 🧭 Operational Capabilities

- **Explainable Multi-Factor Hazard Scoring**: Evaluates slope susceptibility, antecedent rainfall, 24h/72h Intensity-Duration (I-D) empirical thresholds, and ground-truth observations.
- **Physical Hazard vs. Vulnerability Exposure**: Differentiates geological landslide triggers from population centers and critical infrastructure to derive **Response Priority Rankings**.
- **Statutory Warning Chain of Command**: Automated ML triggers generate `DRAFT` alerts; official dissemination requires digital sign-off from designated Incident Commanders.
- **Offline-First Field Intel**: Field teams can record geological movements, spring surges, and ground fractures without network connectivity; changes queue locally and auto-sync when online.

---

## 📱 Mobile-First & Responsive Design

- **Bottom Navigation Bar**: Native-like touch navigation for all 7 primary operational tabs.
- **Collapsible Bottom Sheet Drawer**: Detailed sector risk assessment panel docks smoothly on mobile devices with touch handle support.
- **Isolated Leaflet Stacking**: Fully contained CSS stacking contexts (`isolation: isolate`) preventing map tile leakage over navigation drawers or modals.
- **Refined 3-Second Loading Screen**: Minimal, elegant startup screen featuring the custom vector logo and subtle buffering animation.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 with dark GIS Command-Center palette (`bg-slate-950`)
- **Geospatial Mapping**: Leaflet + React-Leaflet + OpenStreetMap
- **Data Visualizations**: Recharts (Intensity Hyetographs & Cumulative Threshold Curves)
- **Iconography**: Lucide React + Custom SVG Logo ([`src/components/common/Logo.tsx`](src/components/common/Logo.tsx))

---

## 💻 Running the Application

```bash
# Navigate to frontend directory
cd frontend-next

# Install dependencies
npm install

# Run the development server
npm run dev

# Run production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Operational Routes

| Route | Module Name | Core Functionality |
| :--- | :--- | :--- |
| **`/dashboard`** | **Command Console** | Live GIS overview, real-time ML risk gauge, quick sector selector, and geomorphological breakdown. |
| **`/risk-map`** | **GIS Hazard Map** | Multi-layer spatial filters for **Road Networks**, **Vulnerable Structures**, **Historical Scars**, and **Field Intel**. |
| **`/rainfall`** | **Rainfall & Triggers** | 24h & 72h Intensity-Duration (I-D) failure threshold charts, live telemetry, and **Storm Simulation Playback**. |
| **`/field-reports`** | **Field Ground Truthing** | Citizen / field officer observation logging, **Offline Queue**, and Geologist verification approval workflow. |
| **`/alerts`** | **Early Warning Protocol** | Digital authorization workflow enforcing the statutory chain of command (`DRAFT` &rarr; `AUTHORIZED`). |
| **`/response-priority`** | **Resource Prioritization** | Multi-criteria decision support matrix ranking sectors for NDRF, SDRF, Fire & Rescue, and PWD road clearing teams. |
| **`/historical`** | **July 2024 Wayanad Replay** | Chronological disaster simulation of the Chooralmala–Mundakkai debris flow event with frame-by-frame step controls. |
