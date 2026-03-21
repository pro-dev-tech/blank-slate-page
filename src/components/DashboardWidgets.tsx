import { AlertTriangle, Clock, CheckCircle, ArrowRight, FileText, TrendingUp, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const deadlines = [
  { title: "GST-3B Filing", date: "Feb 20, 2026", state: "Maharashtra", status: "upcoming" as const },
  { title: "PF Return", date: "Feb 15, 2026", state: "All India", status: "overdue" as const },
  { title: "TDS Return Q3", date: "Mar 31, 2026", state: "All India", status: "upcoming" as const },
  { title: "ROC Annual Return", date: "Mar 15, 2026", state: "Karnataka", status: "completed" as const },
];

const riskAlerts = [
  { title: "PF Return overdue by 2 days", severity: "high" as const, type: "Labour" },
  { title: "New GST amendment effective March 1", severity: "medium" as const, type: "GST" },
  { title: "ESIC threshold change for Karnataka", severity: "high" as const, type: "Labour" },
];

const activities = [
  { time: "2h ago", text: "GST-1 filed for January 2026", icon: CheckCircle, color: "text-success" },
  { time: "5h ago", text: "AI flagged new MCA compliance requirement", icon: AlertTriangle, color: "text-warning" },
  { time: "1d ago", text: "PF challan generated for 35 employees", icon: FileText, color: "text-primary" },
  { time: "2d ago", text: "Risk score improved from 78 to 82", icon: TrendingUp, color: "text-success" },
];

const newsItems = [
  { title: "CBIC notifies changes in GST return filing for MSMEs", category: "GST", impact: "High", time: "30m ago" },
  { title: "Ministry of Labour extends ESIC coverage to new sectors", category: "Labour", impact: "Medium", time: "2h ago" },
  { title: "MCA introduces simplified annual return for small companies", category: "MCA", impact: "Low", time: "4h ago" },
  { title: "New environmental compliance norms for manufacturing units", category: "Environmental", impact: "Medium", time: "6h ago" },
  { title: "RBI updates KYC requirements for NBFCs", category: "Financial", impact: "High", time: "8h ago" },
];

const statusConfig = {
  overdue: { class: "status-red", icon: AlertTriangle, label: "Overdue" },
  upcoming: { class: "status-yellow", icon: Clock, label: "Upcoming" },
  completed: { class: "status-green", icon: CheckCircle, label: "Completed" },
};

const impactColors: Record<string, string> = {
  High: "status-red",
  Medium: "status-yellow",
  Low: "status-green",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export function DeadlineCards() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Upcoming Deadlines</h3>
        <button className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></button>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {deadlines.map((d, i) => {
          const cfg = statusConfig[d.status];
          return (
            <motion.div key={i} variants={item} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
              <div className="flex items-center gap-3">
                <cfg.icon className={`h-4 w-4 ${d.status === "overdue" ? "text-destructive" : d.status === "completed" ? "text-success" : "text-warning"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.state} · {d.date}</p>
                </div>
              </div>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cfg.class}`}>{cfg.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function RiskAlerts() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">High-Risk Alerts</h3>
      <div className="space-y-3">
        {riskAlerts.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-start gap-3 rounded-lg border p-3 ${a.severity === "high" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"}`}
          >
            <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${a.severity === "high" ? "text-destructive" : "text-warning"}`} />
            <div>
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <span className="text-xs text-muted-foreground">{a.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ActivityTimeline() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <a.icon className={`h-4 w-4 mt-0.5 shrink-0 ${a.color}`} />
            <div className="flex-1">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsFeed() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Regulatory News Feed</h3>
        <span className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] text-success font-medium">LIVE</span>
      </div>
      <div className="space-y-3 max-h-[320px] overflow-y-auto scrollbar-thin">
        {newsItems.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-lg bg-secondary/50 p-3 hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <p className="text-sm font-medium text-foreground mb-1.5">{n.title}</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">{n.category}</span>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${impactColors[n.impact]}`}>{n.impact} Impact</span>
              <span className="ml-auto text-[10px] text-muted-foreground">{n.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
