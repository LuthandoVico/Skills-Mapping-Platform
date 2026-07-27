import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";

export default function SkillOverviewPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left panel: Definition & Attributes */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Skill Definition */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Skill Definition
              </h3>
              <p className="text-[14px] text-gray-700 leading-[22px] mt-4">
                {skillDetail.overview.definition}
              </p>
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
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">OFO Category</span>
                  <span className="text-[14px] font-semibold text-black mt-1 block">{skillDetail.overview.keyAttributes.ofoCategory}</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">Skill Type</span>
                  <span className="text-[14px] font-semibold text-black mt-1 block">{skillDetail.overview.keyAttributes.skillType}</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">merSETA Alignment</span>
                  <span className="text-[14px] font-semibold text-black mt-1 block">{skillDetail.overview.keyAttributes.expertPanel}</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">NQF Level</span>
                  <span className="text-[14px] font-semibold text-black mt-1 block">{skillDetail.overview.keyAttributes.nqfLevel}</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">Last Reviewed</span>
                  <span className="text-[14px] font-semibold text-black mt-1 block">{skillDetail.overview.keyAttributes.lastReviewed}</span>
                </div>
                <div>
                  <span className="text-[12px] text-[#6b7280] uppercase font-bold tracking-wider block">Expert Panel</span>
                  <span className="text-[14px] font-semibold text-[#1d3557] mt-1 block">{skillDetail.overview.keyAttributes.expertPanel}</span>
                </div>
              </div>
            </div>

            {/* Sector-specific Definitions */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                <h3 className="text-[16px] font-bold text-black flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Sector-specific Definitions
                </h3>
                <span className="text-[12px] font-bold text-[#6b7280] bg-gray-100 px-2.5 py-0.5 rounded-full">
                  6 subsectors
                </span>
              </div>
              <div className="divide-y divide-[#e5e7eb] mt-4">
                {skillDetail.overview.subsectorDefinitions.map((def) => (
                  <details key={def.name} className="group py-3 focus:outline-none">
                    <summary className="flex items-center justify-between font-semibold text-[14px] text-gray-700 cursor-pointer list-none">
                      <span>{def.name}</span>
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-[13px] text-gray-500 mt-2 leading-[20px]">
                      Detailed competency definition mapping of {skillDetail.name} specifically customized for the requirements of the {def.name} subsector within the national framework guidelines.
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Demand Signal */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
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
                  <span className="text-[20px] font-bold text-black block leading-none">
                    {skillDetail.overview.demandSignal.signals}
                  </span>
                  <span className="text-[11px] text-[#6b7280] block mt-1">Skill signals</span>
                </div>
                <div>
                  <span className="text-[20px] font-bold text-green-600 block leading-none">
                    {skillDetail.overview.demandSignal.yoyGrowth}
                  </span>
                  <span className="text-[11px] text-[#6b7280] block mt-1">YoY growth</span>
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
