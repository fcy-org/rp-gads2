const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyP-QbHP8R7abyDzqHiG3g-k8YmJhRrWk9rDeCpxEsPwROi82c5P1OfIzPO0paQa6Xo4Q/exec";

function getUtmParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    utm_content: p.get("utm_content") ?? "",
    utm_term: p.get("utm_term") ?? "",
  };
}

// "Maranhão (MA)" → "MA" | "Piauí (PI)" → "PI"
function extractStateCode(stateAnswer: string): string {
  const match = stateAnswer.match(/\(([^)]+)\)/);
  return match ? match[1] : stateAnswer;
}

export interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  cnpj: string;
  city: string;
  segment: string;
  state: string;
  volume?: string;
}

export async function sendToSheets(lead: LeadData): Promise<void> {
  const estado = extractStateCode(lead.state);

  const respostaQuiz = [
    `Email: ${lead.email || "-"}`,
    `Cidade: ${lead.city || "-"}`,
    `segmento da empresa: ${lead.segment || "-"}`,
    `Categorias: ${lead.segment || "-"}`,
  ].join(" | ");

  const payload = {
    nomeCompleto: lead.name,
    nome: lead.name,
    email: lead.email,
    telefone: lead.whatsapp,
    whatsapp: lead.whatsapp,
    documento: lead.cnpj.replace(/\D/g, ""),
    cnpj: lead.cnpj,
    tipoDocumento: "cnpj",
    estado,
    cidade: lead.city,
    faturamento: "",
    desempenho: lead.segment,
    produtos: lead.segment ? [lead.segment] : [],
    mediaFaturamento: "",
    segmento: lead.segment,
    volume: "",
    quiz_segmento: lead.segment,
    quiz_volume: "",
    resposta_quiz: respostaQuiz,
    ...getUtmParams(),
  };

  // text/plain é o único Content-Type permitido em modo no-cors.
  // O App Script lê e.postData.contents como string bruta,
  // então JSON.parse() no servidor funciona normalmente.
  await fetch(SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(payload),
  });
}
