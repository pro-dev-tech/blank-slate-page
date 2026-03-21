import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertTriangle, Clock, IndianRupee, X, MessageSquare, ChevronRight, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Compliance {
  name: string;
  reason: string;
  deadline: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  penalty: string;
  explanation: string;
  law: string;
}

const riskColors: Record<string, { border: string; badge: string; bg: string }> = {
  Critical: { border: "border-l-destructive", badge: "status-red", bg: "bg-destructive/5" },
  High: { border: "border-l-warning", badge: "bg-warning/15 text-warning border-warning/30", bg: "bg-warning/5" },
  Medium: { border: "border-l-[hsl(48,96%,53%)]", badge: "bg-[hsl(48,96%,53%)]/15 text-[hsl(48,96%,53%)] border-[hsl(48,96%,53%)]/30", bg: "bg-[hsl(48,96%,53%)]/5" },
  Low: { border: "border-l-success", badge: "status-green", bg: "bg-success/5" },
};

function getCompliances(turnover: number, employees: number): Compliance[] {
  const results: Compliance[] = [];

  if (turnover > 0) {
    results.push({
      name: "GST Registration",
      reason: `Your turnover of ₹${(turnover / 100000).toFixed(1)}L exceeds ₹20L threshold`,
      deadline: "Within 30 days of crossing threshold",
      risk: turnover > 4000000 ? "Critical" : "High",
      penalty: "₹10,000 or 10% of tax due (whichever is higher)",
      explanation: "Every business with annual turnover above ₹20 lakh (₹10 lakh for special states) must register for GST. Without registration, you cannot collect or claim GST, and face penalties.",
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
      explanation: "Businesses with turnover above ₹1 Crore must get accounts audited by a Chartered Accountant. Missing this can trigger scrutiny and heavy penalties.",
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
      explanation: "If your company has 10 or more employees earning up to ₹21,000/month, you must register under ESIC. It provides medical and cash benefits to workers.",
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
      explanation: "Every establishment with 20+ employees must register with EPFO. Both employer and employee contribute 12% of basic salary. Non-compliance attracts severe penalties.",
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
      explanation: "This state-level registration regulates working hours, holidays, leave, and employment conditions. It's one of the first registrations any business needs.",
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
      explanation: "You must deduct tax at source when making certain payments (salary, rent, professional fees). Late deposit or non-deduction leads to interest, penalties, and potential prosecution.",
      law: "Income Tax Act - Section 194 series",
    });
  }

  if (employees >= 5) {
    results.push({
      name: "Professional Tax",
      reason: `Applicable to businesses with employees in most Indian states`,
      deadline: "Monthly or annually (varies by state)",
      risk: "Low",
      penalty: "₹1,000 to ₹5,000 per month of default",
      explanation: "Professional Tax is a state-level tax on professions, trades, and employment. Employers must deduct and remit it for each employee. Maximum is ₹2,500 per year.",
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
      explanation: "If your company engages in international transactions with associated enterprises, you need transfer pricing documentation to prove arm's length pricing.",
      law: "Income Tax Act - Section 92D",
    });
  }

  return results;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ComplianceChecker() {
  const [turnover, setTurnover] = useState("");
  const [employees, setEmployees] = useState("");
  const [results, setResults] = useState<Compliance[] | null>(null);
  const [selected, setSelected] = useState<Compliance | null>(null);
  const [loading, setLoading] = useState(false);

  const runCheck = () => {
    if (!turnover && !employees) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const r = getCompliances(Number(turnover) || 0, Number(employees) || 0);
      setResults(r);
      setLoading(false);
    }, 1200);
  };

  const criticalCount = results?.filter(r => r.risk === "Critical").length || 0;
  const highCount = results?.filter(r => r.risk === "High").length || 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Compliance Checker</h1>
        <p className="text-sm text-muted-foreground mt-1">Enter your business details to instantly discover applicable compliances</p>
      </motion.div>

      {/* Business Input Panel */}
      <motion.div variants={item} className="glass-card p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Business Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="turnover" className="text-sm font-medium text-foreground flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              Annual Turnover (₹)
            </label>
            <Input
              id="turnover"
              type="number"
              placeholder="e.g. 5000000"
              value={turnover}
              onChange={e => setTurnover(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="employees" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Number of Employees
            </label>
            <Input
              id="employees"
              type="number"
              placeholder="e.g. 25"
              value={employees}
              onChange={e => setEmployees(e.target.value)}
              className="bg-secondary/50 border-border"
            />
          </div>
        </div>
        <Button
          onClick={runCheck}
          disabled={loading || (!turnover && !employees)}
          className="mt-5 gradient-primary text-primary-foreground px-8"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Run Compliance Check
            </span>
          )}
        </Button>
      </motion.div>

      {/* Summary strip */}
      <AnimatePresence>
        {results && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-4 flex flex-wrap items-center gap-4"
          >
            <span className="text-sm font-semibold text-foreground">{results.length} compliances found</span>
            {criticalCount > 0 && (
              <Badge className="status-red">{criticalCount} Critical</Badge>
            )}
            {highCount > 0 && (
              <Badge className="bg-warning/15 text-warning border-warning/30">{highCount} High</Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {results.length === 0 ? (
              <motion.div variants={item} className="glass-card p-8 col-span-full text-center">
                <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-success" />
                </div>
                <p className="text-foreground font-medium">No specific compliances found</p>
                <p className="text-sm text-muted-foreground mt-1">Try entering your turnover or employee count</p>
              </motion.div>
            ) : (
              results.map((c, i) => {
                const colors = riskColors[c.risk];
                return (
                  <motion.div
                    key={i}
                    variants={item}
                    onClick={() => setSelected(c)}
                    className={`glass-card-hover border-l-4 ${colors.border} p-5 cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
                        {c.risk}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{c.reason}</p>
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> {c.deadline}
                      </span>
                    </div>
                    <div className={`rounded-lg ${colors.bg} px-3 py-2 flex items-start gap-2`}>
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-destructive" />
                      <p className="text-xs text-foreground">
                        <span className="font-medium">If ignored:</span> {c.penalty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className={`glass-card border-l-4 ${riskColors[selected.risk].border} w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
                  <span className={`inline-block mt-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${riskColors[selected.risk].badge}`}>
                    {selected.risk} Risk
                  </span>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Why This Applies</p>
                  <p className="text-sm text-foreground">{selected.reason}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Deadline</p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> {selected.deadline}
                  </p>
                </div>
                <div className={`rounded-lg ${riskColors[selected.risk].bg} p-4`}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Penalty If Ignored</p>
                  <p className="text-sm font-medium text-foreground">{selected.penalty}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">In Plain English</p>
                  <p className="text-sm text-foreground leading-relaxed">{selected.explanation}</p>
                </div>
                <div className="pt-1">
                  <p className="text-xs text-muted-foreground">Reference: {selected.law}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-2" onClick={() => setSelected(null)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Talk to Expert
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
