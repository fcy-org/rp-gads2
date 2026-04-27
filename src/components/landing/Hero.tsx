import logo from "@/assets/logo.png";
import hero from "@/assets/hero-warehouse.jpg";
import { Button } from "@/components/ui/button";
import { LeadForm } from "./LeadForm";
import { Check, MessageCircle } from "lucide-react";

const bullets = [
  "52 anos de mercado",
  "+2.800 clientes ativos",
  "Entrega em até 48h",
  "Atendimento via WhatsApp",
];

export const Hero = () => {
  return (
    <header className="relative overflow-hidden">
      <img
        src={hero}
        alt="Centro de distribuição Rio Piranhas com produtos de giro e caminhões de entrega"
        width={1600}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero animate-flow" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/30 via-transparent to-primary-deep/40" />

      <div className="container-tight relative z-10 flex flex-col gap-10 pb-20 pt-6 lg:flex-row lg:items-center lg:gap-12 lg:py-20">
        {/* Top bar */}
        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6">
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur">
            <img src={logo} alt="Rio Piranhas" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-sm font-extrabold text-primary-deep">RIO PIRANHAS</span>
          </div>
          <a
            href="#form"
            className="hidden rounded-full bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-cta sm:inline-block"
          >
            Falar agora
          </a>
        </div>

        {/* Content */}
        <div className="mt-12 flex-1 text-white lg:mt-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            🚚 Distribuidora oficial · MA & PI
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
            Pare de perder venda por <span className="text-accent">falta de fraldas, cosméticos</span> e produtos de giro
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Fornecedor direto para empresas no <strong className="text-accent">Maranhão e Piauí</strong> com entrega rápida e frete grátis.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm font-semibold sm:text-base">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 text-sm text-white/85">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=faces&fit=crop" alt="Cliente" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&crop=faces&fit=crop" alt="Cliente" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&crop=faces&fit=crop" alt="Cliente" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              </div>
              <span>+2.800 lojistas confiam</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div id="form" className="w-full flex-1 lg:max-w-md">
          <LeadForm />
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-divider-white absolute bottom-0 left-0 right-0 h-12 sm:h-16" />
    </header>
  );
};
