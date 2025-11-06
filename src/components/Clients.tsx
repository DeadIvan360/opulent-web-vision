import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/blocks/animated-gallery"
import { Button } from "@/components/ui/button"
import { VideoIcon } from "lucide-react"

// ✅ Importa tus videos locales desde src/assets/videos/
import client1 from "@/assets/client1.mp4"
import client2 from "@/assets/client2.mp4"
import client3 from "@/assets/client3.mp4"
import client4 from "@/assets/client4.mp4"
import client5 from "@/assets/client5.mp4"
import client6 from "@/assets/client6.mp4"
import client7 from "@/assets/client7.mp4"
import client8 from "@/assets/client8.mp4"
import client9 from "@/assets/client9.mp4"
import client10 from "@/assets/client10.mp4"
import client11 from "@/assets/client11.mp4"
import client12 from "@/assets/client12.mp4"

// ✅ Agrupamos los videos en tres columnas (puedes cambiar el orden si gustas)
const VIDEOS_1 = [client1, client2, client3, client4]
const VIDEOS_2 = [client5, client6, client7, client8]
const VIDEOS_3 = [client9, client10, client11, client12]

export default function Clients() {
  return (
    <div className="relative bg-background" id="clientes">
      {/* Gradiente de transición desde el header */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent z-[9998]" />
      {/* ======= ENCABEZADO CON ANIMACIONES ======= */}
      <ContainerStagger className="relative z-[9999] -mb-12 place-self-center px-6 pt-12 text-center">
        <ContainerAnimated>
          <h1 className="font-serif text-4xl font-extralight md:text-5xl">
            Tu{" "}
            <span className="font-serif font-extralight text-luxury-gold">
              fuente única
            </span>
          </h1>
        </ContainerAnimated>

        <ContainerAnimated>
          <h1 className="font-serif text-4xl font-extralight md:text-5xl">
            para todos tus diseños
          </h1>
        </ContainerAnimated>

        <ContainerAnimated className="my-4">
          <p className="leading-normal tracking-tight text-muted-foreground">
            Sin pérdida de tiempo ni dinero, te proporcionamos
            <br /> una colección de diseños para planificar tu próximo proyecto.
          </p>
        </ContainerAnimated>

        <ContainerAnimated>
          <Button className="gap-1 bg-luxury-gold hover:bg-luxury-gold/90">
            Reserva una llamada gratis <VideoIcon className="size-4" />
          </Button>
          <Button variant={"link"} className="text-foreground">
            Sobre Nosotros
          </Button>
        </ContainerAnimated>
      </ContainerStagger>

      {/* ======= EFECTO DE LUZ DORADA DE FONDO ======= */}
      <div
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--primary)), hsl(var(--luxury-gold)), hsl(var(--primary)))",
          filter: "blur(84px)",
          mixBlendMode: "screen",
        }}
      />

      {/* ======= GALERÍA ANIMADA DE VIDEOS ======= */}
      <ContainerScroll className="relative h-[350vh]">
        <ContainerSticky className="h-svh">
          <GalleryContainer>
            {/* Columna 1 */}
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {VIDEOS_1.map((videoSrc, index) => (
                <video
                  key={index}
                  src={videoSrc}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ))}
            </GalleryCol>

            {/* Columna 2 */}
            <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
              {VIDEOS_2.map((videoSrc, index) => (
                <video
                  key={index}
                  src={videoSrc}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ))}
            </GalleryCol>

            {/* Columna 3 */}
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {VIDEOS_3.map((videoSrc, index) => (
                <video
                  key={index}
                  src={videoSrc}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
