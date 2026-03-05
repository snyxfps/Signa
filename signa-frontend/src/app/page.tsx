import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SignsPreview } from "@/components/landing/SignsPreview";
import { PricingSection } from "@/components/landing/PricingSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden bg-cosmic-50 text-white">
        {/* Background cosmic blur elements common for the whole page */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nebula-600/20 rounded-full blur-3xl pointer-events-none" />

        <Hero />
        <FeaturesSection />
        <SignsPreview />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
