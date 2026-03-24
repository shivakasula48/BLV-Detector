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

### Why BLV-Detector?
- **Traditional scanners** (like Burp Suite, Nikto, OWASP ZAP) focus on technical vulnerabilities (e.g., XSS, SQLi) but often miss business logic flaws that arise from improper workflow implementation.
- **BLV-Detector** models and analyzes the logical flow of web applications, uncovering vulnerabilities that can only be detected by understanding user actions and workflow sequences.
- It provides actionable, severity-based reports and visualizes workflow graphs to help teams quickly identify and remediate issues.
- Designed for both manual and automated security testing, it bridges the gap between technical and business logic security.

### Who is it for?
- **Security Researchers & Pentesters:** To discover business logic vulnerabilities that automated tools often miss.
- **QA Engineers:** To validate that workflows are implemented securely and as intended.
- **Developers:** To proactively identify and fix logic flaws during development.
- **DevOps Teams:** To integrate workflow-based security checks into CI/CD pipelines.
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
BLV-Detector offers several unique benefits over traditional vulnerability scanners:
- **Workflow-Aware Detection:** Identifies business logic flaws that most automated tools miss by analyzing the actual user workflow.
- **Comprehensive Vulnerability Coverage:** Detects six types of BLVs, including authentication, access control, and data exposure issues.
- **Severity-Based Reporting:** Clearly categorizes findings by severity, helping prioritize remediation.
- **Modern UI:** User-friendly React dashboard for real-time scan progress and results.
- **Extensible Architecture:** Modular backend and frontend make it easy to add new detection types or reporting formats.
- **Automated Reporting:** Generates detailed, actionable reports in both JSON and PDF formats.

## Limitations
While BLV-Detector is powerful, it has some limitations:
- **Web Apps Only:** Focused on web applications; does not support mobile or desktop apps.
- **No Authenticated Scanning:** Currently does not support login/authenticated session scanning.
- **Limited JavaScript Rendering:** Does not handle JavaScript-heavy or single-page applications (no headless browser integration yet).
- **Internet Required:** Some scans require internet access for dependency checks.
- **Zero-Day Gaps:** May not detect unknown or zero-day vulnerabilities.
- **Manual Review Needed:** Automated findings should be manually reviewed for accuracy.

## Future Enhancements
Planned improvements and new features:
- **Authenticated Scanning:** Add support for login workflows and session management.
- **Headless Browser Integration:** Use Selenium or Playwright for JavaScript-rendered pages.
- **CI/CD Integration:** Enable automated scanning in DevOps pipelines.
- **Multi-Format Reports:** Export reports in additional formats (HTML, CSV).
- **Dashboard Authentication:** Add user authentication and role-based access to the dashboard.
- **Scan Scheduling:** Allow users to schedule recurring scans.
- **Expanded Vulnerability Types:** Add detection for more business logic and technical vulnerabilities.

## Contributing
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push and open Pull Request


## Ethical Disclaimer


## Academic Context


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
