import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const clients = [
  { name: "Luxe Brands", logo: "LB" },
  { name: "Elite Ventures", logo: "EV" },
  { name: "Premier Corp", logo: "PC" },
  { name: "Prestige Group", logo: "PG" },
];

const testimonials = [
  {
    text: "WebTomic transformó nuestra presencia digital. El resultado superó todas nuestras expectativas.",
    author: "María González",
    company: "Luxe Brands",
  },
  {
    text: "Profesionalismo absoluto. Crearon un sitio que realmente refleja la esencia de nuestra marca premium.",
    author: "Carlos Méndez",
    company: "Elite Ventures",
  },
  {
    text: "La atención al detalle y la calidad del diseño son incomparables. Una inversión que valió la pena.",
    author: "Ana Rodríguez",
    company: "Premier Corp",
  },
];

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clientes" ref={ref} className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            Clientes que confían en la{" "}
            <span className="text-luxury-gold">excelencia</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Marcas premium que eligieron WebTomic
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center justify-center h-32 bg-secondary border border-border rounded-lg group cursor-pointer transition-luxury hover:border-luxury-gold"
            >
              <div className="text-4xl font-light text-muted-foreground group-hover:text-luxury-gold transition-luxury">
                {client.logo}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-secondary border border-luxury-gold/20 rounded-lg p-8 hover:border-luxury-gold/50 transition-luxury group"
            >
              <Quote className="h-8 w-8 text-luxury-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <p className="text-foreground/90 mb-6 font-light leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-normal text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
