import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AnalysisMethods from './pages/AnalysisMethods'
import Features from './pages/Features'
import Documentation from './pages/Documentation'
import Contact from './pages/Contact'
import About from './pages/About'
import APIStatus from './pages/APIStatus'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<AnalysisMethods />} />
          <Route path="/features" element={<Features />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api-status" element={<APIStatus />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
