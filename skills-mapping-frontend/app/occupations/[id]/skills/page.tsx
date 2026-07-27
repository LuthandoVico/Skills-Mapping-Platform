import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OccupationHeader from "@/components/shared/OccupationHeader";
import { occupationDetail } from "@/data/occupations";

export default function OccupationSkillsPage() {
  return (
    <>
      <Navbar />
      <OccupationHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Key Knowledge Areas */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">KEY KNOWLEDGE AREAS</span>

            <div className="flex flex-col gap-6 mt-6">
              {occupationDetail.skillsAndKnowledge.knowledge.map((k) => (
                <div key={k.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[13px] font-semibold">
                    <span className="text-gray-700">{k.name}</span>
                    <span className="text-black">{k.score}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1d3557] rounded-full"
                      style={{ width: `${k.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Hard Skills (Technical) */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm lg:col-span-2">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">HARD SKILLS (TECHNICAL)</span>

            <div className="flex flex-col gap-6 mt-6">
              {occupationDetail.skillsAndKnowledge.hardSkills.map((h) => (
                <div key={h.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[13px] font-semibold">
                    <span className="text-gray-700">{h.name}</span>
                  </div>
                  <p className="text-[12px] text-[#6b7280]">{h.desc}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#1d3557] rounded-full"
                      style={{ width: `${h.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attitudes & Values + Soft Skills strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Attitudes & Values */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm lg:col-span-2">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">ATTITUDES &amp; VALUES</span>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {occupationDetail.skillsAndKnowledge.attitudes.map((att) => (
                <span
                  key={att}
                  className="px-3.5 py-2 bg-[#f5f7fa] border border-[#e5e7eb] rounded-xl text-[11px] font-bold text-gray-700 uppercase tracking-wider block"
                >
                  {att}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">SOFT SKILLS</span>

            <div className="flex flex-col gap-6 mt-6">
              {occupationDetail.skillsAndKnowledge.softSkills.map((s) => (
                <div key={s.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[13px] font-semibold">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="text-black">{s.score}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1d3557] rounded-full"
                      style={{ width: `${s.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
