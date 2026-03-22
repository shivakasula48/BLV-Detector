const steps = ['Crawling', 'Analyzing', 'Detecting']

export default function ScanProgressBar({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              ${i < currentStep ? 'bg-green-500 text-white' :
                i === currentStep ? 'bg-cyan-400 text-gray-900' :
                'bg-gray-700 text-gray-400'}`}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i === currentStep ? 'text-cyan-400' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-1 w-16 mb-4 ${i < currentStep ? 'bg-green-500' : 'bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
