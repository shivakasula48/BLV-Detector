# BLV-Detector (Business Logic Vulnerability Detector)

A full-stack project to detect business logic vulnerabilities in web applications.

## Structure
- **backend/**: FastAPI-based Python backend for crawling, analyzing, detecting, and reporting business logic vulnerabilities.
- **frontend/**: React app (to be implemented) for user interface.

## Backend Modules
- **crawler/**: Extracts workflows from web applications.
- **analyzer/**: Analyzes workflows for business logic patterns.
- **detector/**: Detects business logic vulnerabilities.
- **reporter/**: Generates reports for detected vulnerabilities.

## Setup
1. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Start backend server:
   ```bash
   uvicorn main:app --reload
   ```
3. Frontend setup: (React app will go here)
