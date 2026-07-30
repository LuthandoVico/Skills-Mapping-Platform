import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkillHeader from "@/components/shared/SkillHeader";

export default function SkillStatusPage() {
  return (
    <>
      <Navbar />
      <SkillHeader />
      <main className="flex-grow max-w-[1400px] mx-auto px-8 py-10 w-full bg-[#f5f7fa]">
        {/* Status Content Card */}
        <div className="bg-white border border-[#e5e8ed] rounded-[16px] p-8 lg:p-10 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] w-full">
          
          {/* Card Header: Badge & Status title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 mb-8 border-b border-[#f5f7fa] w-full">
            <div className="bg-[#d4af37] px-6 py-2.5 rounded-[14px] flex items-center justify-center shrink-0 w-[121px] h-[44px]">
              <span className="font-sans font-extrabold text-[16px] text-white tracking-[2px] uppercase select-none">
                STABLE
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans font-semibold text-[14px] text-[#1d3557] leading-[21px]">
                Current Registry Status
              </h3>
              <p className="font-sans font-normal text-[13px] text-[#1d3557] leading-[19.5px] mt-0.5 opacity-90">
                Validated by the Global Skill Mapping Engine
              </p>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            
            {/* Column 1: What is "Stable"? */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div className="border-[1.6px] border-[#d4af37] rounded-full w-6 h-6 flex items-center justify-center text-[#d4af37] text-[12px] font-bold select-none shrink-0">
                  ?
                </div>
                <h4 className="font-sans font-bold text-[15px] text-[#1d3557] leading-[22.5px]">
                  What is "Stable"?
                </h4>
              </div>
              <p className="font-sans font-normal text-[13px] text-[#6b7280] leading-[22px] mt-4">
                A <span className="font-semibold text-[#1d3557]">Stable</span> status indicates that the skill has <span className="text-[#1d3557] font-semibold">maintained a consistent level of demand in the labor market for at least 36 months</span>. These skills are considered "core requirements" for the occupations they are associated with and carry <span className="text-[#1d3557] font-semibold">low risk for professional obsolescence</span>.
              </p>
            </div>

            {/* Column 2: Status Classifications */}
            <div className="flex flex-col items-start">
              <h4 className="font-sans font-bold text-[15px] text-[#1d3557] leading-[22.5px]">
                Status Classifications
              </h4>
              <div className="flex flex-col gap-4 mt-5 w-full">
                
                {/* Stable */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#d4af37] rounded-full w-2.5 h-2.5 shrink-0" />
                  <p className="font-sans text-[13px] text-[#1d3557] leading-[20px]">
                    <span className="font-semibold">Stable:</span> High consistency, low market volatility.
                  </p>
                </div>

                {/* Emerging */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#1d3557] rounded-full w-2.5 h-2.5 shrink-0" />
                  <p className="font-sans text-[13px] text-[#1d3557] leading-[20px]">
                    <span className="font-semibold">Emerging:</span> Rapidly increasing demand, new applications.
                  </p>
                </div>

                {/* Niche */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#9ca3af] rounded-full w-2.5 h-2.5 shrink-0" />
                  <p className="font-sans text-[13px] text-[#1d3557] leading-[20px]">
                    <span className="font-semibold">Niche:</span> Highly specialized, specific industry focus.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
