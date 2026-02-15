# OpenOA — Public Website

A full-stack web application for the **OpenOA** (Open Operational Assessment) project — an open-source Python framework developed by NREL for wind plant performance assessment. This repository contains the public-facing website with a **React + Vite** frontend and a **FastAPI** backend.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running Both Together](#running-both-together)
- [Backend Details](#backend-details)
  - [API Endpoints](#api-endpoints)
  - [Pydantic Schemas](#pydantic-schemas)
  - [Data Layer](#data-layer)
  - [Environment Variables](#environment-variables)
- [Frontend Details](#frontend-details)
  - [Pages & Routes](#pages--routes)
  - [Components](#components)
  - [API Service Layer](#api-service-layer)
  - [Design System](#design-system)
- [Production Build & Deployment](#production-build--deployment)
- [Analysis Methods Covered](#analysis-methods-covered)
- [Features & Utilities](#features--utilities)
- [Team & Contributors](#team--contributors)
- [Citations](#citations)
- [License](#license)

---

## Overview

OpenOA is an open-source software framework written in Python for assessing wind plant performance using operational assessment (OA) methodologies that consume time series data from wind plants. This website serves as the public portal for the project, showcasing:

- **6 analysis methods** with detailed descriptions, citations, and parameters
- **8 feature/utility modules** (PlantData schema, QA, filters, power curves, imputing, etc.)
- **Tabbed documentation** (overview, installation, schema, citations)
- **Team/contributor directory** with ORCID links
- **Contact form** for inquiries

Development of OpenOA was motivated by the Wind Plant Performance Prediction (WP3) Benchmark project, led by the National Renewable Energy Laboratory (NREL).

---

## Architecture

```
┌──────────────────────┐        /api/*         ┌──────────────────────┐
│                      │  ───────────────────►  │                     │
│   React + Vite       │                        │   FastAPI + Uvicorn │
│   (Port 5173)        │  ◄───────────────────  │   (Port 8000)      │
│                      │       JSON responses   │                     │
└──────────────────────┘                        └──────────────────────┘
        Frontend                                       Backend
```

- In **development**, Vite's built-in proxy forwards `/api` requests to `http://localhost:8000`.
- In **production**, a reverse proxy (Nginx, Caddy, etc.) routes `/api` to the backend.

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | Python web framework (async, high-performance) |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |
| [Pydantic v2](https://docs.pydantic.dev/) | Data validation & serialization |
| [pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) | Environment variable management |
| [python-dotenv](https://pypi.org/project/python-dotenv/) | `.env` file loading |

### Frontend

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev/) | UI library |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| Custom CSS | Lightweight styling with CSS variables (no framework) |

---

## Project Structure

```
OpenOA/
├── README.md                          ← You are here
├── backend/
│   ├── README.md
│   ├── requirements.txt               # Python dependencies
│   ├── .env.example                    # Environment variables template
│   └── app/
│       ├── __init__.py
│       ├── main.py                     # FastAPI app entry point, CORS, router registration
│       ├── config.py                   # Settings via pydantic-settings
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── health.py               # GET /api/health
│       │   ├── analysis.py             # GET /api/analysis, GET /api/analysis/{id}
│       │   ├── features.py             # GET /api/features
│       │   ├── docs.py                 # GET /api/docs/*, GET /api/team
│       │   └── contact.py              # POST /api/contact
│       ├── models/
│       │   ├── __init__.py
│       │   └── schemas.py              # Pydantic response/request models
│       └── data/
│           ├── __init__.py
│           └── content.py              # Static content data (methods, features, docs, team)
│
├── frontend/
│   ├── README.md
│   ├── package.json                    # Node.js dependencies & scripts
│   ├── vite.config.js                  # Vite config with API proxy
│   ├── index.html                      # HTML entry point
│   └── src/
│       ├── main.jsx                    # React entry point (BrowserRouter)
│       ├── App.jsx                     # Root component with routes
│       ├── index.css                   # Global styles & CSS design system
│       ├── components/
│       │   ├── Navbar.jsx / .css       # Sticky navigation bar
│       │   └── Footer.jsx / .css       # Site footer
│       ├── pages/
│       │   ├── Home.jsx / .css         # Landing page (hero, stats, previews, CTA)
│       │   ├── AnalysisMethods.jsx/.css# Interactive analysis methods listing
│       │   ├── Features.jsx / .css     # Features & utilities grid
│       │   ├── Documentation.jsx/.css  # Tabbed documentation viewer
│       │   ├── About.jsx / .css        # About page with team grid
│       │   └── Contact.jsx / .css      # Contact form with info cards
│       └── services/
│           └── api.js                  # Axios API client (all endpoint calls)
```

---

## Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.10+ |
| Node.js | 18+ |
| npm | 9+ |

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create & activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. (Optional) Configure environment variables
cp .env.example .env
# Edit .env as needed

# 5. Start the development server
uvicorn app.main:app --reload --port 8000
```

The API will be running at **http://localhost:8000**.

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Start the development server
npm run dev
```

The website will be running at **http://localhost:5173**.

> **Note:** The Vite dev server automatically proxies `/api` requests to `http://localhost:8000`. Make sure the backend is running first.

### Running Both Together

Open **two terminal windows**:

```bash
# Terminal 1 — Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Then open http://localhost:5173 in your browser.

---

## Backend Details

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API root — welcome message & version |
| `GET` | `/api/health` | Health check (status + version) |
| `GET` | `/api/analysis` | List all 6 analysis methods |
| `GET` | `/api/analysis/{method_id}` | Get a specific analysis method by ID |
| `GET` | `/api/features` | List all features & utility modules |
| `GET` | `/api/docs/overview` | Project overview |
| `GET` | `/api/docs/installation` | Installation instructions |
| `GET` | `/api/docs/schema` | PlantData schema documentation |
| `GET` | `/api/docs/citations` | Citation information |
| `GET` | `/api/team` | Team members & contributors |
| `POST` | `/api/contact` | Submit a contact form message |

### Pydantic Schemas

All request/response models are defined in `backend/app/models/schemas.py`:

| Model | Type | Description |
|-------|------|-------------|
| `AnalysisMethod` | Response | Analysis method with id, name, descriptions, citations, parameters, icon |
| `AnalysisListResponse` | Response | Paginated list of analysis methods |
| `Feature` | Response | Feature with id, name, description, icon, category |
| `FeaturesListResponse` | Response | Paginated list of features |
| `DocSection` | Response | Documentation section with title, content, subsections |
| `TeamMember` | Response | Team member with name, role, optional ORCID |
| `TeamResponse` | Response | List of team members |
| `ContactMessage` | Request | Contact form fields: name, email, subject, message |
| `ContactResponse` | Response | Success status + message |
| `HealthResponse` | Response | API status + version |

### Data Layer

All static content is stored in `backend/app/data/content.py` and includes:

- **`ANALYSIS_METHODS`** — 6 wind plant analysis methods (MonteCarloAEP, TurbineLongTermGrossEnergy, ElectricalLosses, EYAGapAnalysis, WakeLosses, StaticYawMisalignment)
- **`FEATURES`** — 8 feature/utility modules (PlantData Schema, Quality Assurance, Filters, Power Curve Fitting, Data Imputing, Met Data Processing, Plotting & Visualization, Uncertainty Quantification)
- **`OVERVIEW`** — Project overview text and subsections
- **`INSTALLATION`** — Install instructions (pip, source, development)
- **`SCHEMA_INFO`** — PlantData schema documentation with data table descriptions
- **`CITATIONS`** — Primary citation (Perr-Sauer et al., 2021, JOSS)
- **`TEAM_MEMBERS`** — 15 contributors with roles and ORCID identifiers

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_ENV` | `development` | Environment mode |
| `APP_PORT` | `8000` | Server port |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL for CORS |

CORS is configured to allow requests from the frontend URL, `http://localhost:5173`, and `http://localhost:3000`.

---

## Frontend Details

### Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section, animated stats, method previews, call-to-action |
| **Analysis Methods** | `/analysis` | All 6 analysis methods with expandable details |
| **Features** | `/features` | Core features & utility modules in a card grid |
| **Documentation** | `/documentation` | Tabbed viewer: overview, installation, schema, citations |
| **About** | `/about` | Project history, highlights, team member grid |
| **Contact** | `/contact` | Contact form + info cards (email, GitHub, Gitter) |

### Components

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `src/components/Navbar.jsx` | Sticky navigation bar with links to all pages |
| `Footer` | `src/components/Footer.jsx` | Site footer with project links |

### API Service Layer

All API calls are centralized in `frontend/src/services/api.js` using Axios:

```javascript
getAnalysisMethods()       // GET /api/analysis
getAnalysisMethod(id)      // GET /api/analysis/:id
getFeatures()              // GET /api/features
getOverview()              // GET /api/docs/overview
getInstallation()          // GET /api/docs/installation
getSchemaInfo()            // GET /api/docs/schema
getCitations()             // GET /api/docs/citations
getTeam()                  // GET /api/team
submitContact(data)        // POST /api/contact
checkHealth()              // GET /api/health
```

### Design System

The frontend uses a custom CSS design system with CSS variables (no CSS framework):

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#0066cc` | Primary blue |
| `--primary-dark` | `#004999` | Darker blue for hover states |
| `--primary-light` | `#e6f0ff` | Light blue backgrounds |
| `--accent` | `#00b4d8` | Accent teal |
| `--accent-dark` | `#0096b7` | Darker teal |
| `--bg` | `#ffffff` | Main background |
| `--bg-alt` | `#f8fafc` | Alternate section background |
| `--bg-dark` | `#0a1628` | Dark section background |
| `--text` | `#1a1a2e` | Primary text color |
| `--text-light` | `#64748b` | Secondary text color |
| `--text-white` | `#f1f5f9` | White text for dark sections |
| `--border` | `#e2e8f0` | Border color |
| `--success` | `#10b981` | Success green |
| `--warning` | `#f59e0b` | Warning amber |
| `--error` | `#ef4444` | Error red |
| `--radius` | `12px` | Default border radius |
| `--radius-sm` | `8px` | Small border radius |
| `--shadow` | — | Subtle shadow |
| `--shadow-md` | — | Medium shadow |
| `--shadow-lg` | — | Large shadow |
| `--max-width` | `1200px` | Content max width |
| `--font` | `Inter` | Primary typeface |

---

## Production Build & Deployment

### Build the Frontend

```bash
cd frontend
npm run build
```

This generates a production-optimized bundle in the `frontend/dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

### Run the Backend in Production

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Deployment Architecture (Example with Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve frontend static files
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Analysis Methods Covered

| # | Method | ID | Description |
|---|--------|----|-------------|
| 1 | **MonteCarloAEP** | `monte_carlo_aep` | Long-term AEP estimation with Monte Carlo uncertainty quantification |
| 2 | **TurbineLongTermGrossEnergy** | `turbine_long_term_gross_energy` | Long-term turbine ideal energy estimation |
| 3 | **ElectricalLosses** | `electrical_losses` | Average electrical losses estimation with uncertainty |
| 4 | **EYAGapAnalysis** | `eya_gap_analysis` | Gap analysis between pre-construction EYA and actual AEP |
| 5 | **WakeLosses** | `wake_losses` | Long-term internal wake loss estimation per turbine |
| 6 | **StaticYawMisalignment** | `static_yaw_misalignment` | Static yaw misalignment estimation per turbine |

---

## Features & Utilities

| # | Feature | Category | Description |
|---|---------|----------|-------------|
| 1 | PlantData Schema | Core | Standardized data model on Pandas DataFrames for SCADA, met, meter, and reanalysis data |
| 2 | Quality Assurance | Utility | Methods for identifying data quality issues (range checks, timestamp validation) |
| 3 | Filters | Utility | Operational data flagging & filtering (outlier detection, status code filtering) |
| 4 | Power Curve Fitting | Utility | Parametric & non-parametric power curve models (IEC binning, GAM) |
| 5 | Data Imputing | Utility | Missing data imputation (interpolation, nearest-neighbor, regression) |
| 6 | Met Data Processing | Utility | Meteorological data processing (air density, wind shear coefficients) |
| 7 | Plotting & Visualization | Utility | Standard wind energy plots (power curves, wind roses, layout maps) |
| 8 | Uncertainty Quantification | Core | Monte Carlo uncertainty propagation for all analysis methods |

---

## Team & Contributors

| Name | Role | ORCID |
|------|------|-------|
| Jordan Perr-Sauer | Lead Developer | [0000-0003-1571-1887](https://orcid.org/0000-0003-1571-1887) |
| Mike Optis | Researcher | [0000-0001-5617-6134](https://orcid.org/0000-0001-5617-6134) |
| Jason M. Fields | Researcher | [0000-0002-8781-6138](https://orcid.org/0000-0002-8781-6138) |
| Nicola Bodini | Researcher | [0000-0002-2550-9853](https://orcid.org/0000-0002-2550-9853) |
| Joseph C.Y. Lee | Researcher | [0000-0003-1897-6290](https://orcid.org/0000-0003-1897-6290) |
| Austin Todd | Developer | [0000-0002-1123-0982](https://orcid.org/0000-0002-1123-0982) |
| Eric Simley | Researcher | [0000-0002-1027-9848](https://orcid.org/0000-0002-1027-9848) |
| Robert Hammond | Developer | [0000-0003-4476-6406](https://orcid.org/0000-0003-4476-6406) |
| Caleb Phillips | Researcher | — |
| Monte Lunacek | Developer | — |
| Lindy Williams | Researcher | — |
| Anna Craig | Researcher | — |
| Nathan Agarwal | Developer | — |
| Shawn Sheng | Researcher | — |
| John Meissner | Developer | — |

---

## Citations

If you use OpenOA in your research, please cite:

> Perr-Sauer, J., Optis, M., Fields, J. M., Bodini, N., Lee, J. C. Y., Todd, A., Simley, E., Hammond, R., Phillips, C., Lunacek, M., Williams, L., Craig, A., Agarwal, N., Sheng, S., & Meissner, J. (2021). **OpenOA: An Open-Source Codebase For Operational Analysis of Wind Farms.** *Journal of Open Source Software*, 6(58), 2171. DOI: [10.21105/joss.02171](https://doi.org/10.21105/joss.02171)

---

## License

BSD-3-Clause — same as the [OpenOA](https://github.com/NREL/OpenOA) project.
