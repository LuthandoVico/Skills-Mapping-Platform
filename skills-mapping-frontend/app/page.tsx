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
        <SectorsBrowse />
      </main>
      <Footer />
    </>
  );
}
