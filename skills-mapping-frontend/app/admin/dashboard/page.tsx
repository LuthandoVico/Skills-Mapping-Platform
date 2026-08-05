"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, CheckCircle, XCircle, Activity, FileText, Shield, ArrowLeftRight, Check, AlertTriangle, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

/* ── Toast ── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-20 right-6 z-[300] flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-[13px] font-semibold bg-green-600 text-white animate-in slide-in-from-right-5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {message}
    </div>
  );
}

const priorityWeight = { high: 3, medium: 2, low: 1 };

const getSortedApplications = (apps: any[]) => {
  return [...apps].sort((a, b) => {
    // Sort pending first, then by priority weight, then by date
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    
    const weightA = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
    const weightB = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
    if (weightA !== weightB) {
      return weightB - weightA;
    }
    return b.date.localeCompare(a.date);
  });
};



export default function AdminDashboardPage() {
  const [activeAdminTab, setActiveAdminTab] = useState<"control_center" | "user_applications" | "moderation" | "config">("control_center");
  const [appFilter, setAppFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [toast, setToast] = useState<string | null>(null);

  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  
  // Granular section audits local state
  const [flaggedGeneral, setFlaggedGeneral] = useState(false);
  const [commentGeneral, setCommentGeneral] = useState("");

  const [flaggedScope, setFlaggedScope] = useState(false);
  const [commentScope, setCommentScope] = useState("");

  const [flaggedAcademic, setFlaggedAcademic] = useState(false);
  const [commentAcademic, setCommentAcademic] = useState("");

  const [flaggedExperience, setFlaggedExperience] = useState(false);
  const [commentExperience, setCommentExperience] = useState("");

  const [applications, setApplications] = useState([
    {
      id: "app-1",
      name: "Dr. Sarah Ndlovu",
      role: "Industry Expert / Researcher / Policy Maker",
      org: "University of Witwatersrand",
      email: "s.ndlovu@wits.ac.za",
      date: "2026-08-04",
      status: "pending",
      orcid: "0000-0002-1825-0097",
      linkedin: "linkedin.com/in/sarah-ndlovu-phd",
      cvName: "cv_sarah_ndlovu_academic.pdf",
      qualification: "PhD in Mechanical Engineering & Robotics",
      experience: "Senior Researcher & Lecturer at Wits University (8 years)",
      priority: "high" as const,
      flagged: false,
      flagReason: "",
      flaggedGeneral: false,
      commentGeneral: "",
      flaggedScope: false,
      commentScope: "",
      flaggedAcademic: false,
      commentAcademic: "",
      flaggedExperience: false,
      commentExperience: ""
    },
    {
      id: "app-2",
      name: "George Peterson",
      role: "Education / Training Provider",
      org: "Cape Peninsula University of Technology",
      email: "g.peterson@cput.ac.za",
      date: "2026-08-03",
      status: "pending",
      orcid: "0000-0001-9042-3112",
      linkedin: "linkedin.com/in/george-peterson-cput",
      cvName: "cv_george_peterson_training.pdf",
      qualification: "M.Tech in Curriculum Design & Engineering Education",
      experience: "Head of Training Department at CPUT (11 years)",
      priority: "medium" as const,
      flagged: false,
      flagReason: "",
      flaggedGeneral: false,
      commentGeneral: "",
      flaggedScope: false,
      commentScope: "",
      flaggedAcademic: false,
      commentAcademic: "",
      flaggedExperience: false,
      commentExperience: ""
    },
    {
      id: "app-3",
      name: "Maria Santos",
      role: "Professional Body / Certification Partner",
      org: "Engineering Council of South Africa (ECSA)",
      email: "m.santos@ecsa.org.za",
      date: "2026-08-05",
      status: "pending",
      orcid: "0000-0003-0210-4491",
      linkedin: "linkedin.com/in/maria-santos-ecsa",
      cvName: "cv_maria_santos_reg.pdf",
      qualification: "B.Sc Eng (Mechanical), ECSA Registered Professional Engineer",
      experience: "Director of Professional Registration & Quality at ECSA (15 years)",
      priority: "high" as const,
      flagged: false,
      flagReason: "",
      flaggedGeneral: false,
      commentGeneral: "",
      flaggedScope: false,
      commentScope: "",
      flaggedAcademic: false,
      commentAcademic: "",
      flaggedExperience: false,
      commentExperience: ""
    },
    {
      id: "app-4",
      name: "Thembani Dlamini",
      role: "merSETA Leadership / Planning Team",
      org: "merSETA Planning Division",
      email: "t.dlamini@merseta.org.za",
      date: "2026-08-05",
      status: "pending",
      orcid: "Not Available",
      linkedin: "linkedin.com/in/thembani-dlamini-merseta",
      cvName: "cv_thembani_dlamini_planning.pdf",
      qualification: "MBA in Skills Development & Public Policy",
      experience: "Strategic Skills Planner at merSETA (7 years)",
      priority: "low" as const,
      flagged: false,
      flagReason: "",
      flaggedGeneral: false,
      commentGeneral: "",
      flaggedScope: false,
      commentScope: "",
      flaggedAcademic: false,
      commentAcademic: "",
      flaggedExperience: false,
      commentExperience: ""
    }
  ]);

  const openApplication = (app: typeof applications[0]) => {
    setSelectedApplicationId(app.id);
    setFlaggedGeneral(app.flaggedGeneral || false);
    setCommentGeneral(app.commentGeneral || "");
    setFlaggedScope(app.flaggedScope || false);
    setCommentScope(app.commentScope || "");
    setFlaggedAcademic(app.flaggedAcademic || false);
    setCommentAcademic(app.commentAcademic || "");
    setFlaggedExperience(app.flaggedExperience || false);
    setCommentExperience(app.commentExperience || "");
  };

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa] font-sans">
      {/* Custom Admin Navbar (System-level diagnostic links) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1d3557] border-b border-[#d4af37]/20">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-extrabold text-sm select-none">
              NS
            </div>
            <span className="text-white font-bold text-[15px] tracking-tight">
              National Skills <span className="text-[#d4af37]">Registry</span>
            </span>
            <span className="text-white/20 text-[16px] px-1">|</span>
            <span className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-widest uppercase">
              Admin Console
            </span>
          </div>

          {/* Admin top menu - Diagnostic / Audit-level links */}
          <ul className="hidden md:flex items-center gap-8">
            {[
              { label: "System Diagnostics", href: "#", active: true },
              { label: "Audit Logs", href: "#" },
              { label: "Security Policies", href: "#" },
              { label: "Admin Manual", href: "#" }
            ].map((link) => (
              <li key={link.label}>
                <span className={`text-[13px] font-semibold cursor-pointer transition-colors ${link.active ? "text-[#d4af37]" : "text-white/70 hover:text-white"}`}>
                  {link.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-white text-[13px] font-bold block leading-none">System Admin</span>
              <span className="text-white/50 text-[11px] block mt-0.5">NLA / merSETA scope</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#1d3557] font-bold text-xs shadow-md border border-white/20">
              SA
            </div>
          </div>
        </div>
      </nav>

      {/* Side Nav + Main Content layout */}
      <div className="flex flex-1 pt-16 min-h-screen">
        
        {/* Left Side Nav Panel */}
        <aside className="w-64 bg-[#1d3557] text-white shrink-0 border-r border-[#d4af37]/20 flex flex-col justify-between hidden md:flex">
          <div className="p-6 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#d4af37] tracking-widest uppercase block mb-3">Workspace Modules</span>
              <nav className="flex flex-col gap-1">
                {[
                  { key: "control_center" as const, label: "Control Center", icon: Activity },
                  { key: "user_applications" as const, label: "User Applications", icon: Users, badge: applications.filter(a => a.status === "pending").length },
                  { key: "moderation" as const, label: "Content Moderation", icon: Shield },
                  { key: "config" as const, label: "System Config", icon: FileText }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeAdminTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveAdminTab(item.key)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                        active 
                          ? "bg-[#d4af37] text-[#1d3557] shadow-lg shadow-[#d4af37]/10" 
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? "bg-[#1d3557] text-[#d4af37]" : "bg-[#d4af37] text-[#1d3557]"}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Guidelines Widget */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Verification Rule</span>
              </div>
              <p className="text-[11.5px] text-white/60 leading-relaxed">
                Always cross-reference ORCID ids and publications for Academic role requests to preserve network alignment.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-white/5">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </div>
        </aside>

        {/* Main Workspace Column */}
        <div className="flex-grow flex flex-col overflow-y-auto animate-fade-in">
          
          {/* Admin Header */}
          <div className="bg-white border-b border-[#d4af37]/30 pt-8 pb-0">
            <div className="max-w-[1100px] mx-auto px-8 w-full">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1d3557] border border-[#1d3557]/20 font-bold">merSETA NATIONAL WORKSPACE</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-[#1d3557] uppercase font-bold">{activeAdminTab.replace("_", " ")}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold tracking-wider uppercase">
                  ADMIN PORTAL
                </span>
              </div>

              <div className="pb-6">
                <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-none">
                  {activeAdminTab === "control_center" && "Administrative Dashboard"}
                  {activeAdminTab === "user_applications" && "Expert Application Center"}
                  {activeAdminTab === "moderation" && "Content Moderation Center"}
                  {activeAdminTab === "config" && "System Configuration"}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                    <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                      {activeAdminTab === "control_center" && "System Overview"}
                      {activeAdminTab === "user_applications" && "Credential Verification Queue"}
                      {activeAdminTab === "moderation" && "Flagged Content Queue"}
                      {activeAdminTab === "config" && "Platform Policies & Credentials"}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6b7280]">Platform Integrity & System Operations Control</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="max-w-[1100px] mx-auto px-8 py-10 w-full pb-24 flex-grow">
            
            {/* ════════════ CONTROL CENTER TAB ════════════ */}
            {activeAdminTab === "control_center" && (
              <div className="space-y-8 animate-fade-in">
                {/* Platform metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Active Experts", value: "1,428", sub: "+12 this week" },
                    { label: "Pending Applications", value: applications.filter(a => a.status === "pending").length.toString(), sub: "Needs urgent review" },
                    { label: "Active Taxonomies", value: "384 Occupations", sub: "merSETA aligned" },
                    { label: "System Service Status", value: "99.98% OK", sub: "All modules functional" }
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                      <span className="text-[11px] font-bold text-[#6b7280] uppercase block">{kpi.label}</span>
                      <span className="text-[22px] font-extrabold text-black block mt-1 tracking-tight">{kpi.value}</span>
                      <span className="text-[12px] text-[#6b7280] block mt-1">{kpi.sub}</span>
                    </div>
                  ))}
                </div>

                {/* System Status Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white p-6 border border-gray-200 rounded-2xl shadow-sm space-y-4">
                    <h3 className="text-[15px] font-bold text-black border-b border-gray-100 pb-3 flex items-center justify-between">
                      <span>Priority Action Items Queue</span>
                      <button 
                        onClick={() => setActiveAdminTab("user_applications")}
                        className="text-[11px] font-bold text-[#1d3557] hover:underline"
                      >
                        View All
                      </button>
                    </h3>
                    <div className="space-y-3">
                      {getSortedApplications(applications).filter(a => a.status === "pending").slice(0, 3).map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3.5 bg-[#f8f9fa] border border-gray-150 rounded-xl hover:border-gray-300 transition-all">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[13.5px] font-bold text-black">{app.name}</span>
                              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                app.priority === "high" ? "bg-red-50 text-red-700 border border-red-200" :
                                app.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                "bg-blue-50 text-blue-700 border border-blue-200"
                              }`}>
                                {app.priority}
                              </span>
                            </div>
                            <span className="text-[11.5px] text-[#1d3557] font-semibold block">{app.role}</span>
                            <span className="text-[11px] text-gray-400 block">Submitted: {app.date} · {app.org}</span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveAdminTab("user_applications");
                              openApplication(app);
                            }}
                            className="px-3 py-1.5 bg-[#1d3557] hover:bg-[#2a4a73] text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                          >
                            Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm space-y-4">
                    <h3 className="text-[15px] font-bold text-black border-b border-gray-100 pb-3">Security & Health</h3>
                    <div className="space-y-4 text-[12.5px]">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Database Pool</span>
                        <span className="font-bold text-green-600">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Consensus Engine</span>
                        <span className="font-bold text-green-600">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">AI Rec. Workers</span>
                        <span className="font-bold text-indigo-600">2 Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════ USER APPLICATIONS TAB ════════════ */}
            {activeAdminTab === "user_applications" && (
              <div className="space-y-8 animate-fade-in">
                {selectedApplicationId ? (
                  (() => {
                    const selectedApp = applications.find(a => a.id === selectedApplicationId);
                    if (!selectedApp) return null;
                    return (
                      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8 animate-fade-in">
                        {/* Header Actions */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                          <button
                            onClick={() => setSelectedApplicationId(null)}
                            className="flex items-center gap-2 text-gray-500 hover:text-black text-[13px] font-bold transition-colors"
                          >
                            <ArrowLeftRight className="w-4 h-4 rotate-90" />
                            Back to Applications Queue
                          </button>
                          
                          <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${
                            selectedApp.status === "approved" ? "bg-green-50 text-green-700 border border-green-200" :
                            selectedApp.status === "rejected" ? "bg-red-50 text-red-700 border border-red-200" :
                            "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                          }`}>
                            {selectedApp.status} Verification
                          </span>
                        </div>

                        {/* Candidate Identity Profile */}
                        <div className="space-y-2">
                          <h2 className="text-2xl font-extrabold text-black">{selectedApp.name}</h2>
                          <p className="text-[#1d3557] font-bold text-[15px]">{selectedApp.role}</p>
                          <p className="text-gray-500 text-[13px]">Submitted: {selectedApp.date} · Application Reference: {selectedApp.id}</p>
                        </div>

                        {/* Grid Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Left Column: Granular Credentials Sections */}
                          <div className="md:col-span-2 space-y-6">
                            
                            {/* Section 1: General Profile & Contact */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                              <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Section 1: General Profile & Contact</h3>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                                <div>
                                  <span className="text-gray-400 block font-medium">Candidate Name</span>
                                  <span className="text-gray-800 font-bold mt-0.5 block">{selectedApp.name}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 block font-medium">Contact Email</span>
                                  <span className="text-gray-800 font-bold mt-0.5 block">{selectedApp.email}</span>
                                </div>
                              </div>
                              
                              {/* Section 1 Audit */}
                              <div className="pt-3.5 border-t border-gray-100 space-y-2 bg-[#f8f9fa] p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="flagGeneral"
                                    checked={flaggedGeneral}
                                    onChange={(e) => setFlaggedGeneral(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                                  />
                                  <label htmlFor="flagGeneral" className="text-[12px] font-bold text-red-700 cursor-pointer select-none">
                                    Flag Profile & Contact details
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  value={commentGeneral}
                                  onChange={(e) => setCommentGeneral(e.target.value)}
                                  placeholder="Provide general profile verification comments..."
                                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12.5px] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                                />
                              </div>
                            </div>

                            {/* Section 2: Role & Organizational Scope */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                              <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Section 2: Role & Organizational Scope</h3>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                                <div>
                                  <span className="text-gray-400 block font-medium">Requested Platform Role</span>
                                  <span className="text-[#1d3557] font-bold mt-0.5 block">{selectedApp.role}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 block font-medium">Affiliated Organization</span>
                                  <span className="text-gray-800 font-bold mt-0.5 block">{selectedApp.org}</span>
                                </div>
                              </div>
                              
                              {/* Section 2 Audit */}
                              <div className="pt-3.5 border-t border-gray-100 space-y-2 bg-[#f8f9fa] p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="flagScope"
                                    checked={flaggedScope}
                                    onChange={(e) => setFlaggedScope(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                                  />
                                  <label htmlFor="flagScope" className="text-[12px] font-bold text-red-700 cursor-pointer select-none">
                                    Flag Role & Organizational scope
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  value={commentScope}
                                  onChange={(e) => setCommentScope(e.target.value)}
                                  placeholder="Provide role scope verification comments..."
                                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12.5px] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                                />
                              </div>
                            </div>

                            {/* Section 3: Academic Qualifications */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                              <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Section 3: Academic Qualifications</h3>
                              
                              <div className="space-y-3 text-[13px]">
                                <div>
                                  <span className="text-gray-400 block font-medium">Highest Credential / Degree</span>
                                  <span className="text-gray-800 font-bold mt-0.5 block">{selectedApp.qualification}</span>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3">
                                  <FileText className="w-5 h-5 text-red-500" />
                                  <div className="flex-1">
                                    <span className="text-[12px] font-bold text-gray-800 block">CV Evidence Document</span>
                                    <span className="text-[11px] text-gray-400 block mt-0.5">{selectedApp.cvName}</span>
                                  </div>
                                  <span className="text-[11px] font-bold text-[#1d3557] hover:underline cursor-pointer uppercase">View</span>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3">
                                  <Shield className="w-5 h-5 text-blue-500" />
                                  <div className="flex-1">
                                    <span className="text-[12px] font-bold text-gray-800 block">ORCID Registry Profile</span>
                                    <span className="text-[11px] text-gray-400 block mt-0.5">{selectedApp.orcid}</span>
                                  </div>
                                  <span className="text-[11px] font-bold text-[#1d3557] hover:underline cursor-pointer uppercase">Check</span>
                                </div>
                              </div>
                              
                              {/* Section 3 Audit */}
                              <div className="pt-3.5 border-t border-gray-100 space-y-2 bg-[#f8f9fa] p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="flagAcademic"
                                    checked={flaggedAcademic}
                                    onChange={(e) => setFlaggedAcademic(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                                  />
                                  <label htmlFor="flagAcademic" className="text-[12px] font-bold text-red-700 cursor-pointer select-none">
                                    Flag Academic Credentials & Qualifications
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  value={commentAcademic}
                                  onChange={(e) => setCommentAcademic(e.target.value)}
                                  placeholder="Provide academic verification comments..."
                                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12.5px] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                                />
                              </div>
                            </div>

                            {/* Section 4: Professional Experience Narratives */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
                              <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Section 4: Professional Experience Narratives</h3>
                              
                              <div className="space-y-3 text-[13px]">
                                <div>
                                  <span className="text-gray-400 block font-medium">Dossier / Experience Summary</span>
                                  <p className="text-gray-800 font-semibold leading-relaxed mt-1">{selectedApp.experience}</p>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3">
                                  <Users className="w-5 h-5 text-indigo-500" />
                                  <div className="flex-1">
                                    <span className="text-[12px] font-bold text-gray-800 block">LinkedIn Profile Reference</span>
                                    <span className="text-[11px] text-gray-400 block mt-0.5">{selectedApp.linkedin}</span>
                                  </div>
                                  <span className="text-[11px] font-bold text-[#1d3557] hover:underline cursor-pointer uppercase">Check</span>
                                </div>
                              </div>
                              
                              {/* Section 4 Audit */}
                              <div className="pt-3.5 border-t border-gray-100 space-y-2 bg-[#f8f9fa] p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="flagExperience"
                                    checked={flaggedExperience}
                                    onChange={(e) => setFlaggedExperience(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                                  />
                                  <label htmlFor="flagExperience" className="text-[12px] font-bold text-red-700 cursor-pointer select-none">
                                    Flag Professional Experience narratives
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  value={commentExperience}
                                  onChange={(e) => setCommentExperience(e.target.value)}
                                  placeholder="Provide professional experience verification comments..."
                                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12.5px] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                                />
                              </div>
                            </div>

                          </div>

                          {/* Right Column: Admin Actions Form */}
                          <div className="space-y-6">
                            <div className="border-2 border-[#d4af37]/30 bg-amber-50/20 rounded-2xl p-6 space-y-6 sticky top-20">
                              <h3 className="text-[14px] font-bold text-black uppercase tracking-wider flex items-center gap-2 border-b border-gray-200/50 pb-2">
                                <Shield className="w-4 h-4 text-[#d4af37]" />
                                Audit Console
                              </h3>

                              <p className="text-[11.5px] text-gray-500 leading-relaxed">
                                Review the section check flags on the left panel, submit auditing comments, then approve or reject the platform membership.
                              </p>

                              {/* Action Options */}
                              <div className="grid gap-2 pt-2 border-t border-gray-200/50">
                                <button
                                  onClick={() => {
                                    const overallFlag = flaggedGeneral || flaggedScope || flaggedAcademic || flaggedExperience;
                                    const reasons = [
                                      flaggedGeneral ? `General: ${commentGeneral}` : "",
                                      flaggedScope ? `Scope: ${commentScope}` : "",
                                      flaggedAcademic ? `Academic: ${commentAcademic}` : "",
                                      flaggedExperience ? `Experience: ${commentExperience}` : ""
                                    ].filter(Boolean).join(" | ");
                                    setApplications(prev => prev.map(a => a.id === selectedApp.id ? { 
                                      ...a, 
                                      status: "approved", 
                                      flagged: overallFlag, 
                                      flagReason: reasons,
                                      flaggedGeneral,
                                      commentGeneral,
                                      flaggedScope,
                                      commentScope,
                                      flaggedAcademic,
                                      commentAcademic,
                                      flaggedExperience,
                                      commentExperience
                                    } : a));
                                    triggerToast(`Application for ${selectedApp.name} has been approved.`);
                                    setSelectedApplicationId(null);
                                  }}
                                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-[12px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-green-600/10 flex items-center justify-center gap-2"
                                >
                                  <Check className="w-4 h-4" />
                                  Approve Candidate
                                </button>
                                
                                <button
                                  onClick={() => {
                                    const overallFlag = flaggedGeneral || flaggedScope || flaggedAcademic || flaggedExperience;
                                    const reasons = [
                                      flaggedGeneral ? `General: ${commentGeneral}` : "",
                                      flaggedScope ? `Scope: ${commentScope}` : "",
                                      flaggedAcademic ? `Academic: ${commentAcademic}` : "",
                                      flaggedExperience ? `Experience: ${commentExperience}` : ""
                                    ].filter(Boolean).join(" | ");
                                    setApplications(prev => prev.map(a => a.id === selectedApp.id ? { 
                                      ...a, 
                                      status: "rejected", 
                                      flagged: overallFlag, 
                                      flagReason: reasons,
                                      flaggedGeneral,
                                      commentGeneral,
                                      flaggedScope,
                                      commentScope,
                                      flaggedAcademic,
                                      commentAcademic,
                                      flaggedExperience,
                                      commentExperience
                                    } : a));
                                    triggerToast(`Application for ${selectedApp.name} has been rejected.`);
                                    setSelectedApplicationId(null);
                                  }}
                                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/10 flex items-center justify-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject Candidate
                                </button>

                                <button
                                  onClick={() => {
                                    const overallFlag = flaggedGeneral || flaggedScope || flaggedAcademic || flaggedExperience;
                                    const reasons = [
                                      flaggedGeneral ? `General: ${commentGeneral}` : "",
                                      flaggedScope ? `Scope: ${commentScope}` : "",
                                      flaggedAcademic ? `Academic: ${commentAcademic}` : "",
                                      flaggedExperience ? `Experience: ${commentExperience}` : ""
                                    ].filter(Boolean).join(" | ");
                                    setApplications(prev => prev.map(a => a.id === selectedApp.id ? { 
                                      ...a, 
                                      flagged: overallFlag, 
                                      flagReason: reasons,
                                      flaggedGeneral,
                                      commentGeneral,
                                      flaggedScope,
                                      commentScope,
                                      flaggedAcademic,
                                      commentAcademic,
                                      flaggedExperience,
                                      commentExperience
                                    } : a));
                                    triggerToast(`Audit logs saved for ${selectedApp.name}.`);
                                    setSelectedApplicationId(null);
                                  }}
                                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 font-bold text-[12px] uppercase tracking-wider rounded-xl transition-all"
                                >
                                  Save Audit Notes & Exit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <>
                    {/* Summary of Applications statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Total Applications", value: applications.length, color: "text-[#1d3557]" },
                        { label: "Pending Applications", value: applications.filter(a => a.status === "pending").length, color: "text-amber-600" },
                        { label: "Approved Experts", value: applications.filter(a => a.status === "approved").length, color: "text-green-600" },
                        { label: "Rejected Candidates", value: applications.filter(a => a.status === "rejected").length, color: "text-red-600" }
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white p-5 border border-gray-200 rounded-2xl shadow-sm">
                          <span className="text-[11px] font-bold text-[#6b7280] uppercase block">{stat.label}</span>
                          <span className={`text-[24px] font-extrabold block mt-1 tracking-tight ${stat.color}`}>{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Filter Sub-Tabs */}
                    <div className="flex border-b border-gray-200 gap-4">
                      {[
                        { key: "all" as const, label: "All Applications" },
                        { key: "pending" as const, label: `Pending (${applications.filter(a => a.status === "pending").length})` },
                        { key: "approved" as const, label: `Approved (${applications.filter(a => a.status === "approved").length})` },
                        { key: "rejected" as const, label: `Rejected (${applications.filter(a => a.status === "rejected").length})` }
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setAppFilter(tab.key)}
                          className={`py-3 px-1 text-[13px] font-semibold border-b-2 transition-all ${
                            appFilter === tab.key 
                              ? "border-[#d4af37] text-[#d4af37] font-bold" 
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Applications List */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                      {applications.filter(a => appFilter === "all" || a.status === appFilter).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                          <h3 className="text-lg font-bold text-black">No Applications</h3>
                          <p className="text-gray-500 text-[14px] max-w-sm mt-1">
                            There are no expert applications matching the "{appFilter}" filter.
                          </p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {getSortedApplications(applications).map((app) => {
                            if (appFilter !== "all" && app.status !== appFilter) return null;
                            return (
                              <div key={app.id} className="p-5 border border-gray-200 rounded-2xl bg-white hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-3">
                                    <h3
                                      onClick={() => openApplication(app)}
                                      className="text-[16px] font-bold text-black cursor-pointer hover:text-[#1d3557] hover:underline"
                                    >
                                      {app.name}
                                    </h3>
                                    <span className="text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-150 px-2 py-0.5 rounded">
                                      ID: {app.id}
                                    </span>
                                    {/* Status badge */}
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                      app.status === "approved" ? "bg-green-50 text-green-700 border border-green-200" :
                                      app.status === "rejected" ? "bg-red-50 text-red-700 border border-red-200" :
                                      "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}>
                                      {app.status}
                                    </span>
                                    {/* Priority badge */}
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                      app.priority === "high" ? "bg-red-50 text-red-700 border border-red-200" :
                                      app.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                      "bg-blue-50 text-blue-700 border border-blue-200"
                                    }`}>
                                      {app.priority} Priority
                                    </span>
                                    {app.flagged && (
                                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 bg-red-500 text-white rounded">
                                        Flagged
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[13px] text-[#1d3557] font-semibold">{app.role}</p>
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <span className="font-semibold text-gray-700">Institution:</span> {app.org}
                                    </span>
                                    <span className="text-gray-300">|</span>
                                    <span className="flex items-center gap-1">
                                      <span className="font-semibold text-gray-700">Email:</span> {app.email}
                                    </span>
                                    <span className="text-gray-300">|</span>
                                    <span className="flex items-center gap-1">
                                      <span className="font-semibold text-gray-700">Submitted:</span> {app.date}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Action buttons */}
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openApplication(app)}
                                    className={`px-4 py-2 font-bold text-[12px] uppercase tracking-wider rounded-xl transition-all ${
                                      app.status === "pending"
                                        ? "bg-[#1d3557] hover:bg-[#2a4a73] text-white shadow-md shadow-[#1d3557]/10"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200"
                                    }`}
                                  >
                                    Review
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ════════════ CONTENT MODERATION TAB ════════════ */}
            {activeAdminTab === "moderation" && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center animate-fade-in">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black">All Annotation Moderation Completed</h3>
                <p className="text-gray-500 text-[14px] max-w-md mx-auto mt-2">
                  There are no flagged comments, disputed consensus files, or annotation overrides requiring administrative moderation at this time.
                </p>
              </div>
            )}

            {/* ════════════ SYSTEM CONFIG TAB ════════════ */}
            {activeAdminTab === "config" && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold text-black border-b border-gray-150 pb-3">Registry Constants & Rules Configuration</h3>
                
                <div className="grid gap-6 max-w-xl">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-gray-700">Consensus Verification Threshold</label>
                    <input type="text" defaultValue="75%" className="border border-gray-200 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 font-bold max-w-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]" />
                    <p className="text-[11px] text-gray-400">Expert agreement index required to push recommendations to live standards.</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-gray-700">Auto-Approve Email Domains</label>
                    <input type="text" defaultValue="*.merseta.org.za, *.dhet.gov.za" className="border border-gray-200 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 font-bold focus:outline-none focus:ring-1 focus:ring-[#d4af37]" />
                    <p className="text-[11px] text-gray-400">Comma-separated email wildcards that bypass standard expert verification.</p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
