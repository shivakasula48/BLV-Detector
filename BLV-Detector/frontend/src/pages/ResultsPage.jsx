import { useNavigate } from 'react-router-dom'
import VulnerabilityCard from '../components/VulnerabilityCard'
import WorkflowGraph from '../components/WorkflowGraph'

export default function ResultsPage() {
  const navigate = useNavigate()
  const results = JSON.parse(localStorage.getItem('scanResults') || '{}')
  const { vulnerabilities = [], graphData = {} } = results

  const high = vulnerabilities.filter(v => v.severity === 'High').length
  const medium = vulnerabilities.filter(v => v.severity === 'Medium').length
  const low = vulnerabilities.filter(v => v.severity === 'Low').length

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-cyan-400">Scan Results</h1>
        <button onClick={() => navigate('/report')} className="bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold px-6 py-2 rounded-lg">
          Generate Report →
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[['Total', vulnerabilities.length, 'text-white'], ['High', high, 'text-red-400'], ['Medium', medium, 'text-orange-400'], ['Low', low, 'text-yellow-400']].map(([label, count, color]) => (
          <div key={label} className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
            <div className={`text-3xl font-black ${color}`}>{count}</div>
            <div className="text-gray-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-white mb-3">Workflow Graph</h2>
        <WorkflowGraph graphData={graphData} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white mb-3">Vulnerabilities</h2>
        {vulnerabilities.length === 0
          ? <p className="text-gray-500">No vulnerabilities detected.</p>
          : <div className="space-y-4">{vulnerabilities.map((v, i) => <VulnerabilityCard key={i} vulnerability={v} />)}</div>
        }
      </div>
    </div>
  )
}
