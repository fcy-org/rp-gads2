import { AlertTriangle, TrendingDown, Clock, PackageX } from "lucide-react";

const problems = [
  { icon: PackageX, title: "Prateleiras vazias", desc: "Cliente entra, não acha o que precisa e nunca mais volta." },
  { icon: TrendingDown, title: "Margens apertadas", desc: "Comprando do atravessador, sua lucratividade despenca." },
  { icon: Clock, title: "Entregas atrasadas", desc: "Fornecedor que some na hora que você mais precisa." },
  { icon: AlertTriangle, title: "Pedido mínimo alto", desc: "Capital travado em estoque que não gira." },
];

export const Problem = () => (
  <section className="bg-muted py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          <AlertTriangle className="h-3.5 w-3.5" /> Reconhece esses problemas?
        </span>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          O que está <span className="text-primary">travando</span> o crescimento da sua loja
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border-l-4 border-accent bg-card p-5 shadow-card">
            <Icon className="h-7 w-7 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
