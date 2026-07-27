import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OccupationHeader from "@/components/shared/OccupationHeader";
import { occupationDetail } from "@/data/occupations";

export default function OccupationEducationPage() {
  return (
    <>
      <Navbar />
      <OccupationHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Academic Requirements & Certifications */}
          <div className="flex flex-col gap-8">
            {/* Academic requirements */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academic Pathways &amp; Entry Requirements
              </h3>
              <ul className="flex flex-col gap-4">
                {occupationDetail.education.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-[13px] text-gray-700 leading-[20px]">
                    <span className="w-6 h-6 rounded-full bg-blue-55 text-[#1d3557] flex items-center justify-center font-bold text-[11px] shrink-0 border border-blue-100">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Professional Certifications
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {occupationDetail.education.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3.5 py-2 bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-800 rounded-xl uppercase tracking-wider block"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Accredited Training Providers */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Accredited Higher Education Providers
            </h3>

            <div className="flex flex-col gap-4">
              {occupationDetail.education.providers.map((p) => (
                <div key={p.name} className="p-4 bg-[#f5f7fa] border border-[#e5e7eb] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-[14px] font-extrabold text-black">{p.name}</h4>
                    <span className="text-[12px] text-[#6b7280]">{p.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-white border border-[#e5e7eb] text-[11px] font-bold text-gray-700 rounded-xl">
                    {p.course}
                  </span>
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
