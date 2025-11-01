import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "Ideal para emprendedores que inician",
    price: "1,500",
    features: [
      "Diseño responsive premium",
      "Hasta 5 páginas",
      "SEO básico optimizado",
      "Formulario de contacto",
      "1 mes de soporte",
    ],
  },
  {
    name: "Pro",
    description: "Para negocios en crecimiento",
    price: "3,500",
    featured: true,
    features: [
      "Todo de Starter, más:",
      "Hasta 10 páginas personalizadas",
      "Animaciones avanzadas",
      "Integración con APIs",
      "SEO avanzado",
      "3 meses de soporte premium",
    ],
  },
  {
    name: "Elite",
    description: "Experiencia web personalizada de lujo",
    price: "A consultar",
    features: [
      "Diseño 100% personalizado",
      "Páginas ilimitadas",
      "Funcionalidades a medida",
      "Panel de administración",
      "Optimización premium",
      "Soporte prioritario anual",
    ],
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="precios" ref={ref} className="py-32 luxury-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            Planes y <span className="text-luxury-gold">Soluciones</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Selecciona la experiencia que mejor eleve tu marca
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-card border rounded-lg p-8 transition-luxury relative group ${
                plan.featured
                  ? "border-luxury-gold shadow-gold-glow"
                  : "border-border hover:border-luxury-gold/50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-luxury-gold text-pure-black px-4 py-1 rounded-full text-sm font-normal">
                  Más Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-normal mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm font-light mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-luxury-gold">
                    {plan.price === "A consultar" ? plan.price : `$${plan.price}`}
                  </span>
                  {plan.price !== "A consultar" && (
                    <span className="text-muted-foreground ml-2">USD</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToSection("contacto")}
                className={`w-full transition-luxury ${
                  plan.featured
                    ? "bg-luxury-gold text-pure-black hover:bg-luxury-gold-bright shadow-gold-glow"
                    : "bg-secondary border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-pure-black"
                }`}
              >
                Comenzar ahora
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
