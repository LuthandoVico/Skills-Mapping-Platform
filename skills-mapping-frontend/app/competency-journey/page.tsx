"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LevelData {
  level: number;
  name: string; // e.g. "Senior"
  title: string; // e.g. "Senior Practitioner"
  badge: string; // e.g. "LEVEL 3"
  overview: string;
  expectedCompetencies: string[];
  knowledgeAreas: string[];
  responsibilities: { title: string; desc: string }[];
  evidenceRequired: string[];
  devGuidance: { title: string; desc: string }[];
  nextLevelName: string; // e.g. "Expert"
}

const levelsData: LevelData[] = [
  {
    level: 1,
    name: "Junior",
    title: "Associate Practitioner",
    badge: "LEVEL 1",
    overview: "Junior analysts focus on foundational research, data collection, and basic taxonomy indexing under direct supervision. They support senior staff by gathering labor market signals.",
    expectedCompetencies: [
      "Basic Data Classification",
      "Secondary Research Methodologies",
      "Version Control and Documentation",
      "Collaborative Teamwork"
    ],
    knowledgeAreas: [
      "Intro to Economics",
      "Basic Statistics",
      "Taxonomy Schema",
      "Excel & Data Manipulation"
    ],
    responsibilities: [
      { title: "Data Entry & Coding", desc: "Assist in mapping raw skill postings to specific occupational codes." },
      { title: "Literature Review", desc: "Search and synthesize public labor market reports and studies." },
      { title: "Format Compliance", desc: "Ensure all newly entered skill definitions conform to standard formats." }
    ],
    evidenceRequired: [
      "Bachelor's degree in Social Sciences, Economics, or related fields.",
      "Basic literacy in data analytics tools (Excel, SQL).",
      "1+ years of research or classification support experience."
    ],
    devGuidance: [
      { title: "Mastery of Tools", desc: "Acquire advanced data querying and relational database competencies." },
      { title: "Independent Tasks", desc: "Take sole ownership of small-scale occupational code reviews." }
    ],
    nextLevelName: "Professional"
  },
  {
    level: 2,
    name: "Professional",
    title: "Core Practitioner",
    badge: "LEVEL 2",
    overview: "Core Practitioners conduct independent reviews, run statistical mapping models, and engage directly with subsector workgroups to maintain taxonomy standards.",
    expectedCompetencies: [
      "Mid-level Statistical Modeling",
      "Subsector Stakeholder Dialogue",
      "Competency Mapping Analysis",
      "Report Writing and Synthesis"
    ],
    knowledgeAreas: [
      "Labor Market Dynamics",
      "Multivariate Data Analysis",
      "merSETA Subsector Structures",
      "Public Relations"
    ],
    responsibilities: [
      { title: "Subsector Liaison", desc: "Facilitate reviews with regional employers and training institutions." },
      { title: "Mapping Implementation", desc: "Refine related skills maps and overlap calculations." },
      { title: "Drafting Standards", desc: "Write the initial draft of competency descriptors and requirements." }
    ],
    evidenceRequired: [
      "3+ years of experience in human capital consulting or labor research.",
      "Proven track record of leading focus group discussions.",
      "Completion of intermediate data science certification."
    ],
    devGuidance: [
      { title: "Systemic Perspective", desc: "Think about macro-economic trends and national policy alignment." },
      { title: "Leadership Skills", desc: "Mentor junior analysts and manage end-to-end research deliverables." }
    ],
    nextLevelName: "Senior"
  },
  {
    level: 3,
    name: "Senior",
    title: "Senior Practitioner",
    badge: "LEVEL 3",
    overview: "Senior Practitioners are expected to demonstrate deep technical mastery within their specific domain while beginning to influence strategic direction. They operate with a high degree of autonomy, managing complex projects and mentoring junior staff.",
    expectedCompetencies: [
      "Advanced Analytical Modeling",
      "Strategic Stakeholder Management",
      "Cross-functional Leadership",
      "Risk Mitigation & Governance"
    ],
    knowledgeAreas: [
      "Macro-Economics",
      "Statistical Inference",
      "Public Policy Frameworks",
      "ISO 9001 Standards"
    ],
    responsibilities: [
      { title: "Project Ownership", desc: "Lead end-to-end delivery of high-impact research initiatives and taxonomy updates." },
      { title: "Standard Setting", desc: "Review and validate submissions from junior analysts, ensuring 100% compliance with NST guidelines." },
      { title: "External Representation", desc: "Act as a technical SME in ministerial briefings and industry working groups." }
    ],
    evidenceRequired: [
      "5+ years of professional experience in data-driven policy or labor economics.",
      "Portfolio of at least 3 major projects led to successful completion.",
      "Chartered status or equivalent professional certification (Level 7+)."
    ],
    devGuidance: [
      { title: "Shift to Architecture", desc: "Focus on system-wide taxonomy design rather than individual data points." },
      { title: "Thought Leadership", desc: "Publish peer-reviewed methodology papers or represent NST at international summits." }
    ],
    nextLevelName: "Expert"
  },
  {
    level: 4,
    name: "Expert",
    title: "Expert Lead",
    badge: "LEVEL 4",
    overview: "Expert Leads design macro-level taxonomy architectures, direct complex research initiatives, and serve as the main liaison to national standard boards.",
    expectedCompetencies: [
      "Macro Taxonomy Architecture",
      "Policy Formulation & Influence",
      "Strategic Risk Management",
      "Senior Mentorship & Coaching"
    ],
    knowledgeAreas: [
      "National Qualification Frameworks (NQF)",
      "Advanced Econometrics",
      "Strategic Change Management",
      "ISO 17024 Standards"
    ],
    responsibilities: [
      { title: "Architecture Design", desc: "Oversee the structural evolution of the National Skills Taxonomy." },
      { title: "Policy Integration", desc: "Align registry standards with national Department of Higher Education goals." },
      { title: "Audit Oversight", desc: "Direct internal and external standard verification panels." }
    ],
    evidenceRequired: [
      "8+ years of expertise in workforce planning or economic research leadership.",
      "Experience presenting strategic plans directly to executive boards.",
      "Post-graduate degree (Masters or PhD) in economics or related fields."
    ],
    devGuidance: [
      { title: "National Impact", desc: "Establish new methodologies adopted as national standards." },
      { title: "Global Engagement", desc: "Drive comparative studies with international taxonomy engines." }
    ],
    nextLevelName: "Fellow"
  },
  {
    level: 5,
    name: "Fellow",
    title: "Taxonomy Fellow",
    badge: "LEVEL 5",
    overview: "Fellows are globally recognized visionaries who set the direction for national skill taxonomy methodologies, leading international collaborations and advising ministerial cabinets.",
    expectedCompetencies: [
      "Visionary System Leadership",
      "Ministerial Cabinet Advisory",
      "Global Collaboration Network",
      "Legacy Standard Formulation"
    ],
    knowledgeAreas: [
      "International Labor Economics",
      "Public Sector Finance",
      "Macro Change Execution",
      "Global Quality Standards"
    ],
    responsibilities: [
      { title: "Cabinet Advisory", desc: "Serve as chief technical advisor to the Minister of Higher Education and Training." },
      { title: "Global Steering", desc: "Represent South Africa on international taxonomy steering committees." },
      { title: "Methodology Governance", desc: "Dictate the baseline standard-setting frameworks for the nation." }
    ],
    evidenceRequired: [
      "12+ years of international recognition in labor economics or taxonomy architecture.",
      "Author of primary research or frameworks adopted on a national level.",
      "Honorary fellowships or PhD in related domains."
    ],
    devGuidance: [
      { title: "Continuous Innovation", desc: "Research next-generation AI-driven taxonomy mapping methodologies." },
      { title: "Mentorship", desc: "Establish a pipeline for training future national taxonomy architects." }
    ],
    nextLevelName: ""
  }
];

export default function CompetencyJourneyPage() {
  const [activeLevel, setActiveLevel] = useState<number>(3); // Level 3: Senior is active by default as in Figma

  const activeData = levelsData.find((l) => l.level === activeLevel) || levelsData[2];

  // Helper values for connector line width percentage
  const getProgressWidth = () => {
    return `${((activeLevel - 1) / (levelsData.length - 1)) * 100}%`;
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-28 w-full bg-[#f5f7fa]">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
          <span className="text-[#1d3557] font-medium cursor-pointer hover:underline">
            National Skills Registry
          </span>
          <svg className="w-3 h-3 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#64748b]">Competency Journey</span>
        </div>

        {/* Title and Intro */}
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="font-sans font-bold text-[40px] text-[#1d3557] leading-[48px] tracking-tight">
            Competency Journey
          </h1>
          <p className="font-sans font-normal text-[16px] text-[#6b7280] leading-[24px] max-w-[672px] mt-1">
            A professional roadmap defining the standards, expectations, and milestones of the National Skills Taxonomy. Navigate the levels to understand career progression requirements.
          </p>
        </div>

        {/* RoadmapHub Stepper Card */}
        <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 mt-8 shadow-[0px_8px_12px_rgba(0,0,0,0.04)] w-full overflow-x-auto scrollbar-none">
          <div className="relative w-[920px] h-[240px] mx-auto select-none">
            
            {/* Winding Road SVG */}
            <svg className="absolute inset-0 w-[920px] h-[240px] pointer-events-none z-0" fill="none">
              {/* Path 1: Junior (70, 180) -> Professional (260, 100) */}
              <path 
                d="M 70 180 C 150 130, 180 100, 260 100" 
                stroke={activeLevel >= 2 ? "#1d3557" : "#cbd5e1"} 
                strokeWidth="5" 
                strokeDasharray="8,8"
                className="transition-all duration-300"
              />
              {/* Path 2: Professional (260, 100) -> Senior (460, 180) */}
              <path 
                d="M 260 100 C 340 100, 380 180, 460 180" 
                stroke={activeLevel >= 3 ? "#1d3557" : "#cbd5e1"} 
                strokeWidth="5" 
                strokeDasharray="8,8"
                className="transition-all duration-300"
              />
              {/* Path 3: Senior (460, 180) -> Expert (660, 130) */}
              <path 
                d="M 460 180 C 540 180, 580 130, 660 130" 
                stroke={activeLevel >= 4 ? "#1d3557" : "#cbd5e1"} 
                strokeWidth="5" 
                strokeDasharray="8,8"
                className="transition-all duration-300"
              />
              {/* Path 4: Expert (660, 130) -> Fellow (850, 60) */}
              <path 
                d="M 660 130 C 740 130, 770 60, 850 60" 
                stroke={activeLevel >= 5 ? "#1d3557" : "#cbd5e1"} 
                strokeWidth="5" 
                strokeDasharray="8,8"
                className="transition-all duration-300"
              />
            </svg>

            {/* Stepper Nodes positioned absolutely on the coordinates */}
            {levelsData.map((lvl) => {
              const isCompleted = lvl.level < activeLevel;
              const isActive = lvl.level === activeLevel;
              const isLocked = lvl.level > activeLevel;

              // Node coordinates
              const positions = [
                { x: 70, y: 180 }, // Junior
                { x: 260, y: 100 }, // Professional
                { x: 460, y: 180 }, // Senior
                { x: 660, y: 130 }, // Expert
                { x: 850, y: 60 }  // Fellow
              ];
              const pos = positions[lvl.level - 1];

              return (
                <button
                  key={lvl.level}
                  onClick={() => setActiveLevel(lvl.level)}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center focus:outline-none group z-10"
                >
                  {/* Circle Node */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2 select-none shadow-sm ${
                      isCompleted 
                        ? "bg-[#1d3557] border-[#1d3557] text-white" 
                        : isActive 
                          ? "bg-white border-[#1d3557] text-[#1d3557] scale-110 shadow-[0_0_8px_rgba(29,53,87,0.25)]" 
                          : "bg-white border-gray-300 text-gray-400 opacity-60 hover:opacity-90"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isActive ? (
                      <svg className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>

                  {/* Step Label */}
                  <span 
                    className={`mt-2 text-[14px] font-sans transition-all duration-200 whitespace-nowrap bg-white/95 px-2 py-0.5 rounded-md shadow-sm border border-gray-100 ${
                      isActive 
                        ? "font-bold text-[#1d3557] scale-105" 
                        : isCompleted 
                          ? "font-semibold text-[#1d3557]" 
                          : "font-normal text-gray-400 opacity-60"
                    }`}
                  >
                    {lvl.name}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Dynamic Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 w-full">
          
          {/* Left Columns (Col Span 2): Detail Panels */}
          <div className="lg:col-span-2 flex flex-col gap-6 w-full">
            
            {/* Level Detail Card */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] w-full">
              
              {/* Header Badges and Title */}
              <div className="flex items-center justify-between border-b border-[#f5f7fa] pb-6">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#fbf3dc] rounded-[9999px] px-3 py-1 flex items-center justify-center shrink-0 w-max h-[28px] border border-[#fbf3dc]">
                    <span className="font-sans font-bold text-[12px] text-[#9a7b14] tracking-[0.6px] uppercase select-none">
                      {activeData.badge}
                    </span>
                  </div>
                  <h2 className="font-sans font-semibold text-[24px] text-[#1d3557] leading-[32px] mt-1">
                    {activeData.title}
                  </h2>
                </div>
                <div className="w-[33px] h-[31.5px] text-[#1d3557] opacity-90 select-none">
                  {/* Star Badge Icon */}
                  <svg className="w-8 h-8 fill-current text-[#d4af37]" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>

              {/* Overview Section */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="font-sans font-semibold text-[20px] text-[#1d3557] leading-[28px]">
                    Overview
                  </h3>
                </div>
                <p className="font-sans font-normal text-[16px] text-[#6b7280] leading-[26px] mt-1">
                  {activeData.overview}
                </p>
              </div>

              {/* Competencies and Knowledge Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-[#f5f7fa]">
                
                {/* Competencies */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-sans font-semibold text-[12px] text-[#6b7280] tracking-[1.6px] uppercase">
                    Expected Competencies
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {activeData.expectedCompetencies.map((comp) => (
                      <li key={comp} className="flex items-center gap-3">
                        <div className="bg-[#1d3557] rounded-full w-1.5 h-1.5 shrink-0" />
                        <span className="font-sans font-normal text-[16px] text-black">
                          {comp}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Knowledge Areas */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-sans font-semibold text-[12px] text-[#6b7280] tracking-[1.6px] uppercase">
                    Knowledge Areas
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {activeData.knowledgeAreas.map((area) => (
                      <div 
                        key={area}
                        className="bg-[#f5f7fa] border border-[#e5e7eb] rounded-[9999px] px-[16px] py-[8px] flex items-center justify-center w-max h-[37.6px]"
                      >
                        <span className="font-sans font-normal text-[14px] text-black whitespace-nowrap">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Typical Responsibilities Card */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] w-full">
              <div className="flex items-center gap-2 border-b border-[#f5f7fa] pb-6">
                <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="font-sans font-semibold text-[20px] text-[#1d3557] leading-[28px]">
                  Typical Responsibilities
                </h3>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                {activeData.responsibilities.map((resp) => (
                  <div key={resp.title} className="relative overflow-hidden w-full">
                    <div className="border-[#1d3557] border-l-4 bg-[#f5f7fa] rounded-r-[8px] p-5 w-full">
                      <h4 className="font-sans font-bold text-[16px] text-[#1d3557] leading-[24px]">
                        {resp.title}
                      </h4>
                      <p className="font-sans font-normal text-[14px] text-[#6b7280] leading-[20px] mt-1">
                        {resp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Evidence & Guidance */}
          <div className="flex flex-col gap-6 w-full">
            
            {/* Evidence Card */}
            <div className="bg-[#1d3557] rounded-[16px] p-6 shadow-[0px_8px_12px_rgba(0,0,0,0.08)] text-white w-full">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="font-sans font-semibold text-[20px] text-white leading-[28px]">
                  Evidence Required
                </h3>
              </div>
              <p className="font-sans font-normal text-[14px] text-white opacity-80 leading-[20px] mt-3">
                To be recognized at this level, candidates must provide:
              </p>
              <div className="flex flex-col gap-4 mt-5">
                {activeData.evidenceRequired.map((ev, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white fill-none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-sans font-normal text-[14px] text-white leading-[20px]">
                      {ev}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Guidance Card */}
            {activeData.nextLevelName && (
              <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] w-full">
                <h3 className="font-sans font-semibold text-[20px] text-[#1d3557] leading-[28px]">
                  Development Guidance
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#6b7280] leading-[20px] mt-2">
                  Aiming for '{activeData.nextLevelName}' (Level {activeLevel + 1})?
                </p>
                <div className="flex flex-col gap-5 mt-5">
                  {activeData.devGuidance.map((guide, idx) => (
                    <div key={guide.title} className="flex gap-3.5 items-start">
                      <div className="bg-[#fbf3dc] rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                        <span className="font-sans font-bold text-[12px] text-[#9a7b14] leading-[16px]">
                          {`0${idx + 1}`}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="font-sans font-bold text-[14px] text-black">
                          {guide.title}
                        </h4>
                        <p className="font-sans font-normal text-[12px] text-[#6b7280] leading-[16px] mt-0.5">
                          {guide.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Competency Audit Button */}
            <button className="bg-[#1d3557] hover:bg-[#162a45] transition-colors rounded-[12px] py-4 w-full text-white text-[16px] font-sans font-bold flex items-center justify-center gap-2.5 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Request Competency Audit
            </button>

          </div>

        </div>

        {/* Recommended Resources Section */}
        <div className="mt-10 pt-4 w-full">
          <div className="flex items-center justify-between w-full border-b border-[#e5e7eb] pb-4">
            <h3 className="font-sans font-semibold text-[20px] text-[#1d3557]">
              Recommended Resources
            </h3>
            <div className="bg-[#e5e7eb] rounded-[9999px] px-3 py-1 flex items-center justify-center shrink-0">
              <span className="font-sans font-bold text-[12px] text-[#6b7280] tracking-[0.6px] uppercase select-none">
                COMING SOON
              </span>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 opacity-60 hover:opacity-100 transition-opacity duration-200 w-full">
            
            {/* Card 1 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-2 flex flex-col w-full">
              <div className="bg-gradient-to-tr from-[#1d3557] to-[#d4af37] rounded-[10px] h-[160px] overflow-hidden relative flex items-center justify-center text-white">
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-[16px] text-[#1d3557] leading-[24px]">
                  Advanced Taxonomy Modeling
                </h4>
                <p className="font-sans font-normal text-[12px] text-[#6b7280] leading-[16px]">
                  A comprehensive guide to managing massive hierarchical skill datasets.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-2 flex flex-col w-full">
              <div className="bg-gradient-to-tr from-[#152740] to-[#6b7280] rounded-[10px] h-[160px] overflow-hidden relative flex items-center justify-center text-white">
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-[16px] text-[#1d3557] leading-[24px]">
                  Strategic Governance Workshop
                </h4>
                <p className="font-sans font-normal text-[12px] text-[#6b7280] leading-[16px]">
                  Interactive session on institutional alignment and standard-setting protocols.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-2 flex flex-col w-full">
              <div className="bg-gradient-to-tr from-[#9ca3af] to-[#1d3557] rounded-[10px] h-[160px] overflow-hidden relative flex items-center justify-center text-white">
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-[16px] text-[#1d3557] leading-[24px]">
                  ISO Compliance Certification
                </h4>
                <p className="font-sans font-normal text-[12px] text-[#6b7280] leading-[16px]">
                  Formal training path for quality assurance in labor market data classification.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
