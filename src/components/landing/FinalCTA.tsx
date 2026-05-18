import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24">
    <div className="absolute inset-0 bg-gradient-blue animate-flow" />
    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
    <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

    <div className="container-tight relative text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
        <Sparkles className="h-4 w-4" /> Vagas limitadas neste mês
      </span>
      <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-5xl">
        Abasteça sua loja com produtos que <span className="text-accent">realmente giram</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
        Receba atendimento no WhatsApp e veja os produtos mais vendidos para sua região.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          variant="cta"
          size="xl"
          className="h-auto min-h-14 whitespace-normal py-3 text-center leading-tight animate-pulse-soft"
          onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
        >
          <MessageCircle className="h-5 w-5" /> Clique em Saiba Mais e receba preços de atacado
        </Button>
      </div>

      <p className="mt-4 text-sm text-white/80">
        ⚡ Resposta em até 5 minutos no horário comercial
      </p>
    </div>
  </section>
);
