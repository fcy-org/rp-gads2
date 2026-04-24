import { Truck, Headphones, Wallet, Award, Clock, ShieldCheck } from "lucide-react";

const items = [
  { icon: Truck, title: "Frete grátis", desc: "Para pedidos qualificados em todo MA e PI." },
  { icon: Clock, title: "Entrega em 48h", desc: "Logística própria, prazo cumprido sempre." },
  { icon: Wallet, title: "Preço de fornecedor", desc: "Compre direto, sem atravessador." },
  { icon: Headphones, title: "Consultor dedicado", desc: "WhatsApp direto, sem URA, sem fila." },
  { icon: Award, title: "52 anos de mercado", desc: "Tradição e solidez no Nordeste." },
  { icon: ShieldCheck, title: "Garantia total", desc: "Produtos originais, nota fiscal sempre." },
];

export const Differential = () => (
  <section className="relative overflow-hidden bg-gradient-blue py-16 text-primary-foreground sm:py-20">
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />
    <div className="container-tight relative">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-accent">Diferenciais</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Por que lojistas escolhem a <span className="text-accent">Rio Piranhas</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/20 transition-all hover:bg-white/15"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-white/85">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
