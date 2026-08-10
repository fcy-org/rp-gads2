import { MessageCircle } from "lucide-react";

export const StickyCTA = () => (
  <a
    href="#form"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-display font-extrabold text-accent-foreground shadow-cta animate-pulse-soft sm:hidden"
  >
    <MessageCircle className="h-5 w-5" />
    Quero virar cliente
  </a>
);
