"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import * as React from "react";
import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  Layers,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles
} from "lucide-react";

// Raw occupations data matching the Figma cards and counts
const occupationsData = [
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Precision Machining",
    level: "Professional",
    featured: true,
    code: "OFO 214401",
    desc: "Design, develop, and oversee the manufacture of mechanical components and systems.",
    employersCount: 58,
    skillsCount: 34,
    growth: "+11%",
    tags: ["CAD", "Thermodynamics", "Materials"]
  },
  {
    id: "cnc-machine-operator",
    title: "CNC Machine Operator",
    category: "Technical Operations",
    level: "Junior",
    featured: false,
    code: "OFO 652201",
    desc: "Set up and operate computer-controlled machine tools to perform precision machining operations.",
    employersCount: 67,
    skillsCount: 22,
    growth: "+9%",
    tags: ["CNC", "G-Code", "Tooling"]
  },
  {
    id: "quality-control-inspector",
    title: "Quality Control Inspector",
    category: "Quality & Compliance",
    level: "Professional",
    featured: false,
    code: "OFO 311901",
    desc: "Inspect machined parts and assemblies using precision instruments to verify dimensional tolerances.",
    employersCount: 54,
    skillsCount: 18,
    growth: "+6%",
    tags: ["Metrology", "ISO 9001", "CMM"]
  },
  {
    id: "manufacturing-process-engineer",
    title: "Manufacturing Process Engineer",
    category: "Engineering Design",
    level: "Senior",
    featured: false,
    code: "OFO 214402",
    desc: "Analyse and optimise manufacturing processes to improve production efficiency, quality, and cost.",
    employersCount: 42,
    skillsCount: 29,
    growth: "+8%",
    tags: ["Lean", "Six Sigma", "Process"]
  },
  {
    id: "metrologist",
    title: "Metrologist",
    category: "Quality & Compliance",
    level: "Professional",
    featured: false,
    code: "OFO 214403",
    desc: "Apply measurement science to verify dimensions, surface finishes, and calibration of master standards.",
    employersCount: 31,
    skillsCount: 24,
    growth: "+7%",
    tags: ["CMM", "Laser Scanning", "GD&T"]
  },
  {
    id: "toolmaker",
    title: "Toolmaker",
    category: "Technical Operations",
    level: "Senior",
    featured: false,
    code: "OFO 652202",
    desc: "Fabricate and maintain precision tools, jigs, dies, moulds, and fixtures for production machinery.",
    employersCount: 49,
    skillsCount: 20,
    growth: "+5%",
    tags: ["Grinding", "Fitting", "EDM"]
  }
];

// Helper to format subsector name
const formatSubsectorName = (slug: string) => {
  if (!slug) return "";
  if (slug.toLowerCase() === "precision-engineering") return "Precision Engineering";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function SubsectorOccupationsPage({
  params
}: {
  params: Promise<{ id: string; subsector: string }>;
}) {
  // Resolve params asynchronously to support Next.js 15/16 router
  const resolvedParams = React.use(params);
  const sectorId = resolvedParams.id;
  const subsectorSlug = resolvedParams.subsector;

  const subName = formatSubsectorName(subsectorSlug);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("All Skills");
  const [selectedOccupationCategory, setSelectedOccupationCategory] = useState("All Occupations");

  // Filter occupations based on query and selected category
  const filteredOccupations = useMemo(() => {
    return occupationsData.filter((occ) => {
      // Occupation category filter match
      const categoryMatch =
        selectedOccupationCategory === "All Occupations" ||
        occ.category.toLowerCase().includes(selectedOccupationCategory.replace("Occupations", "").trim().toLowerCase()) ||
        (selectedOccupationCategory === "Precision Machining" && occ.category === "Precision Machining") ||
        (selectedOccupationCategory === "Precision Machining" && occ.title.toLowerCase().includes("machin"));

      // Search match
      const searchMatch =
        occ.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        occ.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedOccupationCategory]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-[#f5f7fa] pt-16">
        
        {/* Header Block (Figma height=300.6px equivalent) */}
        <header className="bg-white border-b border-[#e5e7eb] w-full pt-8 pb-6 px-8">
          <div className="max-w-[1400px] mx-auto flex flex-col justify-between h-full">
            
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                "National Skills Registry",
                "Metals and Engineering",
                subName,
                "Occupations"
              ]}
            />

            {/* Title Section */}
            <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[14px] bg-[#f5f7fa] flex items-center justify-center text-[#1d3557]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.55px] uppercase text-[#6b7280]">
                    Occupations
                  </span>
                  <h1 className="text-[28px] font-extrabold text-black tracking-[-0.7px] leading-tight">
                    {subName}
                  </h1>
                </div>
              </div>

              <Link
                href={`/sector/${sectorId}/${subsectorSlug}/skills`}
                className="px-4 py-2 bg-white border border-[#e5e7eb] text-[13px] font-semibold rounded-xl text-gray-700 hover:bg-[#f5f7fa] transition-all duration-200 hover:border-gray-300 shadow-sm flex items-center gap-1.5"
              >
                Switch to Skills View
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Description */}
            <p className="mt-4 text-[14px] text-[#6b7280] leading-[22px] max-w-[700px]">
              Occupational roles within Precision Engineering, covering required skills, employer demand, and sector growth trajectories.
            </p>

            {/* Stats Row */}
            <div className="mt-6 pt-5 border-t border-[#e5e7eb] flex flex-wrap gap-x-8 gap-y-4">
              
              {/* Stat 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 text-[#1d3557]/60">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#1d3557] leading-none">
                    38
                  </div>
                  <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                    Occupational Roles
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 text-[#d4af37]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#d4af37] leading-none">
                    +9%
                  </div>
                  <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                    Annual Growth
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 text-[#1d3557]/60">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#1d3557] leading-none">
                    142
                  </div>
                  <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                    Linked Skills
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 text-[#1d3557]/60">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[20px] font-bold text-[#1d3557] leading-none">
                    67
                  </div>
                  <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                    Registered Employers
                  </div>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* Main Body Section */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-8 flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Sidebars */}
          <aside className="w-full lg:w-[240px] shrink-0 flex flex-col gap-5">
            
            {/* Sidebar Panel 1: Skills Categories */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-[#e5e7eb] bg-white">
                <h3 className="text-[13px] font-semibold text-[#1d3557] uppercase tracking-wide">
                  Skills
                </h3>
              </div>
              <div className="flex flex-col">
                {[
                  { name: "All Skills", count: 142 },
                  { name: "Technical Operations", count: 58 },
                  { name: "Quality & Compliance", count: 34 },
                  { name: "Engineering Design", count: 28 },
                  { name: "Health & Safety", count: 22 }
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/sector/${sectorId}/${subsectorSlug}/skills`}
                    className="flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f5f7fa] text-gray-400">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Panel 2: Occupations categories */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-[#e5e7eb] bg-white">
                <h3 className="text-[13px] font-semibold text-[#1d3557] uppercase tracking-wide">
                  Occupations
                </h3>
              </div>
              <div className="flex flex-col">
                {[
                  { name: "All Occupations", count: 38 },
                  { name: "Precision Machining", count: 12 },
                  { name: "Quality & Compliance", count: 8 },
                  { name: "Engineering Design", count: 10 },
                  { name: "Technical Operations", count: 8 }
                ].map((occ) => (
                  <button
                    key={occ.name}
                    onClick={() => setSelectedOccupationCategory(occ.name)}
                    className={`flex items-center justify-between px-4 py-2.5 text-left transition-all duration-200 border-l-[3px] text-[13px] ${
                      selectedOccupationCategory === occ.name
                        ? "bg-[#1d3557]/5 border-[#d4af37] text-[#1d3557] font-semibold"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{occ.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f5f7fa] text-gray-400">
                      {occ.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Panel 3: Related Subsectors */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-[#e5e7eb] bg-white">
                <h3 className="text-[13px] font-semibold text-[#1d3557] uppercase tracking-wide">
                  Related Subsectors
                </h3>
              </div>
              <div className="flex flex-col divide-y divide-[#e5e7eb]">
                {[
                  { name: "Structural Fabrication", slug: "structural-fabrication" },
                  { name: "Industrial Welding", slug: "industrial-welding" },
                  { name: "CNC Machining", slug: "cnc-machining" }
                ].map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/sector/${sectorId}/${sub.slug}/occupations`}
                    className="flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 text-[13px] text-gray-600 hover:text-[#1d3557] transition-all group font-medium"
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1d3557] transform group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column: Main Content */}
          <section className="flex-1 flex flex-col gap-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-[13px] text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filteredOccupations.length}</span> occupations
              </p>
              
              {/* Search and filter controls */}
              <div className="flex items-center gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search occupations, codes..."
                    className="w-full pl-9 pr-4 py-2 border border-[#e5e7eb] rounded-xl text-[13px] bg-white placeholder-gray-400 focus:outline-none focus:border-[#1d3557] focus:ring-1 focus:ring-[#1d3557]"
                  />
                </div>

                {/* Filter Trigger Dropdown Mockup */}
                <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#e5e7eb] rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                  Filter
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Occupations Cards Grid */}
            {filteredOccupations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOccupations.map((occ) => (
                  <div
                    key={occ.id}
                    className="bg-white border border-[#e5e7eb] hover:border-gray-300 rounded-[16px] p-6 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm group relative"
                  >
                    {/* Top tags row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                          {occ.code}
                        </span>
                        <span className="text-[12px] text-gray-400">•</span>
                        <span className="text-[12px] text-[#6b7280] font-medium">
                          {occ.category}
                        </span>
                      </div>
                      
                      {/* Featured or level indicator */}
                      {occ.featured ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#d4af37]">
                          <Sparkles className="w-3 h-3 fill-[#d4af37]" /> Featured
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-navy/5 text-[#1d3557] text-[10px] font-bold uppercase tracking-wider">
                          {occ.level}
                        </span>
                      )}
                    </div>

                    {/* Occupation Title */}
                    <h3 className="text-[18px] font-extrabold text-black mt-3 group-hover:text-[#1d3557] transition-colors leading-snug">
                      <Link href={`/occupations/${occ.id}`}>{occ.title}</Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-[#6b7280] mt-2 leading-[20px] flex-grow">
                      {occ.desc}
                    </p>

                    {/* Three-Column Metrics Block (Figma style) */}
                    <div className="grid grid-cols-3 gap-2 mt-5 py-3 border-y border-[#e5e7eb] text-center">
                      <div>
                        <span className="block text-[15px] font-bold text-gray-800 leading-none">
                          {occ.employersCount}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-semibold mt-1 block">
                          Employers
                        </span>
                      </div>
                      <div className="border-x border-[#e5e7eb]">
                        <span className="block text-[15px] font-bold text-gray-800 leading-none">
                          {occ.skillsCount}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-semibold mt-1 block">
                          Skills
                        </span>
                      </div>
                      <div>
                        <span className="block text-[15px] font-bold text-[#d4af37] leading-none">
                          {occ.growth}
                        </span>
                        <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-semibold mt-1 block">
                          Growth
                        </span>
                      </div>
                    </div>

                    {/* Bottom Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {occ.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[11px] text-gray-500 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="mt-5 flex items-center justify-between">
                      <Link
                        href={`/occupations/${occ.id}`}
                        className="text-[13px] font-bold text-[#1d3557] hover:text-[#2a4a73] flex items-center gap-1 transition-colors"
                      >
                        View occupation details
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-12 text-center shadow-sm">
                <p className="text-gray-400 text-[14px]">
                  No occupations found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedOccupationCategory("All Occupations");
                  }}
                  className="mt-3 text-[13px] font-bold text-[#1d3557] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination Mockup */}
            <div className="mt-6 flex items-center justify-center gap-1 py-4 border-t border-[#e5e7eb]">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold bg-[#1d3557] text-white">
                1
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-600 hover:bg-gray-100">
                2
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-600 hover:bg-gray-100">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-[13px] font-medium text-gray-400">
                ...
              </span>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-semibold text-gray-600 hover:bg-gray-100">
                14
              </button>
            </div>

          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}
