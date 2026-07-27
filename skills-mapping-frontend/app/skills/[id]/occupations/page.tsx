import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";
import { skillDetail } from "@/data/skills";
import Link from "next/link";

export default function SkillOccupationsPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-black border-b border-[#e5e7eb] pb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Occupations Requiring {skillDetail.name}
          </h3>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e5e7eb] text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">
                  <th className="pb-3">OFO Code</th>
                  <th className="pb-3">Occupation Title</th>
                  <th className="pb-3">Subsector</th>
                  <th className="pb-3">Demand Status</th>
                  <th className="pb-3">Required Level</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {skillDetail.occupations.map((occ) => (
                  <tr key={occ.id} className="text-[13px] text-gray-700 hover:bg-[#f5f7fa] transition-colors">
                    <td className="py-4 font-semibold text-gray-400">{occ.code}</td>
                    <td className="py-4 font-bold text-black hover:text-[#1d3557]">
                      <Link href={`/occupations/${occ.id}`}>{occ.title}</Link>
                    </td>
                    <td className="py-4">{occ.subsector}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        occ.demand === "Critical"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-orange-50 text-orange-700 border border-orange-100"
                      }`}>
                        {occ.demand}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-gray-800">{occ.requiredLevel}</td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/occupations/${occ.id}`}
                        className="text-[12px] font-semibold text-[#1d3557] hover:underline"
                      >
                        View pathway →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
