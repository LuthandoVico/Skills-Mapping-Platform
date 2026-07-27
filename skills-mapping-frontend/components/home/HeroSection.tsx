"use client";

import Link from "next/link";
import { useState } from "react";

const stats = [
  { value: "5,000+", label: "Defined Skills" },
  { value: "12,000+", label: "Competency Standards" },
  { value: "15", label: "Major Sectors" },
  { value: "98%", label: "Industry Coverage" },
];

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative bg-[#1d3557] overflow-hidden pt-16">
      {/* Ambient glow blobs */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[400px] rounded-full bg-[rgba(29,53,87,0.4)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[300px] rounded-full bg-[#d4af37]/5 blur-[80px] pointer-events-none" />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-8 pt-16 pb-0">
        <div className="max-w-[700px]">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(29,53,87,0.5)] border border-[#d4af37]/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-80 animate-pulse" />
            <span className="text-[#d4af37] text-[11px] font-normal tracking-[0.5px] uppercase">
              v4.2 Editorial Draft — Live Registry
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[48px] font-extrabold leading-[1.1] tracking-[-1.5px] text-white mb-0">
            National Skills
            <br />
            <span className="text-[#d4af37]">Registry</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[16px] font-normal leading-[26px] text-white/60 max-w-[540px]">
            The authoritative taxonomy of occupational competencies,
            sector-aligned skills, and career progression frameworks
            underpinning the national workforce strategy.
          </p>

          {/* Search + CTA */}
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <div className="relative flex-shrink-0">
              {/* Search icon */}
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d3557]/50 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills, occupations, competencies..."
                className="w-[380px] max-w-full h-[45px] pl-11 pr-4 rounded-[14px] bg-white text-[14px] text-gray-800 placeholder-black/40 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 transition-all"
              />
            </div>
            <Link
              href="/sectors"
              className="inline-flex items-center gap-2 h-[45px] px-5 rounded-[14px] bg-[#d4af37] hover:bg-[#e8c84a] text-[#1d3557] text-[14px] font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:-translate-y-0.5"
            >
              Browse All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-10 pb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-[28px] font-extrabold text-white tracking-[-0.7px] leading-[35px]">
                  {stat.value}
                </span>
                <span className="text-[12px] text-white/45 leading-[18px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
