import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiGithub, FiBookOpen, FiDownload, FiAlertTriangle } from 'react-icons/fi'
import { getAnalysisMethods, getFeatures, checkHealth } from '../services/api'
import './Home.css'

function Home() {
  const [methods, setMethods] = useState([])
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [backendUp, setBackendUp] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await checkHealth()
        setBackendUp(true)
      } catch {
        setBackendUp(false)
        setLoading(false)
        return
      }
      try {
        const [methodsRes, featuresRes] = await Promise.all([
          getAnalysisMethods(),
          getFeatures(),
        ])
        setMethods(methodsRes.data.methods.slice(0, 3))
        setFeatures(featuresRes.data.features.slice(0, 4))
      } catch {
        // Partial data is acceptable
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-content">
          <span className="badge badge-primary">Open Source &middot; Python 3.10+</span>
          <h1>
            Wind Plant<br />
            <span className="gradient-text">Operational Analysis</span>
          </h1>
          <p className="hero-sub">
            OpenOA is an open-source Python framework for assessing wind plant performance
            using data-driven operational assessment methodologies — developed by NREL.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/NREL/OpenOA" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FiGithub /> View on GitHub
            </a>
            <Link to="/documentation" className="btn btn-secondary">
              <FiBookOpen /> Documentation
            </Link>
          </div>
          <div className="hero-install">
            <code>pip install openoa</code>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Analysis Methods</span>
            </div>
            <div className="stat">
              <span className="stat-number">8+</span>
              <span className="stat-label">Utility Modules</span>
            </div>
            <div className="stat">
              <span className="stat-number">15</span>
              <span className="stat-label">Contributors</span>
            </div>
            <div className="stat">
              <span className="stat-number">v3.2</span>
              <span className="stat-label">Latest Release</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Backend Status Banner ────────────────── */}
      {backendUp === false && (
        <section className="section">
          <div className="container">
            <div className="backend-banner backend-banner-warn">
              <FiAlertTriangle size={20} />
              <div>
                <strong>Backend API is not connected.</strong>
                <p>Start the backend server to load live data. See the <Link to="/api-status">API Status</Link> page for details.</p>
                <pre>cd backend && uvicorn app.main:app --reload --port 8000</pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Analysis Methods Preview ──────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Analysis Methods</h2>
            <p>
              Industry-standard operational assessment methods with built-in
              uncertainty quantification.
            </p>
          </div>
          {loading ? (
            <div className="loading-container"><div className="loading-spinner" /><p>Loading from API…</p></div>
          ) : methods.length === 0 ? (
            <div className="empty-state">
              <p>No data available. <Link to="/api-status">Check API Status</Link></p>
            </div>
          ) : (
          <div className="grid-3">
            {methods.map((m) => (
              <div key={m.id} className="card">
                <div className="card-icon">{m.icon}</div>
                <h3>{m.name}</h3>
                <p>{m.short_description}</p>
              </div>
            ))}
          </div>
          )}
          <div className="section-cta">
            <Link to="/analysis" className="btn btn-secondary">
              View All Methods <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Preview ─────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Built on Pandas, SciPy, and scikit-learn — batteries included.</p>
          </div>
          {loading ? (
            <div className="loading-container"><div className="loading-spinner" /><p>Loading from API…</p></div>
          ) : features.length === 0 ? (
            <div className="empty-state">
              <p>No data available. <Link to="/api-status">Check API Status</Link></p>
            </div>
          ) : (
          <div className="grid-4">
            {features.map((f) => (
              <div key={f.id} className="card">
                <div className="card-icon">{f.icon}</div>
                <h4>{f.name}</h4>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
          )}
          <div className="section-cta">
            <Link to="/features" className="btn btn-secondary">
              Explore Features <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container cta-section">
          <h2>Ready to get started?</h2>
          <p>
            Install OpenOA and start analyzing wind plant performance in minutes.
          </p>
          <div className="hero-actions">
            <a href="https://pypi.org/project/openoa/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              <FiDownload /> Install from PyPI
            </a>
            <Link to="/documentation" className="btn btn-secondary" style={{ borderColor: '#fff', color: '#fff' }}>
              Read the Docs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
