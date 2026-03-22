import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function WorkflowGraph({ graph }) {
  if (!graph) return null;
  const nodes = graph.nodes.map((id, idx) => ({
    id,
    data: { label: id },
    position: { x: 100 * idx, y: 100 },
    style: { background: '#232136', color: '#fff', border: '2px solid #a78bfa' },
  }));
  const edges = graph.edges.map(([source, target], idx) => ({
    id: `e${idx}`,
    source,
    target,
    animated: true,
    style: { stroke: '#a78bfa' },
  }));

  return (
    <div className="bg-gray-800 rounded p-4 border border-gray-700" style={{ height: 400 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#16171d" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default WorkflowGraph;
