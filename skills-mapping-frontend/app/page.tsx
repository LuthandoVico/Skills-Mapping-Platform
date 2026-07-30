import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import SectorsBrowse from "@/components/home/SectorsBrowse";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* Partners Section */}
        <section className="bg-white border-y border-[#e5e8ed] py-10 w-full">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <span className="text-[#1d3557] text-[12px] font-sans font-bold uppercase tracking-[1.5px] block">
                Partnered Institutions &amp; Sponsors
              </span>
              <span className="text-gray-400 text-[13px] font-sans mt-0.5 block">
                Collaborating on national competency taxonomy standards
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-6 sm:gap-8 w-full xl:w-auto">
              
              {/* Wits Card */}
              <div className="flex items-center gap-4 bg-white border border-[#e5e8ed] hover:border-[#1d3557]/20 p-4 rounded-2xl hover:shadow-[0px_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 select-none cursor-default shrink-0">
                <img 
                  src="/Wits2.png" 
                  alt="University of the Witwatersrand" 
                  className="h-14 w-auto object-contain select-none"
                />
                <div className="flex flex-col font-sans">
                  <span className="text-[#1d3557] font-bold text-[14px] leading-tight">Wits University</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">Research Partner</span>
                </div>
              </div>

              {/* merSETA Card */}
              <div className="flex items-center gap-4 bg-white border border-[#e5e8ed] hover:border-[#1d3557]/20 p-4 rounded-2xl hover:shadow-[0px_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 select-none cursor-default shrink-0">
                <img 
                  src="/merseta.png" 
                  alt="merSETA" 
                  className="h-12 w-auto object-contain select-none"
                />
                <div className="flex flex-col font-sans">
                  <span className="text-[#1d3557] font-bold text-[14px] leading-tight">merSETA</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">Funding &amp; Standards SETA</span>
                </div>
              </div>

              {/* REAL Card */}
              <div className="flex items-center gap-4 bg-white border border-[#e5e8ed] hover:border-[#1d3557]/20 p-4 rounded-2xl hover:shadow-[0px_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 select-none cursor-default shrink-0">
                <img 
                  src="/REAL.jpg" 
                  alt="REAL Centre" 
                  className="h-13 w-auto object-contain select-none"
                />
                <div className="flex flex-col font-sans">
                  <span className="text-[#1d3557] font-bold text-[14px] leading-tight">REAL Centre</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">Education &amp; Labour Research</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <SectorsBrowse />
      </main>
      <Footer />
    </>
  );
}
