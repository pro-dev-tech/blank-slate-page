// ============================================
// Reports Service – CRUD for compliance reports
// ============================================

import type { Report, ApiResponse } from "../types";
import { delay, generateId, safeParse, persist, ok, STORAGE_KEYS } from "../utils/api";

const DEFAULT_REPORTS: Report[] = [
  { id: "rpt-1", name: "Monthly Compliance Summary", period: "January 2026", generated: "Feb 5, 2026", type: "PDF" },
  { id: "rpt-2", name: "GST Filing Report", period: "Q3 FY2025-26", generated: "Jan 15, 2026", type: "Excel" },
  { id: "rpt-3", name: "Employee PF Compliance", period: "FY2025-26", generated: "Feb 1, 2026", type: "PDF" },
  { id: "rpt-4", name: "Risk Assessment Report", period: "February 2026", generated: "Feb 10, 2026", type: "PDF" },
  { id: "rpt-5", name: "Audit Trail Export", period: "Last 90 days", generated: "Feb 12, 2026", type: "CSV" },
];

function getReports(): Report[] {
  return safeParse(STORAGE_KEYS.REPORTS, DEFAULT_REPORTS);
}

export const reportsService = {
  async getAllReports(): Promise<ApiResponse<Report[]>> {
    await delay(400);
    return ok(getReports());
  },

  async getFilteredReports(type: string): Promise<ApiResponse<Report[]>> {
    await delay(300);
    const reports = getReports();
    const filtered = type === "All" ? reports : reports.filter((r) => r.type === type);
    return ok(filtered);
  },

  async generateReport(): Promise<ApiResponse<Report>> {
    await delay(2000);
    const types: Report["type"][] = ["PDF", "Excel", "CSV"];
    const newReport: Report = {
      id: generateId(),
      name: "Custom Compliance Report",
      period: "February 2026",
      generated: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      type: types[Math.floor(Math.random() * types.length)],
    };
    const reports = getReports();
    reports.unshift(newReport);
    persist(STORAGE_KEYS.REPORTS, reports);
    return ok(newReport, "Report generated successfully.");
  },

  async deleteReport(id: string): Promise<ApiResponse<null>> {
    await delay(400);
    const reports = getReports().filter((r) => r.id !== id);
    persist(STORAGE_KEYS.REPORTS, reports);
    return ok(null, "Report deleted.");
  },
};
