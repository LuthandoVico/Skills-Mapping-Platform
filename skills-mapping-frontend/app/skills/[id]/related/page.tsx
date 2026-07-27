import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";
import Link from "next/link";

export default function RelatedSkillsPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Related Skills &amp; Competencies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {skillDetail.relatedSkills.map((s) => (
              <div
                key={s.id}
                className="group relative border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-lg hover:border-[#1d3557]/40 transition-all duration-300 bg-white"
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-4">
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                    {s.relationType}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] text-gray-400">Similarity</span>
                    <span className="text-[14px] font-bold text-[#d4af37]">{s.similarity}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-[16px] font-bold text-black mt-3 group-hover:text-[#1d3557] transition-colors">
                  {s.name}
                </h4>

                {/* Desc */}
                <p className="text-[13px] text-[#6b7280] mt-2 leading-[20px]">
                  {s.description}
                </p>

                {/* Interactive Tooltip Hover state simulation */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-[-40px] left-6 right-6 bg-black text-white text-[11px] p-2.5 rounded-lg shadow-xl pointer-events-none transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 border border-gray-800">
                  <span className="font-bold">Relation:</span> {s.relationType} | <span className="font-bold">Strength:</span> {s.similarity}
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
