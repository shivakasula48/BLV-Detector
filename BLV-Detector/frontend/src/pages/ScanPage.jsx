import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScanProgressBar from '../components/ScanProgressBar'
import { startCrawl, analyzeWorkflow, detectVulnerabilities } from '../services/api'

export default function ScanPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [statusMsg, setStatusMsg] = useState('Starting crawl...')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function runScan() {
      try {
        const config = JSON.parse(localStorage.getItem('scanConfig') || '{}')
        if (!config.targetUrl) { navigate('/'); return }

        setStatusMsg('Crawling target application...')
        setCurrentStep(0)
        const crawlData = await startCrawl(config.targetUrl, config.maxDepth)

        setStatusMsg('Analyzing workflow and state transitions...')
        setCurrentStep(1)
        const graphData = await analyzeWorkflow(crawlData.pages)

        setStatusMsg('Detecting business logic vulnerabilities...')
        setCurrentStep(2)
        const { vulnerabilities } = await detectVulnerabilities(graphData.graph, crawlData.pages)

        const essentialData = {
          vulnerabilities,
          graphData: graphData.graph,
          targetUrl: config.targetUrl,
          summary: {
            totalPages: crawlData?.pages?.length || 0,
            scanTime: new Date().toISOString()
          }
        }
        localStorage.setItem('scanResults', JSON.stringify(essentialData))
        navigate('/results')
      } catch (err) {
        setError(err?.response?.data?.error || err.message || 'Scan failed')
      }
    }
    runScan()
  }, [])

  if (error) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
      <p className="text-red-400 text-lg font-semibold">{error}</p>
      <button onClick={() => navigate('/')} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">Go Back</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-8 px-4">
      <h2 className="text-2xl font-bold text-white">Scanning in progress...</h2>
      <ScanProgressBar currentStep={currentStep} />
      <p className="text-cyan-400 text-sm animate-pulse">{statusMsg}</p>
    </div>
  )
}
