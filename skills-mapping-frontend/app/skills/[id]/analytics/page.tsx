import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";

export default function SkillAnalyticsPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Postings Trend */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Year-on-Year Demand Trend
            </h3>

            <div className="flex items-end justify-between gap-4 h-[240px] pt-4 px-4 border-b border-l border-gray-200">
              {skillDetail.analytics.demandTrend.map((t) => {
                const max = 7000;
                const pct = (t.postings / max) * 100;
                return (
                  <div key={t.year} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[11px] font-bold text-[#1d3557] opacity-0 group-hover:opacity-100 transition-opacity duration-200 block mb-1">
                      {t.postings.toLocaleString()}
                    </span>
                    <div
                      className="w-full bg-[#1d3557] hover:bg-[#d4af37] rounded-t-lg transition-all duration-500 ease-out"
                      style={{ height: `${pct}%` }}
                    />
                    <span className="text-[12px] font-semibold text-gray-500 mt-2">{t.year}</span>
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] text-gray-400 block text-right mt-2">Annual Job Board Postings count</span>
          </div>

          {/* Top Employers */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Top Hiring Organizations
              </h3>

              <div className="flex flex-col gap-4">
                {skillDetail.analytics.topEmployers.map((emp, idx) => {
                  const max = 2000;
                  const pct = (emp.postings / max) * 100;
                  return (
                    <div key={emp.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[13px] font-semibold">
                        <span className="text-gray-700">{idx + 1}. {emp.name}</span>
                        <span className="text-black">{emp.postings.toLocaleString()} postings</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1d3557] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Regional demand distribution */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm mt-8">
          <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Regional Demand Distribution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillDetail.analytics.regionalDemand.map((reg) => (
              <div key={reg.region} className="bg-[#f5f7fa] p-5 rounded-2xl border border-[#e5e7eb] flex items-center justify-between">
                <div>
                  <span className="text-[12px] text-gray-400 uppercase tracking-wider block">Region</span>
                  <span className="text-[16px] font-extrabold text-black mt-1 block">{reg.region}</span>
                </div>
                <span className="text-[24px] font-black text-[#d4af37]">{reg.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
