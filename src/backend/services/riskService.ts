// ============================================
// Risk Monitor Service – Risk factors and rule engine
// ============================================

import type { RiskData, RiskFactor, RuleNode, ApiResponse } from "../types";
import { delay, ok } from "../utils/api";

const DEFAULT_RISK_DATA: RiskData = {
  factors: [
    { id: "rf-1", label: "Regulatory Risk", score: 72, trend: "up", change: 5 },
    { id: "rf-2", label: "Filing Timeliness", score: 85, trend: "up", change: 5 },
    { id: "rf-3", label: "Penalty Exposure", score: 45, trend: "down", change: -8 },
    { id: "rf-4", label: "Data Accuracy", score: 91, trend: "up", change: 5 },
  ],
  rules: [
    { id: "rl-1", condition: "Revenue > ₹40L", result: "GST Registration Mandatory", triggered: true },
    { id: "rl-2", condition: "Employees > 20", result: "PF Applicable", triggered: true },
    { id: "rl-3", condition: "Employees > 10", result: "ESIC Applicable", triggered: true },
    { id: "rl-4", condition: "Revenue > ₹1Cr", result: "Tax Audit Required", triggered: false },
    { id: "rl-5", condition: "Inter-state sales", result: "E-way Bill Required", triggered: true },
  ],
};

export const riskService = {
  async getRiskData(): Promise<ApiResponse<RiskData>> {
    await delay(500);
    return ok(DEFAULT_RISK_DATA);
  },

  async getRiskFactors(): Promise<ApiResponse<RiskFactor[]>> {
    await delay(300);
    return ok(DEFAULT_RISK_DATA.factors);
  },

  async getRuleEngine(): Promise<ApiResponse<RuleNode[]>> {
    await delay(300);
    return ok(DEFAULT_RISK_DATA.rules);
  },
};
