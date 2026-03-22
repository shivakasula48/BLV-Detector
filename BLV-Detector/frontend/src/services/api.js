import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000' })

export async function startCrawl(targetUrl, maxDepth) {
  const res = await api.post('/api/crawl', { target_url: targetUrl, max_depth: maxDepth })
  return res.data
}

export async function analyzeWorkflow(crawlData) {
  const res = await api.post('/api/analyze', { crawl_data: crawlData })
  return res.data
}

export async function detectVulnerabilities(graphData, crawlData) {
  const res = await api.post('/api/detect', { workflow_graph: graphData, crawl_data: crawlData })
  return res.data
}

export async function getJsonReport(vulnerabilities, targetUrl, scanMetadata) {
  const res = await api.post('/api/report/json', {
    vulnerabilities,
    target_url: targetUrl,
    scan_metadata: scanMetadata
  })
  return res.data
}

export async function downloadPdfReport(vulnerabilities, targetUrl, scanMetadata) {
  const res = await api.post('/api/report/pdf', {
    vulnerabilities,
    target_url: targetUrl,
    scan_metadata: scanMetadata
  }, { responseType: 'blob' })
  return res.data
}
