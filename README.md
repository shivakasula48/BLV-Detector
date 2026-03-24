# BLV-Detector

*Workflow-Based Detection of Business Logic Vulnerabilities in Web Applications*

[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://www.python.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-green?logo=fastapi)](https://fastapi.tiangolo.com/) [![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> ⭐ **Star this repo if you find it useful!**

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [How to Use](#how-to-use)
- [API Endpoints](#api-endpoints)
- [Scan Results Explained](#scan-results-explained)
- [Demo / Tested Targets](#demo--tested-targets)
- [Real Vulnerability Found](#real-vulnerability-found)
- [Project Structure](#project-structure)
- [Advantages](#advantages)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Ethical Disclaimer](#ethical-disclaimer)
- [Academic Context](#academic-context)
- [License](#license)

---

## Overview
**BLV-Detector** is an advanced, workflow-aware vulnerability scanner for web applications. Unlike traditional scanners (Burp Suite, Nikto, OWASP ZAP), BLV-Detector analyzes the logical flow of web apps to uncover business logic vulnerabilities (BLVs) that automated tools often miss.

**Why BLV-Detector?**
- Traditional scanners focus on technical flaws (XSS, SQLi, etc.) but miss workflow-based issues.
- BLV-Detector models user workflows, detects logic flaws, and visualizes attack paths.

**Who is it for?**
- Security researchers
- Pentesters
- Developers
- QA engineers

---

## Key Features
- **Workflow Bypass (High):** Detects unauthorized access to restricted steps.
- **Step Skipping (High):** Finds missing step validation in workflows.
- **Parameter Tampering (Medium):** Identifies manipulation of workflow parameters.
- **IDOR (Medium):** Detects insecure direct object references.
- **Price Manipulation (High):** Finds flaws in price calculation and validation.
- **Unauthorized State Reuse (Medium):** Detects reuse of workflow states/tokens.
- **Automated workflow graph visualization**
- **JSON and PDF report generation**

<<<<<<< HEAD
---
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
- Severity badges for each finding
- Interactive frontend dashboard
- Detailed reports with remediation guidance
| React Router | v7                          |
=======

---

## System Architecture

```
👤 User (Browser)
   │
   ▼  HTTP
⚛️  React Frontend  (localhost:5173)
   │
   ▼  REST API
┌──────────────────────────────────────────────┐
│      🐍 FastAPI Backend  (localhost:8000)     │
│                                              │
│  🕷️ Crawler → 📊 Analyzer → 🔍 Detector → 📄 Reporter │
└──────────────────────────────────────────────┘
   │
   ▼  HTTP Requests
🎯 Target Web Application
```

### Backend Modules

| Module   | Library                    | Function                                 |
|----------|----------------------------|------------------------------------------|
| Crawler  | BeautifulSoup4 + Requests  | DFS traversal, link/form/param extraction|
| Analyzer | NetworkX DiGraph           | Workflow graph building, entry point detection |
| Detector | Custom algorithms          | 6 BLV detection checks                   |
| Reporter | ReportLab                  | JSON and PDF report generation           |

## Tech Stack

### Backend
| Technology      | Version | Purpose                |
|-----------------|---------|------------------------|
| Python          | 3.13    | Runtime                |
| FastAPI         | Latest  | REST API framework     |
| Uvicorn         | Latest  | ASGI server            |
| BeautifulSoup4  | Latest  | HTML parsing           |
| Requests        | Latest  | HTTP client            |
| NetworkX        | Latest  | Workflow graph (DiGraph)|
| Pydantic        | Latest  | Data validation        |
| ReportLab       | Latest  | PDF generation         |

### Frontend
| Technology    | Version | Purpose              |
|---------------|---------|----------------------|
| React         | 19      | UI framework         |
| Vite          | 8       | Build tool           |
| Tailwind CSS  | 3       | Styling              |
| Axios         | Latest  | API calls            |
| ReactFlow     | 11      | Graph visualization  |
| React Router  | v7      | Client-side routing  |
>>>>>>> 4df210a (Fix and complete README.md with all sections)

---

## Prerequisites
- Python 3.8 or higher (**Python 3.13 recommended**)
- Node.js 18 or higher
- npm or yarn
- Git

<<<<<<< HEAD
**Step 1 - Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/BLV-Detector.git
=======
## Installation & Setup

**Step 1 - Clone the repository:**
```bash
git clone https://github.com/shivakasula48/BLV-Detector.git
>>>>>>> 4df210a (Fix and complete README.md with all sections)
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

---

## Running the Project

<<<<<<< HEAD
**Start backend:**
```

**Start frontend:**
=======
### Terminal 1 — Start Backend
```bash
cd BLV-Detector/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 — Start Frontend
>>>>>>> 4df210a (Fix and complete README.md with all sections)
```bash
cd frontend
npm run dev
```

<<<<<<< HEAD
**Access URLs:**
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
=======
### Access URLs
| Service         | URL                        |
|-----------------|----------------------------|
| Frontend App    | http://localhost:5173      |
| Backend API     | http://localhost:8000      |
| API Docs        | http://localhost:8000/docs |
| Health Check    | http://localhost:8000/health |
>>>>>>> 4df210a (Fix and complete README.md with all sections)

---

## How to Use
1. Open [http://localhost:5173](http://localhost:5173) in your browser
2. Enter target URL (e.g. http://demo.testfire.net)
3. Select crawl depth (1-5, recommended: 2)
4. Click **Start Scan**
5. Wait for 3-phase scan (Crawling → Analyzing → Detecting)
6. View results — vulnerability cards + workflow graph
7. Click **Generate Report** for JSON report
8. Click **Download PDF** for PDF report

---

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

---

## Scan Results Explained
- **Vulnerability Types:**
   - Workflow Bypass: Accessing restricted steps without authorization
   - Step Skipping: Skipping required workflow steps
   - Parameter Tampering: Manipulating workflow parameters
   - IDOR: Accessing objects by modifying references
   - Price Manipulation: Changing price-related parameters
   - Unauthorized State Reuse: Reusing tokens or states
- **Severity Levels:**
   - High: Critical business logic flaws
   - Medium: Significant but less critical
   - Low: Informational or minor issues
- **Steps to Reproduce:**
   - Each finding includes a step-by-step reproduction guide

## Demo / Tested Targets

<<<<<<< HEAD
---
- **URL:** http://demo.testfire.net/admin/clients.xls
- **Description:** Client data Excel file accessible without authentication

---
=======
These are deliberately vulnerable or demo applications safe to scan:

| Target                        | URL                          | Best Depth |
|-------------------------------|------------------------------|------------|
| IBM Altoro Mutual (recommended)| http://demo.testfire.net     | 2          |
| VulnHub                       | https://www.vulnhub.com      | 2          |

> ⚠️ Only scan targets you own or have explicit permission to test.

## Real Vulnerability Found

During testing on http://demo.testfire.net:

```
Type        : Workflow Bypass
Severity    : HIGH
Affected URL: http://demo.testfire.net/admin/clients.xls
Description : Client data Excel file is accessible in /admin/
                     without any login or authentication.

Steps to Reproduce:
   1. Open browser without logging in
   2. Navigate directly to http://demo.testfire.net/admin/clients.xls
   3. File loads successfully — vulnerability confirmed
```
>>>>>>> 4df210a (Fix and complete README.md with all sections)

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

---

## Advantages
- Workflow-aware scanning (unique vs traditional tools)
- Detects business logic flaws that Burp Suite and Nikto miss
- Full-stack web application — no CLI required
- Interactive workflow graph visualization
- Professional PDF report generation
- Real browser headers to avoid bot detection
- URL parameter parsing for deeper detection
- Clean, minimal false positives
- Open source and extensible

---

## Limitations
- Does not support JavaScript-rendered pages (no Selenium yet)
- Cannot perform authenticated scanning (no login support yet)
- localStorage has 5MB limit for large scans
- Crawl depth > 3 may take significant time on large sites
- Detection based on URL patterns — may produce false positives
- Manual review recommended for all findings
- Does not test actual exploitability

---

## Future Enhancements
- Authenticated scanning support
- Selenium/Playwright for JS-rendered pages
- Docker containerization
- Scan history and comparison dashboard
- CI/CD pipeline integration
- Rate limiting and scan queue
- DVWA integration for testing

---

## Contributing
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push and open Pull Request

---

## Ethical Disclaimer
- Only scan applications you own or have explicit permission to test
- This tool is for educational and authorized security testing only
- Unauthorized scanning may be illegal

---

## Academic Context
- Final Year Major Project
- Student: Kasula Shiva (Enrollment: 22CS002580)
- Guide: Dr. Manish Tiwari
- Institution: Sir Padampat Singhania University
- Department: Faculty of Computing and Informatics

---

## License

<<<<<<< HEAD
=======
---
<div align="center">
Made with ❤️ by Kasula Shiva &nbsp;|&nbsp; BLV-Detector © 2026
</div>

## License

>>>>>>> 4df210a (Fix and complete README.md with all sections)
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
