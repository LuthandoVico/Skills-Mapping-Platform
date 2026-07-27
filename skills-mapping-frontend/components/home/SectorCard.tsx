import Link from "next/link";
import { Sector } from "@/types/sector";

interface SectorCardProps {
  sector: Sector;
}

export default function SectorCard({ sector }: SectorCardProps) {
  return (
    <Link
      href={`/sector/${sector.id}`}
      className="group relative bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-[#1d3557]/10 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Accent top bar */}
      <div className="h-2 w-full bg-[#1d3557] flex-shrink-0" />

      <div className="flex flex-col flex-1 p-6">
        {/* Icon row + Featured badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-[14px] bg-[#f5f7fa] flex items-center justify-center text-[22px] select-none">
            {sector.icon}
          </div>
          {sector.featured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#d4af37] text-[#1d3557] text-[10px] font-semibold uppercase tracking-[0.25px]">
              Featured
            </span>
          )}
        </div>

        {/* Sector name */}
        <h3 className="text-[16px] font-bold text-black leading-[22px] mb-1 group-hover:text-[#1d3557] transition-colors duration-200">
          {sector.name}
        </h3>

        {/* Skill count */}
        <p className="text-[12px] text-[#6b7280] leading-[18px] mb-4">
          {sector.skillCount.toLocaleString()} defined skills
        </p>

        {/* Stats row */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-black leading-[22.5px]">
              {sector.workerCount}
            </span>
            <span className="text-[11px] text-[#6b7280] leading-[16.5px]">
              Workers
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#d4af37] leading-[22.5px]">
              {sector.annualGrowth}
            </span>
            <span className="text-[11px] text-[#6b7280] leading-[16.5px]">
              Annual Growth
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sector.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-[4px] bg-[#f5f7fa] border border-[#e5e7eb] text-[11px] text-[#6b7280] leading-[16.5px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Explore link */}
        <div className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold text-[#1d3557] group-hover:gap-2.5 transition-all duration-200">
          Explore sector
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
