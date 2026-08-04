"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { skillDetail } from "@/data/skills";
import Breadcrumbs from "./Breadcrumbs";

export default function SkillHeader() {
  const pathname = usePathname();

  const tabs = [
    { label: "Overview", path: `/skills/${skillDetail.id}` },
    { label: "Related Skills", path: `/skills/${skillDetail.id}/related` },
    { label: "Occupations", path: `/skills/${skillDetail.id}/occupations` },
    { label: "Proficiency Framework", path: `/skills/${skillDetail.id}/proficiency` },
    { label: "Skills Analytics", path: `/skills/${skillDetail.id}/analytics` },
    { label: "Skill Status", path: `/skills/${skillDetail.id}/status` },
  ];

  return (
    <div className="bg-white border-b border-[#e5e7eb] pt-24 pb-0">
      <div className="max-w-[1400px] mx-auto px-8">
        <Breadcrumbs items={skillDetail.breadcrumbs} />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-6">
          <div className="max-w-[700px]">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-800 border border-green-200">
                {skillDetail.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                {skillDetail.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                {skillDetail.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-tight">
              {skillDetail.name}
            </h1>

            {/* Description */}
            <p className="mt-3 text-[14px] text-[#6b7280] leading-[22px]">
              {skillDetail.description}
            </p>
          </div>

          {/* Edit Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-auto">
            <Link
              href={`/skills/${skillDetail.id}/annotate`}
              className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-800 border border-yellow-200 text-[13px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all hover:bg-yellow-100 hover:shadow-md"
            >
              <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Annotate
            </Link>
          </div>
        </div>

        {/* Highlight KPI metrics in header block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 py-6 border-t border-[#e5e7eb]">
          <div>
            <span className="text-[20px] font-bold text-black block leading-[25px]">
              {skillDetail.stats.employersHiring}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-0.5">Employers hiring</span>
          </div>
          <div>
            <span className="text-[20px] font-bold text-black block leading-[25px]">
              {skillDetail.stats.demandAlignment}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-0.5">Demand alignment</span>
          </div>
          <div>
            <span className="text-[20px] font-bold text-black block leading-[25px]">
              {skillDetail.stats.jobPostings90d}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-0.5">Job postings (90d)</span>
          </div>
          <div>
            <span className="text-[20px] font-bold text-black block leading-[25px]">
              {skillDetail.stats.timeToProficiency}
            </span>
            <span className="text-[12px] text-[#6b7280] block mt-0.5">Avg. time to proficiency</span>
          </div>
        </div>

        {/* Tabs Bar */}
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
