import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import { getAnalysisMethods } from '../services/api'
import './AnalysisMethods.css'

function AnalysisMethods() {
  const [methods, setMethods] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    getAnalysisMethods()
      .then((res) => setMethods(res.data.methods))
      .catch((err) => setError(err.message || 'Failed to load analysis methods'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Core Capabilities</span>
          <h2>Analysis Methods</h2>
          <p>
            Six industry-standard operational assessment methods, each with built-in
            Monte Carlo uncertainty quantification.
          </p>
        </div>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /><p>Fetching analysis methods from API…</p></div>
        ) : error ? (
          <div className="error-container">
            <FiAlertTriangle size={28} />
            <h3>Could not connect to backend</h3>
            <p>{error}</p>
            <p>Make sure the backend is running. <Link to="/api-status">Check API Status</Link></p>
            <button className="btn btn-primary" onClick={fetchData}><FiRefreshCw /> Retry</button>
          </div>
        ) : (
        <div className="methods-grid">
          {methods.map((m) => (
            <div
              key={m.id}
              className={`card method-card ${selected === m.id ? 'method-card-active' : ''}`}
              onClick={() => setSelected(selected === m.id ? null : m.id)}
            >
              <div className="method-header">
                <div className="card-icon">{m.icon}</div>
                <div>
                  <h3>{m.name}</h3>
                  <p className="method-short">{m.short_description}</p>
                </div>
              </div>

              {selected === m.id && (
                <div className="method-details">
                  <p>{m.long_description}</p>

                  {m.parameters && (
                    <div className="method-params">
                      <h4>Required Inputs</h4>
                      <ul>
                        {m.parameters.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.citations && (
                    <div className="method-citations">
                      <h4>Citations</h4>
                      <ul>
                        {m.citations.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default AnalysisMethods
