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
  id: "strategic-leadership",
  name: "Strategic Leadership",
  breadcrumbs: ["National Skills Registry", "Metals and Engineering", "Strategic Leadership"],
  status: "STABLE",
  level: "Senior Level",
  type: "Transversal",
  description: "The ability to set direction, mobilize resources, and inspire teams to deliver on organizational goals, aligning workforce capabilities with national industry and sector-specific strategies.",
  stats: {
    employersHiring: 42,
    demandAlignment: "94%",
    jobPostings90d: "6,240",
    timeToProficiency: "18 mo.",
    salaryPremium: "R 140 800",
  },
  overview: {
    definition: "The ability to set direction, mobilize resources, and inspire teams to deliver on organizational goals, aligning workforce capabilities with national industry and sector-specific strategies. This transversal competency spans across multiple sectors and represents high-level organizational leadership skills required for strategic implementation.",
    keyAttributes: {
      ofoCategory: "Managers",
      skillType: "Soft / Transversal",
      mersetaAlignment: "All Subsectors",
      nqfLevel: "Level 5 – 7",
      lastReviewed: "March 2025",
      expertPanel: "425 Verified Members",
    },
    subsectorDefinitions: [
      { name: "Automotive Manufacturing", count: "Auto subsector" },
      { name: "Metal Industry", count: "Metal subsector" },
      { name: "Motor Retail", count: "Retail subsector" },
      { name: "Plastics Manufacturing", count: "Plastics subsector" },
      { name: "New Tyre Manufacturing", count: "Tyre subsector" },
      { name: "Components Manufacturing", count: "Components subsector" },
    ],
    demandSignal: {
      value: "94%",
      employerDemandAlignment: "Employer demand alignment",
      signals: "42S",
      yoyGrowth: "+12%",
    },
  },
  proficiencyLevels: [
    {
      level: 1,
      title: "Foundational Awareness",
      description: "Recognizes key elements of strategic planning and contributes to team goal setting under guidance.",
    },
    {
      level: 2,
      title: "Competent Leader",
      description: "Demonstrates understanding of strategic vision and translates it into operational actions for teams.",
    },
    {
      level: 3,
      title: "Advanced Practitioner",
      description: "Applies strategic frameworks to solve complex departmental challenges and aligns resources effectively.",
    },
    {
      level: 4,
      title: "Strategic Director",
      description: "Influences organizational change across multiple departments and designs long-term strategic roadmaps.",
    },
    {
      level: 5,
      title: "Executive Mastery",
      description: "Defines industry-standard strategic directions and designs national or enterprise-wide competency frameworks.",
      tag: "EXPERT TIER",
    },
  ],
  relatedSkills: [
    {
      id: "active-listening",
      name: "Active Listening",
      similarity: "92%",
      relationType: "Co-requisite",
      description: "Ability to focus completely on a speaker and understand their message.",
    },
    {
      id: "negotiation",
      name: "Negotiation",
      similarity: "69%",
      relationType: "Supporting",
      description: "Dialogue intended to resolve disputes and produce an agreement.",
    },
    {
      id: "teamwork",
      name: "Teamwork",
      similarity: "81%",
      relationType: "Co-requisite",
      description: "Cooperative or combined effort of a group of persons working together.",
    },
  ],
  occupations: [
    {
      id: "engineering-manager",
      title: "Engineering Manager",
      code: "121901",
      demand: "High",
      subsector: "Metals and Engineering",
      requiredLevel: "Level 4 - Strategic Director",
    },
    {
      id: "production-manager",
      title: "Production Manager (Manufacturing)",
      code: "132101",
      demand: "High",
      subsector: "Auto Manufacturing",
      requiredLevel: "Level 3 - Advanced Practitioner",
    },
    {
      id: "general-manager",
      title: "General Manager",
      code: "112001",
      demand: "Critical",
      subsector: "Motor Retail",
      requiredLevel: "Level 5 - Executive Mastery",
    },
  ],
  analytics: {
    demandTrend: [
      { year: "2021", postings: 3200 },
      { year: "2022", postings: 4100 },
      { year: "2023", postings: 5400 },
      { year: "2024", postings: 6240 },
    ],
    topEmployers: [
      { name: "merSETA Enterprise Partners", postings: 1840 },
      { name: "National Metals Group", postings: 1420 },
      { name: "Toyota SA", postings: 1100 },
      { name: "BMW Group SA", postings: 980 },
    ],
    regionalDemand: [
      { region: "Gauteng", demand: "65%" },
      { region: "KwaZulu-Natal", demand: "20%" },
      { region: "Eastern Cape", demand: "15%" },
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
