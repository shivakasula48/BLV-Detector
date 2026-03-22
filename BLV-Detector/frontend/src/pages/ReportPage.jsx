import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJsonReport, downloadPdfReport } from '../services/api'

export default function ReportPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const results = JSON.parse(localStorage.getItem('scanResults') || '{}')
  const { vulnerabilities = [], targetUrl = '', crawlData = {} } = results
  const scan_metadata = {
    scan_time: new Date().toISOString(),
    total_pages: crawlData?.pages?.length || 0
  }

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getJsonReport(vulnerabilities, targetUrl, scan_metadata)
        setReport(data)
      } catch (err) {
        setError(err?.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [])

  async function handleDownloadPdf() {
    try {
      const blob = await downloadPdfReport(vulnerabilities, targetUrl)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'blv-report.pdf'; a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('PDF download failed: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-cyan-400">Vulnerability Report</h1>
        <div className="flex gap-3">
          <button onClick={() => navigate('/results')} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">← Back</button>
          <button onClick={handleDownloadPdf} className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold px-4 py-2 rounded-lg">Download PDF</button>
        </div>
      </div>
      {loading && <p className="text-cyan-400 animate-pulse">Generating report...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {report && (
        <pre className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-cyan-300 text-sm overflow-auto max-h-screen">
          {JSON.stringify(report, null, 2)}
        </pre>
      )}
    </div>
  )
}
