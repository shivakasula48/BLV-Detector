import { useLocation, useNavigate } from 'react-router-dom';
import VulnerabilityCard from '../components/VulnerabilityCard';
import WorkflowGraph from '../components/WorkflowGraph';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analyzeResult, detectResult, url, crawlResult } = location.state || {};

  if (!analyzeResult || !detectResult) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Scan Results for {url}</h1>
      <div className="mb-8">
        <WorkflowGraph graph={analyzeResult.graph} />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Vulnerabilities</h2>
      <div className="grid gap-4 mb-8">
        {detectResult.vulnerabilities.length === 0 ? (
          <div className="text-green-400">No vulnerabilities found.</div>
        ) : (
          detectResult.vulnerabilities.map(vuln => (
            <VulnerabilityCard key={vuln.id} vuln={vuln} />
          ))
        )}
      </div>
      <button
        className="py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded text-lg font-semibold transition"
        onClick={() => navigate('/report', {
          state: {
            vulnerabilities: detectResult.vulnerabilities,
            target_url: url,
            scan_metadata: {
              scan_date: new Date().toISOString(),
              total_pages: crawlResult.pages.length,
            },
          },
        })}
      >
        Generate Report
      </button>
    </div>
  );
}

export default ResultsPage;
