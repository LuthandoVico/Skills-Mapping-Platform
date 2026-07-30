import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const occupations = [
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    code: "OFO 214401",
    skillsCount: 42,
    demand: "High",
    salary: "R 450k - R 900k",
    desc: "Design, develop, and oversee the manufacture of mechanical components and systems."
  },
  {
    id: "cnc-programmer",
    title: "CNC Programmer",
    code: "OFO 311501",
    skillsCount: 28,
    demand: "Medium",
    salary: "R 350k - R 650k",
    desc: "Develop programs for computer numerical control machines to fabricate parts."
  },
  {
    id: "toolmaker",
    title: "Toolmaker",
    code: "OFO 652201",
    skillsCount: 24,
    demand: "High",
    salary: "R 280k - R 520k",
    desc: "Set up and operate machine tools to produce precision dies, moulds, and tools."
  },
  {
    id: "metrology-technician",
    title: "Metrology Technician",
    code: "OFO 311901",
    skillsCount: 31,
    demand: "High",
    salary: "R 300k - R 580k",
    desc: "Perform calibration and measurements on precision parts and measurement instruments."
  }
];

export default async function SubsectorOccupationsPage({
  params
}: {
  params: Promise<{ id: string; subsector: string }>;
}) {
  const resolvedParams = await params;
  const subName = "Precision Engineering";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-[#f5f7fa]">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
            <Link href="/" className="hover:text-black">National Skills Registry</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/sector/metals-engineering" className="hover:text-black">Metals and Engineering</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-gray-800">{subName}</span>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[12px] font-bold text-gray-400 uppercase">Subsector Occupations</span>
              <h1 className="text-[36px] font-extrabold text-black tracking-tight mt-1">
                {subName} Occupations
              </h1>
            </div>

            <Link
              href={`/sector/metals-engineering/${resolvedParams.subsector}/skills`}
              className="px-4 py-2 bg-white border border-[#e5e7eb] text-[13px] font-semibold rounded-xl text-gray-700 hover:bg-[#f5f7fa] transition-colors shadow-sm text-center"
            >
              Switch to Skills View
            </Link>
          </div>

          {/* Occupations list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {occupations.map((o) => (
              <div key={o.id} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-lg transition-all shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-bold text-[#6b7280]">{o.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    o.demand === "High"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                  }`}>
                    {o.demand} Demand
                  </span>
                </div>

                <h3 className="text-[18px] font-extrabold text-black mt-3 hover:text-[#1d3557] transition-colors">
                  <Link href={`/occupations/${o.id}`}>{o.title}</Link>
                </h3>

                <p className="text-[13px] text-[#6b7280] mt-2 leading-[20px]">{o.desc}</p>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-[#e5e7eb] text-[13px]">
                  <div>
                    <span className="text-[#6b7280] block">Required Skills</span>
                    <span className="font-semibold text-black block mt-0.5">{o.skillsCount} skills</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block">Average Salary</span>
                    <span className="font-semibold text-[#d4af37] block mt-0.5">{o.salary}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <Link
                    href={`/occupations/${o.id}`}
                    className="text-[13px] font-semibold text-[#1d3557] hover:underline flex items-center gap-1"
                  >
                    View details
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
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
