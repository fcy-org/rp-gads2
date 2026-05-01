import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { gtagConversion, gtagEvent } from "@/lib/gtag";
import { trackClarityLead, trackMetaLead } from "@/lib/marketing";
import { sendToSheets } from "@/lib/sheets";

const NEW_TRACKING_URL = "/api/new-tracking/leads";
const NEW_TRACKING_KEY = "u7hjat5pjvfs8m7ls2ndwefn";

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
  email: string,
  cnpj: string,
  state: string,
  city: string,
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
        email,
        cnpj,
        documento: cnpj,
        document: cnpj,
        state: stateCode,
        estado: stateCode,
        state_label: state,
        city,
        cidade: city,
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
  const [city, setCity] = useState("");
  const [contact, setContact] = useState({ name: "", whatsapp: "", cnpj: "", email: "" });
  const [cnpjError, setCnpjError] = useState(false);
  const [cnpjValid, setCnpjValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startForm = () => {
    if (hasStarted) return;
    gtagEvent("form_start", { form_name: "lead_form" });
    setHasStarted(true);
  };

  const select = (key: string, stepIndex: number, value: string) => {
    startForm();
    gtagEvent("form_step_complete", { form_name: "lead_form", step: stepIndex + 1, answer: value });
    setAnswers((p) => ({ ...p, [key]: value }));
  };

  const progress = ((step + 1) / 3) * 100;

  const goToContactStep = () => {
    if (!answers.segment || !answers.volume) {
      toast.error("Responda as duas perguntas para continuar");
      return;
    }
    setStep(1);
  };

  const goToFinalStep = () => {
    if (!answers.state) {
      toast.error("Selecione o estado para continuar");
      return;
    }
    if (!city.trim()) {
      toast.error("Informe sua cidade para continuar");
      return;
    }
    setStep(2);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskCNPJ(e.target.value);
    setContact({ ...contact, cnpj: formatted });
    const digits = formatted.replace(/\D/g, "");
    if (digits.length === 14) {
      const valid = isValidCNPJ(formatted);
      setCnpjValid(valid);
      setCnpjError(!valid);
    } else {
      setCnpjValid(false);
      setCnpjError(false);
    }
  };

  const handleCnpjBlur = () => {
    const digits = contact.cnpj.replace(/\D/g, "");
    if (digits.length > 0 && digits.length < 14) {
      setCnpjError(true);
      setCnpjValid(false);
    } else if (digits.length === 14) {
      const valid = isValidCNPJ(contact.cnpj);
      setCnpjValid(valid);
      setCnpjError(!valid);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!answers.segment || !answers.volume || !answers.state) {
      toast.error("Responda todas as perguntas para continuar");
      return;
    }
    if (!contact.name || !contact.whatsapp || !contact.cnpj || !contact.email) {
      toast.error("Preencha todos os campos para continuar");
      return;
    }
    if (!city.trim()) {
      toast.error("Informe sua cidade para continuar");
      return;
    }
    if (!isValidCNPJ(contact.cnpj)) {
      setCnpjError(true);
      toast.error("CNPJ inválido. Verifique e tente novamente.");
      return;
    }
    setIsSubmitting(true);
    const normalizedPhone = contact.whatsapp.replace(/\D/g, "");
    try {
      await sendToSheets({
        name: contact.name,
        email: contact.email,
        whatsapp: contact.whatsapp,
        cnpj: contact.cnpj,
        city: city.trim(),
        segment: answers.segment,
        volume: answers.volume,
        state: answers.state,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Não foi possível enviar os dados para a planilha.");
      return;
    }

    try {
      await sendNewTracking(
        contact.name,
        normalizedPhone,
        contact.email,
        contact.cnpj.replace(/\D/g, ""),
        answers.state,
        city.trim(),
      );
    } catch {
      console.error("NewTracking request failed");
    }
    gtagEvent("generate_lead", {
      form_name: "lead_form",
      segment: answers.segment,
      volume: answers.volume,
      state: answers.state,
      city: city.trim(),
    });
    gtagConversion();
    trackMetaLead({
      state: answers.state,
      city: city.trim(),
      segment: answers.segment,
      volume: answers.volume,
    });
    trackClarityLead({
      state: answers.state,
      city: city.trim(),
      segment: answers.segment,
      volume: answers.volume,
    });
    setIsSubmitting(false);
    toast.success("Recebemos seu cadastro! Em breve entraremos em contato via WhatsApp.");
    const msg = encodeURIComponent(
      `Olá! Sou ${contact.name}, CNPJ ${contact.cnpj}, Email: ${contact.email}. Quero virar cliente Rio Piranhas. Segmento: ${answers.segment}, Volume: ${answers.volume}, Estado: ${answers.state}, Cidade: ${city.trim()}.`,
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
      <form onSubmit={submit} onFocus={startForm} className="animate-float-up space-y-4">
        <div>
          <h3 className="font-display text-xl font-bold sm:text-2xl">Fale com um consultor</h3>
          <p className="mt-1 text-sm text-muted-foreground">Resposta em até 5 minutos no horário comercial.</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Etapa {step + 1} de 3</span>
            <span className="text-primary">{Math.round(progress)}% concluído</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-blue transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            {[STEPS[0], STEPS[1]].map((question, questionIndex) => (
              <div key={question.key}>
                <Label className="text-xs font-semibold">{question.title}</Label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(question.options as readonly string[]).map((opt: string) => {
                    const active = answers[question.key] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => select(question.key, questionIndex, opt)}
                        className={`flex min-h-11 w-full items-center justify-between rounded-xl border-2 px-3 py-2 text-left text-sm font-medium transition-all ${
                          active
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-background hover:border-primary hover:bg-primary-soft"
                        }`}
                      >
                        <span>{opt}</span>
                        {active && <Check className="h-4 w-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <Button type="button" variant="cta" className="w-full" onClick={goToContactStep}>
              Continuar
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold">{STEPS[2].title}</Label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(STEPS[2].options as readonly string[]).map((opt: string) => {
                  const active = answers.state === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => select(STEPS[2].key, 2, opt)}
                      className={`flex min-h-11 w-full items-center justify-between rounded-xl border-2 px-3 py-2 text-left text-sm font-medium transition-all ${
                        active
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-background hover:border-primary hover:bg-primary-soft"
                      }`}
                    >
                      <span>{opt}</span>
                      {active && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
            <Label htmlFor="city-step" className="text-xs font-semibold">Cidade</Label>
            <Input
              id="city-step"
              placeholder={answers.state ? `Ex: ${answers.state === "Maranhão (MA)" ? "São Luís" : "Teresina"}` : "Digite sua cidade"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(0)}>
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
              <Button type="button" variant="cta" className="flex-1" onClick={goToFinalStep}>
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
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
                onBlur={handleCnpjBlur}
                className={
                  cnpjError
                    ? "border-red-500 focus-visible:ring-red-500"
                    : cnpjValid
                    ? "border-green-500 focus-visible:ring-green-500"
                    : ""
                }
              />
              {cnpjError && (
                <p className="mt-1 text-xs text-red-500">CNPJ inválido. Verifique os números.</p>
              )}
              {cnpjValid && (
                <p className="mt-1 text-xs text-green-600">CNPJ válido.</p>
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

            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-3 w-3" /> Voltar
            </button>

            <Button
              type="submit"
              variant="cta"
              size="xl"
              className="w-full animate-pulse-soft disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={cnpjError || isSubmitting}
            >
              <Check className="h-5 w-5" /> {isSubmitting ? "Enviando dados..." : "Quero falar com um consultor"}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Seus dados são confidenciais. Sem spam.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
