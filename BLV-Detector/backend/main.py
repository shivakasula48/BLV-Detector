from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import BaseModel

from crawler.workflow_crawler import WorkflowCrawler, CrawledPage
from analyzer.workflow_analyzer import WorkflowAnalyzer

from detector.vulnerability_detector import VulnerabilityDetector, Vulnerability
from reporter.report_generator import ReportGenerator

# BLV-Detector main FastAPI app
# This file sets up the API server and routes for the backend.

app = FastAPI()

# Enable CORS for frontend running on localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"]
)


@app.get("/health")
def health():
    """
    Health check endpoint for BLV-Detector.
    Returns project status and name.
    """
    return {"status": "ok", "project": "BLV-Detector"}

# Request model for crawl endpoint
# Request model for crawl endpoint

class CrawlRequest(BaseModel):
    target_url: str
    max_depth: int = 3

# Request model for analyze endpoint
# Request model for analyze endpoint

class AnalyzeRequest(BaseModel):
    crawl_data: list

# Request model for detect endpoint
class DetectRequest(BaseModel):
    workflow_graph: dict
    crawl_data: list

# Request model for report endpoints
class ReportRequest(BaseModel):
    vulnerabilities: list
    target_url: str
    scan_metadata: dict
from fastapi.responses import FileResponse
import os
@app.post("/api/report/json")
async def api_report_json(request: ReportRequest):
    """
    Generate a structured JSON report for vulnerabilities.
    """
    generator = ReportGenerator(request.vulnerabilities, request.target_url, request.scan_metadata)
    report = generator.generate_json_report()
    return report

@app.post("/api/report/pdf")
async def api_report_pdf(request: ReportRequest):
    """
    Generate a PDF report for vulnerabilities and return as file download.
    """
    generator = ReportGenerator(request.vulnerabilities, request.target_url, request.scan_metadata)
    output_path = f"/tmp/blv_report_{os.getpid()}.pdf"
    generator.generate_pdf_report(output_path)
    return FileResponse(output_path, filename="BLV-Detector-Report.pdf", media_type="application/pdf")

# Request model for detect endpoint
class DetectRequest(BaseModel):
    workflow_graph: dict
    crawl_data: list
@app.post("/api/analyze")
async def api_analyze(request: AnalyzeRequest):
    """
    Analyze workflow crawl data and return workflow graph for visualization.
    """
    analyzer = WorkflowAnalyzer(request.crawl_data)
    graph_data = analyzer.get_graph_data()
    entry_points = analyzer.find_entry_points()
    sequences = analyzer.detect_required_sequences()
    return {
        "graph": graph_data,
        "entry_points": entry_points,
        "required_sequences": sequences
    }

@app.post("/api/detect")
async def api_detect(request: DetectRequest):
    """
    Detect business logic vulnerabilities from workflow graph and crawl data.
    """
    detector = VulnerabilityDetector(request.workflow_graph, request.crawl_data)
    vulnerabilities = detector.detect_vulnerabilities()
    return {
        "vulnerabilities": vulnerabilities
    }

@app.post("/api/crawl")
async def api_crawl(request: CrawlRequest):
    """
    Crawl the target_url up to max_depth and return workflow crawl results.
    """
    if not (request.target_url.startswith("http://") or request.target_url.startswith("https://")):
        raise HTTPException(status_code=400, detail="target_url must start with http:// or https://")
    crawler = WorkflowCrawler(request.target_url, request.max_depth)
    pages = crawler.crawl()
    return {
        "pages": [page.dict() for page in pages],
        "workflow_graph": crawler.build_workflow_graph()
    }
