import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { occupationDetail } from "@/data/occupations";

export default function OccupationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-[#f5f7fa]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-8">
            <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-none">
              Occupations Taxonomy
            </h1>
            <p className="text-[14px] text-[#6b7280] mt-2">
              Browse the occupational classification standards and roles mapped to national subsectors.
            </p>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <div className="divide-y divide-[#e5e7eb]">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">{occupationDetail.ofoCode}</span>
                  <h3 className="text-[18px] font-extrabold text-black mt-1">
                    <Link href={`/occupations/${occupationDetail.id}`} className="hover:text-[#1d3557] transition-colors">
                      {occupationDetail.title}
                    </Link>
                  </h3>
                  <p className="text-[13px] text-[#6b7280] mt-1 leading-[20px] max-w-[600px]">{occupationDetail.overview.summary}</p>
                </div>
                <Link
                  href={`/occupations/${occupationDetail.id}`}
                  className="px-4 py-2 bg-[#1d3557] text-white hover:bg-[#2a4a73] text-[13px] font-semibold rounded-xl text-center shadow-sm shrink-0 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
