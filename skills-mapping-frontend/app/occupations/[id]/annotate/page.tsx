"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { occupationDetail } from "@/data/occupations";

/* ═══════════════════════════════ TYPES ═══════════════════════════════ */

type FieldStatus = "not_reviewed" | "accurate" | "needs_update" | "remove";
type AnnotationType = "comment" | "suggest_edit" | "flag_incorrect";
type AnnotateTab = "overview" | "skills" | "education" | "labour-market";

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

/* ══════════════════════ REUSABLE ANNOTATION TOOLS ════════════════════ */

const defaultField = (): FieldAnnotation => ({ status: "not_reviewed", comment: "", highlights: [] });

/* ── Status selector pills ── */
function StatusPills({ status, onChange }: { status: FieldStatus; onChange: (s: FieldStatus) => void }) {
  const opts: { value: FieldStatus; label: string; active: string }[] = [
    { value: "accurate", label: "✓ Accurate", active: "bg-green-50 text-green-700 border-green-200 ring-1 ring-green-300" },
    { value: "needs_update", label: "✎ Update", active: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-300" },
    { value: "remove", label: "✕ Remove", active: "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300" },
  ];
  return (
    <div className="flex gap-1">
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

/* ── Inline comment toggle ── */
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

/* ── Text highlight popover ── */
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

/* ── Highlightable text wrapper ── */
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

/* ── Annotatable card wrapper ── */
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

/* ── Section comment block ── */
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

/* ── Toast ── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-20 right-6 z-[300] flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-[13px] font-semibold bg-green-600 text-white animate-in slide-in-from-right-5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      {message}
    </div>
  );
}

/* ── Confirm Modal ── */
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

export default function ExpertAnnotatePage() {
  const [activeTab, setActiveTab] = useState<AnnotateTab>("overview");
  const [annotations, setAnnotations] = useState<Record<string, FieldAnnotation>>({});
  const [sectionComments, setSectionComments] = useState<Record<string, string>>({});
  const [generalNotes, setGeneralNotes] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const updateField = useCallback((key: string, patch: Partial<FieldAnnotation>) => {
    setAnnotations((prev) => ({ ...prev, [key]: { ...(prev[key] ?? defaultField()), ...patch } }));
  }, []);

  const addHighlight = useCallback((fieldKey: string, text: string, comment: string, type: AnnotationType) => {
    setAnnotations((prev) => {
      const f = prev[fieldKey] ?? defaultField();
      return { ...prev, [fieldKey]: { ...f, highlights: [...f.highlights, { id: crypto.randomUUID(), text, comment, type }] } };
    });
  }, []);

  const tabs: { key: AnnotateTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "skills", label: "Skills & Knowledge" },
    { key: "education", label: "Education & Pathways" },
    { key: "labour-market", label: "Labour Market" },
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
            Your expert annotations for <span className="font-bold text-black">{occupationDetail.title}</span> have been submitted for consensus.
          </p>
          <div className="flex gap-3 mt-8">
            <Link href={`/occupations/${occupationDetail.id}`} className="px-5 py-2.5 text-[13px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
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

      {/* ════ ANNOTATION HEADER (replaces OccupationHeader) ════ */}
      <div className="bg-white border-b border-[#d4af37]/30 pt-24 pb-0">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">{occupationDetail.ofoCode}</span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">{occupationDetail.iscoCode}</span>
              <span className="text-gray-400">|</span>
              <span className="text-[#1d3557]">{occupationDetail.pathway}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
              ANNOTATE MODE
            </span>
          </div>

          {/* Title row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-2">
            <div className="max-w-[700px]">
              <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-none">{occupationDetail.title}</h1>
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
            <Link href={`/occupations/${occupationDetail.id}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 border border-gray-200 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Exit Annotate
            </Link>
          </div>

          {/* KPI Cards — same as original */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 py-6 border-t border-[#e5e7eb]">
            {[
              { label: "AVG. SALARY", value: occupationDetail.kpis.salary, sub: occupationDetail.kpis.salarySubtext },
              { label: "DEMAND STATUS", value: occupationDetail.kpis.demandStatus, sub: occupationDetail.kpis.demandSubtext },
              { label: "JOB POSTINGS", value: occupationDetail.kpis.postings, sub: occupationDetail.kpis.postingsSubtext },
              { label: "AI IMPACT", value: occupationDetail.kpis.aiImpact, sub: occupationDetail.kpis.aiImpactSubtext },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb]">
                <span className="text-[11px] font-bold text-[#6b7280] uppercase block">{kpi.label}</span>
                <span className="text-[22px] font-extrabold text-black block mt-1 tracking-tight">{kpi.value}</span>
                <span className="text-[12px] text-[#6b7280] block mt-1">{kpi.sub}</span>
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
          {/* Tab Content (mirrors original layouts) */}
          <div>

            {/* ════════════ OVERVIEW TAB ════════════ */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column */}
                <div className="flex flex-col gap-6">
                  {/* Summary & Descriptor */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <ACard fieldKey="overview-summary" annotations={annotations} onUpdate={updateField}>
                      <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">OCCUPATION SUMMARY</span>
                      <p className="text-[14px] text-gray-700 leading-[22px] mt-2">
                        <HText highlights={(annotations["overview-summary"] ?? defaultField()).highlights}
                          onHighlight={(t, c, ty) => addHighlight("overview-summary", t, c, ty)}>
                          {occupationDetail.overview.summary}
                        </HText>
                      </p>
                    </ACard>

                    <div className="mt-6">
                      <ACard fieldKey="overview-descriptor" annotations={annotations} onUpdate={updateField}>
                        <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">OCCUPATION DESCRIPTOR</span>
                        <p className="text-[14px] text-gray-700 leading-[22px] mt-2">
                          <HText highlights={(annotations["overview-descriptor"] ?? defaultField()).highlights}
                            onHighlight={(t, c, ty) => addHighlight("overview-descriptor", t, c, ty)}>
                            {occupationDetail.overview.descriptor}
                          </HText>
                        </p>
                      </ACard>
                    </div>
                  </div>

                  {/* Core Tasks */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">CORE TASKS</span>
                    <ul className="flex flex-col gap-4 mt-4">
                      {occupationDetail.overview.coreTasks.map((task, idx) => (
                        <li key={idx}>
                          <ACard fieldKey={`task-${idx}`} annotations={annotations} onUpdate={updateField}>
                            <div className="flex gap-3 text-[13px] text-gray-700 leading-[20px]">
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <HText highlights={(annotations[`task-${idx}`] ?? defaultField()).highlights}
                                onHighlight={(t, c, ty) => addHighlight(`task-${idx}`, t, c, ty)}>
                                {task}
                              </HText>
                            </div>
                          </ACard>
                        </li>
                      ))}
                    </ul>
                    <SectionCommentBlock value={sectionComments["overview-tasks"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, "overview-tasks": v }))} />
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6">
                  {/* Sectors */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <ACard fieldKey="overview-sectors" annotations={annotations} onUpdate={updateField}>
                      <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">SECTORS &amp; SUBSECTORS</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">PRIMARY SECTORS</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {occupationDetail.overview.primarySectors.map((s) => (
                              <span key={s} className="px-2.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[11px] text-[#6b7280]">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">merSETA SUBSECTORS</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {occupationDetail.overview.mersetaSubsectors.map((s) => (
                              <span key={s} className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-[11px] text-blue-700">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ACard>
                  </div>

                  {/* Work Activities */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">WORK ACTIVITIES</span>
                    <div className="flex flex-col gap-6 mt-6">
                      {occupationDetail.overview.workActivities.map((act) => (
                        <ACard key={act.name} fieldKey={`activity-${act.name}`} annotations={annotations} onUpdate={updateField}>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-gray-700">{act.name}</span>
                              <span className="text-black">{act.score}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d3557] rounded-full" style={{ width: `${act.percent}%` }} />
                            </div>
                          </div>
                        </ACard>
                      ))}
                    </div>
                    <SectionCommentBlock value={sectionComments["overview-activities"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, "overview-activities": v }))} />
                  </div>
                </div>

                {/* Full-width section comment for overview */}
                <div className="lg:col-span-2">
                  <SectionCommentBlock value={sectionComments["overview"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, overview: v }))} />
                </div>
              </div>
            )}

            {/* ════════════ SKILLS TAB ════════════ */}
            {activeTab === "skills" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Knowledge Areas */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">KEY KNOWLEDGE AREAS</span>
                    <div className="flex flex-col gap-6 mt-6">
                      {occupationDetail.skillsAndKnowledge.knowledge.map((k) => (
                        <ACard key={k.name} fieldKey={`knowledge-${k.name}`} annotations={annotations} onUpdate={updateField}>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-gray-700">{k.name}</span>
                              <span className="text-black">{k.score}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d3557] rounded-full" style={{ width: `${k.percent}%` }} />
                            </div>
                          </div>
                        </ACard>
                      ))}
                    </div>
                  </div>

                  {/* Hard Skills */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm lg:col-span-2">
                    <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">HARD SKILLS (TECHNICAL)</span>
                    <div className="flex flex-col gap-6 mt-6">
                      {occupationDetail.skillsAndKnowledge.hardSkills.map((h) => (
                        <ACard key={h.name} fieldKey={`hard-${h.name}`} annotations={annotations} onUpdate={updateField}>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-gray-700">{h.name}</span>
                            </div>
                            <p className="text-[12px] text-[#6b7280]">
                              <HText highlights={(annotations[`hard-${h.name}`] ?? defaultField()).highlights}
                                onHighlight={(t, c, ty) => addHighlight(`hard-${h.name}`, t, c, ty)}>
                                {h.desc}
                              </HText>
                            </p>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                              <div className="h-full bg-[#1d3557] rounded-full" style={{ width: `${h.percent}%` }} />
                            </div>
                          </div>
                        </ACard>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                  {/* Attitudes */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm lg:col-span-2">
                    <ACard fieldKey="attitudes" annotations={annotations} onUpdate={updateField}>
                      <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">ATTITUDES &amp; VALUES</span>
                      <div className="flex flex-wrap gap-2.5 mt-6">
                        {occupationDetail.skillsAndKnowledge.attitudes.map((att) => (
                          <span key={att} className="px-3.5 py-2 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-[11px] font-bold text-gray-700 uppercase tracking-wider block">{att}</span>
                        ))}
                      </div>
                    </ACard>
                  </div>

                  {/* Soft Skills */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">SOFT SKILLS</span>
                    <div className="flex flex-col gap-6 mt-6">
                      {occupationDetail.skillsAndKnowledge.softSkills.map((s) => (
                        <ACard key={s.name} fieldKey={`soft-${s.name}`} annotations={annotations} onUpdate={updateField}>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-gray-700">{s.name}</span>
                              <span className="text-black">{s.score}</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d3557] rounded-full" style={{ width: `${s.percent}%` }} />
                            </div>
                          </div>
                        </ACard>
                      ))}
                    </div>
                  </div>
                </div>
                <SectionCommentBlock value={sectionComments["skills"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, skills: v }))} />
              </>
            )}

            {/* ════════════ EDUCATION TAB ════════════ */}
            {activeTab === "education" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-8">
                    {/* Requirements */}
                    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                      <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Academic Pathways &amp; Entry Requirements
                      </h3>
                      <ul className="flex flex-col gap-4">
                        {occupationDetail.education.requirements.map((req, idx) => (
                          <li key={idx}>
                            <ACard fieldKey={`req-${idx}`} annotations={annotations} onUpdate={updateField}>
                              <div className="flex gap-3 text-[13px] text-gray-700 leading-[20px]">
                                <span className="w-6 h-6 rounded-full bg-blue-55 text-[#1d3557] flex items-center justify-center font-bold text-[11px] shrink-0 border border-blue-100">{idx + 1}</span>
                                <HText highlights={(annotations[`req-${idx}`] ?? defaultField()).highlights}
                                  onHighlight={(t, c, ty) => addHighlight(`req-${idx}`, t, c, ty)}>
                                  {req}
                                </HText>
                              </div>
                            </ACard>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                      <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Professional Certifications
                      </h3>
                      <div className="flex flex-col gap-3">
                        {occupationDetail.education.certifications.map((cert) => (
                          <ACard key={cert} fieldKey={`cert-${cert}`} annotations={annotations} onUpdate={updateField}>
                            <span className="px-3.5 py-2 bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-800 rounded-xl uppercase tracking-wider inline-block">{cert}</span>
                          </ACard>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Providers */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Accredited Higher Education Providers
                    </h3>
                    <div className="flex flex-col gap-4">
                      {occupationDetail.education.providers.map((p) => (
                        <ACard key={p.name} fieldKey={`provider-${p.name}`} annotations={annotations} onUpdate={updateField}>
                          <div className="p-4 bg-[#f5f7fa] border border-[#e5e7eb] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-[14px] font-extrabold text-black">{p.name}</h4>
                              <span className="text-[12px] text-[#6b7280]">{p.location}</span>
                            </div>
                            <span className="px-3 py-1 bg-white border border-[#e5e7eb] text-[11px] font-bold text-gray-700 rounded-xl">{p.course}</span>
                          </div>
                        </ACard>
                      ))}
                    </div>
                  </div>
                </div>
                <SectionCommentBlock value={sectionComments["education"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, education: v }))} />
              </>
            )}

            {/* ════════════ LABOUR MARKET TAB ════════════ */}
            {activeTab === "labour-market" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Growth Rate", value: occupationDetail.laborMarket.growthRate, color: "text-green-600", desc: "Projected year-on-year employment growth rate nationally.", key: "lm-growth" },
                    { label: "Unemployment Rate", value: occupationDetail.laborMarket.unemploymentRate, color: "text-black", desc: "Frictional unemployment levels for certified professionals.", key: "lm-unemployment" },
                    { label: "Key Authority Sector", value: "merSETA Scope", color: "text-black", desc: "Core oversight chamber and primary training authority.", key: "lm-authority" },
                  ].map((card) => (
                    <div key={card.key} className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
                      <ACard fieldKey={card.key} annotations={annotations} onUpdate={updateField}>
                        <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">{card.label}</span>
                        <span className={`text-[24px] font-extrabold ${card.color} block mt-1`}>{card.value}</span>
                        <p className="text-[12px] text-[#6b7280] mt-2">{card.desc}</p>
                      </ACard>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Postings trend */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <ACard fieldKey="lm-trend" annotations={annotations} onUpdate={updateField}>
                      <h3 className="text-[15px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6">Hiring Activity Trend</h3>
                      <div className="flex items-end justify-between gap-4 h-[200px] pt-4 px-4 border-b border-l border-gray-200">
                        {occupationDetail.laborMarket.postingsTrend.map((t) => {
                          const pct = (t.count / 1500) * 100;
                          return (
                            <div key={t.year} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                              <span className="text-[11px] font-bold text-[#1d3557] opacity-0 group-hover:opacity-100 transition-opacity duration-200 block mb-1">{t.count}</span>
                              <div className="w-full bg-[#1d3557] hover:bg-[#d4af37] rounded-t-lg transition-all duration-300" style={{ height: `${pct}%` }} />
                              <span className="text-[12px] font-semibold text-gray-500 mt-2">{t.year}</span>
                            </div>
                          );
                        })}
                      </div>
                    </ACard>
                  </div>

                  {/* Regional shares */}
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[15px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6">Geographical Demand Share</h3>
                    <div className="flex flex-col gap-5">
                      {occupationDetail.laborMarket.topCities.map((c) => (
                        <ACard key={c.city} fieldKey={`city-${c.city}`} annotations={annotations} onUpdate={updateField}>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-gray-700">{c.city}</span>
                              <span className="text-black font-bold">{c.share}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#d4af37] rounded-full" style={{ width: c.share }} />
                            </div>
                          </div>
                        </ACard>
                      ))}
                    </div>
                  </div>
                </div>
                <SectionCommentBlock value={sectionComments["labour-market"] ?? ""} onChange={(v) => setSectionComments((p) => ({ ...p, "labour-market": v }))} />
              </>
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
