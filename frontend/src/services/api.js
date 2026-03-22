import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const startCrawl = async (targetUrl, maxDepth = 3) => {
  try {
    const res = await axios.post(`${API_BASE}/api/crawl`, {
      target_url: targetUrl,
      max_depth: maxDepth,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: 'Failed to start crawl.' };
  }
};

export const analyzeWorkflow = async (crawlData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/analyze`, {
      crawl_data: crawlData,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: 'Failed to analyze workflow.' };
  }
};

export const detectVulnerabilities = async (graphData, crawlData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/detect`, {
      workflow_graph: graphData,
      crawl_data: crawlData,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: 'Failed to detect vulnerabilities.' };
  }
};

export const getJsonReport = async (vulnerabilities, targetUrl, scanMetadata = {}) => {
  try {
    const res = await axios.post(`${API_BASE}/api/report/json`, {
      vulnerabilities,
      target_url: targetUrl,
      scan_metadata: scanMetadata,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: 'Failed to generate JSON report.' };
  }
};

export const downloadPdfReport = async (vulnerabilities, targetUrl, scanMetadata = {}) => {
  try {
    const res = await axios.post(`${API_BASE}/api/report/pdf`, {
      vulnerabilities,
      target_url: targetUrl,
      scan_metadata: scanMetadata,
    }, {
      responseType: 'blob',
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: 'Failed to download PDF report.' };
  }
};
