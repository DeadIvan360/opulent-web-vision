import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import { Timeline } from "@/components/Timeline";
import { timelineData } from "@/components/TimelineData";
import Pricing from "@/components/Pricing";
import { SplineScene } from "@/components/SplineScene"; // <-- Esta línea es la que busca el archivo
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Clients />
        <Timeline data={timelineData} />
        <Pricing />

        {/* --- SECCIÓN DE SPLINE AÑADIDA --- */}
        <section id="spline-animation" className="h-[500px] w-full">
          {/* ¡IMPORTANTE! 
            CAMBIA LA URL de "scene" por la URL de tu propia escena de Spline.
          */}
          <SplineScene scene="https://prod.spline.design/T-A2R1-m6A-pl3-a/scene.splinecode" className="w-full h-full" />
        </section>
        {/* --- FIN DE LA SECCIÓN DE SPLINE --- */}

        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
