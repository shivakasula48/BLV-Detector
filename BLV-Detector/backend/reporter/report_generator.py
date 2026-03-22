# report_generator.py
# This module implements the ReportGenerator class for generating JSON and PDF reports.

import uuid
from datetime import datetime
from typing import List, Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.units import inch

class ReportGenerator:
	"""
	Generates structured JSON and PDF reports for business logic vulnerabilities.
	"""
	def __init__(self, vulnerabilities: List[Dict], target_url: str, scan_metadata: Dict):
		self.vulnerabilities = vulnerabilities
		self.target_url = target_url
		self.scan_metadata = scan_metadata

	def generate_json_report(self) -> Dict[str, Any]:
		scan_date = datetime.utcnow().isoformat()
		summary = {"high": 0, "medium": 0, "low": 0, "total": 0}
		for vuln in self.vulnerabilities:
			sev = vuln.get("severity", "Low").lower()
			if sev == "high":
				summary["high"] += 1
			elif sev == "medium":
				summary["medium"] += 1
			else:
				summary["low"] += 1
		summary["total"] = len(self.vulnerabilities)
		return {
			"report_id": str(uuid.uuid4()),
			"target_url": self.target_url,
			"scan_date": scan_date,
			"summary": summary,
			"vulnerabilities": self.vulnerabilities
		}

	def generate_pdf_report(self, output_path: str):
		doc = SimpleDocTemplate(output_path, pagesize=letter)
		styles = getSampleStyleSheet()
		elements = []

		# Title
		elements.append(Paragraph("Business Logic Vulnerability Report", styles['Title']))
		elements.append(Spacer(1, 0.2 * inch))

		# Scan metadata
		scan_date = self.scan_metadata.get("scan_date", datetime.utcnow().isoformat())
		elements.append(Paragraph(f"Target URL: {self.target_url}", styles['Normal']))
		elements.append(Paragraph(f"Scan Date: {scan_date}", styles['Normal']))
		elements.append(Paragraph(f"Total Issues Found: {len(self.vulnerabilities)}", styles['Normal']))
		elements.append(Spacer(1, 0.2 * inch))

		# Summary table
		summary = {"High": 0, "Medium": 0, "Low": 0}
		for vuln in self.vulnerabilities:
			sev = vuln.get("severity", "Low")
			if sev == "High":
				summary["High"] += 1
			elif sev == "Medium":
				summary["Medium"] += 1
			else:
				summary["Low"] += 1
		table_data = [["Severity", "Count"],
					 ["High", summary["High"]],
					 ["Medium", summary["Medium"]],
					 ["Low", summary["Low"]]]
		table = Table(table_data, hAlign='LEFT')
		table.setStyle(TableStyle([
			('BACKGROUND', (0, 0), (-1, 0), colors.grey),
			('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
			('ALIGN', (0, 0), (-1, -1), 'CENTER'),
			('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
			('BOTTOMPADDING', (0, 0), (-1, 0), 12),
			('BACKGROUND', (0, 1), (-1, -1), colors.beige),
		]))
		elements.append(table)
		elements.append(Spacer(1, 0.3 * inch))

		# Detailed findings
		elements.append(Paragraph("Detailed Findings:", styles['Heading2']))
		for vuln in self.vulnerabilities:
			elements.append(Spacer(1, 0.1 * inch))
			elements.append(Paragraph(f"ID: {vuln.get('id')}", styles['Normal']))
			elements.append(Paragraph(f"Type: {vuln.get('type')}", styles['Normal']))
			elements.append(Paragraph(f"Severity: {vuln.get('severity')}", styles['Normal']))
			elements.append(Paragraph(f"Affected URL: {vuln.get('affected_url')}", styles['Normal']))
			elements.append(Paragraph(f"Description: {vuln.get('description')}", styles['Normal']))
			steps = vuln.get('steps_to_reproduce', [])
			if steps:
				elements.append(Paragraph("Steps to Reproduce:", styles['Italic']))
				for step in steps:
					elements.append(Paragraph(f"- {step}", styles['Normal']))
			elements.append(Spacer(1, 0.2 * inch))

		# Footer with page numbers
		def add_page_number(canvas, doc):
			page_num = canvas.getPageNumber()
			text = f"Page {page_num}"
			canvas.drawRightString(200 * mm, 15 * mm, text)

		doc.build(elements, onLaterPages=add_page_number, onFirstPage=add_page_number)
