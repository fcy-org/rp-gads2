import { Play } from "lucide-react";
import truck from "@/assets/truck.jpg";

export const VideoSection = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight text-center">
      <span className="text-sm font-bold uppercase tracking-wider text-primary">Conheça a Rio Piranhas</span>
      <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
        Veja por dentro do nosso <span className="text-primary">centro de distribuição</span>
      </h2>

      <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl shadow-blue">
        <img src={truck} alt="Caminhão de entrega Rio Piranhas" width={1400} height={900} loading="lazy" className="w-full" />
        <div className="absolute inset-0 bg-primary-deep/40" />
        <button
          aria-label="Reproduzir vídeo"
          className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-cta transition-all hover:scale-110 sm:h-24 sm:w-24"
        >
          <Play className="ml-1 h-9 w-9 fill-current" />
        </button>
      </div>
    </div>
  </section>
);
