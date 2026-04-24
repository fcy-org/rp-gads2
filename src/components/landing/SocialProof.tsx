import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "João Mendes",
    role: "Mercadinho Bom Preço · São Luís/MA",
    text: "Em 2 meses meu giro de fraldas dobrou. Entrega sempre no prazo e o consultor é parceiro mesmo.",
  },
  {
    name: "Maria Sousa",
    role: "Farmácia Saúde · Teresina/PI",
    text: "Saí do atravessador e minha margem aumentou 18%. Hoje só compro com a Rio Piranhas.",
  },
  {
    name: "Carlos Lima",
    role: "Atacado Lima · Caxias/MA",
    text: "Atendimento via WhatsApp resolve tudo na hora. Fornecedor sério e com preço de verdade.",
  },
];

export const SocialProof = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
          <Star className="h-4 w-4 fill-primary-deep text-primary-deep" />
          <span className="text-primary-deep">4.9/5 · +1.200 avaliações</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Quem compra com a gente, <span className="text-primary">não troca por nada</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Quote className="h-7 w-7 text-accent" />
            <p className="mt-3 text-sm leading-relaxed text-foreground">{r.text}</p>
            <div className="mt-4 flex gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="mt-3">
              <div className="font-display font-bold text-foreground">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.role}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
