import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeam, getOverview } from '../services/api'
import { FiExternalLink, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import './About.css'

function About() {
  const [team, setTeam] = useState([])
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    Promise.all([
      getTeam().then((r) => setTeam(r.data.members)),
      getOverview().then((r) => setOverview(r.data)),
    ])
      .catch((err) => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  return (
    <>
      {/* ── About Section ────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Since 2018</span>
            <h2>About OpenOA</h2>
          </div>

          {loading ? (
            <div className="loading-container"><div className="loading-spinner" /><p>Fetching data from API…</p></div>
          ) : error ? (
            <div className="error-container">
              <FiAlertTriangle size={28} />
              <h3>Could not connect to backend</h3>
              <p>{error}</p>
              <p>Make sure the backend is running. <Link to="/api-status">Check API Status</Link></p>
              <button className="btn btn-primary" onClick={fetchData}><FiRefreshCw /> Retry</button>
            </div>
          ) : (
          <div className="about-content">
            {overview && (
              <>
                {overview.content.split('\n\n').map((p, i) => (
                  <p key={i} className="about-text">{p}</p>
                ))}
              </>
            )}

            <div className="about-highlights">
              <div className="highlight-card">
                <h4>🏛️ Developed by NREL</h4>
                <p>
                  National Renewable Energy Laboratory, a U.S. Department of Energy
                  national lab focused on renewable energy research.
                </p>
              </div>
              <div className="highlight-card">
                <h4>🌍 Part of WETO Stack</h4>
                <p>
                  Part of the Wind Energy Technologies Office software portfolio for
                  integrated wind energy modeling and analysis.
                </p>
              </div>
              <div className="highlight-card">
                <h4>📄 Published in JOSS</h4>
                <p>
                  Peer-reviewed and published in the Journal of Open Source Software
                  (JOSS) with DOI: 10.21105/joss.02171.
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* ── Team Section ─────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Team & Contributors</h2>
            <p>The researchers and developers behind OpenOA.</p>
          </div>

          {team.length === 0 && !loading && (
            <div className="empty-state"><p>No team data loaded. <Link to="/api-status">Check API Status</Link></p></div>
          )}
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card card">
                <div className="team-avatar">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <h4 className="team-name">{member.name}</h4>
                <span className="team-role">{member.role}</span>
                {member.orcid && (
                  <a
                    href={`https://orcid.org/${member.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-orcid"
                  >
                    ORCID <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
