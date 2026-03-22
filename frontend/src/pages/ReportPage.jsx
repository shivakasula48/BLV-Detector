import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getJsonReport, downloadPdfReport } from '../services/api';

function ReportPage() {
  const location = useLocation();
  const { vulnerabilities, target_url, scan_metadata } = location.state || {};
  const [jsonReport, setJsonReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vulnerabilities || !target_url) return;
    const fetchReport = async () => {
      try {
        const report = await getJsonReport(vulnerabilities, target_url, scan_metadata);
        setJsonReport(report);
      } catch (err) {
        setError(err.error || 'Failed to generate JSON report.');
      }
    };
    fetchReport();
    // eslint-disable-next-line
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const blob = await downloadPdfReport(vulnerabilities, target_url, scan_metadata);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'BLV-Detector-Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError(err.error || 'Failed to download PDF report.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Business Logic Vulnerability Report</h1>
      {error && <div className="mb-6 text-red-400">{error}</div>}
      {jsonReport ? (
        <pre className="bg-gray-800 p-6 rounded overflow-x-auto text-sm mb-8">
          {JSON.stringify(jsonReport, null, 2)}
        </pre>
      ) : (
        <div className="text-purple-400">Generating report...</div>
      )}
      <button
        className="py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded text-lg font-semibold transition"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
}

export default ReportPage;
