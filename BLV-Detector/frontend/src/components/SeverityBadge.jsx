export default function SeverityBadge({ severity }) {
  const colors = {
    High: 'bg-red-600 text-white',
    Medium: 'bg-orange-500 text-white',
    Low: 'bg-yellow-400 text-gray-900',
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors[severity] || 'bg-gray-500'}`}>
      {severity}
    </span>
  )
}
