import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [targetUrl, setTargetUrl] = useState('')
  const [maxDepth, setMaxDepth] = useState(2)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!targetUrl.startsWith('http')) return alert('Please enter a valid URL starting with http:// or https://')
    localStorage.setItem('scanConfig', JSON.stringify({ targetUrl, maxDepth }))
    navigate('/scan')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-black text-cyan-400 tracking-tight">BLV Detector</h1>
        <p className="text-gray-400 mt-2 text-lg">Business Logic Vulnerability Scanner</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg space-y-5">
        <div>
          <label className="text-gray-300 text-sm font-semibold block mb-1">Target URL</label>
          <input
            type="text"
            value={targetUrl}
            onChange={e => setTargetUrl(e.target.value)}
            placeholder="https://target-app.com"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            required
          />
        </div>
        <div>
          <label className="text-gray-300 text-sm font-semibold block mb-1">Max Crawl Depth</label>
          <select
            value={maxDepth}
            onChange={e => setMaxDepth(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          >
            {[1,2,3,4,5].map(d => <option key={d} value={d}>Depth {d}</option>)}
          </select>
        </div>
        <button type="submit" className="w-full bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold py-3 rounded-lg transition">
          Start Scan →
        </button>
      </form>
    </div>
  )
}
