import { Link } from 'react-router-dom'
import { FiGithub, FiMail, FiBookOpen } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>⚡ OpenOA</h3>
            <p>
              An open-source Python framework for wind plant operational analysis.
              Developed by NREL with support from the U.S. Department of Energy.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navigate</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/analysis">Analysis Methods</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/api-status">API Status</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="https://github.com/NREL/OpenOA" target="_blank" rel="noopener noreferrer">
                  <FiGithub /> GitHub
                </a>
              </li>
              <li>
                <a href="https://openoa.readthedocs.io" target="_blank" rel="noopener noreferrer">
                  <FiBookOpen /> ReadTheDocs
                </a>
              </li>
              <li>
                <a href="https://pypi.org/project/openoa/" target="_blank" rel="noopener noreferrer">
                  📦 PyPI
                </a>
              </li>
              <li>
                <a href="mailto:openoa@nrel.gov">
                  <FiMail /> openoa@nrel.gov
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><span>BSD-3-Clause License</span></li>
              <li>
                <a href="https://www.nrel.gov" target="_blank" rel="noopener noreferrer">
                  NREL
                </a>
              </li>
              <li>
                <a href="https://www.energy.gov" target="_blank" rel="noopener noreferrer">
                  U.S. DOE
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} National Renewable Energy Laboratory (NREL). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
