import { useState } from 'react'
import { submitContact } from '../services/api'
import { FiSend, FiMail, FiGithub, FiMessageCircle } from 'react-icons/fi'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await submitContact(form)
      setStatus({ type: 'success', message: res.data.message })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      const msg = err.response
        ? `Server error (${err.response.status}): ${err.response.data?.detail || 'Please try again.'}`
        : 'Backend is unreachable. Make sure the server is running on port 8000.'
      setStatus({ type: 'error', message: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
          <p>
            Have questions about OpenOA? Want to contribute or collaborate?
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-card">
              <FiMail size={24} />
              <div>
                <h4>Email</h4>
                <a href="mailto:openoa@nrel.gov">openoa@nrel.gov</a>
              </div>
            </div>

            <div className="contact-card">
              <FiGithub size={24} />
              <div>
                <h4>GitHub Issues</h4>
                <a
                  href="https://github.com/NREL/OpenOA/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report a bug or request a feature
                </a>
              </div>
            </div>

            <div className="contact-card">
              <FiMessageCircle size={24} />
              <div>
                <h4>Community Chat</h4>
                <a
                  href="https://gitter.im/NREL_OpenOA/community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Gitter community
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {status && (
              <div className={`alert alert-${status.type}`}>{status.message}</div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                rows={6}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSend /> {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
