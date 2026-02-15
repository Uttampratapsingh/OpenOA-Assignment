import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import { getFeatures } from '../services/api'
import './Features.css'

function Features() {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    getFeatures()
      .then((res) => setFeatures(res.data.features))
      .catch((err) => setError(err.message || 'Failed to load features'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const coreFeatures = features.filter((f) => f.category === 'core')
  const utilFeatures = features.filter((f) => f.category === 'utility')

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-accent">Batteries Included</span>
          <h2>Features & Utilities</h2>
          <p>
            Everything you need for wind plant data analysis — from standardized data
            schemas to publication-ready visualizations.
          </p>
        </div>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /><p>Fetching features from API…</p></div>
        ) : error ? (
          <div className="error-container">
            <FiAlertTriangle size={28} />
            <h3>Could not connect to backend</h3>
            <p>{error}</p>
            <p>Make sure the backend is running. <Link to="/api-status">Check API Status</Link></p>
            <button className="btn btn-primary" onClick={fetchData}><FiRefreshCw /> Retry</button>
          </div>
        ) : (
        <>
        {coreFeatures.length > 0 && (
          <>
            <h3 className="feature-category">Core Features</h3>
            <div className="grid-2">
              {coreFeatures.map((f) => (
                <div key={f.id} className="card feature-card">
                  <div className="card-icon">{f.icon}</div>
                  <h3>{f.name}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {utilFeatures.length > 0 && (
          <>
            <h3 className="feature-category" style={{ marginTop: '3rem' }}>
              Utility Modules
            </h3>
            <div className="grid-3">
              {utilFeatures.map((f) => (
                <div key={f.id} className="card feature-card">
                  <div className="card-icon">{f.icon}</div>
                  <h3>{f.name}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        </>
        )}
      </div>
    </section>
  )
}

export default Features
