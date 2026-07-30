import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";
import Link from "next/link";

export default async function SkillProficiencyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4 flex-wrap gap-4">
            <div>
              <h3 className="text-[16px] font-bold text-black flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Proficiency Framework
              </h3>
              <p className="text-[12px] text-[#6b7280] mt-1">Institutional grading scale (Level 1 to Level 5)</p>
            </div>
            <Link
              href="/competency-journey"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 border border-blue-200 text-[13px] font-bold rounded-xl shadow-sm hover:bg-blue-100 transition-colors"
            >
              <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Upskill Roadmap
            </Link>
          </div>

          {/* Framework Levels list */}
          <div className="flex flex-col gap-4 mt-6">
            {skillDetail.proficiencyLevels.map((prof) => (
              <div key={prof.level} className="flex gap-6 p-5 bg-[#f5f7fa] border border-[#e5e7eb] rounded-2xl">
                {/* Level badge circle */}
                <div className="w-10 h-10 rounded-full bg-[#1d3557] flex items-center justify-center text-white font-extrabold text-[16px] shrink-0">
                  {prof.level}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[15px] font-bold text-black">{prof.title}</h4>
                    {prof.tag && (
                      <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-200 text-[9px] font-bold uppercase tracking-wider">
                        {prof.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#6b7280] leading-[20px] mt-1">
                    {prof.description}
                  </p>
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
