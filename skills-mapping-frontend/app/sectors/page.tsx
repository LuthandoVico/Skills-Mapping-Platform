import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectorCard from "@/components/home/SectorCard";
import { sectors } from "@/data/sectors";

export default function SectorsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-[#f5f7fa]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="mb-8">
            <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-none">
              Explore All Sectors
            </h1>
            <p className="text-[14px] text-[#6b7280] mt-2">
              Browse the defined occupational sectors within the National Skills Registry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector) => (
              <SectorCard key={sector.id} sector={sector} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
