import logo from "@/assets/logo.png";
import hero from "@/assets/hero-warehouse.jpg";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import dove from "@/assets/Dove_logo.png";
import nivea from "@/assets/NIVEA-logo.png";
import colgate from "@/assets/colgate-logo-1.svg";
import palmolive from "@/assets/Palmolive_logo_2019.png";
import { LeadForm } from "./LeadForm";
import { Check } from "lucide-react";

const bullets = [
  "Produtos com maior giro",
  "Preço direto da distribuidora",
  "Entrega rápida MA e PI",
  "Atendimento direto no WhatsApp",
];

const heroBrands = [
  { name: "Dove", logo: dove },
  { name: "Nivea", logo: nivea },
  { name: "Colgate", logo: colgate },
  { name: "Palmolive", logo: palmolive },
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
            Saiba mais
          </a>
        </div>

        {/* Content */}
        <div className="mt-12 flex-1 text-white lg:mt-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            🚚 Distribuidora Atacado · MA & PI
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
            Compre direto da distribuidora atacado e <span className="text-accent">aumente sua margem</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            Cosméticos, higiene e perfumaria com alto giro e entrega rápida no <strong className="text-accent">Maranhão e Piauí</strong>.
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

          <div className="mt-8 flex items-center gap-3 text-sm text-white/85">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Lojista satisfeito ${i + 1}`}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <span>+2.800 lojistas confiam</span>
          </div>

          <div className="mt-5 max-w-lg rounded-xl bg-white/90 p-3 shadow-card backdrop-blur">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-primary-deep">
              Marcas de giro para cosméticos, higiene e perfumaria
            </p>
            <div className="grid grid-cols-4 gap-2">
              {heroBrands.map((brand) => (
                <div key={brand.name} className="flex h-10 items-center justify-center rounded-lg bg-white px-2">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-7 max-w-full object-contain" />
                </div>
              ))}
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
