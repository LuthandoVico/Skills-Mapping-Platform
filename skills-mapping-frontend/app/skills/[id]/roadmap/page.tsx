import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";

export default function SkillRoadmapPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Competency Journey &amp; Upskill Roadmap
          </h3>

          <p className="text-[14px] text-[#6b7280] leading-[22px] mb-8">
            Recommended upskill pathways, certifications, and training milestones required to advance from Foundational Awareness (Level 1) to Executive Mastery (Level 5) in {skillDetail.name}.
          </p>

          {/* Timeline journey */}
          <div className="flex flex-col gap-6">
            {skillDetail.proficiencyLevels.map((lvl, idx) => (
              <div key={lvl.level} className="relative flex flex-col md:flex-row gap-6 p-6 border border-[#e5e7eb] rounded-2xl bg-[#f5f7fa] hover:border-[#1d3557]/40 transition-colors duration-200">
                {/* Arrow connector */}
                {idx < skillDetail.proficiencyLevels.length - 1 && (
                  <div className="hidden md:block absolute bottom-[-24px] left-[32px] w-[2px] h-[24px] bg-[#e5e7eb] z-0" />
                )}

                <div className="w-12 h-12 rounded-full bg-[#1d3557] text-white flex items-center justify-center text-[18px] font-extrabold shrink-0 shadow-md">
                  L{lvl.level}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[15px] font-extrabold text-black">{lvl.title}</h4>
                    {lvl.tag && (
                      <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-200 text-[9px] font-bold uppercase tracking-wider">
                        {lvl.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#6b7280] mt-1">{lvl.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 text-[12px]">
                    <div>
                      <span className="text-[#6b7280] font-bold block">Recommended Courses:</span>
                      <span className="text-gray-700 block mt-1">Course {lvl.level}.1: Principles of {lvl.title}</span>
                    </div>
                    <div>
                      <span className="text-[#6b7280] font-bold block">Estimated Time:</span>
                      <span className="text-gray-700 block mt-1">{lvl.level * 3} - {lvl.level * 4} months</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
