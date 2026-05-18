import { MessageCircle, ClipboardList, Truck, PackageCheck, TrendingUp } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "1. Preencha seus dados", desc: "Informe seu segmento, volume de compra e estado." },
  { icon: MessageCircle, title: "2. Receba o catálogo no WhatsApp", desc: "Um consultor envia as condições de atacado para sua empresa." },
  { icon: TrendingUp, title: "3. Veja os produtos de maior giro", desc: "Compare itens com alta saída para sua região." },
  { icon: PackageCheck, title: "4. Monte seu pedido com um consultor", desc: "Escolha o mix certo para margem, giro e reposição." },
  { icon: Truck, title: "5. Receba rápido no MA ou PI", desc: "Entrega ágil para manter sua loja abastecida." },
];

export const HowItWorks = () => (
  <section className="bg-background py-16 sm:py-20">
    <div className="container-tight">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Como funciona</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
          Comprar com a Rio Piranhas é <span className="text-primary">simples assim</span>
        </h2>
      </div>

      <div className="relative mt-12">
        {/* Progress line - desktop */}
        <div className="absolute left-0 right-0 top-7 hidden h-1 bg-gradient-blue lg:block" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-blue ring-4 ring-background">
                <Icon className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground ring-2 ring-background">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
