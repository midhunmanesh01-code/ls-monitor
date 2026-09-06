<div align="center">

  <img src="frontend/assets/logo.png" alt="LandSlide Monitor Logo" width="120" />

  # LS-Monitor (LandSlide Monitor)

  **A modern, real-time monitoring and early-warning platform for landslide risk assessment.**

  [![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Uvicorn](https://img.shields.io/badge/ASGI-Uvicorn-2C3E50?style=for-the-badge&logo=gunicorn&logoColor=white)](https://www.uvicorn.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🌍 Overview

**LS-Monitor** is an end-to-end monitoring solution designed to aggregate, analyze, and visualize geotechnical and environmental sensor telemetry for slopes susceptible to landslides. By providing high-throughput REST APIs and an intuitive web interface, LS-Monitor enables proactive landslide hazard management, critical alerting, and automated risk detection.

---

## ✨ Key Features

- ⚡ **High-Performance Backend**: Built with **FastAPI** and asynchronous request handling for rapid sensor data processing.
- 🩺 **Built-in System Health Checks**: Automated service health reporting available at `/api/health`.
- 📖 **Interactive API Documentation**: Out-of-the-box Swagger UI (`/docs`) and ReDoc (`/redoc`) for real-time endpoint inspection and testing.
- 🧱 **Modular Architecture**: Layered design dividing concerns across data models (`models`), endpoints (`routes`), business logic (`services`), and helpers (`utils`).
- 🖥️ **Lightweight Web Interface**: Clean frontend client for quick dashboard monitoring and visualization.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) | Modern, fast web framework for building APIs with Python |
| **ASGI Server** | [Uvicorn](https://www.uvicorn.org/) | Lightning-fast ASGI server implementation |
| **Frontend** | HTML5 / CSS3 / JavaScript | Client interface for monitoring and alerts |
| **API Docs** | Swagger UI & ReDoc | Automatic interactive OpenAPI documentation |

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client / Browser                       │
│              (Web Dashboard & Real-Time Views)              │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     FastAPI Application                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                  API Routers (/api/*)                   │ │
│ └────────────┬──────────────────────────────┬─────────────┘ │
│              │                              │               │
│              ▼                              ▼               │
│ ┌─────────────────────────┐    ┌──────────────────────────┐ │
│ │    Business Services    │    │      Data Models         │ │
│ │       (app/services)    │    │      (app/models)        │ │
│ └────────────┬────────────┘    └──────────────────────────┘ │
│              ▼                                              │
│ ┌─────────────────────────┐                                 │
│ │   Utilities & Helpers   │                                 │
│ │       (app/utils)       │                                 │
│ └─────────────────────────┘                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Directory Structure

```text
LS-Monitor/
├── backend/
│   ├── app/
│   │   ├── models/            # Pydantic & database schema definitions
│   │   │   └── __init__.py
│   │   ├── routes/            # API route controllers
│   │   │   ├── __init__.py
│   │   │   └── health.py      # Health check endpoint (/api/health)
│   │   ├── services/          # Business logic, alerting & analytics services
│   │   │   └── __init__.py
│   │   ├── utils/             # Reusable helper functions & loggers
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   └── main.py            # FastAPI entrypoint & router registrations
│   └── requirements.txt       # Python backend dependencies
├── frontend/
│   ├── assets/                # Static assets (logos, images, icons)
│   │   └── logo.png
│   ├── css/                   # Stylesheets
│   │   └── style.css
│   ├── js/                    # Client scripts and DOM interactions
│   │   └── script.js
│   └── index.html             # Web dashboard entry point
├── .gitignore                 # Files and directories ignored by Git
└── README.md                  # Project documentation
```

---

## ⚙️ Prerequisites

Before running LS-Monitor, make sure you have the following installed:

- **Python 3.9+** ([Download Python](https://www.python.org/downloads/))
- **pip** (Python package installer)
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/LS-Monitor.git
cd LS-Monitor
```

---

### 2. Backend Setup

#### a. Navigate to the backend directory

```bash
cd backend
```

#### b. Create and activate a virtual environment

- **Windows (PowerShell)**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```

- **Windows (Command Prompt)**:
  ```cmd
  python -m venv venv
  .\venv\Scripts\activate.bat
  ```

- **macOS / Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### c. Install dependencies

```bash
pip install -r requirements.txt
```

#### d. Launch the FastAPI server

```bash
uvicorn app.main:app --reload --port 8000
```

The backend server will start at:
- **API Base URL**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Alternative ReDoc**: `http://localhost:8000/redoc`

---

### 3. Frontend Setup

The frontend is a lightweight web interface that can be launched directly:

#### Option A: Direct Open
Simply double-click or open `frontend/index.html` in your web browser.

#### Option B: Local HTTP Server (Recommended)
From the root directory, you can serve the frontend with Python's built-in HTTP server:

```bash
# In a separate terminal window
cd frontend
python -m http.server 3000
```

Access the frontend dashboard at `http://localhost:3000`.

> [!TIP]
> Ensure the backend server is running simultaneously so the frontend can communicate with the API endpoints.

---

## 📡 API Documentation

Once the backend is running, the following endpoints are available:

| Method | Endpoint | Description | Sample Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status check | `{"message": "LS-Monitor API is running"}` |
| `GET` | `/api/health` | Service health status | `{"status": "ok", "service": "LS-Monitor"}` |
| `GET` | `/docs` | Interactive Swagger UI | Open in browser |
| `GET` | `/redoc` | ReDoc API documentation | Open in browser |

---

## 🔧 Configuration

For environment-specific configuration, create a `.env` file inside the `backend/` directory (ignored by version control):

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development

# Database (Future integration)
DATABASE_URL=sqlite:///./ls_monitor.db

# Alerting / Sensor Webhooks
ALERT_THRESHOLD_MM=50
```

---

## 🗺️ Roadmap

- [ ] **Geotechnical Sensor Telemetry**: Ingestion pipelines for rainfall gauges, pore water pressure sensors, and soil moisture meters.
- [ ] **Threshold & Early-Warning Alerts**: Automated notifications (Email, SMS, Webhooks) when movement or rainfall thresholds are breached.
- [ ] **Interactive GIS / Mapping**: Map-based visualization of monitored slopes and hazard zones.
- [ ] **Database Integration**: Persistent storage using PostgreSQL / SQLite via SQLAlchemy models.
- [ ] **Authentication & Roles**: Secure endpoints with OAuth2 / JWT authentication.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork** the repository.
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
