import { Baby, Sparkles, SprayCan, Cookie, Droplets, ShoppingBasket } from "lucide-react";

const products = [
  { icon: Sparkles, title: "Cosméticos", desc: "Itens de alta saída para vender todos os dias." },
  { icon: SprayCan, title: "Higiene & Limpeza", desc: "Produtos essenciais que não podem faltar." },
  { icon: Droplets, title: "Perfumaria", desc: "Sabonetes, hidratantes e cuidados pessoais." },
  { icon: Baby, title: "Fraldas", desc: "Linhas premium e populares para giro rápido." },
  { icon: Cookie, title: "Mercearia Seca", desc: "Itens estratégicos para gôndola cheia." },
  { icon: ShoppingBasket, title: "Mix Completo", desc: "Produtos de giro em um único pedido." },
];

export const Products = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Mix de Produtos</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Os produtos que mais giram na sua loja em <span className="text-primary">um único fornecedor</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Cosméticos, higiene e perfumaria com alta saída para aumentar seu faturamento.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
        {products.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group cursor-pointer rounded-2xl border-2 border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent/5 hover:shadow-card sm:p-6"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
