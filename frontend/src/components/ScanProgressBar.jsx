function ScanProgressBar({ progress }) {
  const steps = ['Crawling', 'Analyzing', 'Detecting'];
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${progress > idx ? 'border-purple-500 bg-purple-600' : 'border-gray-600 bg-gray-800'} text-white font-bold`}>{idx + 1}</div>
            <span className="mt-2 text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-gray-700 rounded">
        <div className="h-2 bg-purple-500 rounded" style={{ width: `${(progress / steps.length) * 100}%` }}></div>
      </div>
    </div>
  );
}

export default ScanProgressBar;
