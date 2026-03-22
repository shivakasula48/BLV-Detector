import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import ResultsPage from './pages/ResultsPage'
import ReportPage from './pages/ReportPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </div>
  )
}
