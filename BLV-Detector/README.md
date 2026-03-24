# BLV-Detector

*Workflow-Based Detection of Business Logic Vulnerabilities in Web Applications*

[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> ⭐ **Star this repo if you find it useful!**

---

## 📌 Overview

**BLV-Detector** is an advanced workflow-aware vulnerability scanner designed to detect **Business Logic Vulnerabilities (BLVs)** in web applications.

Unlike traditional tools (Burp Suite, Nikto, OWASP ZAP), this tool focuses on **logical flaws in workflows**, not just technical vulnerabilities.

---

## 🚀 Key Features

* Workflow Bypass Detection (High)
* Step Skipping Detection (High)
* Parameter Tampering Detection (Medium)
* IDOR Detection (Medium)
* Price Manipulation Detection (High)
* Unauthorized State Reuse Detection (Medium)
* Workflow Graph Visualization
* JSON Report Generation
* Interactive Frontend Dashboard

---

## 🛠️ Tech Stack

* Python 3.13
* FastAPI
* React (Vite)
* NetworkX
* BeautifulSoup
* Pydantic

---

## 📋 Prerequisites

* Python **3.8+ (3.13 recommended)**
* Node.js **18+**
* npm or yarn
* Git

---

## ⚙️ Installation & Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/shivakasula48/BLV-Detector.git
cd BLV-Detector
```

---

### Step 2: Backend Setup

```bash
cd backend

python3 -m venv venv

# Activate virtual environment
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate          # Windows

pip install -r requirements.txt
```

---

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### 🔹 Start Backend (IMPORTANT)
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
⚠️ **Important Notes:**
* Always activate `venv` before running backend
* If not, system may use wrong Python version and fail

### 🔹 Start Frontend
```bash
cd frontend
npm run dev
```

## 🌐 Access URLs

* Frontend → http://localhost:5173
* Backend API → http://localhost:8000
* API Docs → http://localhost:8000/docs

---

## 🧑‍💻 How to Use

1. Open frontend in browser
2. Enter target URL (example: http://demo.testfire.net)
3. Select crawl depth (recommended: 2)
4. Click **Start Scan**
5. Wait for 3 phases:

   * Crawling
   * Analyzing
   * Detecting
6. View results:

   * Vulnerability cards
   * Workflow graph
7. Generate report (JSON)

---

## 🔌 API Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | /health          | Health check           |
| POST   | /api/crawl       | Crawl target           |
| POST   | /api/analyze     | Build workflow graph   |
| POST   | /api/detect      | Detect vulnerabilities |
| POST   | /api/report/json | Generate JSON report   |

---

## 📊 Scan Results Explained

### Vulnerability Types

* Workflow Bypass
* Step Skipping
* Parameter Tampering
* IDOR
* Price Manipulation
* Unauthorized State Reuse

### Severity Levels

* High → Critical logic flaws
* Medium → Moderate issues
* Low → Informational

---

## 🧪 Demo Target

* http://demo.testfire.net
* Example finding: `/admin/clients.xls` accessible without authentication

---

## 📁 Project Structure

## 📸 Screenshots

<!-- Add screenshots here -->


## ✅ Advantages

* Detects logic flaws (not just technical bugs)
* Workflow-aware scanning
* Interactive UI (no CLI needed)
* Reduced false positives
* Open-source & extensible

---

## ⚠️ Limitations

* No JavaScript rendering support (no Selenium yet)
* No authentication-based scanning
* Limited to localhost testing
* Uses system resources heavily
* Firewalls may block automated scanning
* Possible false positives
* Focused only on business logic vulnerabilities

---

## 🔮 Future Enhancements

* Authentication support
* Selenium/Playwright integration
* PDF report fix
* Docker deployment
* DVWA testing integration
* UI/UX improvements
* CI/CD integration

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

## ⚖️ Ethical Disclaimer

* Use only on authorized systems
* Unauthorized scanning is illegal
* Intended for educational purposes

---

## 🎓 Academic Context

* Final Year Major Project
* Student: **Kasula Shiva**
* Enrollment: 22CS002580
* Guide: Dr. Manish Tiwari
* Institution: Sir Padampat Singhania University

---

## 📄 License

This project is licensed under the MIT License.
