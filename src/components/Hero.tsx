import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import videoFondo from "@/assets/VideoFondo.mp4";
import { useEffect, useRef } from "react";

const Hero = () => {
  const gradientRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });

    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(203, 161, 53, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(203, 161, 53, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover video-background">
        <source src={videoFondo} type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-pure-black/60" />

      {/* SVG Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full z-[1]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(203,161,53,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
        <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
        <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
        <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
        <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
      </svg>

      {/* Corner elements */}
      <div className="corner-element top-8 left-8 z-[2]" style={{ animationDelay: "4s" }}>
        <div className="absolute top-0 left-0 w-2 h-2 bg-luxury-gold opacity-30"></div>
      </div>
      <div className="corner-element top-8 right-8 z-[2]" style={{ animationDelay: "4.2s" }}>
        <div className="absolute top-0 right-0 w-2 h-2 bg-luxury-gold opacity-30"></div>
      </div>
      <div className="corner-element bottom-8 left-8 z-[2]" style={{ animationDelay: "4.4s" }}>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-luxury-gold opacity-30"></div>
      </div>
      <div className="corner-element bottom-8 right-8 z-[2]" style={{ animationDelay: "4.6s" }}>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-luxury-gold opacity-30"></div>
      </div>

      {/* Floating elements */}
      <div className="floating-element z-[2]" style={{ top: "25%", left: "15%", animationDelay: "5s" }}></div>
      <div className="floating-element z-[2]" style={{ top: "60%", left: "85%", animationDelay: "5.5s" }}></div>
      <div className="floating-element z-[2]" style={{ top: "40%", left: "10%", animationDelay: "6s" }}></div>
      <div className="floating-element z-[2]" style={{ top: "75%", left: "90%", animationDelay: "6.5s" }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-normal tracking-tight mb-6 leading-tight"
          >
            <span className="word" data-delay="400">
              Creamos
            </span>{" "}
            <span className="word" data-delay="550">
              sitios
            </span>{" "}
            <span className="word" data-delay="700">
              web
            </span>{" "}
            <span className="word" data-delay="850">
              que
            </span>{" "}
            <span className="text-luxury-gold word" data-delay="1000">
              llenan
            </span>{" "}
            <span className="text-luxury-gold word" data-delay="1150">
              tu
            </span>{" "}
            <span className="text-luxury-gold word" data-delay="1300">
              mesa
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-foreground/80 mb-12 font-light"
          >
            <span className="word" data-delay="1500">
              Tu
            </span>{" "}
            <span className="word" data-delay="1600">
              presencia
            </span>{" "}
            <span className="word" data-delay="1700">
              digital
            </span>{" "}
            <span className="word" data-delay="1800">
              rentable:
            </span>{" "}
            <span className="word" data-delay="1950">
              optimizada,
            </span>{" "}
            <span className="word" data-delay="2100">
              rápida
            </span>{" "}
            <span className="word" data-delay="2200">
              y
            </span>{" "}
            <span className="word" data-delay="2300">
              lista
            </span>{" "}
            <span className="word" data-delay="2400">
              para
            </span>{" "}
            <span className="word" data-delay="2500">
              recibir
            </span>{" "}
            <span className="word" data-delay="2600">
              clientes
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection("contacto")}
              size="lg"
              className="bg-luxury-gold text-pure-black hover:bg-luxury-gold-bright font-normal tracking-wide transition-luxury shadow-gold-glow group px-8 py-6 text-lg"
            >
              Solicita tu sitio premium
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("clientes")}
              variant="outline"
              size="lg"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-pure-black transition-luxury px-8 py-6 text-lg"
            >
              Ver proyectos
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-luxury-gold rounded-full mt-2" />
        </motion.div>
      </motion.div>

      {/* Mouse gradient effect */}
      <div
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0 z-[3]"
        style={{
          background: "radial-gradient(circle, rgba(203, 161, 53, 0.15) 0%, transparent 100%)",
        }}
      ></div>

      {/* Gradiente de transición hacia la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-background/30 to-background z-[4] pointer-events-none" />
    </section>
  );
};

export default Hero;
