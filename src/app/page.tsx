import Hero from "@/components/ui/Landing/Hero";
import FeatureVerbs from "@/components/ui/Landing/FeatureVerbs";
import PresentationGabin from "@/components/ui/Landing/PresentationGabin";
import BetaProgram from "@/components/ui/Landing/BetaProgram";
import Footer from "@/components/ui/Footer";
import ContactCTA from "@/components/ui/Landing/ContactCTA";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--background]">
      <Header transparent={true} />
      <Hero />
      <FeatureVerbs />
      <PresentationGabin />
      <BetaProgram />
      <ContactCTA />
      <Footer />
    </div>
  );
}
