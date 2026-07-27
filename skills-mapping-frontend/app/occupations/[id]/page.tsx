import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OccupationHeader from "@/components/shared/OccupationHeader";
import { occupationDetail } from "@/data/occupations";

export default function OccupationOverviewPage() {
  return (
    <>
      <Navbar />
      <OccupationHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left panel: Summary, Descriptor, Core Tasks */}
          <div className="flex flex-col gap-6">
            {/* Summary & Descriptor */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">OCCUPATION SUMMARY</span>
              <p className="text-[14px] text-gray-700 leading-[22px] mt-2">
                {occupationDetail.overview.summary}
              </p>

              <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider mt-6">OCCUPATION DESCRIPTOR</span>
              <p className="text-[14px] text-gray-700 leading-[22px] mt-2">
                {occupationDetail.overview.descriptor}
              </p>
            </div>

            {/* Core Tasks */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">CORE TASKS</span>
              <ul className="flex flex-col gap-3 mt-4">
                {occupationDetail.overview.coreTasks.map((task, idx) => (
                  <li key={idx} className="flex gap-3 text-[13px] text-gray-700 leading-[20px]">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right panel: Sectors & Work Activities */}
          <div className="flex flex-col gap-6">
            {/* Sectors */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">SECTORS &amp; SUBSECTORS</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">PRIMARY SECTORS</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {occupationDetail.overview.primarySectors.map((sector) => (
                      <span key={sector} className="px-2.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[11px] text-[#6b7280]">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">merSETA SUBSECTORS</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {occupationDetail.overview.mersetaSubsectors.map((sub) => (
                      <span key={sub} className="px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-[11px] text-blue-700">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Work Activities */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wider">WORK ACTIVITIES</span>

              <div className="flex flex-col gap-6 mt-6">
                {occupationDetail.overview.workActivities.map((act) => (
                  <div key={act.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[13px] font-semibold">
                      <span className="text-gray-700">{act.name}</span>
                      <span className="text-black">{act.score}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1d3557] rounded-full animate-pulse"
                        style={{ width: `${act.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
