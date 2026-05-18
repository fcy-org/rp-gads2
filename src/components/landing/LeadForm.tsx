import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { gtagConversion, gtagEvent } from "@/lib/gtag";
import { trackClarityLead, trackMetaLead } from "@/lib/marketing";
import { sendToSheets } from "@/lib/sheets";

const NEW_TRACKING_URL = "/api/new-tracking/leads";
const NEW_TRACKING_KEY = "u7hjat5pjvfs8m7ls2ndwefn";

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

function extractStateCode(stateAnswer: string): string {
  const match = stateAnswer.match(/\(([^)]+)\)/);
  return match ? match[1] : stateAnswer;
}

function getCookie(name: string): string {
  const match = document.cookie.split(";").find((c) => c.trim().startsWith(name + "="));
  return match ? match.split("=").slice(1).join("=").trim() : "";
}

function getFbclid(): string {
  return new URLSearchParams(window.location.search).get("fbclid") || "";
}

function getFbc(): string {
  const cookie = getCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = getFbclid();
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  return "";
}

function getFbp(): string {
  return getCookie("_fbp");
}

function getUtmsForTracking() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    utm_content: p.get("utm_content") ?? "",
    utm_term: p.get("utm_term") ?? "",
  };
}

async function sendNewTracking(
  name: string,
  phone: string,
  cnpj: string,
  state: string,
  segment: string,
  volume: string,
) {
  const stateCode = extractStateCode(state);

  try {
    await fetch(NEW_TRACKING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-lead-capture-key": NEW_TRACKING_KEY,
      },
      body: JSON.stringify({
        name,
        phone,
        email: "",
        cnpj,
        documento: cnpj,
        document: cnpj,
        state: stateCode,
        estado: stateCode,
        state_label: state,
        city: "",
        cidade: "",
        segment,
        segmento: segment,
        volume,
        fbc: getFbc(),
        fbp: getFbp(),
        event_id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        ...getUtmsForTracking(),
      }),
    });
  } catch (error) {
    console.error("New tracking request error", error);
  }
}

export const LeadForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "", cnpj: "" });
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFinal = step === STEPS.length;
  const progress = ((step + (isFinal ? 1 : 0)) / (STEPS.length + 1)) * 100;

  const startForm = () => {
    if (hasStarted) return;
    gtagEvent("form_start", { form_name: "lead_form" });
    setHasStarted(true);
  };

  const select = (value: string) => {
    const currentStep = STEPS[step];
    startForm();
    gtagEvent("form_step_complete", {
      form_name: "lead_form",
      step: step + 1,
      field: currentStep.key,
      answer: value,
    });
    setAnswers((p) => ({ ...p, [currentStep.key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!contact.name || !contact.whatsapp || !contact.cnpj) {
      toast.error("Preencha todos os campos para continuar");
      return;
    }

    setIsSubmitting(true);
    const normalizedPhone = contact.whatsapp.replace(/\D/g, "");
    const normalizedCnpj = contact.cnpj.replace(/\D/g, "");
    const segment = answers.segment ?? "";
    const volume = answers.volume ?? "";
    const state = answers.state ?? "";

    try {
      await sendToSheets({
        name: contact.name,
        whatsapp: contact.whatsapp,
        cnpj: contact.cnpj,
        segment,
        volume,
        state,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Não foi possível enviar os dados para a planilha.");
      return;
    }

    await sendNewTracking(contact.name, normalizedPhone, normalizedCnpj, state, segment, volume);

    gtagEvent("generate_lead", {
      form_name: "lead_form",
      segment,
      volume,
      state,
    });
    gtagConversion();
    trackMetaLead({ state, city: "", segment, volume });
    trackClarityLead({ state, city: "", segment, volume });

    setIsSubmitting(false);
    toast.success("Recebemos seu cadastro! Em breve entraremos em contato via WhatsApp.");
    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}, CNPJ ${contact.cnpj}. Quero receber preços de atacado e produtos de maior giro da Rio Piranhas. Segmento: ${segment}, Volume: ${volume}, Estado: ${state}.`,
    );
    const phoneNumbers: Record<string, string> = {
      "Maranhão (MA)": "558695319157",
      "Piauí (PI)": "558694271798",
    };
    const phoneNumber = phoneNumbers[state] || "558695319157";
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  };

  return (
    <div className="rounded-2xl bg-card p-5 shadow-blue ring-1 ring-border sm:p-7">
      <div className="mb-5">
        <h2 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
          Receba o catálogo de atacado no WhatsApp
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha os dados e receba atendimento direto com um consultor.
        </p>
      </div>

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
              const isCosmetics = opt === "Loja de Cosméticos";
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => select(opt)}
                  className={`group flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : isCosmetics
                        ? "border-primary bg-accent/20 hover:border-primary hover:bg-accent/30"
                        : "border-border bg-background hover:border-primary hover:bg-primary-soft"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {opt}
                    {isCosmetics && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary-foreground">
                        Mais comum
                      </span>
                    )}
                  </span>
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
        <form onSubmit={submit} onFocus={startForm} className="animate-float-up space-y-3">
          <h3 className="font-display text-xl font-bold sm:text-2xl">Veja preços de atacado e produtos de maior giro</h3>
          <p className="text-sm text-muted-foreground">Resposta em até 5 minutos no horário comercial.</p>
          <div className="space-y-3 pt-2">
            <div>
              <Label htmlFor="name" className="text-xs font-semibold">Seu nome</Label>
              <Input id="name" placeholder="Nome completo" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="cnpj" className="text-xs font-semibold">CNPJ da empresa</Label>
              <Input id="cnpj" placeholder="00.000.000/0000-00" value={contact.cnpj} onChange={(e) => setContact({ ...contact, cnpj: e.target.value })} />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Atendimento exclusivo para empresas e lojistas.
              </p>
            </div>
            <div>
              <Label htmlFor="wa" className="text-xs font-semibold">WhatsApp</Label>
              <Input id="wa" placeholder="(98) 90000-0000" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
            </div>
          </div>
          <Button
            type="submit"
            variant="cta"
            size="xl"
            className="h-auto min-h-14 w-full whitespace-normal py-3 text-center leading-tight animate-pulse-soft disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            <Check className="h-5 w-5" /> {isSubmitting ? "Enviando dados..." : "Clique em Saiba Mais e receba preços de atacado"}
          </Button>
          <ul className="space-y-1 text-[11px] font-medium text-muted-foreground">
            <li>✔ Atendimento via WhatsApp em poucos minutos</li>
            <li>✔ Catálogo exclusivo para empresas</li>
            <li>✔ Preços atualizados direto da distribuidora</li>
          </ul>
        </form>
      )}
    </div>
  );
};
