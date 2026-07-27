import Link from "next/link";
import SectorCard from "./SectorCard";
import { sectors } from "@/data/sectors";

export default function SectorsBrowse() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-12">
      {/* Section header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-black tracking-[-0.55px] leading-[33px]">
            Sector Taxonomy
          </h2>
          <p className="text-[13px] text-[#6b7280] leading-[19.5px] mt-1">
            Select a sector to explore its skills, occupations, and competency
            standards
          </p>
        </div>
        <Link
          href="/sectors"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1d3557] hover:text-[#2a4a73] transition-colors duration-200 whitespace-nowrap"
        >
          View all sectors
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
        </Link>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sectors.map((sector) => (
          <SectorCard key={sector.id} sector={sector} />
        ))}
      </div>
    </section>
  );
}
