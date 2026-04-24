import { MessageCircle, ClipboardList, Truck, PackageCheck } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "1. Fale com um consultor", desc: "Responda 3 perguntas rápidas e receba contato no WhatsApp." },
  { icon: ClipboardList, title: "2. Monte seu pedido", desc: "Catálogo digital com preços de fornecedor direto." },
  { icon: Truck, title: "3. Receba em 48h", desc: "Frete grátis para todo MA e PI nas condições combinadas." },
  { icon: PackageCheck, title: "4. Venda mais", desc: "Estoque cheio, margem maior, cliente satisfeito." },
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
        <div className="grid gap-6 lg:grid-cols-4">
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
