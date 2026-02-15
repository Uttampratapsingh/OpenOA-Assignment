import { useEffect, useState, useCallback } from 'react'
import {
  checkHealth,
  getAnalysisMethods,
  getAnalysisMethod,
  getFeatures,
  getOverview,
  getInstallation,
  getSchemaInfo,
  getCitations,
  getTeam,
} from '../services/api'
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiServer, FiActivity } from 'react-icons/fi'
import './APIStatus.css'

const ENDPOINTS = [
  { id: 'health', label: 'Health Check', method: 'GET', path: '/api/health', fn: checkHealth },
  { id: 'analysis', label: 'Analysis Methods', method: 'GET', path: '/api/analysis', fn: getAnalysisMethods },
  { id: 'analysis-detail', label: 'Analysis Detail', method: 'GET', path: '/api/analysis/monte_carlo_aep', fn: () => getAnalysisMethod('monte_carlo_aep') },
  { id: 'features', label: 'Features', method: 'GET', path: '/api/features', fn: getFeatures },
  { id: 'overview', label: 'Docs: Overview', method: 'GET', path: '/api/docs/overview', fn: getOverview },
  { id: 'installation', label: 'Docs: Installation', method: 'GET', path: '/api/docs/installation', fn: getInstallation },
  { id: 'schema', label: 'Docs: Schema', method: 'GET', path: '/api/docs/schema', fn: getSchemaInfo },
  { id: 'citations', label: 'Docs: Citations', method: 'GET', path: '/api/docs/citations', fn: getCitations },
  { id: 'team', label: 'Team', method: 'GET', path: '/api/team', fn: getTeam },
]

function APIStatus() {
  const [results, setResults] = useState({})
  const [testing, setTesting] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  const testEndpoint = useCallback(async (ep) => {
    setResults((prev) => ({ ...prev, [ep.id]: { status: 'loading' } }))
    const start = performance.now()
    try {
      const res = await ep.fn()
      const duration = Math.round(performance.now() - start)
      setResults((prev) => ({
        ...prev,
        [ep.id]: {
          status: 'success',
          statusCode: res.status,
          duration,
          data: res.data,
        },
      }))
    } catch (err) {
      const duration = Math.round(performance.now() - start)
      setResults((prev) => ({
        ...prev,
        [ep.id]: {
          status: 'error',
          statusCode: err.response?.status || null,
          duration,
          error: err.response?.data?.detail || err.message || 'Connection refused',
        },
      }))
    }
  }, [])

  const testAll = useCallback(async () => {
    setTesting(true)
    for (const ep of ENDPOINTS) {
      await testEndpoint(ep)
    }
    setTesting(false)
  }, [testEndpoint])

  useEffect(() => {
    testAll()
  }, [testAll])

  const successCount = Object.values(results).filter((r) => r.status === 'success').length
  const errorCount = Object.values(results).filter((r) => r.status === 'error').length
  const totalTested = successCount + errorCount

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">
            <FiServer size={14} /> Backend Connection
          </span>
          <h2>API Status Dashboard</h2>
          <p>
            Monitor all backend API endpoints in real time. This page tests every
            route and shows response status, latency, and returned data.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="api-summary">
          <div className="summary-card summary-total">
            <FiActivity size={24} />
            <div>
              <span className="summary-number">{ENDPOINTS.length}</span>
              <span className="summary-label">Total Endpoints</span>
            </div>
          </div>
          <div className="summary-card summary-success">
            <FiCheckCircle size={24} />
            <div>
              <span className="summary-number">{successCount}</span>
              <span className="summary-label">Healthy</span>
            </div>
          </div>
          <div className="summary-card summary-error">
            <FiXCircle size={24} />
            <div>
              <span className="summary-number">{errorCount}</span>
              <span className="summary-label">Failed</span>
            </div>
          </div>
          <div className="summary-card summary-avg">
            <FiClock size={24} />
            <div>
              <span className="summary-number">
                {totalTested > 0
                  ? Math.round(
                      Object.values(results)
                        .filter((r) => r.duration)
                        .reduce((a, r) => a + r.duration, 0) / totalTested
                    )
                  : '—'}
                <small>ms</small>
              </span>
              <span className="summary-label">Avg Latency</span>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="api-actions">
          <button className="btn btn-primary" onClick={testAll} disabled={testing}>
            <FiRefreshCw className={testing ? 'spin' : ''} />
            {testing ? 'Testing…' : 'Test All Endpoints'}
          </button>
        </div>

        {/* Backend Down Banner */}
        {totalTested > 0 && errorCount === ENDPOINTS.length && (
          <div className="api-banner api-banner-error">
            <FiXCircle size={20} />
            <div>
              <strong>Backend is unreachable.</strong> Make sure the FastAPI server is running:
              <pre>cd backend &amp;&amp; uvicorn app.main:app --reload --port 8000</pre>
            </div>
          </div>
        )}

        {totalTested > 0 && successCount === ENDPOINTS.length && (
          <div className="api-banner api-banner-success">
            <FiCheckCircle size={20} />
            <strong>All endpoints are healthy!</strong> The frontend is fully connected to the backend.
          </div>
        )}

        {/* Endpoints Table */}
        <div className="api-table">
          <div className="api-table-header">
            <span>Status</span>
            <span>Method</span>
            <span>Endpoint</span>
            <span>Description</span>
            <span>Latency</span>
            <span>Action</span>
          </div>

          {ENDPOINTS.map((ep) => {
            const r = results[ep.id]
            return (
              <div key={ep.id} className="api-table-row-wrapper">
                <div
                  className={`api-table-row ${expandedId === ep.id ? 'api-row-expanded' : ''}`}
                  onClick={() => setExpandedId(expandedId === ep.id ? null : ep.id)}
                >
                  <span className="api-status-cell">
                    {!r || r.status === 'loading' ? (
                      <span className="status-dot status-loading" />
                    ) : r.status === 'success' ? (
                      <span className="status-dot status-ok" />
                    ) : (
                      <span className="status-dot status-fail" />
                    )}
                    <span className="status-code">
                      {r?.statusCode || '—'}
                    </span>
                  </span>
                  <span className="api-method">{ep.method}</span>
                  <span className="api-path"><code>{ep.path}</code></span>
                  <span className="api-label">{ep.label}</span>
                  <span className="api-latency">
                    {r?.duration ? `${r.duration}ms` : '—'}
                  </span>
                  <span>
                    <button
                      className="btn-icon"
                      title="Re-test"
                      onClick={(e) => {
                        e.stopPropagation()
                        testEndpoint(ep)
                      }}
                    >
                      <FiRefreshCw size={14} />
                    </button>
                  </span>
                </div>

                {expandedId === ep.id && r && (
                  <div className="api-response-panel">
                    <h4>Response {r.status === 'error' ? '(Error)' : '(Success)'}</h4>
                    <pre className="api-response-data">
                      {r.status === 'success'
                        ? JSON.stringify(r.data, null, 2)
                        : r.error}
                    </pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Instructions */}
        <div className="api-instructions">
          <h3>How to Connect</h3>
          <div className="instruction-steps">
            <div className="instruction-step">
              <span className="step-number">1</span>
              <div>
                <h4>Start the Backend</h4>
                <pre>cd backend{'\n'}python -m venv venv{'\n'}source venv/bin/activate{'\n'}pip install -r requirements.txt{'\n'}uvicorn app.main:app --reload --port 8000</pre>
              </div>
            </div>
            <div className="instruction-step">
              <span className="step-number">2</span>
              <div>
                <h4>Start the Frontend</h4>
                <pre>cd frontend{'\n'}npm install{'\n'}npm run dev</pre>
              </div>
            </div>
            <div className="instruction-step">
              <span className="step-number">3</span>
              <div>
                <h4>Verify Connection</h4>
                <p>
                  Click "Test All Endpoints" above. All dots should turn
                  green. You can also visit{' '}
                  <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                    Swagger UI
                  </a>{' '}
                  to explore the API directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default APIStatus
