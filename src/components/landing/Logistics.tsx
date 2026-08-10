import map from "@/assets/Mapa.png";
import { MapPin, Truck } from "lucide-react";

const stats = [
  { v: "100%", l: "MA & PI cobertos" },
  { v: "48h", l: "Prazo médio" },
  { v: "+2.800", l: "Lojistas atendidos" },
  { v: "12", l: "Rotas próprias" },
];

export const Logistics = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight grid items-center gap-10 lg:grid-cols-2">
      <div>
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Logística</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Cobertura total no <span className="text-primary">Maranhão e Piauí</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Frota própria, rotas otimizadas e equipe local. Onde sua loja estiver, a gente chega.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-4">
              <div className="font-display text-3xl font-extrabold text-primary">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-accent/15 p-4 ring-1 ring-accent/40">
          <Truck className="h-6 w-6 text-primary-deep" />
          <p className="text-sm font-semibold text-foreground">
            <span className="text-primary-deep">Atendemos toda a região:</span> São Luís, Teresina, Imperatriz, Caxias, Parnaíba e mais.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-3xl bg-primary-soft p-4 shadow-blue">
          <img
            src={map}
            alt="Mapa de cobertura logística Rio Piranhas no Maranhão e Piauí"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-accent p-4 shadow-cta sm:block">
          <MapPin className="mb-1 h-5 w-5 text-accent-foreground" />
          <div className="font-display text-sm font-extrabold text-accent-foreground">+200 cidades atendidas</div>
        </div>
      </div>
    </div>
  </section>
);
