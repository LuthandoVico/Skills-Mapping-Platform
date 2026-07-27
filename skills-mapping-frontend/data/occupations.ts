export interface OccupationDetail {
  id: string;
  title: string;
  ofoCode: string;
  iscoCode: string;
  pathway: string; // e.g. "ENGINEERING / MECHANICAL"
  difficulty: string; // e.g. "High"
  difficultyPercent: number; // 0-100
  kpis: {
    salary: string;
    salarySubtext: string;
    demandStatus: string;
    demandSubtext: string;
    postings: string;
    postingsSubtext: string;
    aiImpact: string;
    aiImpactSubtext: string;
    aiPercent: number;
  };
  overview: {
    summary: string;
    descriptor: string;
    coreTasks: string[];
    primarySectors: string[];
    mersetaSubsectors: string[];
    workActivities: { name: string; score: string; percent: number }[];
  };
  skillsAndKnowledge: {
    knowledge: { name: string; score: string; percent: number }[];
    hardSkills: { name: string; desc: string; percent: number }[];
    attitudes: string[];
    softSkills: { name: string; score: string; percent: number }[];
  };
  education: {
    requirements: string[];
    providers: { name: string; location: string; course: string }[];
    certifications: string[];
  };
  laborMarket: {
    growthRate: string;
    unemploymentRate: string;
    topCities: { city: string; share: string }[];
    postingsTrend: { year: string; count: number }[];
  };
}

export const occupationDetail: OccupationDetail = {
  id: "mechanical-engineer",
  title: "Mechanical Engineer",
  ofoCode: "OFO: 214401",
  iscoCode: "ISCO: 2144",
  pathway: "ENGINEERING / MECHANICAL",
  difficulty: "High",
  difficultyPercent: 75,
  kpis: {
    salary: "R 450k - 900k",
    salarySubtext: "Annual Gross (2023)",
    demandStatus: "High Demand",
    demandSubtext: "Critical Skills List",
    postings: "1,248",
    postingsSubtext: "Last 12 Months",
    aiImpact: "15% Low Risk",
    aiImpactSubtext: "Augmentation Potential",
    aiPercent: 15,
  },
  overview: {
    summary: "Mechanical engineers design, develop, and oversee the manufacture of a wide range of products—from medical devices to new batteries. They also design power-producing machines such as electric generators and internal combustion engines.",
    descriptor: "Plans, designs, organises and oversees the assembly, erection, operation and maintenance of mechanical and process plant, installations and equipment; and designs and develops mechanical systems for energy production, manufacturing, and transport.",
    coreTasks: [
      "Designs mechanical equipment, machinery, components, products for manufacture, and plant systems.",
      "Organises and directs the project team and processes for assembly and installation.",
      "Establishes control systems to ensure efficient operation and safety of plants."
    ],
    primarySectors: ["Manufacturing", "Automotive", "Engineering Services"],
    mersetaSubsectors: ["Metal Chamber", "Motor Chamber", "Auto Chamber"],
    workActivities: [
      { name: "Drafting & Designing", score: "60%", percent: 60 },
      { name: "Project Coordinating", score: "40%", percent: 40 }
    ]
  },
  skillsAndKnowledge: {
    knowledge: [
      { name: "Thermodynamics", score: "90%", percent: 90 },
      { name: "Fluid Mechanics", score: "85%", percent: 85 },
      { name: "Materials Science", score: "75%", percent: 75 }
    ],
    hardSkills: [
      { name: "Computer-Aided Design (CAD)", desc: "Expert proficiency in AutoCAD, SolidWorks, and Fusion 360", percent: 92 },
      { name: "Project Management", desc: "Scheduling, budgeting, and stakeholder coordination", percent: 78 },
      { name: "Finite Element Analysis", desc: "Structural and thermal simulation using ANSYS and Abaqus", percent: 70 },
      { name: "Manufacturing Processes", desc: "CNC machining, welding, and additive manufacturing", percent: 80 }
    ],
    attitudes: [
      "ANALYTICAL MINDSET",
      "DETAIL ORIENTED",
      "SAFETY CONSCIOUSNESS",
      "ETHICAL CONDUCT",
      "PROBLEM SOLVING",
      "CONTINUOUS LEARNING"
    ],
    softSkills: [
      { name: "Communication", score: "85%", percent: 85 },
      { name: "Teamwork", score: "80%", percent: 80 },
      { name: "Leadership", score: "72%", percent: 72 }
    ]
  },
  education: {
    requirements: [
      "Bachelor of Science in Engineering (Mechanical)",
      "Registered Professional Engineer (Pr.Eng) with ECSA",
      "Minimum 3 years post-qualification candidacy training"
    ],
    providers: [
      { name: "University of the Witwatersrand", location: "Johannesburg", course: "BSc Eng (Mechanical)" },
      { name: "University of Cape Town", location: "Cape Town", course: "BSc Eng (Mechanical)" },
      { name: "University of Pretoria", location: "Pretoria", course: "BEng (Mechanical)" }
    ],
    certifications: [
      "ECSA Professional Registration",
      "Government Certificate of Competency (GCC)",
      "SolidWorks Professional (CSWP)"
    ]
  },
  laborMarket: {
    growthRate: "+4.8% YoY",
    unemploymentRate: "Low (< 2%)",
    topCities: [
      { city: "Johannesburg", share: "45%" },
      { city: "Durban", share: "25%" },
      { city: "Port Elizabeth", share: "20%" }
    ],
    postingsTrend: [
      { year: "2021", count: 850 },
      { year: "2022", count: 1020 },
      { year: "2023", count: 1248 }
    ]
  }
};
