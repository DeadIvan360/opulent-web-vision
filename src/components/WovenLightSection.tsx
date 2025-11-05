"use client";
import React from "react";
import { WovenMagic } from "./ui/WovenMagic"; // Asumiendo que este componente existe en ui

export function WovenLightSection() {
  return (
    <div className="relative w-full bg-background py-20 md:py-32 overflow-hidden">
      <WovenMagic />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          Diseño Exclusivo, <span className="text-luxury-gold">Rendimiento Inigualable</span>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mt-6">
          Programamos a medida para que tu sitio no solo se vea increíble, sino que funcione a la perfección.
        </p>
      </div>
    </div>
  );
}
