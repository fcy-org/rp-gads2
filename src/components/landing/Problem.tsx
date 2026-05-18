import { AlertTriangle, TrendingDown, Clock, PackageX } from "lucide-react";

const problems = [
  { icon: PackageX, title: "Produtos que não giram", desc: "Dinheiro parado no estoque." },
  { icon: TrendingDown, title: "Margem apertada", desc: "Comprando errado, sua loja lucra menos." },
  { icon: AlertTriangle, title: "Falta dos produtos certos", desc: "Cliente procura e compra em outro lugar." },
  { icon: Clock, title: "Fornecedor sem agilidade", desc: "Reposição lenta trava suas vendas." },
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
