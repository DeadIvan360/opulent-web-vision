import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import { Timeline } from "@/components/Timeline";
import { timelineData } from "@/components/TimelineData";
import Pricing from "@/components/Pricing";
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
