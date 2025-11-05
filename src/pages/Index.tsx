import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import { Timeline } from "@/components/Timeline";
import { timelineData } from "@/components/TimelineData";
import Pricing from "@/components/Pricing";
import WovenLightSection from "@/components/WovenLightSection"; // 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero /> {/* <-- Tu Hero original se queda intacto */}
        <Clients />
        <Timeline data={timelineData} />
        <Pricing />

        {/* --- SECCIÓN DE ANIMACIÓN AÑADIDA --- */}
        <WovenLightSection />
        {/* --- FIN DE LA SECCIÓN --- */}

        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
