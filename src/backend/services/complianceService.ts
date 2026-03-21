// ============================================
// Compliance Checker Service – Rule engine for determining applicable compliances
// ============================================

import type { ComplianceResult, ComplianceCheckPayload, ApiResponse } from "../types";
import { delay, ok } from "../utils/api";

function evaluate(payload: ComplianceCheckPayload): ComplianceResult[] {
  const { turnover, employees } = payload;
  const results: ComplianceResult[] = [];

  if (turnover > 0) {
    results.push({
      name: "GST Registration",
      reason: `Your turnover of ₹${(turnover / 100000).toFixed(1)}L exceeds ₹20L threshold`,
      deadline: "Within 30 days of crossing threshold",
      risk: turnover > 4000000 ? "Critical" : "High",
      penalty: "₹10,000 or 10% of tax due (whichever is higher)",
      explanation: "Every business with annual turnover above ₹20 lakh (₹10 lakh for special states) must register for GST.",
      law: "CGST Act, 2017 - Section 22",
    });
  }

  if (turnover > 10000000) {
    results.push({
      name: "Tax Audit (Section 44AB)",
      reason: "Turnover exceeds ₹1 Crore — audit is mandatory",
      deadline: "September 30 of the assessment year",
      risk: "Critical",
      penalty: "₹1,50,000 or 0.5% of turnover (whichever is lower)",
      explanation: "Businesses with turnover above ₹1 Crore must get accounts audited by a CA.",
      law: "Income Tax Act - Section 44AB",
    });
  }

  if (employees >= 10) {
    results.push({
      name: "ESIC Registration",
      reason: `You have ${employees} employees — ESIC applies to 10+ employee firms`,
      deadline: "Within 15 days of becoming applicable",
      risk: employees >= 20 ? "Critical" : "High",
      penalty: "Up to ₹5,000 and imprisonment up to 2 years",
      explanation: "If your company has 10 or more employees earning up to ₹21,000/month, you must register under ESIC.",
      law: "ESI Act, 1948 - Section 2A",
    });
  }

  if (employees >= 20) {
    results.push({
      name: "EPF Registration",
      reason: `${employees} employees means Provident Fund is mandatory`,
      deadline: "Within 1 month of crossing 20 employees",
      risk: "Critical",
      penalty: "Damages up to 100% of arrears + prosecution",
      explanation: "Every establishment with 20+ employees must register with EPFO.",
      law: "EPF & MP Act, 1952 - Section 1(3)",
    });
  }

  if (employees >= 1) {
    results.push({
      name: "Shops & Establishment Act",
      reason: "Applies to all businesses with at least 1 employee",
      deadline: "Within 30 days of starting business",
      risk: "Medium",
      penalty: "₹1,000 to ₹25,000 depending on state",
      explanation: "This state-level registration regulates working hours, holidays, leave, and employment conditions.",
      law: "Shops & Establishment Act (State-specific)",
    });
  }

  if (turnover > 5000000) {
    results.push({
      name: "TDS Compliance",
      reason: "Turnover above ₹50L triggers TDS obligations",
      deadline: "7th of every month / quarterly return by end of quarter",
      risk: "High",
      penalty: "₹200/day for late filing + interest at 1.5% per month",
      explanation: "You must deduct tax at source when making certain payments.",
      law: "Income Tax Act - Section 194 series",
    });
  }

  if (employees >= 5) {
    results.push({
      name: "Professional Tax",
      reason: "Applicable to businesses with employees in most Indian states",
      deadline: "Monthly or annually (varies by state)",
      risk: "Low",
      penalty: "₹1,000 to ₹5,000 per month of default",
      explanation: "Professional Tax is a state-level tax on professions, trades, and employment.",
      law: "State Professional Tax Act",
    });
  }

  if (turnover > 50000000) {
    results.push({
      name: "Transfer Pricing Documentation",
      reason: "International transactions above threshold need documentation",
      deadline: "November 30 of the assessment year",
      risk: "High",
      penalty: "2% of transaction value for non-maintenance of records",
      explanation: "If your company engages in international transactions with associated enterprises, you need TP documentation.",
      law: "Income Tax Act - Section 92D",
    });
  }

  return results;
}

export const complianceService = {
  async runCheck(payload: ComplianceCheckPayload): Promise<ApiResponse<ComplianceResult[]>> {
    await delay(1200);
    const results = evaluate(payload);
    return ok(results, `Found ${results.length} applicable compliances.`);
  },
};
