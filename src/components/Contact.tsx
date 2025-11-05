import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react"; // Importamos los hooks necesarios
import { MessageSquare, Linkedin, Send } from "lucide-react"; // Importamos los iconos
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to a backend
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" ref={ref} className="py-32 bg-card">
      <div className="max-w-screen-xl mx-auto px-4 text-muted-foreground gap-12 md:px-8 lg:flex">
        {/* Columna Izquierda: Título y Descripción */}
        <div className="max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-foreground text-3xl font-semibold sm:text-4xl">Conectemos</h3>
            <p className="mt-3 text-xl font-light">Conversemos sobre tu próximo proyecto premium.</p>
          </motion.div>
        </div>

        {/* Columna Derecha: Formulario y Enlaces */}
        <div className="flex-1 mt-12 lg:mt-0">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className="bg-secondary border-border focus:border-luxury-gold transition-luxury h-14 text-lg"
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-secondary border-border focus:border-luxury-gold transition-luxury h-14 text-lg"
              />
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Cuéntanos sobre tu proyecto..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="bg-secondary border-border focus:border-luxury-gold transition-luxury text-lg resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-luxury-gold text-pure-black hover:bg-luxury-gold-bright transition-luxury shadow-gold-glow group h-14 text-lg font-normal"
            >
              Enviar Mensaje
              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            <a
              href="https://wa.me/1234567890" // Reemplaza con tu número de WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-luxury-gold transition-luxury group"
            >
              <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>

            <div className="w-px h-6 bg-border" />

            <a
              href="https://linkedin.com" // Reemplaza con tu perfil de LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-luxury-gold transition-luxury group"
            >
              <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
