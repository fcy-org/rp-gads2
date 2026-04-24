import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const STEPS = [
  {
    key: "segment",
    title: "Qual o segmento da sua empresa?",
    options: ["Mercado / Mercadinho", "Farmácia", "Atacado / Distribuidor", "Loja de Cosméticos", "Outro"],
  },
  {
    key: "volume",
    title: "Qual seu volume mensal de compras?",
    options: ["Até R$ 800", "R$ 800 a R$ 3.000", "R$ 3.000 a R$ 10.000", "Acima de R$ 10.000"],
  },
  {
    key: "state",
    title: "Em qual estado sua empresa atua?",
    options: ["Maranhão (MA)", "Piauí (PI)", "Outro"],
  },
] as const;

export const LeadForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "", cnpj: "" });

  const isFinal = step === STEPS.length;
  const progress = ((step + (isFinal ? 1 : 0)) / (STEPS.length + 1)) * 100;

  const select = (value: string) => {
    setAnswers((p) => ({ ...p, [STEPS[step].key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.whatsapp || !contact.cnpj) {
      toast.error("Preencha todos os campos para continuar");
      return;
    }
    toast.success("Recebemos seu cadastro! Em breve entraremos em contato via WhatsApp.");
    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}, CNPJ ${contact.cnpj}. Quero falar com um consultor Rio Piranhas. Segmento: ${answers.segment}, Volume: ${answers.volume}, Estado: ${answers.state}.`,
    );
    window.open(`https://wa.me/5598000000000?text=${msg}`, "_blank");
  };

  return (
    <div className="rounded-2xl bg-card p-5 shadow-blue ring-1 ring-border sm:p-7">
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Etapa {Math.min(step + 1, STEPS.length + 1)} de {STEPS.length + 1}</span>
          <span className="text-primary">{Math.round(progress)}% concluído</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-blue transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isFinal ? (
        <div key={step} className="animate-float-up">
          <h3 className="mb-4 font-display text-xl font-bold text-foreground sm:text-2xl">
            {STEPS[step].title}
          </h3>
          <div className="space-y-2">
            {STEPS[step].options.map((opt) => {
              const active = answers[STEPS[step].key] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => select(opt)}
                  className={`group flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background hover:border-primary hover:bg-primary-soft"
                  }`}
                >
                  <span>{opt}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" /> Voltar
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={submit} className="animate-float-up space-y-3">
          <h3 className="font-display text-xl font-bold sm:text-2xl">Falta pouco! Onde te chamamos?</h3>
          <p className="text-sm text-muted-foreground">Resposta em até 5 minutos no horário comercial.</p>
          <div className="space-y-3 pt-2">
            <div>
              <Label htmlFor="name" className="text-xs font-semibold">Seu nome</Label>
              <Input id="name" placeholder="Nome completo" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="cnpj" className="text-xs font-semibold">CNPJ da empresa</Label>
              <Input id="cnpj" placeholder="00.000.000/0000-00" value={contact.cnpj} onChange={(e) => setContact({ ...contact, cnpj: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="wa" className="text-xs font-semibold">WhatsApp</Label>
              <Input id="wa" placeholder="(98) 90000-0000" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
            </div>
          </div>
          <Button type="submit" variant="cta" size="xl" className="w-full animate-pulse-soft">
            <Check className="h-5 w-5" /> Quero falar com um consultor
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">
            Seus dados são confidenciais. Sem spam.
          </p>
        </form>
      )}
    </div>
  );
};
