import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'

const nodeStyle = {
  background: '#1f2937',
  color: '#22d3ee',
  border: '1px solid #22d3ee',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
}

export default function WorkflowGraph({ graphData }) {
  if (!graphData?.nodes?.length) {
    return <div className="text-gray-500 text-center py-8">No workflow graph data available</div>
  }

  const nodes = graphData.nodes.map((n, i) => ({
    id: String(n.id ?? i),
    data: { label: n.label ?? n.url ?? n.id ?? `Node ${i}` },
    position: { x: (i % 4) * 220, y: Math.floor(i / 4) * 100 },
    style: nodeStyle,
  }))

  const edges = (graphData.edges ?? []).map((e, i) => ({
    id: `e${i}`,
    source: String(e.source),
    target: String(e.target),
    style: { stroke: '#22d3ee' },
  }))

  return (
    <ReactFlowProvider>
      <div style={{ height: 350 }} className="bg-gray-900 rounded-xl border border-gray-700">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#374151" />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}
