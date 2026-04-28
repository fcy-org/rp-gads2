const ADS_ID = "AW-17617048942";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...a: unknown[]) { window.dataLayer.push(a); };
  window.gtag(...args);
}

export function gtagConversion(value?: number) {
  gtag("event", "conversion", {
    send_to: ADS_ID,
    ...(value !== undefined && { value, currency: "BRL" }),
  });
}

export function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  gtag("event", eventName, params);
}
