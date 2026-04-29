import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { gtagConversion, gtagEvent } from "@/lib/gtag";
import { sendToSheets } from "@/lib/sheets";

const NEW_TRACKING_URL = "/api/new-tracking/leads";
const NEW_TRACKING_KEY = "u7hjat5pjvfs8m7ls2ndwefn";

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

async function sendNewTracking(name: string, phone: string, email: string) {
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
        email,
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
    options: ["Maranhão (MA)", "Piauí (PI)"],
  },
] as const;

function maskCNPJ(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function isValidCNPJ(cnpj: string): boolean {
  const d = cnpj.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const calc = (str: string, len: number) => {
    let sum = 0, pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += +str[len - i] * pos--;
      if (pos < 2) pos = 9;
    }
    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };
  return calc(d, 12) === +d[12] && calc(d, 13) === +d[13];
}

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  // 11 dígitos → celular: (XX) XXXXX-XXXX
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const LeadForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", whatsapp: "", cnpj: "", email: "" });
  const [cnpjError, setCnpjError] = useState(false);

  const isFinal = step === STEPS.length;
  const progress = ((step + (isFinal ? 1 : 0)) / (STEPS.length + 1)) * 100;

  const select = (value: string) => {
    if (step === 0) gtagEvent("form_start", { form_name: "lead_form" });
    gtagEvent("form_step_complete", { form_name: "lead_form", step: step + 1, answer: value });
    setAnswers((p) => ({ ...p, [STEPS[step].key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskCNPJ(e.target.value);
    setContact({ ...contact, cnpj: formatted });
    if (formatted.replace(/\D/g, "").length === 14) {
      setCnpjError(!isValidCNPJ(formatted));
    } else {
      setCnpjError(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.whatsapp || !contact.cnpj || !contact.email) {
      toast.error("Preencha todos os campos para continuar");
      return;
    }
    if (!isValidCNPJ(contact.cnpj)) {
      setCnpjError(true);
      toast.error("CNPJ inválido. Verifique e tente novamente.");
      return;
    }
    gtagEvent("generate_lead", {
      form_name: "lead_form",
      segment: answers.segment,
      volume: answers.volume,
      state: answers.state,
    });
    gtagConversion();
    const normalizedPhone = contact.whatsapp.replace(/\D/g, "");
    sendToSheets({
      name: contact.name,
      email: contact.email,
      whatsapp: contact.whatsapp,
      cnpj: contact.cnpj,
      segment: answers.segment,
      volume: answers.volume,
      state: answers.state,
    }).catch(() => {});
    sendNewTracking(contact.name, normalizedPhone, contact.email).catch(() => {});
    toast.success("Recebemos seu cadastro! Em breve entraremos em contato via WhatsApp.");
    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}, CNPJ ${contact.cnpj}, Email: ${contact.email}. Quero virar cliente Rio Piranhas. Segmento: ${answers.segment}, Volume: ${answers.volume}, Estado: ${answers.state}.`,
    );
    const phoneNumbers: Record<string, string> = {
      "Maranhão (MA)": "558695319157",
      "Piauí (PI)": "558694271798",
    };
    const phoneNumber = phoneNumbers[answers.state] || "558695319157";
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
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
            {(STEPS[step].options as readonly string[]).map((opt: string) => {
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
              <Input
                id="name"
                placeholder="Nome completo"
                autoComplete="name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                placeholder="seu@email.com"
                autoComplete="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cnpj" className="text-xs font-semibold">CNPJ da empresa</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                inputMode="numeric"
                maxLength={18}
                autoComplete="off"
                value={contact.cnpj}
                onChange={handleCnpjChange}
                className={cnpjError ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {cnpjError && (
                <p className="mt-1 text-xs text-red-500">CNPJ inválido. Verifique os números.</p>
              )}
            </div>
            <div>
              <Label htmlFor="wa" className="text-xs font-semibold">WhatsApp</Label>
              <Input
                id="wa"
                type="tel"
                inputMode="tel"
                placeholder="(98) 90000-0000"
                autoComplete="tel"
                maxLength={15}
                value={contact.whatsapp}
                onChange={(e) => setContact({ ...contact, whatsapp: maskPhone(e.target.value) })}
              />
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
