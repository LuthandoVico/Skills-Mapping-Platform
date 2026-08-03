"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";
import Link from "next/link";

// Custom SVG Components for the Icons
const WeldingIcon = () => (
  <div className="relative w-5 h-5 shrink-0 select-none">
    {/* Welding torch body */}
    <div className="absolute" style={{ bottom: "25%", left: "20.83%", right: "20.83%", top: "8.33%" }}>
      <svg className="w-full h-full" viewBox="0 0 11.6667 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83333 0C2.60833 0 0 2.60833 0 5.83333C0 7.81667 0.991667 9.55833 2.5 10.6167V12.5C2.5 12.9583 2.875 13.3333 3.33333 13.3333H8.33333C8.79167 13.3333 9.16667 12.9583 9.16667 12.5V10.6167C10.675 9.55833 11.6667 7.81667 11.6667 5.83333C11.6667 2.60833 9.05833 0 5.83333 0Z" fill="#D4AF37" fillOpacity="0.9"/>
      </svg>
    </div>
    {/* Torch base */}
    <div className="absolute" style={{ bottom: "16.67%", left: "37.5%", right: "37.5%", top: "75%" }}>
      <svg className="w-full h-full" viewBox="0 0 5 1.66667" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16667 0H0.833333C0.373096 0 0 0.373096 0 0.833333C0 1.29357 0.373096 1.66667 0.833333 1.66667H4.16667C4.6269 1.66667 5 1.29357 5 0.833333C5 0.373096 4.6269 0 4.16667 0Z" fill="#D4AF37" fillOpacity="0.7"/>
      </svg>
    </div>
    {/* Torch tip */}
    <div className="absolute" style={{ bottom: "10.42%", left: "41.67%", right: "41.67%", top: "83.33%" }}>
      <svg className="w-full h-full" viewBox="0 0 3.33333 1.25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.70833 0H0.625C0.279822 0 0 0.279822 0 0.625C0 0.970178 0.279822 1.25 0.625 1.25H2.70833C3.05351 1.25 3.33333 0.970178 3.33333 0.625C3.33333 0.279822 3.05351 0 2.70833 0Z" fill="#D4AF37" fillOpacity="0.5"/>
      </svg>
    </div>
  </div>
);

const HydraulicsIcon = () => (
  <div className="relative w-5 h-5 shrink-0 select-none">
    {/* Top left circle */}
    <div className="absolute" style={{ top: "12.5%", left: "12.5%", right: "58.33%", bottom: "58.33%" }}>
      <svg className="w-full h-full" viewBox="0 0 5.83333 5.83333" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83333 2.91667C5.83333 4.525 4.525 5.83333 2.91667 5.83333C1.30833 5.83333 0 4.525 0 2.91667C0 1.30833 1.30833 0 2.91667 0C4.525 0 5.83333 1.30833 5.83333 2.91667Z" fill="#D4AF37" fillOpacity="0.9"/>
      </svg>
    </div>
    {/* Bottom right circle */}
    <div className="absolute" style={{ top: "58.33%", left: "58.33%", right: "12.5%", bottom: "12.5%" }}>
      <svg className="w-full h-full" viewBox="0 0 5.83333 5.83333" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2.91667C0 1.30833 1.30833 0 2.91667 0C4.525 0 5.83333 1.30833 5.83333 2.91667C5.83333 4.525 4.525 5.83333 2.91667 5.83333C1.30833 5.83333 0 4.525 0 2.91667Z" fill="#D4AF37" fillOpacity="0.9"/>
      </svg>
    </div>
    {/* Bottom left circle */}
    <div className="absolute" style={{ top: "58.33%", left: "12.5%", right: "58.33%", bottom: "12.5%" }}>
      <svg className="w-full h-full" viewBox="0 0 5.83333 5.83333" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2.91667C0 1.30833 1.30833 0 2.91667 0C4.525 0 5.83333 1.30833 5.83333 2.91667C5.83333 4.525 4.525 5.83333 2.91667 5.83333C1.30833 5.83333 0 4.525 0 2.91667Z" fill="#1D3557" fillOpacity="0.5"/>
      </svg>
    </div>
    {/* Top right circle */}
    <div className="absolute" style={{ top: "12.5%", left: "58.33%", right: "12.5%", bottom: "58.33%" }}>
      <svg className="w-full h-full" viewBox="0 0 5.83333 5.83333" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83333 2.91667C5.83333 4.525 4.525 5.83333 2.91667 5.83333C1.30833 5.83333 0 4.525 0 2.91667C0 1.30833 1.30833 0 2.91667 0C4.525 0 5.83333 1.30833 5.83333 2.91667Z" fill="#1D3557" fillOpacity="0.5"/>
      </svg>
    </div>
  </div>
);

const CADIcon = () => (
  <div className="relative w-5 h-5 shrink-0 select-none">
    {/* Top left dot */}
    <div className="absolute" style={{ bottom: "58.33%", left: "25%", right: "50%", top: "16.67%" }}>
      <svg className="w-full h-full" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" fill="#D4AF37" fillOpacity="0.9"/>
      </svg>
    </div>
    {/* Top right dot */}
    <div className="absolute" style={{ bottom: "58.33%", left: "50%", right: "25%", top: "16.67%" }}>
      <svg className="w-full h-full" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z" fill="#1D3557" fillOpacity="0.7"/>
      </svg>
    </div>
    {/* Arch path */}
    <div className="absolute" style={{ top: "54.17%", left: "12.5%", right: "12.5%", bottom: "20.83%" }}>
      <div className="absolute" style={{ inset: "-12.5% -4.17%" }}>
        <svg className="w-full h-full" viewBox="0 0 16.25 6.25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.625 5.625C0.625 2.86667 2.86667 0.625 5.625 0.625H10.625C13.3833 0.625 15.625 2.86667 15.625 5.625" stroke="#D4AF37" strokeWidth="1.25" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  </div>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 10.6667V8" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 5.33333H8.00667" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function RelatedSkillsPage() {
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] w-full items-start">
          
          {/* Column 1: Skill Overlap & Interconnectivity */}
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24.8px] flex flex-col items-start shadow-sm w-full h-[367.9px] transition-shadow duration-300">
            <div className="flex justify-between items-start w-full">
              <div>
                <h3 className="font-bold text-[#1d3557] text-[16px] leading-[24px]">
                  Skill Overlap &amp; Interconnectivity
                </h3>
                <p className="font-normal text-[#1d3557]/70 text-[12px] leading-[18px] mt-[4px]">
                  Mapping shared competencies across the metals manufacturing domain.
                </p>
              </div>
              <div className="mt-[4px] shrink-0">
                <InfoIcon />
              </div>
            </div>

            {/* Diagram Area */}
            <div className="w-full flex items-center justify-center py-[20px] pb-[16px] h-[236px] my-auto">
              <div className="h-[217px] relative w-[303px] select-none">
                
                {/* CNC Machining Circle */}
                <div
                  className={`absolute transition-all duration-300 ease-in-out cursor-pointer origin-center ${
                    hoveredSkillId === "cnc-machining-programming" ? "scale-[1.06] z-20 filter drop-shadow-md" : "scale-100 z-10"
                  }`}
                  style={{
                    top: "7.5%",
                    right: "26.79%",
                    bottom: "27.5%",
                    left: "26.79%",
                  }}
                  onMouseEnter={() => setHoveredSkillId("cnc-machining-programming")}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <svg width="100%" height="100%" viewBox="0 0 140.679 141.05" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70.3393 141.05C109.187 141.05 140.679 109.475 140.679 70.525C140.679 31.5751 109.187 0 70.3393 0C31.492 0 0 31.5751 0 70.525C0 109.475 31.492 141.05 70.3393 141.05Z" fill="#1D3557" fillOpacity={hoveredSkillId === "cnc-machining-programming" ? "0.9" : "0.8"}/>
                  </svg>
                </div>

                {/* Welding Technology Circle */}
                <div
                  className={`absolute transition-all duration-300 ease-in-out cursor-pointer origin-center ${
                    hoveredSkillId === "welding-technology" ? "scale-[1.06] z-20 filter drop-shadow-md" : "scale-100 z-0"
                  }`}
                  style={{
                    top: "46%",
                    right: "47.86%",
                    bottom: "-2%",
                    left: "12.14%",
                  }}
                  onMouseEnter={() => setHoveredSkillId("welding-technology")}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <svg width="100%" height="100%" viewBox="0 0 121.2 121.52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60.6 121.52C94.0685 121.52 121.2 94.3168 121.2 60.76C121.2 27.2032 94.0685 0 60.6 0C27.1315 0 0 27.2032 0 60.76C0 94.3168 27.1315 121.52 60.6 121.52Z" fill="#D4AF37" fillOpacity={hoveredSkillId === "welding-technology" ? "0.85" : "0.75"}/>
                  </svg>
                </div>

                {/* Technical Drawing & CAD Circle */}
                <div
                  className={`absolute transition-all duration-300 ease-in-out cursor-pointer origin-center ${
                    hoveredSkillId === "technical-drawing-cad" ? "scale-[1.06] z-20 filter drop-shadow-md" : "scale-100 z-0"
                  }`}
                  style={{
                    top: "46%",
                    right: "12.14%",
                    bottom: "-2%",
                    left: "47.86%",
                  }}
                  onMouseEnter={() => setHoveredSkillId("technical-drawing-cad")}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <svg width="100%" height="100%" viewBox="0 0 121.2 121.52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60.6 121.52C94.0685 121.52 121.2 94.3168 121.2 60.76C121.2 27.2032 94.0685 0 60.6 0C27.1315 0 0 27.2032 0 60.76C0 94.3168 27.1315 121.52 60.6 121.52Z" fill="#1D3557" fillOpacity={hoveredSkillId === "technical-drawing-cad" ? "0.65" : "0.55"}/>
                  </svg>
                </div>

                {/* CNC Machining text */}
                <div
                  className={`absolute flex flex-col justify-center items-center pointer-events-none transition-all duration-300 ${
                    hoveredSkillId === "cnc-machining-programming" ? "scale-[1.06] z-30" : "scale-100 z-10"
                  }`}
                  style={{
                    top: "32.25%",
                    left: "26.79%",
                    right: "26.79%",
                    bottom: "62.75%",
                  }}
                >
                  <p className="font-bold text-[7.5px] text-white leading-tight uppercase text-center tracking-wider">
                    CNC Machining
                  </p>
                </div>
                <div
                  className={`absolute flex flex-col justify-center items-center pointer-events-none transition-all duration-300 ${
                    hoveredSkillId === "cnc-machining-programming" ? "scale-[1.06] z-30" : "scale-100 z-10"
                  }`}
                  style={{
                    top: "38.25%",
                    left: "26.79%",
                    right: "26.79%",
                    bottom: "56.75%",
                  }}
                >
                  <p className="font-bold text-[7.5px] text-white leading-tight uppercase text-center tracking-wider">
                    & Programming
                  </p>
                </div>

                {/* Welding Technology text */}
                <div
                  className={`absolute flex items-center justify-center pointer-events-none transition-all duration-300 ${
                    hoveredSkillId === "welding-technology" ? "scale-[1.06] z-30 font-extrabold" : "scale-100 z-10"
                  }`}
                  style={{
                    top: "76.04%",
                    left: "12.14%",
                    right: "47.86%",
                    bottom: "13.82%",
                  }}
                >
                  <p className="font-bold text-[8px] text-white leading-tight uppercase text-center tracking-wider">
                    Welding Technology
                  </p>
                </div>

                {/* Technical Drawing & CAD text */}
                <div
                  className={`absolute flex items-center justify-center pointer-events-none transition-all duration-300 ${
                    hoveredSkillId === "technical-drawing-cad" ? "scale-[1.06] z-30 font-extrabold" : "scale-100 z-10"
                  }`}
                  style={{
                    top: "76%",
                    left: "47.86%",
                    right: "12.14%",
                    bottom: "19%",
                  }}
                >
                  <p className="font-bold text-[7px] text-white leading-tight uppercase text-center tracking-wider">
                    Technical Drawing
                  </p>
                </div>

              </div>
            </div>

            {/* Legend */}
            <div className="w-full flex gap-[20px] items-center justify-center pt-[4px] mt-auto">
              <div className="flex gap-[6px] items-center">
                <div className="bg-[#1d3557] rounded-full w-[10px] h-[10px]" />
                <span className="font-normal text-[#6b7280] text-[11px] leading-[16.5px]">
                  Core Overlap
                </span>
              </div>
              <div className="flex gap-[6px] items-center">
                <div className="bg-[#d4af37] rounded-full w-[10px] h-[10px]" />
                <span className="font-normal text-[#6b7280] text-[11px] leading-[16.5px]">
                  Complementary
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Related Skills Mapping */}
          <div className="flex flex-col gap-[16px] w-full">
            <div className="h-[19.5px]">
              <p className="font-semibold leading-[19.5px] text-[#6b7280] text-[13px] tracking-[0.65px] uppercase whitespace-nowrap">
                Related Skills Mapping
              </p>
            </div>

            {/* Skill cards list */}
            {skillDetail.relatedSkills.map((skill) => {
              let IconComponent = WeldingIcon;
              if (skill.id === "hydraulic-systems") {
                IconComponent = HydraulicsIcon;
              } else if (skill.id === "technical-drawing-cad") {
                IconComponent = CADIcon;
              }

              const isHighlighted = hoveredSkillId === skill.id;

              return (
                <div
                  key={skill.id}
                  className={`bg-white border rounded-[14px] w-full p-[16.8px] relative flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 origin-left cursor-pointer ${
                    isHighlighted
                      ? "border-[#d4af37] bg-yellow-50/10 shadow-md scale-[1.02]"
                      : "border-[#e5e7eb] hover:border-[#1d3557]/40 shadow-sm"
                  }`}
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <div className="flex gap-[12px] items-start">
                    <div className="mt-[2px] shrink-0">
                      <IconComponent />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1d3557] text-[14px] leading-[21px]">
                        {skill.name}
                      </h4>
                      <p className="font-normal text-[#1d3557]/80 text-[12px] leading-[18px] mt-[4px]">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[8px] items-center shrink-0 self-end md:self-auto">
                    <span className="font-['Manrope',sans-serif] font-bold text-[#74777f] text-[11px] leading-[16.5px]">
                      Similarity:
                    </span>
                    <div className="bg-[#e5e8ed] h-[6px] rounded-full w-[80px] overflow-hidden">
                      <div
                        className="bg-[#d4af37] h-full rounded-full transition-all duration-500"
                        style={{ width: skill.similarity }}
                      />
                    </div>
                    <span className="font-['Manrope',sans-serif] font-bold text-[#1a365d] text-[11px] leading-[16.5px]">
                      {skill.similarity}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Browse More Skills Button */}
            <div className="pt-[8px] w-full">
              <button className="bg-white border border-[#e5e7eb] flex items-center justify-center h-[46.6px] px-[16px] py-[12.8px] rounded-[14px] w-full font-semibold text-[#1d3557] text-[14px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                Browse More Skills
              </button>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
