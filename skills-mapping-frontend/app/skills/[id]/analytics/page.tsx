"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";

interface TooltipState {
  chartId: string;
  label: string;
  value: string;
  x: number;
  y: number;
}

export default function SkillAnalyticsPage() {
  const [hoveredBar, setHoveredBar] = useState<{ chartId: string; index: number } | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Chart 1: Top 5 merSETA Industries
  const topIndustries = [
    { name: "Automotive Mfg", value: 68 },
    { name: "Metal Industry", value: 54 },
    { name: "Motor Retail", value: 45 },
    { name: "Components Mfg", value: 38 },
    { name: "Plastics Mfg", value: 30 },
  ];

  // Chart 2: Industry Demand Trend
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

  // Chart 3: Demand by Province
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

  // Chart 4: Job Advertisement Frequency (2024)
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

  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full bg-[#f5f7fa]">
        <div className="bg-white border border-[#e5e8ed] rounded-[16px] p-6 lg:p-10 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] w-full">
          {/* Header Description */}
          <div className="mb-8">
            <h2 className="text-[18px] font-bold text-[#1a365d] leading-[24px] font-sans">
              Skills Analytics
            </h2>
            <p className="text-[14px] text-[#74777f] mt-1 leading-[21px] font-sans">
              South African and merSETA-specific labour market analytics for Strategic Leadership
            </p>
          </div>

          {/* Grid Layout of Charts */}
          <div className="flex flex-col gap-6">
            {/* Top Row: Chart 1 & Chart 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Card 1: Top 5 merSETA Industries */}
              <div className="border border-[#e5e8ed] rounded-[12px] overflow-hidden bg-white shadow-sm flex flex-col h-[350px]">
                <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3.5">
                  <h3 className="font-sans font-bold text-[14px] text-[#1a365d] leading-[21px]">
                    Top 5 merSETA Industries
                  </h3>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between relative">
                  {/* Grid Lines Area */}
                  <div className="absolute inset-x-5 top-5 bottom-12 flex justify-between pointer-events-none z-0 pl-[110px]">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <div key={tick} className="h-full flex flex-col items-center relative">
                        <div className="border-l border-dashed border-[#e5e8ed] h-full" />
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Bars */}
                  <div className="flex-grow flex flex-col justify-around z-10 relative">
                    {topIndustries.map((ind, idx) => {
                      const isHovered = hoveredBar?.chartId === "industries" && hoveredBar.index === idx;
                      return (
                        <div
                          key={ind.name}
                          className="flex items-center gap-3 w-full group cursor-pointer"
                          onMouseEnter={() => setHoveredBar({ chartId: "industries", index: idx })}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          <div className="w-[100px] text-right text-[11px] font-bold text-[#1a365d] font-sans truncate">
                            {ind.name}
                          </div>
                          <div className="flex-grow h-7 relative bg-gray-50 rounded-r-md overflow-hidden">
                            <div
                              className={`h-full rounded-r-md transition-all duration-300 ${isHovered ? "bg-[#d4af37]" : "bg-[#1a365d]"
                                }`}
                              style={{ width: `${ind.value}%` }}
                            />
                            {/* Inner percentage text on hover */}
                            {isHovered && (
                              <span className="absolute left-2 top-1.5 text-[9px] font-extrabold text-white">
                                {ind.value}%
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* X-Axis ticks */}
                  <div className="flex justify-between text-[10px] text-[#74777f] font-sans mt-3 pl-[110px] z-10 relative">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Industry Demand Trend */}
              <div className="border border-[#e5e8ed] rounded-[12px] overflow-hidden bg-white shadow-sm flex flex-col h-[350px]">
                <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3.5">
                  <h3 className="font-sans font-bold text-[14px] text-[#1a365d] leading-[21px]">
                    Industry Demand Trend — Historical vs Projected
                  </h3>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between relative">
                  {/* SVG Chart Container */}
                  <div className="w-full flex-grow relative min-h-[180px] mt-2">
                    <svg viewBox="0 0 440 180" className="w-full h-full overflow-visible">
                      {/* Grid Lines */}
                      {[50, 65, 80, 100].map((v) => {
                        const y = 160 - ((v - 50) / 50) * 140;
                        return (
                          <g key={v}>
                            <line
                              x1="35"
                              y1={y}
                              x2="415"
                              y2={y}
                              stroke="#e5e8ed"
                              strokeWidth="1"
                              strokeDasharray="3 3"
                            />
                            <text
                              x="25"
                              y={y + 4}
                              textAnchor="end"
                              className="text-[10px] fill-[#74777f] font-sans"
                            >
                              {v}%
                            </text>
                          </g>
                        );
                      })}

                      {/* Historical Line Path */}
                      <path
                        d="M 50 146 L 102 126.4 L 154 104 L 206 70.4 L 258 48"
                        fill="none"
                        stroke="#1a365d"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Projected Line Path */}
                      <path
                        d="M 258 48 L 310 39.6 L 362 34 L 414 25.6"
                        fill="none"
                        stroke="#d4af37"
                        strokeWidth="3.5"
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Historical Nodes */}
                      {historicalTrend.map((t, idx) => {
                        const x = 50 + idx * 52;
                        const y = 160 - ((t.value - 50) / 50) * 140;
                        return (
                          <g key={t.year}>
                            {/* Hover trigger zone */}
                            <circle
                              cx={x}
                              cy={y}
                              r="12"
                              className="fill-transparent cursor-pointer"
                              onMouseEnter={(e) =>
                                setTooltip({
                                  chartId: "trend",
                                  label: `${t.year} (Historical)`,
                                  value: `${t.value}%`,
                                  x: x,
                                  y: y - 10,
                                })
                              }
                              onMouseLeave={() => setTooltip(null)}
                            />
                            {/* Standard dot */}
                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              className="fill-[#1a365d] stroke-white stroke-2 pointer-events-none"
                            />
                          </g>
                        );
                      })}

                      {/* Projected Nodes */}
                      {projectedTrend.map((t, idx) => {
                        // idx starts from 0 for 2024, but 2024 is at index 4 (x = 258)
                        const x = 258 + idx * 52;
                        const y = 160 - ((t.value - 50) / 50) * 140;
                        return (
                          <g key={t.year}>
                            {/* Hover trigger zone */}
                            <circle
                              cx={x}
                              cy={y}
                              r="12"
                              className="fill-transparent cursor-pointer"
                              onMouseEnter={(e) =>
                                setTooltip({
                                  chartId: "trend",
                                  label: `${t.year} (Projected)`,
                                  value: `${t.value}%`,
                                  x: x,
                                  y: y - 10,
                                })
                              }
                              onMouseLeave={() => setTooltip(null)}
                            />
                            {/* Standard dot */}
                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              className="fill-[#d4af37] stroke-white stroke-2 pointer-events-none"
                            />
                          </g>
                        );
                      })}

                      {/* X-axis Years */}
                      {trendYears.map((year, idx) => {
                        const x = 50 + idx * 52;
                        return (
                          <text
                            key={year}
                            x={x}
                            y="175"
                            textAnchor="middle"
                            className="text-[10px] fill-[#74777f] font-sans"
                          >
                            {year}
                          </text>
                        );
                      })}

                      {/* Tooltip Render inside SVG */}
                      {tooltip && tooltip.chartId === "trend" && (
                        <g>
                          <rect
                            x={tooltip.x - 60}
                            y={tooltip.y - 35}
                            width="120"
                            height="30"
                            rx="4"
                            className="fill-[#1a365d] filter drop-shadow-[0px_4px_6px_rgba(0,0,0,0.15)]"
                          />
                          <text
                            x={tooltip.x}
                            y={tooltip.y - 23}
                            textAnchor="middle"
                            className="text-[8px] fill-[#94a3b8] font-bold font-sans"
                          >
                            {tooltip.label}
                          </text>
                          <text
                            x={tooltip.x}
                            y={tooltip.y - 12}
                            textAnchor="middle"
                            className="text-[10px] fill-white font-extrabold font-sans"
                          >
                            {tooltip.value}
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Legends */}
                  <div className="flex items-center justify-center gap-6 text-[12px] text-[#1a365d] font-sans mt-3 border-t border-[#f5f7fa] pt-3">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-1 bg-[#1a365d] rounded-full inline-block" />
                      <span className="font-semibold">Historical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-1 border-t-2 border-dashed border-[#d4af37] inline-block" />
                      <span className="font-semibold">Projected</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Chart 3 & Chart 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Card 3: Demand by Province */}
              <div className="border border-[#e5e8ed] rounded-[12px] overflow-hidden bg-white shadow-sm flex flex-col h-[350px]">
                <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3.5">
                  <h3 className="font-sans font-bold text-[14px] text-[#1a365d] leading-[21px]">
                    Demand by Province
                  </h3>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between relative overflow-y-auto">
                  {/* Grid Lines Area */}
                  <div className="absolute inset-x-4 top-4 bottom-10 flex justify-between pointer-events-none z-0 pl-[110px]">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <div key={tick} className="h-full flex flex-col items-center relative">
                        <div className="border-l border-dashed border-[#e5e8ed] h-full" />
                      </div>
                    ))}
                  </div>

                  {/* Province Bars */}
                  <div className="flex-grow flex flex-col justify-between py-1 gap-1 z-10 relative">
                    {provinces.map((prov, idx) => {
                      const isHovered = hoveredBar?.chartId === "provinces" && hoveredBar.index === idx;
                      return (
                        <div
                          key={prov.name}
                          className="flex items-center gap-3 w-full group cursor-pointer"
                          onMouseEnter={() => setHoveredBar({ chartId: "provinces", index: idx })}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          <div className="w-[100px] text-right text-[10px] font-bold text-[#1a365d] font-sans truncate">
                            {prov.name}
                          </div>
                          <div className="flex-grow h-4.5 relative bg-gray-55 rounded-r-sm overflow-hidden">
                            <div
                              className={`h-full rounded-r-sm transition-all duration-300 ${isHovered ? "bg-[#d4af37]" : "bg-[#1a365d]"
                                }`}
                              style={{ width: `${prov.value}%` }}
                            />
                            {isHovered && (
                              <span className="absolute left-1.5 top-0.5 text-[8px] font-black text-white">
                                {prov.value}%
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* X-Axis Ticks */}
                  <div className="flex justify-between text-[9px] text-[#74777f] font-sans mt-2 pl-[110px] z-10 relative border-t border-[#f5f7fa] pt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Job Advertisement Frequency (2024) */}
              <div className="border border-[#e5e8ed] rounded-[12px] overflow-hidden bg-white shadow-sm flex flex-col h-[350px]">
                <div className="bg-[#f1f4f9] border-b border-[#e5e8ed] px-5 py-3.5">
                  <h3 className="font-sans font-bold text-[14px] text-[#1a365d] leading-[21px]">
                    Job Advertisement Frequency (2024)
                  </h3>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between relative">
                  {/* SVG Chart Container */}
                  <div className="w-full flex-grow relative min-h-[200px]">
                    <svg viewBox="0 0 440 180" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1a365d" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#1a365d" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      {[0, 500, 1000, 1500, 2000].map((v) => {
                        const y = 160 - (v / 2000) * 140;
                        return (
                          <g key={v}>
                            <line
                              x1="35"
                              y1={y}
                              x2="425"
                              y2={y}
                              stroke="#e5e8ed"
                              strokeWidth="1"
                              strokeDasharray="3 3"
                            />
                            <text
                              x="25"
                              y={y + 4}
                              textAnchor="end"
                              className="text-[10px] fill-[#74777f] font-sans"
                            >
                              {v}
                            </text>
                          </g>
                        );
                      })}

                      {/* Area Fill */}
                      <path
                        d="M 35 124 L 70.5 113.5 L 106 103 L 141.5 89 L 177 68 L 212.5 78.5 L 248 96 L 283.5 106.5 L 319 85.5 L 354.5 75 L 390 92.5 L 425 117 L 425 160 L 35 160 Z"
                        fill="url(#areaGradient)"
                      />

                      {/* Line Path */}
                      <path
                        d="M 35 124 L 70.5 113.5 L 106 103 L 141.5 89 L 177 68 L 212.5 78.5 L 248 96 L 283.5 106.5 L 319 85.5 L 354.5 75 L 390 92.5 L 425 117"
                        fill="none"
                        stroke="#1a365d"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Monthly Node Dots & Interactive hover */}
                      {monthlyAds.map((m, idx) => {
                        const x = 35 + idx * 35.45;
                        const y = 160 - (m.count / 2000) * 140;
                        return (
                          <g key={m.month}>
                            {/* Hover trigger zone */}
                            <circle
                              cx={x}
                              cy={y}
                              r="10"
                              className="fill-transparent cursor-pointer"
                              onMouseEnter={() =>
                                setTooltip({
                                  chartId: "ads",
                                  label: `${m.month} 2024`,
                                  value: `${m.count} postings`,
                                  x: x,
                                  y: y - 10,
                                })
                              }
                              onMouseLeave={() => setTooltip(null)}
                            />
                            {/* Highlighted node dot on hover */}
                            <circle
                              cx={x}
                              cy={y}
                              r="4.5"
                              className="fill-white stroke-[#1a365d] stroke-2 pointer-events-none transition-transform duration-200"
                            />
                          </g>
                        );
                      })}

                      {/* X-axis months */}
                      {monthlyAds.map((m, idx) => {
                        const x = 35 + idx * 35.45;
                        return (
                          <text
                            key={m.month}
                            x={x}
                            y="173"
                            textAnchor="middle"
                            className="text-[9px] fill-[#74777f] font-sans font-semibold"
                          >
                            {m.month}
                          </text>
                        );
                      })}

                      {/* Tooltip render */}
                      {tooltip && tooltip.chartId === "ads" && (
                        <g>
                          <rect
                            x={tooltip.x - 50}
                            y={tooltip.y - 35}
                            width="100"
                            height="30"
                            rx="4"
                            className="fill-[#1a365d] filter drop-shadow-[0px_4px_6px_rgba(0,0,0,0.15)]"
                          />
                          <text
                            x={tooltip.x}
                            y={tooltip.y - 23}
                            textAnchor="middle"
                            className="text-[8px] fill-[#94a3b8] font-bold font-sans"
                          >
                            {tooltip.label}
                          </text>
                          <text
                            x={tooltip.x}
                            y={tooltip.y - 12}
                            textAnchor="middle"
                            className="text-[10px] fill-white font-extrabold font-sans"
                          >
                            {tooltip.value}
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

