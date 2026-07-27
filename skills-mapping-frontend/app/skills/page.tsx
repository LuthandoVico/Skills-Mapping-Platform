import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { skillDetail } from "@/data/skills";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-[#f5f7fa]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-8">
            <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-none">
              Skills Registry
            </h1>
            <p className="text-[14px] text-[#6b7280] mt-2">
              Browse the certified transversal, technical, and professional competency frameworks.
            </p>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
            <div className="divide-y divide-[#e5e7eb]">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold uppercase tracking-wider">
                      {skillDetail.type}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                      {skillDetail.level}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-extrabold text-black mt-2">
                    <Link href={`/skills/${skillDetail.id}`} className="hover:text-[#1d3557] transition-colors">
                      {skillDetail.name}
                    </Link>
                  </h3>
                  <p className="text-[13px] text-[#6b7280] mt-1 leading-[20px] max-w-[600px]">{skillDetail.description}</p>
                </div>
                <Link
                  href={`/skills/${skillDetail.id}`}
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
