# workflow_crawler.py
# This module implements the WorkflowCrawler class for crawling web application workflows.
# Uses requests and BeautifulSoup4 to extract pages, links, and forms.

from typing import List, Dict, Set, Optional
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel
from datetime import datetime

class CrawledPage(BaseModel):
	url: str
	status_code: int
	links: List[str]
	forms: List[Dict]
	method: str
	params: Optional[Dict] = None
	timestamp: datetime

class WorkflowCrawler:
	"""
	Crawls web application pages starting from base_url, up to max_depth.
	Extracts links, forms, and builds a workflow graph.
	"""
	def __init__(self, base_url: str, max_depth: int = 3):
		self.base_url = base_url.rstrip('/')
		self.max_depth = max_depth
		self.visited: Set[str] = set()
		self.pages: List[CrawledPage] = []
		self.graph: Dict[str, List[str]] = {}
		self.domain = urlparse(self.base_url).netloc

	def crawl(self) -> List[CrawledPage]:
		self.visited.clear()
		self.pages.clear()
		self.graph.clear()
		self._crawl_page(self.base_url, depth=0)
		return self.pages

	def _crawl_page(self, url: str, depth: int):
		if depth > self.max_depth or url in self.visited:
			return
		self.visited.add(url)
		try:
			headers = {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5',
				'Connection': 'keep-alive',
			}
			resp = requests.get(url, timeout=15, headers=headers, allow_redirects=True)
			print(f"[CRAWL] {resp.status_code} - {url} - links found: will count")
			status_code = resp.status_code
			html = resp.text
		except Exception as e:
			status_code = 0
			html = ''
		soup = BeautifulSoup(html, 'html.parser')
		links = self._extract_links(soup, url)
		print(f"[CRAWL] Extracted {len(links)} links from {url}")
		from urllib.parse import parse_qs, urlparse as _urlparse
		parsed_url = _urlparse(url)
		params = None
		if parsed_url.query:
			raw_params = parse_qs(parsed_url.query)
			params = {k: v[0] for k, v in raw_params.items()}
		forms = self._extract_forms(soup)
		page = CrawledPage(
			url=url,
			status_code=status_code,
			links=links,
			forms=forms,
			method="GET",
			params=params,
			timestamp=datetime.utcnow()
		)
		self.pages.append(page)
		self.graph[url] = links
		for link in links:
			self._crawl_page(link, depth + 1)

	def _extract_links(self, soup: BeautifulSoup, current_url: str) -> List[str]:
		links = []
		seen = set()
		for a in soup.find_all('a', href=True):
			href = a['href']
			if href.startswith('#') or href.startswith('mailto:') or href.startswith('javascript:'):
				continue
			full_url = urljoin(current_url, href)
			# Strip fragment anchors
			full_url = full_url.split('#')[0]
			parsed = urlparse(full_url)
			# Only follow same domain links
			if parsed.netloc == self.domain:
				if full_url not in seen and full_url not in self.visited:
					seen.add(full_url)
					links.append(full_url)
		return list(links)

	def _extract_forms(self, soup: BeautifulSoup) -> List[Dict]:
		forms = []
		for form in soup.find_all('form'):
			action = form.get('action', '')
			method = form.get('method', 'GET').upper()
			inputs = []
			for inp in form.find_all('input'):
				inputs.append({
					'name': inp.get('name'),
					'type': inp.get('type'),
					'value': inp.get('value')
				})
			forms.append({
				'action': action,
				'method': method,
				'inputs': inputs
			})
		return forms

	def build_workflow_graph(self) -> Dict[str, List[str]]:
		"""
		Returns a dict representing the workflow graph: nodes (pages) and edges (links).
		"""
		return self.graph
