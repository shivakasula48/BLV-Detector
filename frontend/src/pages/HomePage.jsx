import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState(3);
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }
    navigate('/scan', { state: { url, depth } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">BLV-Detector</h1>
      <form className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md" onSubmit={handleStart}>
        <label className="block mb-4">
          <span className="text-lg">Target URL</span>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            placeholder="https://example.com"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-lg">Max Depth</span>
          <input
            type="number"
            value={depth}
            min={1}
            max={10}
            onChange={e => setDepth(Number(e.target.value))}
            className="mt-2 w-24 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
        </label>
        <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded text-lg font-semibold transition">Start Scan</button>
      </form>
    </div>
  );
}

export default HomePage;
