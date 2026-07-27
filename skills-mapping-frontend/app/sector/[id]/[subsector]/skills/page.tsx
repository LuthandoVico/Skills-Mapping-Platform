import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const skills = [
  {
    id: "strategic-leadership",
    name: "Strategic Leadership",
    type: "Transversal",
    level: "Senior",
    status: "Stable",
    occupationsCount: 12,
    desc: "Ability to set direction, mobilize resources, and inspire teams to deliver on organizational goals."
  },
  {
    id: "change-management",
    name: "Change Management",
    type: "Transversal",
    level: "Intermediate",
    status: "Stable",
    occupationsCount: 8,
    desc: "Structuring and managing transitional processes for teams during organizational changes."
  },
  {
    id: "metrology",
    name: "Metrology & Precision Measurement",
    type: "Technical",
    level: "Intermediate",
    status: "Stable",
    occupationsCount: 15,
    desc: "Application of measurement systems, precision tools, and calibration standards in metalworking."
  },
  {
    id: "cad-cam",
    name: "CAD/CAM Integration",
    type: "Technical",
    level: "Advanced",
    status: "Stable",
    occupationsCount: 18,
    desc: "Linking computer-aided design directly with manufacturing computer-aided control instructions."
  }
];

export default function SubsectorSkillsPage({
  params
}: {
  params: { id: string; subsector: string };
}) {
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
              <span className="text-[12px] font-bold text-gray-400 uppercase">Subsector Skills</span>
              <h1 className="text-[36px] font-extrabold text-black tracking-tight mt-1">
                {subName} Skills
              </h1>
            </div>

            <Link
              href={`/sector/metals-engineering/${params.subsector}/occupations`}
              className="px-4 py-2 bg-white border border-[#e5e7eb] text-[13px] font-semibold rounded-xl text-gray-700 hover:bg-[#f5f7fa] transition-colors shadow-sm text-center"
            >
              Switch to Occupations View
            </Link>
          </div>

          {/* Skills list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {skills.map((s) => (
              <div key={s.id} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 hover:shadow-lg transition-all shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold uppercase tracking-wider">
                      {s.type}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                      {s.level}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold uppercase tracking-wider">
                    {s.status}
                  </span>
                </div>

                <h3 className="text-[18px] font-extrabold text-black mt-3 hover:text-[#1d3557] transition-colors">
                  <Link href={`/skills/${s.id}`}>{s.name}</Link>
                </h3>

                <p className="text-[13px] text-[#6b7280] mt-2 leading-[20px]">{s.desc}</p>

                <div className="mt-6 pt-4 border-t border-[#e5e7eb] text-[13px]">
                  <span className="text-[#6b7280]">Linked Occupations:</span>
                  <span className="font-semibold text-black ml-1">{s.occupationsCount} occupations</span>
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <Link
                    href={`/skills/${s.id}`}
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
