import { Check } from "lucide-react";

const conditions = [
  "Pedido mínimo acessível e flexível",
  "Pagamento facilitado: boleto, Pix ou faturado",
  "Frete grátis para pedidos qualificados",
  "Catálogo digital com preço atualizado",
  "Bonificações e brindes em campanhas",
  "Consultor dedicado via WhatsApp",
];

export const Conditions = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Condições comerciais</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Feito para o seu fluxo de caixa
        </h2>
      </div>

      <div className="mt-8 inline-block w-full rounded-2xl bg-accent px-6 py-5 text-center shadow-cta sm:px-8">
        <p className="font-display text-lg font-extrabold text-accent-foreground sm:text-xl">
          💰 A maioria começa com pedidos a partir de <span className="underline decoration-2 underline-offset-4">R$ 800</span>
        </p>
      </div>

      <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {conditions.map((c) => (
          <li key={c} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium text-foreground">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
