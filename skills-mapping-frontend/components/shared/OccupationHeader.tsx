"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { occupationDetail } from "@/data/occupations";

export default function OccupationHeader() {
  const pathname = usePathname();

  const tabs = [
    { label: "Overview", path: `/occupations/${occupationDetail.id}` },
    { label: "Skills & Knowledge", path: `/occupations/${occupationDetail.id}/skills` },
    { label: "Education & Pathways", path: `/occupations/${occupationDetail.id}/education` },
    { label: "Labor Market", path: `/occupations/${occupationDetail.id}/labour-market` },
  ];

  return (
    <div className="bg-white border-b border-[#e5e7eb] pt-24 pb-0">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Breadcrumb / Top meta bar */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">
              {occupationDetail.ofoCode}
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200">
              {occupationDetail.iscoCode}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-[#1d3557]">{occupationDetail.pathway}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold">
            HIGH CONSENSUS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-2">
          <div className="max-w-[700px]">
            {/* Title */}
            <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-none">
              {occupationDetail.title}
            </h1>

            {/* Difficulty status */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                RECRUITMENT DIFFICULTY
              </span>
              <div className="flex items-center gap-2">
                <div className="w-[120px] h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${occupationDetail.difficultyPercent}%` }}
                  />
                </div>
                <span className="text-[13px] font-bold text-red-600">{occupationDetail.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Edit mode / Review Mode badge */}
          <div className="flex-shrink-0 self-start md:self-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-800 border border-yellow-200 text-[12px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all hover:bg-yellow-100">
              <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Review Mode
            </button>
          </div>
        </div>

        {/* 4 KPI Cards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 py-6 border-t border-[#e5e7eb]">
          <div className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb]">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase block">AVG. SALARY</span>
            <span className="text-[22px] font-extrabold text-black block mt-1 tracking-tight">
              {occupationDetail.kpis.salary}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-1">{occupationDetail.kpis.salarySubtext}</span>
          </div>

          <div className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb]">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase block">DEMAND STATUS</span>
            <span className="text-[22px] font-extrabold text-black block mt-1 tracking-tight">
              {occupationDetail.kpis.demandStatus}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-1">{occupationDetail.kpis.demandSubtext}</span>
          </div>

          <div className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb]">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase block">JOB POSTINGS</span>
            <span className="text-[22px] font-extrabold text-black block mt-1 tracking-tight">
              {occupationDetail.kpis.postings}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-1">{occupationDetail.kpis.postingsSubtext}</span>
          </div>

          <div className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb]">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase block">AI IMPACT</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[22px] font-extrabold text-black tracking-tight block">
                {occupationDetail.kpis.aiImpact}
              </span>
            </div>
            <span className="text-[12px] text-[#6b7280] block mt-1">
              {occupationDetail.kpis.aiImpactSubtext}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto border-t border-[#e5e7eb] -mx-8 px-8 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`py-4 px-4 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-[#1d3557] text-[#1d3557] font-bold"
                    : "border-transparent text-[#6b7280] hover:text-black hover:border-gray-300"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
