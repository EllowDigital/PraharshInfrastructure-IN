import { MessageCircle } from "lucide-react";

const PHONE = "917800009165";
const MESSAGE = encodeURIComponent(
  "Hello Praharsh Infrastructure, I'd like to request a quote / more information.",
);

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Praharsh Infrastructure on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl shadow-black/30 pl-4 pr-5 py-3.5 transition-all duration-300 hover:scale-[1.03]"
    >
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
      <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2} />
      <span className="hidden sm:inline text-sm font-medium tracking-wide">Chat on WhatsApp</span>
    </a>
  );
}
