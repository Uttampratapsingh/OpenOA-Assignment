import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiGithub, FiServer } from 'react-icons/fi'
import { checkHealth } from '../services/api'
import './Navbar.css'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/analysis', label: 'Analysis' },
  { path: '/features', label: 'Features' },
  { path: '/documentation', label: 'Docs' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/api-status', label: 'API' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [apiUp, setApiUp] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const ping = () => {
      checkHealth()
        .then(() => setApiUp(true))
        .catch(() => setApiUp(false))
    }
    ping()
    const interval = setInterval(ping, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">OpenOA</span>
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={location.pathname === path ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/api-status"
              className={`nav-api-status ${apiUp === true ? 'api-connected' : apiUp === false ? 'api-disconnected' : ''}`}
              title={apiUp === true ? 'Backend connected' : apiUp === false ? 'Backend disconnected' : 'Checking…'}
              onClick={() => setMenuOpen(false)}
            >
              <span className={`api-dot ${apiUp === true ? 'api-dot-ok' : apiUp === false ? 'api-dot-fail' : 'api-dot-checking'}`} />
              <FiServer size={16} />
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/NREL/OpenOA"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github"
            >
              <FiGithub size={20} />
            </a>
          </li>
        </ul>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
