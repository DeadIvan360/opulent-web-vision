import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoAtom from "@/assets/Atom_Studios_sin_fondo_1.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-luxury" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 transition-luxury"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logoAtom} alt="Atom Studios" className="h-12 w-auto" />
          </motion.button>

          <nav className="hidden md:flex items-center gap-8">
            {["Inicio", "Clientes", "Precios", "Contacto"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="text-sm tracking-wide text-muted-foreground hover:text-luxury-gold transition-luxury relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
