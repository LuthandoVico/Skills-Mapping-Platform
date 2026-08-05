"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { skillDetail } from "@/data/skills";

/* ═══════════════════════════════ TYPES ═══════════════════════════════ */

type FieldStatus = "not_reviewed" | "accurate" | "needs_update" | "remove";
type AnnotationType = "comment" | "suggest_edit" | "flag_incorrect";
type SkillAnnotateTab = "overview" | "related" | "occupations" | "proficiency" | "analytics" | "status";

interface Highlight {
  id: string;
  text: string;
  comment: string;
  type: AnnotationType;
}

interface FieldAnnotation {
  status: FieldStatus;
  comment: string;
  highlights: Highlight[];
}

const defaultField = (): FieldAnnotation => ({ status: "not_reviewed", comment: "", highlights: [] });

/* ══════════════════════ REUSABLE ANNOTATION COMPONENTS ═══════════════ */

function StatusPills({ status, onChange }: { status: FieldStatus; onChange: (s: FieldStatus) => void }) {
  const opts: { value: FieldStatus; label: string; active: string }[] = [
    { value: "accurate", label: "✓ Accurate", active: "bg-green-50 text-green-700 border-green-200 ring-1 ring-green-300" },
    { value: "needs_update", label: "✎ Update", active: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-300" },
    { value: "remove", label: "✕ Remove", active: "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300" },
  ];
  return (
    <div className="flex gap-1 mt-1">
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={(e) => { e.stopPropagation(); onChange(status === o.value ? "not_reviewed" : o.value); }}
          className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${status === o.value ? o.active : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function InlineComment({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(!!value);
  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="flex items-center gap-1 text-[10px] text-[#6b7280] hover:text-[#1d3557] font-medium mt-1.5 transition-colors">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add comment
      </button>
    );
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Your comment..."
      className="w-full mt-1.5 border border-[#e5e7eb] rounded-lg p-2 text-[11px] text-gray-700 resize-none h-[52px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] bg-[#fafbfc]"
    />
  );
}

function HighlightPopover({ position, onAdd, onClose }: {
  position: { x: number; y: number };
  onAdd: (comment: string, type: AnnotationType) => void;
  onClose: () => void;
}) {
  const [comment, setComment] = useState("");
  const [type, setType] = useState<AnnotationType>("comment");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const types = [
    { value: "comment" as const, label: "Comment", c: "bg-blue-50 text-blue-700 border-blue-200" },
    { value: "suggest_edit" as const, label: "Suggest Edit", c: "bg-amber-50 text-amber-700 border-amber-200" },
    { value: "flag_incorrect" as const, label: "Flag", c: "bg-red-50 text-red-700 border-red-200" },
  ];

  return (
    <div ref={ref} className="fixed z-[100] bg-white border border-[#e5e7eb] rounded-xl shadow-2xl p-3.5 w-[300px]"
      style={{ top: position.y + 8, left: Math.min(position.x, typeof window !== "undefined" ? window.innerWidth - 320 : 600) }}>
      <div className="flex gap-1.5 mb-2">
        {types.map((t) => (
          <button key={t.value} onClick={() => setType(t.value)}
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${type === t.value ? t.c + " ring-1 ring-current" : "bg-gray-50 text-gray-400 border-gray-200"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add your annotation..."
        className="w-full border border-[#e5e7eb] rounded-lg p-2 text-[12px] text-gray-700 resize-none h-[60px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]" />
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={onClose} className="px-2.5 py-1 text-[11px] font-semibold text-gray-500 hover:text-gray-700">Cancel</button>
        <button onClick={() => { if (comment.trim()) onAdd(comment, type); }} disabled={!comment.trim()}
          className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#1d3557] rounded-lg hover:bg-[#2a4a73] disabled:opacity-40">Add</button>
      </div>
    </div>
  );
}

function HText({ children, highlights, onHighlight }: {
  children: string;
  highlights: Highlight[];
  onHighlight: (text: string, comment: string, type: AnnotationType) => void;
}) {
  const [pop, setPop] = useState<{ text: string; position: { x: number; y: number } } | null>(null);
  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    const r = sel.getRangeAt(0).getBoundingClientRect();
    setPop({ text: sel.toString().trim(), position: { x: r.left, y: r.bottom } });
  }, []);

  return (
    <span className="relative">
      <span onMouseUp={handleMouseUp} className="cursor-text select-text">{children}</span>
      {highlights.length > 0 && (
        <span className="flex flex-col gap-1 mt-1.5">
          {highlights.map((h) => (
            <span key={h.id} className={`flex items-start gap-1.5 px-2 py-1 rounded-lg text-[10px] leading-[14px] ${h.type === "flag_incorrect" ? "bg-red-50 border border-red-100 text-red-700" : h.type === "suggest_edit" ? "bg-amber-50 border border-amber-100 text-amber-700" : "bg-blue-50 border border-blue-100 text-blue-700"}`}>
              <svg className="w-2.5 h-2.5 mt-0.5 shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
              <span><b>&ldquo;{h.text}&rdquo;</b> &mdash; {h.comment}</span>
            </span>
          ))}
        </span>
      )}
      {pop && (
        <HighlightPopover position={pop.position} onClose={() => setPop(null)}
          onAdd={(c, t) => { onHighlight(pop.text, c, t); setPop(null); window.getSelection()?.removeAllRanges(); }} />
      )}
    </span>
  );
}

function ACard({ children, fieldKey, annotations, onUpdate, className = "" }: {
  children: React.ReactNode;
  fieldKey: string;
  annotations: Record<string, FieldAnnotation>;
  onUpdate: (key: string, patch: Partial<FieldAnnotation>) => void;
  className?: string;
}) {
  const f = annotations[fieldKey] ?? defaultField();
  const hasAnnotation = f.status !== "not_reviewed" || f.comment || f.highlights.length > 0;

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -left-2.5 top-0 bottom-0 w-1 rounded-full transition-all ${hasAnnotation ? f.status === "accurate" ? "bg-green-400" : f.status === "needs_update" ? "bg-amber-400" : f.status === "remove" ? "bg-red-400" : "bg-[#d4af37]" : "bg-transparent group-hover:bg-gray-200"}`} />
      {children}
      <div className="mt-2 flex flex-col gap-1">
        <StatusPills status={f.status} onChange={(s) => onUpdate(fieldKey, { status: s })} />
        <InlineComment value={f.comment} onChange={(v) => onUpdate(fieldKey, { comment: v })} />
      </div>
    </div>
  );
}

function SectionCommentBlock({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-8 border-t border-dashed border-[#e5e7eb] pt-5">
      <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block mb-2">Section-Level Comment</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Add overall feedback for this entire section..."
        className="w-full border border-[#e5e7eb] rounded-xl p-3 text-[12px] text-gray-700 resize-none h-[70px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]" />
    </div>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-20 right-6 z-[300] flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-[13px] font-semibold bg-green-600 text-white animate-in slide-in-from-right-5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {message}
    </div>
  );
}

function ConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-[440px] w-full mx-4">
        <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h3 className="text-[18px] font-bold text-black text-center">Submit for Consensus?</h3>
        <p className="text-[13px] text-[#6b7280] text-center mt-2 leading-[20px]">
          Your annotations and suggestions will be shared with the expert community for collaborative validation.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 text-[13px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 text-[13px] font-bold text-white bg-[#1d3557] hover:bg-[#2a4a73] rounded-xl transition-colors shadow-lg shadow-[#1d3557]/20">Submit</button>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════ MAIN PAGE ═════════════════════════════ */

export default function SkillAnnotatePage() {
  const [activeTab, setActiveTab] = useState<SkillAnnotateTab>("overview");
  const [annotations, setAnnotations] = useState<Record<string, FieldAnnotation>>({});
  const [sectionComments, setSectionComments] = useState<Record<string, string>>({});
  const [generalNotes, setGeneralNotes] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // For Chart Tooltip mapping
  const [hoveredBar, setHoveredBar] = useState<{ chartId: string; index: number } | null>(null);
  const [tooltip, setTooltip] = useState<{ chartId: string; label: string; value: string; x: number; y: number } | null>(null);

  const updateField = useCallback((key: string, patch: Partial<FieldAnnotation>) => {
    setAnnotations((prev) => ({ ...prev, [key]: { ...(prev[key] ?? defaultField()), ...patch } }));
  }, []);

  const addHighlight = useCallback((fieldKey: string, text: string, comment: string, type: AnnotationType) => {
    setAnnotations((prev) => {
      const f = prev[fieldKey] ?? defaultField();
      return { ...prev, [fieldKey]: { ...f, highlights: [...f.highlights, { id: crypto.randomUUID(), text, comment, type }] } };
    });
  }, []);

  const tabs: { key: SkillAnnotateTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "related", label: "Related Skills" },
    { key: "occupations", label: "Occupations" },
    { key: "proficiency", label: "Proficiency Framework" },
    { key: "analytics", label: "Skills Analytics" },
    { key: "status", label: "Skill Status" },
  ];

  /* ── Chart definitions (copied from original analytics page) ── */
  const topIndustries = [
    { name: "Automotive Mfg", value: 68 },
    { name: "Metal Industry", value: 54 },
    { name: "Motor Retail", value: 45 },
    { name: "Components Mfg", value: 38 },
    { name: "Plastics Mfg", value: 30 },
  ];

  const trendYears = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"];
  const historicalTrend = [
    { year: "2020", value: 55 },
    { year: "2021", value: 62 },
    { year: "2022", value: 70 },
    { year: "2023", value: 82 },
    { year: "2024", value: 90 },
  ];
  const projectedTrend = [
    { year: "2024", value: 90 },
    { year: "2025", value: 93 },
    { year: "2026", value: 95 },
    { year: "2027", value: 98 },
  ];

  const provinces = [
    { name: "Gauteng", value: 85 },
    { name: "Western Cape", value: 75 },
    { name: "KwaZulu-Natal", value: 68 },
    { name: "Eastern Cape", value: 55 },
    { name: "Mpumalanga", value: 48 },
    { name: "North West", value: 42 },
    { name: "Limpopo", value: 35 },
    { name: "Free State", value: 28 },
    { name: "Northern Cape", value: 20 },
  ];

  const monthlyAds = [
    { month: "Jan", count: 800 },
    { month: "Feb", count: 950 },
    { month: "Mar", count: 1100 },
    { month: "Apr", count: 1300 },
    { month: "May", count: 1600 },
    { month: "Jun", count: 1450 },
    { month: "Jul", count: 1200 },
    { month: "Aug", count: 1050 },
    { month: "Sep", count: 1350 },
    { month: "Oct", count: 1500 },
    { month: "Nov", count: 1250 },
    { month: "Dec", count: 900 },
  ];

  /* ── Submitted success state ── */
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center min-h-[80vh] px-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-[24px] font-extrabold text-black">Annotations Submitted</h2>
          <p className="text-[14px] text-[#6b7280] mt-2 text-center max-w-[480px] leading-[22px]">
            Your expert annotations for skill <span className="font-bold text-black">{skillDetail.name}</span> have been submitted for consensus.
          </p>
          <div className="flex gap-3 mt-8">
            <Link href={`/skills/${skillDetail.id}`} className="px-5 py-2.5 text-[13px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              Back to Overview
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ════ ANNOTATION HEADER (replaces SkillHeader) ════ */}
      <div className="bg-white border-b border-[#d4af37]/30 pt-24 pb-0">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Breadcrumb meta */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">{skillDetail.status}</span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">{skillDetail.level}</span>
              <span className="text-gray-400">|</span>
              <span className="text-[#1d3557]">{skillDetail.type}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
              ANNOTATE MODE
            </span>
          </div>

          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-2">
            <div className="max-w-[700px]">
              <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-tight">{skillDetail.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                  <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">Expert Annotation Workspace</span>
                </div>
                <span className="text-[11px] text-[#6b7280]">Dr. Sarah Ndlovu · {new Date().toLocaleDateString("en-ZA")}</span>
              </div>
            </div>

            {/* Exit annotate mode */}
            <Link href={`/skills/${skillDetail.id}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 border border-gray-200 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Exit Annotate
            </Link>
          </div>

          {/* Stats metrics block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 py-6 border-t border-[#e5e7eb]">
            {[
              { label: "Employers hiring", value: skillDetail.stats.employersHiring },
              { label: "Demand alignment", value: skillDetail.stats.demandAlignment },
              { label: "Job postings (90d)", value: skillDetail.stats.jobPostings90d },
              { label: "Avg. time to proficiency", value: skillDetail.stats.timeToProficiency },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-[20px] font-bold text-black block leading-[25px]">{stat.value}</span>
                <span className="text-[12px] text-[#6b7280] block mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Tab Navigation — mirrors original but within annotate mode */}
          <div className="flex gap-1 overflow-x-auto border-t border-[#e5e7eb] -mx-8 px-8 scrollbar-none">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-4 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-all ${activeTab === tab.key ? "border-[#d4af37] text-[#d4af37] font-bold" : "border-transparent text-[#6b7280] hover:text-black hover:border-gray-300"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full pb-24">
        <div className="grid grid-cols-1 gap-8">
          <div>

            {/* ════════════ OVERVIEW TAB ════════════ */}
            {activeTab === "overview" && (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left panel */}
                <div className="flex-1 flex flex-col gap-8">
                  {/* Skill Definition */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <ACard fieldKey="skill-definition" annotations={annotations} onUpdate={updateField}>
                      <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Skill Definition
                      </h3>
                      <p className="text-[14px] text-gray-700 leading-[22px] mt-4">
                        <HText highlights={(annotations["skill-definition"] ?? defaultField()).highlights}
                          onHighlight={(t, c, ty) => addHighlight("skill-definition", t, c, ty)}>
                          {skillDetail.overview.definition}
                        </HText>
                      </p>
                    </ACard>
                  </div>

                  {/* Key Attributes */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6" />
                      </svg>
                      Key Attributes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                      {[
                        { label: "OFO Category", value: skillDetail.overview.keyAttributes.ofoCategory, key: "attr-ofo" },
                        { label: "Skill Type", value: skillDetail.overview.keyAttributes.skillType, key: "attr-type" },
                        { label: "merSETA Alignment", value: skillDetail.overview.keyAttributes.expertPanel, key: "attr-alignment" },
                        { label: "NQF Level", value: skillDetail.overview.keyAttributes.nqfLevel, key: "attr-nqf" },
                        { label: "Last Reviewed", value: skillDetail.overview.keyAttributes.lastReviewed, key: "attr-reviewed" },
                        { label: "Expert Panel Members", value: skillDetail.overview.keyAttributes.expertPanel, key: "attr-panel" },
                      ].map((item) => (
                        <div key={item.key}>
                          <ACard fieldKey={item.key} annotations={annotations} onUpdate={updateField}>
                            <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">{item.label}</span>
                            <span className="text-[14px] font-semibold text-black mt-1 block">{item.value}</span>
                          </ACard>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sector-specific Definitions */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Sector-specific Definitions
                    </h3>
                    <div className="flex flex-col gap-4">
                      {skillDetail.overview.subsectorDefinitions.map((def) => {
                        const key = `subsector-${def.name}`;
                        return (
                          <div key={def.name} className="p-3 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl">
                            <ACard fieldKey={key} annotations={annotations} onUpdate={updateField}>
                              <div className="flex items-center justify-between font-semibold text-[14px] text-gray-700">
                                <span>{def.name}</span>
                                <span className="text-[11px] text-[#6b7280]">{def.count}</span>
                              </div>
                              <p className="text-[13px] text-gray-500 mt-2 leading-[20px]">
                                Detailed competency definition mapping of {skillDetail.name} specifically customized for the requirements of the {def.name} subsector.
                              </p>
                            </ACard>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right panel */}
                <div className="w-full lg:w-[320px] shrink-0">
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <ACard fieldKey="overview-demand" annotations={annotations} onUpdate={updateField}>
                      <div className="flex items-center gap-2 border-b border-[#e5e7eb] pb-3 mb-4">
                        <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 className="text-[14px] font-bold text-black uppercase tracking-wider">Demand Signal</h4>
                      </div>
                      <div className="text-[36px] font-extrabold text-black tracking-tight leading-none">
                        {skillDetail.overview.demandSignal.value}
                      </div>
                      <span className="text-[12px] text-[#6b7280] block mt-1">
                        {skillDetail.overview.demandSignal.employerDemandAlignment}
                      </span>
                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#e5e7eb]">
                        <div>
                          <span className="text-[20px] font-bold text-black block leading-none">{skillDetail.overview.demandSignal.signals}</span>
                          <span className="text-[11px] text-[#6b7280] block mt-1">Skill signals</span>
                        </div>
                        <div>
                          <span className="text-[20px] font-bold text-green-600 block leading-none">{skillDetail.overview.demandSignal.yoyGrowth}</span>
                          <span className="text-[11px] text-[#6b7280] block mt-1">YoY growth</span>
                        </div>
                      </div>
                    </ACard>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════ RELATED SKILLS TAB ════════════ */}
            {activeTab === "related" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] w-full items-start">
                {/* Visual Interconnectivity */}
                <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-6 flex flex-col items-start shadow-sm w-full">
                  <h3 className="font-bold text-[#1d3557] text-[16px] leading-[24px]">Skill Overlap &amp; Interconnectivity</h3>
                  <div className="w-full flex items-center justify-center py-[20px] h-[220px]">
                    <span className="text-gray-400 text-[12px] italic">[Interconnectivity Diagram - Click to Annotate Section]</span>
                  </div>
                  <SectionCommentBlock value={sectionComments["related-diagram"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, "related-diagram": v }))} />
                </div>

                {/* Related Skills List */}
                <div className="flex flex-col gap-[16px] w-full">
                  <span className="font-semibold text-[#6b7280] text-[13px] tracking-[0.65px] uppercase">Related Skills Mapping</span>
                  {skillDetail.relatedSkills.map((skill) => (
                    <div key={skill.id} className="p-4 bg-white border border-[#e5e7eb] rounded-[14px]">
                      <ACard fieldKey={`related-skill-${skill.id}`} annotations={annotations} onUpdate={updateField}>
                        <h4 className="font-bold text-[#1d3557] text-[14px] leading-[21px]">{skill.name}</h4>
                        <p className="font-normal text-[#1d3557]/80 text-[12px] mt-1">{skill.description}</p>
                        <div className="flex gap-[8px] items-center mt-3">
                          <span className="text-[#74777f] text-[11px]">Similarity: {skill.similarity}</span>
                        </div>
                      </ACard>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ════════════ OCCUPATIONS TAB ════════════ */}
            {activeTab === "occupations" && (
              <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2H-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Occupations Requiring {skillDetail.name}
                </h3>
                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#e5e7eb] text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">
                        <th className="pb-3">OFO Code</th>
                        <th className="pb-3">Occupation Title</th>
                        <th className="pb-3">Subsector</th>
                        <th className="pb-3">Demand Status</th>
                        <th className="pb-3">Required Level</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e7eb]">
                      {skillDetail.occupations.map((occ) => {
                        const key = `occ-${occ.id}`;
                        return (
                          <tr key={occ.id} className="text-[13px] text-gray-700">
                            <td className="py-4 font-semibold text-gray-400">{occ.code}</td>
                            <td className="py-4 font-bold text-black">
                              <ACard fieldKey={key} annotations={annotations} onUpdate={updateField}>
                                <span>{occ.title}</span>
                              </ACard>
                            </td>
                            <td className="py-4">{occ.subsector}</td>
                            <td className="py-4">{occ.demand}</td>
                            <td className="py-4">{occ.requiredLevel}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ════════════ PROFICIENCY TAB ════════════ */}
            {activeTab === "proficiency" && (
              <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  Proficiency Framework
                </h3>
                <div className="flex flex-col gap-4 mt-6">
                  {skillDetail.proficiencyLevels.map((prof) => {
                    const key = `proficiency-${prof.level}`;
                    return (
                      <div key={prof.level} className="p-4 bg-[#f5f7fa] border border-[#e5e7eb] rounded-2xl">
                        <ACard fieldKey={key} annotations={annotations} onUpdate={updateField}>
                          <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#1d3557] flex items-center justify-center text-white font-extrabold text-[14px] shrink-0">{prof.level}</div>
                            <div>
                              <h4 className="text-[14px] font-bold text-black">{prof.title}</h4>
                              <p className="text-[13px] text-[#6b7280] mt-1">{prof.description}</p>
                            </div>
                          </div>
                        </ACard>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ════════════ ANALYTICS TAB ════════════ */}
            {activeTab === "analytics" && (
              <div className="flex flex-col gap-6">
                {/* 2-Column charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top industries */}
                  <div className="bg-white border border-[#e5e8ed] rounded-xl shadow-sm flex flex-col h-[350px]">
                    <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3">
                      <h3 className="font-bold text-[13px] text-[#1a365d]">Top 5 merSETA Industries</h3>
                    </div>
                    <div className="p-5 flex-grow relative flex flex-col justify-around">
                      {topIndustries.map((ind, idx) => (
                        <div key={ind.name} className="flex items-center gap-3 w-full">
                          <div className="w-[100px] text-right text-[11px] font-bold text-[#1a365d] truncate">{ind.name}</div>
                          <div className="flex-grow h-6 bg-gray-55 rounded-sm overflow-hidden relative">
                            <div className="h-full bg-[#1a365d]" style={{ width: `${ind.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4">
                      <StatusPills status={(annotations["chart-industries"] ?? defaultField()).status} onChange={(s) => updateField("chart-industries", { status: s })} />
                    </div>
                  </div>

                  {/* Demand trend */}
                  <div className="bg-white border border-[#e5e8ed] rounded-xl shadow-sm flex flex-col h-[350px]">
                    <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3">
                      <h3 className="font-bold text-[13px] text-[#1a365d]">Industry Demand Trend</h3>
                    </div>
                    <div className="p-5 flex-grow flex items-center justify-center">
                      <span className="text-gray-400 text-[12px] italic">[Demand Trend Chart - Click below to annotate]</span>
                    </div>
                    <div className="px-4 pb-4">
                      <StatusPills status={(annotations["chart-trend"] ?? defaultField()).status} onChange={(s) => updateField("chart-trend", { status: s })} />
                    </div>
                  </div>
                </div>
                <SectionCommentBlock value={sectionComments["analytics"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, analytics: v }))} />
              </div>
            )}

            {/* ════════════ STATUS TAB ════════════ */}
            {activeTab === "status" && (
              <div className="bg-white border border-[#e5e8ed] rounded-2xl p-8 shadow-sm">
                <ACard fieldKey="skill-status-box" annotations={annotations} onUpdate={updateField}>
                  <div className="flex items-center gap-4 pb-4 mb-6 border-b border-gray-100">
                    <div className="bg-[#d4af37] px-4 py-1.5 rounded-lg text-white font-extrabold text-[14px] uppercase tracking-wider">STABLE</div>
                    <div>
                      <h3 className="font-bold text-[14px] text-[#1d3557]">Current Registry Status</h3>
                      <p className="text-[12px] text-[#6b7280]">Validated by the Global Skill Mapping Engine</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-[22px]">
                    A <b>Stable</b> status indicates that the skill has maintained a consistent level of demand in the labor market for at least 36 months.
                  </p>
                </ACard>
              </div>
            )}

            {/* General Notes — always visible */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm mt-8">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-[15px] font-bold text-black">General Notes</span>
              </div>
              <textarea value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Overall comments, references, or notes that don't belong to a specific section..."
                className="w-full border border-[#e5e7eb] rounded-xl p-4 text-[13px] text-gray-700 resize-none h-[100px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]" />
            </div>
          </div>
        </div>
      </main>

      {/* ════ STICKY ACTION BAR ════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#e5e7eb] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1400px] mx-auto px-8 py-3 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-[12px] text-[#6b7280]">
            <span>{Object.values(annotations).filter((a) => a.status !== "not_reviewed" || a.comment || a.highlights.length > 0).length} fields annotated</span>
            <span className="text-gray-300">|</span>
            <span>{Object.values(sectionComments).filter(Boolean).length} section comments</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setToast("Draft saved successfully")}
              className="px-5 py-2.5 text-[13px] font-semibold text-[#1d3557] bg-white border-2 border-[#1d3557]/20 hover:border-[#1d3557]/40 rounded-xl transition-all hover:shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Save Draft
            </button>
            <button onClick={() => setShowConfirm(true)}
              className="px-5 py-2.5 text-[13px] font-bold text-white bg-[#1d3557] hover:bg-[#2a4a73] rounded-xl transition-all shadow-lg shadow-[#1d3557]/20 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              Submit for Consensus
            </button>
          </div>
        </div>
      </div>

      {showConfirm && <ConfirmModal onCancel={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); setSubmitted(true); }} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Footer />
    </>
  );
}
