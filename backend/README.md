# OpenOA Backend API

A RESTful API server built with **FastAPI** that serves OpenOA project data, analysis method information, documentation content, and contact endpoints for the OpenOA public website.

## Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/) (ASGI)
- **CORS**: Enabled for frontend communication
- **Docs**: Auto-generated Swagger UI & ReDoc

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py             # Configuration settings
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── analysis.py       # Analysis methods endpoints
│   │   ├── features.py       # Features & utilities endpoints
│   │   ├── docs.py           # Documentation endpoints
│   │   ├── contact.py        # Contact form endpoint
│   │   └── health.py         # Health check endpoint
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py        # Pydantic response models
│   └── data/
│       └── content.py        # Static content/data
├── requirements.txt
├── README.md
└── .env.example
```

## Setup & Installation

### 1. Create a virtual environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the development server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### 4. API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/analysis` | List all analysis methods |
| `GET` | `/api/analysis/{method_id}` | Get specific analysis method details |
| `GET` | `/api/features` | List all features & utilities |
| `GET` | `/api/docs/overview` | Get project overview |
| `GET` | `/api/docs/installation` | Get installation instructions |
| `GET` | `/api/docs/schema` | Get PlantData schema info |
| `GET` | `/api/docs/citations` | Get citation information |
| `GET` | `/api/team` | Get team/contributors info |
| `POST` | `/api/contact` | Submit a contact form message |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_ENV` | `development` | Environment mode |
| `APP_PORT` | `8000` | Server port |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL for CORS |

## License

BSD-3-Clause (same as OpenOA)
