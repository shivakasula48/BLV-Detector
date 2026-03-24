# BLV-Detector

*Workflow-Based Detection of Business Logic Vulnerabilities in Web Applications*

[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://www.python.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-green?logo=fastapi)](https://fastapi.tiangolo.com/) [![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> ⭐ **Star this repo if you find it useful!**


## Table of Contents


## Overview
**BLV-Detector** is an advanced, workflow-aware vulnerability scanner for web applications. Unlike traditional scanners (Burp Suite, Nikto, OWASP ZAP), BLV-Detector analyzes the logical flow of web apps to uncover business logic vulnerabilities (BLVs) that automated tools often miss.

**Why BLV-Detector?**

**Who is it for?**


## Key Features

| FastAPI      | 0.110.0                     |
| Python       | 3.13                        |
| BeautifulSoup4 | Latest                    |
BLV-Detector is an automated Broken Link and Vulnerability (BLV) detection tool designed for security researchers, QA engineers, and DevOps teams. It scans web applications for six types of BLVs, providing severity ratings and actionable reports.
| NetworkX     | Latest                      |
| Pydantic     | Latest                      |
**Detection Types:**
   1. Broken Authentication (Critical)
   2. Broken Access Control (High)
   3. Sensitive Data Exposure (High)
   4. Security Misconfiguration (Medium)
   5. Vulnerable Components (Medium)
   6. Broken Links (Low)
| React Router | v7                          |


## Prerequisites

**Step 1 - Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/BLV-Detector.git
cd BLV-Detector
```

**Step 2 - Backend setup:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

**Step 3 - Frontend setup:**
```bash
cd ../frontend
npm install
```


## Running the Project

**Start backend:**
```

**Start frontend:**
```bash
cd frontend
npm run dev
```

**Access URLs:**


## How to Use
1. Open [http://localhost:5173](http://localhost:5173) in your browser
2. Enter target URL (e.g. http://demo.testfire.net)
3. Select crawl depth (1-5, recommended: 2)
4. Click **Start Scan**
5. Wait for 3-phase scan (Crawling → Analyzing → Detecting)
6. View results — vulnerability cards + workflow graph
7. Click **Generate Report** for JSON report
8. Click **Download PDF** for PDF report


## API Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | /health            | Health check               |
| POST   | /api/crawl         | Crawl target URL           |
| POST   | /api/analyze       | Analyze workflow graph     |
| POST   | /api/detect        | Detect vulnerabilities     |
| POST   | /api/report/json   | Generate JSON report       |
| POST   | /api/report/pdf    | Download PDF report        |

**Example curl commands:**

```bash
# Health check
curl http://localhost:8000/health

# Crawl target URL
curl -X POST http://localhost:8000/api/crawl -H "Content-Type: application/json" -d '{"url": "http://demo.testfire.net", "depth": 2}'
curl -X POST http://localhost:8000/api/analyze -H "Content-Type: application/json" -d '{"graph": {...}}'

curl -X POST http://localhost:8000/api/detect -H "Content-Type: application/json" -d '{"graph": {...}}'

# Generate JSON report
curl -X POST http://localhost:8000/api/report/json -H "Content-Type: application/json" -d '{"results": {...}}'

# Download PDF report
curl -X POST http://localhost:8000/api/report/pdf -H "Content-Type: application/json" -d '{"results": {...}}' --output report.pdf
```


## Scan Results Explained
   - Workflow Bypass: Accessing restricted steps without authorization
   - Step Skipping: Skipping required workflow steps
   - Parameter Tampering: Manipulating workflow parameters
   - IDOR: Accessing objects by modifying references
   - Price Manipulation: Changing price-related parameters
   - Unauthorized State Reuse: Reusing tokens or states
   - High: Critical business logic flaws
   - Medium: Significant but less critical
   - Low: Informational or minor issues
   - Each finding includes a step-by-step reproduction guide

## Demo / Tested Targets



## Project Structure
```
BLV-Detector/
├── backend/
│   ├── main.py                # FastAPI entry point
│   ├── requirements.txt       # Python dependencies
│   ├── analyzer/
│   │   └── workflow_analyzer.py   # Workflow graph analysis
│   ├── crawler/
│   │   └── workflow_crawler.py    # Web crawler logic
│   ├── detector/
│   │   └── vulnerability_detector.py # BLV detection algorithms
│   ├── reporter/
│   │   └── report_generator.py     # Report generation (JSON/PDF)
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main React app
│   │   ├── components/
│   │   │   ├── ScanProgressBar.jsx
│   │   │   ├── SeverityBadge.jsx
│   │   │   ├── VulnerabilityCard.jsx
│   │   │   └── WorkflowGraph.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ReportPage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   └── ScanPage.jsx
│   │   └── services/
│   │       └── api.js          # API service layer
│   ├── index.html              # App entry HTML
│   ├── package.json            # Frontend dependencies
│   └── ...                     # Configs, assets, etc.
├── README.md                   # Project documentation
└── package.json                # Project-level config
```


## Advantages


## Limitations


## Future Enhancements


## Contributing
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push and open Pull Request


## Ethical Disclaimer


## Academic Context


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
