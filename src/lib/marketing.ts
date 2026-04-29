declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

type LeadTrackingPayload = {
  state: string;
  city: string;
  segment: string;
  volume: string;
};

export function trackMetaLead(payload: LeadTrackingPayload) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", "Lead", {
    content_name: "rio_piranhas_lead",
    state: payload.state,
    city: payload.city,
    segment: payload.segment,
    volume: payload.volume,
  });
}

export function trackClarityLead(payload: LeadTrackingPayload) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") return;

  window.clarity("event", "lead_submit");
  window.clarity("set", "lead_state", payload.state);
  window.clarity("set", "lead_city", payload.city);
  window.clarity("set", "lead_segment", payload.segment);
  window.clarity("set", "lead_volume", payload.volume);
}
