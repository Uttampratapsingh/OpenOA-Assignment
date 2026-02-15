import axios from 'axios'

// In production (Vercel), VITE_API_URL points to the deployed backend.
// In local dev, Vite proxies /api to localhost:8000.
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor — normalise errors for consumers
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error — backend unreachable
      error.message = 'Backend server is not reachable. Is it running on port 8000?'
    }
    return Promise.reject(error)
  }
)

export const getAnalysisMethods = () => api.get('/analysis')
export const getAnalysisMethod = (id) => api.get(`/analysis/${id}`)
export const getFeatures = () => api.get('/features')
export const getOverview = () => api.get('/docs/overview')
export const getInstallation = () => api.get('/docs/installation')
export const getSchemaInfo = () => api.get('/docs/schema')
export const getCitations = () => api.get('/docs/citations')
export const getTeam = () => api.get('/team')
export const submitContact = (data) => api.post('/contact', data)
export const checkHealth = () => api.get('/health')

export default api
