# workflow_analyzer.py
# This module implements the WorkflowAnalyzer class for analyzing crawled workflows.
# Uses networkx to build a directed graph and extract workflow patterns.

from typing import List, Dict, Any
import networkx as nx

class WorkflowAnalyzer:
	"""
	Analyzes workflow crawl data to build state machines and detect multi-step workflows.
	"""
	def __init__(self, crawl_data: List[Dict]):
		self.crawl_data = crawl_data
		self.graph = nx.DiGraph()
		self._build_graph()

	def _build_graph(self):
		for page in self.crawl_data:
			url = page.get('url')
			self.graph.add_node(url, forms=page.get('forms', []), method=page.get('method', 'GET'))
			for link in page.get('links', []):
				self.graph.add_edge(url, link)

	def build_state_machine(self) -> nx.DiGraph:
		"""
		Returns the directed graph modeling workflow states and transitions.
		"""
		return self.graph

	def find_entry_points(self) -> List[str]:
		"""
		Returns list of pages with forms or POST endpoints (potential entry points).
		"""
		entry_points = []
		for node, data in self.graph.nodes(data=True):
			forms = data.get('forms', [])
			method = data.get('method', 'GET')
			if forms or method == 'POST':
				entry_points.append(node)
		return entry_points

	def detect_required_sequences(self) -> List[List[str]]:
		"""
		Identifies multi-step workflows (e.g., login → cart → checkout).
		Returns list of sequences (paths) of length > 1.
		"""
		sequences = []
		for source in self.graph.nodes:
			for target in self.graph.nodes:
				if source != target:
					try:
						path = nx.shortest_path(self.graph, source, target)
						if len(path) > 1:
							sequences.append(path)
					except nx.NetworkXNoPath:
						continue
		return sequences

	def get_graph_data(self) -> Dict[str, Any]:
		"""
		Returns nodes and edges as JSON-serializable dict for frontend visualization.
		"""
		nodes = list(self.graph.nodes)
		edges = list(self.graph.edges)
		return {"nodes": nodes, "edges": edges}
