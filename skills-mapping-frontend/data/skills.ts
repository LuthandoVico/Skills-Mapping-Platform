export interface SkillDetail {
  id: string;
  name: string;
  breadcrumbs: string[];
  status: string; // e.g. "STABLE"
  level: string; // e.g. "Senior Level"
  type: string; // e.g. "Transversal"
  description: string;
  stats: {
    employersHiring: number;
    demandAlignment: string;
    jobPostings90d: string;
    timeToProficiency: string;
    salaryPremium: string;
  };
  overview: {
    definition: string;
    keyAttributes: {
      ofoCategory: string;
      skillType: string;
      mersetaAlignment: string;
      nqfLevel: string;
      lastReviewed: string;
      expertPanel: string;
    };
    subsectorDefinitions: {
      name: string;
      count: string;
    }[];
    demandSignal: {
      value: string;
      employerDemandAlignment: string;
      signals: string;
      yoyGrowth: string;
    };
  };
  proficiencyLevels: {
    level: number;
    title: string;
    description: string;
    tag?: string;
  }[];
  relatedSkills: {
    id: string;
    name: string;
    similarity: string;
    relationType: string;
    description: string;
  }[];
  occupations: {
    id: string;
    title: string;
    code: string;
    demand: string;
    subsector: string;
    requiredLevel: string;
  }[];
  analytics: {
    demandTrend: { year: string; postings: number }[];
    topEmployers: { name: string; postings: number }[];
    regionalDemand: { region: string; demand: string }[];
  };
  statusHistory: {
    date: string;
    event: string;
    status: string;
    reviewer: string;
  }[];
}

export const skillDetail: SkillDetail = {
  id: "cnc-machining-programming",
  name: "CNC Machining & Programming",
  breadcrumbs: ["National Skills Registry", "Metals and Engineering", "CNC Machining & Programming"],
  status: "STABLE",
  level: "Intermediate Level",
  type: "Technical",
  description: "The ability to set up, operate, and program computer numerical control (CNC) machines — including lathes, milling machines, and grinders — to produce precision metal components to engineering specifications and tolerances.",
  stats: {
    employersHiring: 78,
    demandAlignment: "91%",
    jobPostings90d: "3,860",
    timeToProficiency: "24 mo.",
    salaryPremium: "R 88 500",
  },
  overview: {
    definition: "The ability to set up, operate, and program computer numerical control (CNC) machines — including lathes, milling machines, and grinders — to produce precision metal components to engineering specifications and tolerances. This technical competency is foundational to advanced manufacturing across the metals and engineering sector, requiring proficiency in G-code programming, toolpath optimisation, and quality inspection using precision measuring instruments.",
    keyAttributes: {
      ofoCategory: "Plant & Machine Operators",
      skillType: "Hard / Technical",
      mersetaAlignment: "Metal Chamber",
      nqfLevel: "Level 3 – 5",
      lastReviewed: "March 2025",
      expertPanel: "312 Verified Members",
    },
    subsectorDefinitions: [
      { name: "Automotive Manufacturing", count: "1,240 workers" },
      { name: "Metal Industry", count: "2,180 workers" },
      { name: "Motor Retail", count: "310 workers" },
      { name: "Plastics Manufacturing", count: "420 workers" },
      { name: "New Tyre Manufacturing", count: "180 workers" },
      { name: "Components Manufacturing", count: "960 workers" },
    ],
    demandSignal: {
      value: "91%",
      employerDemandAlignment: "Employer demand alignment",
      signals: "78S",
      yoyGrowth: "+18%",
    },
  },
  proficiencyLevels: [
    {
      level: 1,
      title: "Machine Operator",
      description: "Loads workpieces, monitors CNC machines during operation, and performs basic tool changes under supervision.",
    },
    {
      level: 2,
      title: "CNC Setter",
      description: "Sets up CNC machines, selects tooling and fixtures, adjusts offsets, and interprets engineering drawings to produce components within tolerance.",
    },
    {
      level: 3,
      title: "CNC Programmer",
      description: "Writes and edits G-code and CAM-generated programs, optimises toolpaths for efficiency, and troubleshoots machining issues independently.",
    },
    {
      level: 4,
      title: "Senior CNC Technician",
      description: "Programs multi-axis machines (4/5-axis), implements process improvements, mentors junior operators, and manages complex production schedules.",
    },
    {
      level: 5,
      title: "CNC Process Engineer",
      description: "Designs manufacturing processes for new products, specifies machine tool investments, integrates CAD/CAM systems, and drives Industry 4.0 adoption on the shop floor.",
      tag: "EXPERT TIER",
    },
  ],
  relatedSkills: [
    {
      id: "welding-technology",
      name: "Welding Technology",
      similarity: "84%",
      relationType: "Co-requisite",
      description: "Proficiency in MIG, TIG, and arc welding processes for joining metal components in fabrication and manufacturing environments.",
    },
    {
      id: "hydraulic-systems",
      name: "Hydraulic Systems Maintenance",
      similarity: "72%",
      relationType: "Supporting",
      description: "Knowledge of hydraulic circuit design, troubleshooting, and preventive maintenance for industrial presses, lifts, and actuators.",
    },
    {
      id: "technical-drawing-cad",
      name: "Technical Drawing & CAD",
      similarity: "89%",
      relationType: "Co-requisite",
      description: "Ability to read, interpret, and create engineering drawings using AutoCAD, SolidWorks, or similar CAD software for manufacturing.",
    },
  ],
  occupations: [
    {
      id: "cnc-machinist",
      title: "CNC Machinist",
      code: "722301",
      demand: "Critical",
      subsector: "Metal Industry",
      requiredLevel: "Level 3 - CNC Programmer",
    },
    {
      id: "mechanical-fitter",
      title: "Mechanical Fitter",
      code: "723101",
      demand: "High",
      subsector: "Metals and Engineering",
      requiredLevel: "Level 2 - CNC Setter",
    },
    {
      id: "toolmaker",
      title: "Tool, Die & Mould Maker",
      code: "722201",
      demand: "Critical",
      subsector: "Auto Components Manufacturing",
      requiredLevel: "Level 4 - Senior CNC Technician",
    },
  ],
  analytics: {
    demandTrend: [
      { year: "2021", postings: 1800 },
      { year: "2022", postings: 2450 },
      { year: "2023", postings: 3120 },
      { year: "2024", postings: 3860 },
    ],
    topEmployers: [
      { name: "ArcelorMittal South Africa", postings: 620 },
      { name: "Denel SOC (Mechanics Division)", postings: 480 },
      { name: "Toyota SA Manufacturing", postings: 410 },
      { name: "Hulamin (Aluminium Rolling)", postings: 340 },
    ],
    regionalDemand: [
      { region: "Gauteng", demand: "52%" },
      { region: "KwaZulu-Natal", demand: "28%" },
      { region: "Eastern Cape", demand: "20%" },
    ],
  },
  statusHistory: [
    {
      date: "2025-03-10",
      event: "Taxonomy Board Review",
      status: "STABLE",
      reviewer: "Dr. A. Ndlovu (Chairperson)",
    },
    {
      date: "2024-09-15",
      event: "Public Commentary Draft v4.1",
      status: "UNDER REVIEW",
      reviewer: "Skills Development Panel",
    },
    {
      date: "2024-03-01",
      event: "Initial Taxonomy Intake",
      status: "PROPOSED",
      reviewer: "merSETA Research Unit",
    },
  ],
};
