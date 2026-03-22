function SeverityBadge({ severity }) {
  let color = 'bg-yellow-500';
  if (severity === 'High') color = 'bg-red-600';
  else if (severity === 'Medium') color = 'bg-orange-500';

  return (
    <span className={`px-3 py-1 rounded text-xs font-bold text-white ${color}`}>{severity}</span>
  );
}

export default SeverityBadge;
