// ============================================
// Dashboard Service – Stats, charts, and overview data
// ============================================

import type { DashboardData, ApiResponse } from "../types";
import { delay, ok } from "../utils/api";

const DASHBOARD_DATA: DashboardData = {
  stats: [
    { label: "Total Compliances", value: "59", icon: "FileText", change: "+3 this month" },
    { label: "Active Employees", value: "35", icon: "Users", change: "Karnataka" },
    { label: "Compliant", value: "42", icon: "ShieldCheck", change: "71% rate" },
    { label: "Pending Actions", value: "12", icon: "AlertTriangle", change: "5 urgent" },
  ],
  complianceScore: 82,
  riskTrend: [
    { month: "Sep", value: 65 },
    { month: "Oct", value: 72 },
    { month: "Nov", value: 68 },
    { month: "Dec", value: 75 },
    { month: "Jan", value: 80 },
    { month: "Feb", value: 82 },
  ],
  filingStatus: [
    { name: "Filed", value: 42 },
    { name: "Pending", value: 12 },
    { name: "Overdue", value: 5 },
  ],
  stateCompliance: [
    { state: "Maharashtra", score: 92 },
    { state: "Karnataka", score: 85 },
    { state: "Tamil Nadu", score: 78 },
    { state: "Delhi", score: 88 },
  ],
  monthlyActivity: [
    { month: "Sep", filings: 8, penalties: 1 },
    { month: "Oct", filings: 12, penalties: 0 },
    { month: "Nov", filings: 10, penalties: 2 },
    { month: "Dec", filings: 15, penalties: 1 },
    { month: "Jan", filings: 11, penalties: 0 },
    { month: "Feb", filings: 9, penalties: 1 },
  ],
};

export const dashboardService = {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    await delay(600);
    return ok(DASHBOARD_DATA);
  },

  async getComplianceScore(): Promise<ApiResponse<number>> {
    await delay(300);
    return ok(DASHBOARD_DATA.complianceScore);
  },
};
