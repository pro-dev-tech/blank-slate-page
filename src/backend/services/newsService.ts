// ============================================
// News Feed Service – Regulatory news articles
// ============================================

import type { NewsArticle, ApiResponse } from "../types";
import { delay, ok } from "../utils/api";

const ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "CBIC notifies revised GST return filing timelines for MSMEs",
    source: "Ministry of Finance",
    url: "#",
    publishedAt: "2026-02-15T08:30:00Z",
    category: "GST",
    impactLevel: "High",
    summary: "New quarterly filing option available for businesses with turnover below ₹5 crore.",
    details: "The Central Board of Indirect Taxes and Customs has issued Notification No. 12/2026 allowing MSMEs with annual turnover below ₹5 crore to file GST returns on a quarterly basis starting April 2026.",
  },
  {
    id: 2,
    title: "MCA mandates simplified annual return for small companies",
    source: "Ministry of Corporate Affairs",
    url: "#",
    publishedAt: "2026-02-14T14:00:00Z",
    category: "MCA",
    impactLevel: "Medium",
    summary: "Small companies can now file a simplified one-page annual return (Form AOC-4S).",
    details: "Companies with paid-up capital up to ₹4 crore and turnover up to ₹40 crore can use the new simplified annual return format.",
  },
  {
    id: 3,
    title: "ESIC coverage extended to establishments with 10+ employees",
    source: "Ministry of Labour & Employment",
    url: "#",
    publishedAt: "2026-02-14T10:15:00Z",
    category: "Labour",
    impactLevel: "High",
    summary: "ESIC threshold reduced from 20 to 10 employees across all states.",
    details: "The Ministry of Labour has notified a reduction in the ESIC applicability threshold from 20 to 10 employees, effective from April 1, 2026.",
  },
  {
    id: 4,
    title: "SEBI circular on enhanced disclosure norms for listed MSMEs",
    source: "Securities and Exchange Board of India",
    url: "#",
    publishedAt: "2026-02-13T16:45:00Z",
    category: "SEBI",
    impactLevel: "Medium",
    summary: "Listed MSMEs must now disclose related party transactions quarterly.",
    details: "SEBI has issued Circular SEBI/HO/CFD/CMD1/CIR/2026/15 mandating quarterly disclosure of all related party transactions exceeding ₹1 crore.",
  },
  {
    id: 5,
    title: "New environmental compliance norms for manufacturing MSMEs",
    source: "Ministry of Environment",
    url: "#",
    publishedAt: "2026-02-13T09:00:00Z",
    category: "Environmental",
    impactLevel: "Medium",
    summary: "Small manufacturing units now require Consent to Operate renewal every 3 years.",
    details: "The Central Pollution Control Board has revised the consent renewal cycle for 'Green' and 'Orange' category industries from 5 years to 3 years.",
  },
  {
    id: 6,
    title: "EPF interest rate revised to 8.25% for FY 2025-26",
    source: "Employees' Provident Fund Organisation",
    url: "#",
    publishedAt: "2026-02-12T12:30:00Z",
    category: "Labour",
    impactLevel: "Low",
    summary: "EPFO declares 8.25% interest on PF deposits for the current financial year.",
    details: "The Central Board of Trustees of EPFO has approved an interest rate of 8.25% for the financial year 2025-26.",
  },
  {
    id: 7,
    title: "RBI updates KYC requirements for NBFC-MFIs",
    source: "Reserve Bank of India",
    url: "#",
    publishedAt: "2026-02-12T08:00:00Z",
    category: "Financial",
    impactLevel: "High",
    summary: "Video KYC now mandatory for all loans above ₹50,000 issued by NBFC-MFIs.",
    details: "RBI Master Direction RBI/2026-27/12 requires all NBFC-MFIs to conduct video-based KYC for loans exceeding ₹50,000.",
  },
  {
    id: 8,
    title: "GST Council recommends input tax credit simplification",
    source: "GST Council",
    url: "#",
    publishedAt: "2026-02-11T15:00:00Z",
    category: "GST",
    impactLevel: "High",
    summary: "Auto-populated ITC from GSTR-2B to become sole basis for credit claims from April 2026.",
    details: "The 58th GST Council meeting recommended that input tax credit claims be solely based on auto-populated data in GSTR-2B.",
  },
];

export const newsService = {
  async getArticles(category?: string): Promise<ApiResponse<NewsArticle[]>> {
    await delay(500);
    const filtered = category && category !== "All" ? ARTICLES.filter((a) => a.category === category) : ARTICLES;
    return ok(filtered);
  },

  async getArticleById(id: number): Promise<ApiResponse<NewsArticle | null>> {
    await delay(300);
    const article = ARTICLES.find((a) => a.id === id) || null;
    return ok(article);
  },

  async getCategories(): Promise<ApiResponse<string[]>> {
    await delay(200);
    const cats = Array.from(new Set(ARTICLES.map((a) => a.category)));
    return ok(["All", ...cats]);
  },
};
