# OpenOA Frontend Website

A modern, responsive public website for the **OpenOA** project, built with **React** and **Vite**.

## Tech Stack

- **Framework**: [React 18](https://react.dev/) with [React Router](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Styling**: Custom CSS (no CSS framework — lightweight & fast)

## Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Root component with routing
│   ├── index.css              # Global styles & design system
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky navigation bar
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Site footer
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with hero, stats, previews
│   │   ├── Home.css
│   │   ├── AnalysisMethods.jsx # Interactive analysis methods listing
│   │   ├── AnalysisMethods.css
│   │   ├── Features.jsx       # Features & utilities grid
│   │   ├── Features.css
│   │   ├── Documentation.jsx  # Tabbed documentation viewer
│   │   ├── Documentation.css
│   │   ├── About.jsx          # About page with team grid
│   │   ├── About.css
│   │   ├── Contact.jsx        # Contact form
│   │   └── Contact.css
│   └── services/
│       └── api.js             # Axios API client
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, stats, method previews, CTA |
| Analysis | `/analysis` | All 6 analysis methods with expandable details |
| Features | `/features` | Core features & utility modules grid |
| Documentation | `/documentation` | Tabbed docs: overview, installation, schema, citations |
| About | `/about` | Project history, highlights, team members |
| Contact | `/contact` | Contact form + info cards (email, GitHub, Gitter) |

## Setup & Installation

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

> **Note:** The Vite dev server proxies `/api` requests to `http://localhost:8000` (the backend).
> Make sure the backend is running first.

### 3. Build for production

```bash
npm run build
```

Build output will be in the `dist/` folder.

### 4. Preview production build

```bash
npm run preview
```

## Design System

The CSS uses custom properties (CSS variables) for a consistent design:

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#0066cc` | Primary blue |
| `--accent` | `#00b4d8` | Accent teal |
| `--bg-dark` | `#0a1628` | Dark sections |
| `--radius` | `12px` | Border radius |
| `--font` | `Inter` | Main typeface |

## Connecting to the Backend

The frontend expects the backend API at `/api/*`. In development, Vite proxies these requests to `http://localhost:8000`. In production, configure your web server (Nginx, etc.) to proxy `/api` to the backend.

## License

BSD-3-Clause (same as OpenOA)
