import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startCrawl, analyzeWorkflow, detectVulnerabilities } from '../services/api';
import ScanProgressBar from '../components/ScanProgressBar';

function ScanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, depth } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      navigate('/');
      return;
    }
    const runScan = async () => {
      try {
        setProgress(0);
        const crawlResult = await startCrawl(url, depth);
        setProgress(1);
        const analyzeResult = await analyzeWorkflow(crawlResult.pages);
        setProgress(2);
        const detectResult = await detectVulnerabilities(analyzeResult.graph, crawlResult.pages);
        setProgress(3);
        navigate('/results', {
          state: {
            crawlResult,
            analyzeResult,
            detectResult,
            url,
            depth,
          },
        });
      } catch (err) {
        setError(err.error || 'Scan failed.');
      }
    };
    runScan();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Scanning {url}</h1>
      <ScanProgressBar progress={progress} />
      {error && <div className="mt-6 text-red-400">{error}</div>}
    </div>
  );
}

export default ScanPage;
