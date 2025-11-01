import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Ideal para emprendedores que inician su presencia digital",
    price: 1200,
    yearlyPrice: 12000,
    buttonText: "Comenzar ahora",
    buttonVariant: "outline" as const,
    includes: [
      "Incluye:",
      "Diseño responsive premium",
      "5 páginas personalizadas",
      "Optimización SEO básica",
      "Formulario de contacto",
      "Hosting incluido (1 año)",
      "Soporte por email",
    ],
  },
  {
    name: "Pro",
    description: "Para negocios en crecimiento que buscan destacar",
    price: 2800,
    yearlyPrice: 28000,
    buttonText: "Comenzar ahora",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Todo en Starter, más:",
      "Hasta 10 páginas",
      "Integración redes sociales",
      "Blog profesional",
      "Analíticas avanzadas",
      "Chat en vivo",
      "Animaciones personalizadas",
      "Soporte prioritario",
    ],
  },
  {
    name: "Elite",
    description: "Experiencia web personalizada de lujo para marcas premium",
    price: 5500,
    yearlyPrice: 55000,
    buttonText: "Comenzar ahora",
    buttonVariant: "outline" as const,
    includes: [
      "Todo en Pro, más:",
      "Páginas ilimitadas",
      "Animaciones premium",
      "CMS personalizado",
      "E-commerce avanzado",
      "Integración con APIs",
      "Mantenimiento mensual",
      "Soporte 24/7 dedicado",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-card-black border border-luxury-gold/20 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-pure-black" : "text-muted-foreground",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-2 shadow-gold-glow border-luxury-gold bg-luxury-gold"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Mensual</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-pure-black" : "text-muted-foreground",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-2 shadow-gold-glow border-luxury-gold bg-luxury-gold"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Anual</span>
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      id="precios"
      className="min-h-screen mx-auto relative bg-background overflow-x-hidden"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(203,161,53,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(203,161,53,0.1)_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={1800}
          direction="bottom"
          speed={1}
          color="#CBA135"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
      >
        <div className="framer-1i5axl2">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
            style={{
              border: "200px solid #CBA135",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
              opacity: 0.3,
            }}
            data-border="true"
          ></div>
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
            style={{
              border: "200px solid #CBA135",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
              opacity: 0.2,
            }}
            data-border="true"
          ></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-6">
        <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Planes y Soluciones
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-muted-foreground text-lg mb-8"
        >
          Selecciona la experiencia que mejor eleve tu marca digital
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(203, 161, 53, 0.15) 0%, transparent 70%)`,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-6 mx-auto px-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative text-foreground border-border ${
                plan.popular
                  ? "bg-gradient-to-r from-card via-card-black to-card shadow-[0px_-13px_300px_0px_rgba(203,161,53,0.2)] z-20"
                  : "bg-gradient-to-r from-card via-card-black to-card z-10"
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl mb-2 font-normal">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-xs px-3 py-1 rounded-full bg-luxury-gold text-pure-black font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold">
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /{isYearly ? "año" : "mes"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  className={`w-full mb-6 p-4 text-lg rounded-xl transition-luxury ${
                    plan.popular
                      ? "bg-luxury-gold hover:bg-luxury-gold-bright shadow-gold-glow border border-luxury-gold text-pure-black font-medium"
                      : "bg-card-black hover:bg-luxury-gold/10 border border-luxury-gold/30 text-foreground"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-medium text-base mb-3 text-luxury-gold">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <span className="h-2 w-2 bg-luxury-gold/50 rounded-full grid place-content-center"></span>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
