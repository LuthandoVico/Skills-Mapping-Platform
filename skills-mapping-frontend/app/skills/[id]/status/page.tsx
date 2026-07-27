import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";

export default function SkillStatusPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Skill Lifecycle &amp; Status
          </h3>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Status overview */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="p-5 bg-green-50 border border-green-200 rounded-2xl">
                <span className="text-[11px] font-bold text-green-800 uppercase block tracking-wider">Current Status</span>
                <span className="text-[24px] font-extrabold text-green-950 mt-1 block">Active / {skillDetail.status}</span>
                <p className="text-[13px] text-green-800 mt-2">
                  This skill has been fully validated by the merSETA Metals and Engineering Taxonomy Board and is considered a national competency standard.
                </p>
              </div>

              {/* Status Change Log */}
              <div>
                <h4 className="text-[14px] font-bold text-black mb-4">Taxonomy Status History</h4>
                <div className="relative border-l border-gray-200 ml-4 pl-6 flex flex-col gap-6">
                  {skillDetail.statusHistory.map((hist) => (
                    <div key={hist.date} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-[-31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1d3557] border-2 border-white" />
                      <div className="text-[12px] text-[#6b7280] font-semibold">{hist.date}</div>
                      <div className="text-[14px] font-bold text-black mt-0.5">{hist.event}</div>
                      <div className="text-[13px] text-gray-600 mt-1">
                        Status set to <span className="font-semibold text-gray-800">{hist.status}</span> by {hist.reviewer}.
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality metadata */}
            <div className="w-full md:w-[320px] shrink-0">
              <div className="bg-[#f5f7fa] border border-[#e5e7eb] rounded-2xl p-5">
                <h4 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider mb-4">Taxonomy Metadata</h4>
                <div className="flex flex-col gap-4 text-[13px]">
                  <div>
                    <span className="text-gray-400 block">Registry Version</span>
                    <span className="font-semibold text-black mt-0.5 block">v4.2 Editorial Draft</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Validator Body</span>
                    <span className="font-semibold text-black mt-0.5 block">National Skills Authority (NSA)</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Chamber Scope</span>
                    <span className="font-semibold text-black mt-0.5 block">merSETA Metal Chamber</span>
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
