import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import { getOverview, getInstallation, getSchemaInfo, getCitations } from '../services/api'
import './Documentation.css'

function Documentation() {
  const [overview, setOverview] = useState(null)
  const [installation, setInstallation] = useState(null)
  const [schema, setSchema] = useState(null)
  const [citations, setCitations] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    Promise.all([
      getOverview().then((r) => setOverview(r.data)),
      getInstallation().then((r) => setInstallation(r.data)),
      getSchemaInfo().then((r) => setSchema(r.data)),
      getCitations().then((r) => setCitations(r.data)),
    ])
      .catch((err) => setError(err.message || 'Failed to load documentation'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'installation', label: 'Installation' },
    { id: 'schema', label: 'PlantData Schema' },
    { id: 'citations', label: 'Citations' },
  ]

  const renderContent = () => {
    let data = null
    switch (activeTab) {
      case 'overview':
        data = overview
        break
      case 'installation':
        data = installation
        break
      case 'schema':
        data = schema
        break
      case 'citations':
        data = citations
        break
      default:
        return null
    }

    if (!data) return <p className="loading">Loading from API…</p>

    return (
      <div className="doc-content">
        <h2>{data.title}</h2>
        <div className="doc-body">
          {data.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {data.subsections &&
          data.subsections.map((sub, i) => (
            <div key={i} className="doc-subsection">
              <h3>{sub.title}</h3>
              {sub.items && (
                <ul>
                  {sub.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {sub.code && <pre className="code-block">{sub.code}</pre>}
              {sub.text && <blockquote className="doc-quote">{sub.text}</blockquote>}
              {sub.doi && (
                <p className="doc-doi">
                  DOI:{' '}
                  <a
                    href={`https://doi.org/${sub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sub.doi}
                  </a>
                </p>
              )}
            </div>
          ))}
      </div>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">v3.2</span>
          <h2>Documentation</h2>
          <p>
            Get started with OpenOA — installation, data schemas, and citation info.
          </p>
        </div>

        {loading && !overview && !installation && !schema && !citations ? (
          <div className="loading-container"><div className="loading-spinner" /><p>Fetching documentation from API…</p></div>
        ) : error && !overview ? (
          <div className="error-container">
            <FiAlertTriangle size={28} />
            <h3>Could not connect to backend</h3>
            <p>{error}</p>
            <p>Make sure the backend is running. <Link to="/api-status">Check API Status</Link></p>
            <button className="btn btn-primary" onClick={fetchData}><FiRefreshCw /> Retry</button>
          </div>
        ) : (
        <div className="docs-layout">
          <aside className="docs-sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`docs-tab ${activeTab === tab.id ? 'docs-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}

            <div className="docs-external">
              <h4>External Resources</h4>
              <ul>
                <li>
                  <a href="https://openoa.readthedocs.io" target="_blank" rel="noopener noreferrer">
                    Full API Docs (ReadTheDocs)
                  </a>
                </li>
                <li>
                  <a href="https://mybinder.org/v2/gh/NREL/OpenOA/main?filepath=examples" target="_blank" rel="noopener noreferrer">
                    Interactive Examples (Binder)
                  </a>
                </li>
                <li>
                  <a href="https://github.com/NREL/OpenOA" target="_blank" rel="noopener noreferrer">
                    Source Code (GitHub)
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="docs-main">{renderContent()}</div>
        </div>
        )}
      </div>
    </section>
  )
}

export default Documentation
