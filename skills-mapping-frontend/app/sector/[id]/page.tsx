import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const subsectors = [
  {
    id: "precision-engineering",
    name: "Precision Engineering",
    type: "Professional",
    skills: 142,
    occupations: 38,
    employers: 67,
    growth: "+9%",
    desc: "High-accuracy component manufacturing using advanced machinery.",
    tags: ["Metrology", "CNC", "Tolerances"]
  },
  {
    id: "structural-fabrication",
    name: "Structural Fabrication",
    type: "Professional",
    skills: 118,
    occupations: 34,
    employers: 52,
    growth: "+7%",
    desc: "Design and construction of structural steel components.",
    tags: ["Welding", "Blueprints", "Steel"]
  },
  {
    id: "industrial-welding",
    name: "Industrial Welding",
    type: "Senior",
    skills: 95,
    occupations: 28,
    employers: 83,
    growth: "+5%",
    desc: "Application of welding processes and techniques to join metals.",
    tags: ["MIG", "TIG", "Arc"]
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    type: "Professional",
    skills: 128,
    occupations: 32,
    employers: 61,
    growth: "+11%",
    desc: "Programming and operation of computer-controlled machines.",
    tags: ["CAM", "Turning", "Milling"]
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    type: "Senior",
    skills: 97,
    occupations: 24,
    employers: 54,
    growth: "+6%",
    desc: "Implementing quality management systems and inspection standards.",
    tags: ["ISO 9001", "SPC", "Inspection"]
  },
  {
    id: "engineering-design",
    name: "Engineering Design",
    type: "Professional",
    skills: 143,
    occupations: 40,
    employers: 72,
    growth: "+8%",
    desc: "Development of technical specifications and detailed design layouts.",
    tags: ["CAD", "SolidWorks", "Prototyping"]
  }
];

const skillCategories = [
  { name: "All Skills", count: 842 },
  { name: "Leadership & Management", count: 64 },
  { name: "Technical Operations", count: 218 },
  { name: "Quality & Compliance", count: 97 },
  { name: "Engineering Design", count: 143 },
  { name: "Fabrication & Joining", count: 129 },
  { name: "Maintenance & Reliability", count: 91 },
  { name: "Health & Safety", count: 100 }
];

const occupationCategories = [
  { name: "All Occupations", count: 284 },
  { name: "Production Engineers", count: 48 },
  { name: "Quality Inspectors", count: 36 },
  { name: "Welding Technicians", count: 52 },
  { name: "CNC Operators", count: 61 },
  { name: "Maintenance Fitters", count: 47 },
  { name: "Design Engineers", count: 40 }
];

export default async function SectorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // We match metals-engineering or fallback
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-[#f5f7fa]">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
            <Link href="/" className="hover:text-black">National Skills Registry</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-gray-800">Metals and Engineering</span>
          </div>

          {/* Title & description */}
          <div className="mt-6">
            <span className="text-[12px] font-bold text-gray-400 uppercase">Sector Overview</span>
            <h1 className="text-[36px] font-extrabold text-black tracking-tight mt-1">
              Metals and Engineering
            </h1>
            <p className="mt-3 text-[15px] text-[#6b7280] leading-[24px] max-w-[700px]">
              Core manufacturing sector encompassing metalworking, machining, structural fabrication, industrial welding, and precision engineering systems.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 p-6 bg-white border border-[#e5e7eb] rounded-2xl">
            <div>
              <span className="text-[20px] font-extrabold text-black leading-none block">420K+</span>
              <span className="text-[12px] text-[#6b7280] block mt-1">Registered Workers</span>
            </div>
            <div>
              <span className="text-[20px] font-extrabold text-black leading-none block">8.1%</span>
              <span className="text-[12px] text-[#6b7280] block mt-1">Annual Skills Growth</span>
            </div>
            <div>
              <span className="text-[20px] font-extrabold text-black leading-none block">842</span>
              <span className="text-[12px] text-[#6b7280] block mt-1">Defined Skills</span>
            </div>
            <div>
              <span className="text-[20px] font-extrabold text-black leading-none block">284</span>
              <span className="text-[12px] text-[#6b7280] block mt-1">Occupational Roles</span>
            </div>
            <div>
              <span className="text-[20px] font-extrabold text-black leading-none block">12</span>
              <span className="text-[12px] text-[#6b7280] block mt-1">Subsectors</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-12">
            {/* Sidebar Left */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
              {/* Subsectors List */}
              <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#f5f7fa] px-4 py-3 border-b border-[#e5e7eb]">
                  <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wider block">Subsectors</span>
                </div>
                <div className="divide-y divide-[#e5e7eb]">
                  {subsectors.map((s) => (
                    <Link
                      key={s.id}
                      href={`/sector/metals-engineering/${s.id}/occupations`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#f5f7fa] transition-all group"
                    >
                      <span className="text-[13px] text-gray-700 font-medium group-hover:text-[#1d3557]">{s.name}</span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-[#1d3557] transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Skills categories */}
              <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#f5f7fa] px-4 py-3 border-b border-[#e5e7eb]">
                  <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wider block">Skills categories</span>
                </div>
                <div className="divide-y divide-[#e5e7eb]">
                  {skillCategories.map((c) => (
                    <Link
                      key={c.name}
                      href={`/sector/metals-engineering/precision-engineering/skills`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#f5f7fa] transition-all"
                    >
                      <span className="text-[13px] text-gray-700 font-medium">{c.name}</span>
                      <span className="text-[11px] font-bold text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded-full">{c.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Occupations categories */}
              <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#f5f7fa] px-4 py-3 border-b border-[#e5e7eb]">
                  <span className="text-[13px] font-bold text-gray-800 uppercase tracking-wider block">Occupations categories</span>
                </div>
                <div className="divide-y divide-[#e5e7eb]">
                  {occupationCategories.map((o) => (
                    <Link
                      key={o.name}
                      href={`/sector/metals-engineering/precision-engineering/occupations`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#f5f7fa] transition-all"
                    >
                      <span className="text-[13px] text-gray-700 font-medium">{o.name}</span>
                      <span className="text-[11px] font-bold text-[#6b7280] bg-gray-100 px-2 py-0.5 rounded-full">{o.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Right */}
            <div className="flex-1">
              {/* Filter bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-[13px] text-[#6b7280]">Showing 6 subsectors</span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-xl text-[13px] text-gray-700 hover:bg-[#f5f7fa] transition-colors shadow-sm">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </button>
                  <input
                    type="text"
                    placeholder="Search subsectors..."
                    className="w-[200px] h-[35px] px-3 bg-white border border-[#e5e7eb] rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1d3557] shadow-sm"
                  />
                </div>
              </div>

              {/* Subsector cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subsectors.map((s) => (
                  <div key={s.id} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col hover:shadow-lg transition-all shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100 text-[10px] font-bold uppercase tracking-wider">
                        {s.type}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-extrabold text-black mt-3">{s.name}</h3>
                    <span className="text-[12px] text-gray-400">{s.name} Sector</span>
                    <p className="text-[13px] text-[#6b7280] leading-[20px] mt-3 flex-grow">{s.desc}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-[#e5e7eb]">
                      <div>
                        <span className="text-[15px] font-bold text-black block">{s.skills}</span>
                        <span className="text-[10px] text-[#6b7280] uppercase block">Skills</span>
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-black block">{s.occupations}</span>
                        <span className="text-[10px] text-[#6b7280] uppercase block">Occupations</span>
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-black block">{s.employers}</span>
                        <span className="text-[10px] text-[#6b7280] uppercase block">Employers</span>
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-green-600 block">{s.growth}</span>
                        <span className="text-[10px] text-[#6b7280] uppercase block">Growth</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {s.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-gray-50 border border-gray-200 text-[11px] text-[#6b7280]">{t}</span>
                      ))}
                    </div>

                    {/* View subsector link */}
                    <Link
                      href={`/sector/metals-engineering/${s.id}/occupations`}
                      className="mt-6 flex items-center gap-1 text-[13px] font-semibold text-[#1d3557] hover:underline"
                    >
                      View subsector
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
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
