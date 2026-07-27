import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OccupationHeader from "@/components/shared/OccupationHeader";
import { occupationDetail } from "@/data/occupations";

export default function OccupationLabourMarketPage() {
  return (
    <>
      <Navbar />
      <OccupationHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">Growth Rate</span>
            <span className="text-[24px] font-extrabold text-green-600 block mt-1">{occupationDetail.laborMarket.growthRate}</span>
            <p className="text-[12px] text-[#6b7280] mt-2">Projected year-on-year employment growth rate nationally.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">Unemployment Rate</span>
            <span className="text-[24px] font-extrabold text-black block mt-1">{occupationDetail.laborMarket.unemploymentRate}</span>
            <p className="text-[12px] text-[#6b7280] mt-2">Frictional unemployment levels for certified professionals.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
            <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider block">Key Authority Sector</span>
            <span className="text-[24px] font-extrabold text-black block mt-1">merSETA Scope</span>
            <p className="text-[12px] text-[#6b7280] mt-2">Core oversight chamber and primary training authority.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Postings trend */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6">
              Hiring Activity Trend
            </h3>
            <div className="flex items-end justify-between gap-4 h-[200px] pt-4 px-4 border-b border-l border-gray-200">
              {occupationDetail.laborMarket.postingsTrend.map((t) => {
                const max = 1500;
                const pct = (t.count / max) * 100;
                return (
                  <div key={t.year} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[11px] font-bold text-[#1d3557] opacity-0 group-hover:opacity-100 transition-opacity duration-200 block mb-1">
                      {t.count}
                    </span>
                    <div
                      className="w-full bg-[#1d3557] hover:bg-[#d4af37] rounded-t-lg transition-all duration-300"
                      style={{ height: `${pct}%` }}
                    />
                    <span className="text-[12px] font-semibold text-gray-500 mt-2">{t.year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regional shares */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6">
              Geographical Demand Share
            </h3>

            <div className="flex flex-col gap-5">
              {occupationDetail.laborMarket.topCities.map((c) => (
                <div key={c.city} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[13px] font-semibold">
                    <span className="text-gray-700">{c.city}</span>
                    <span className="text-black font-bold">{c.share}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#d4af37] rounded-full"
                      style={{ width: c.share }}
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
