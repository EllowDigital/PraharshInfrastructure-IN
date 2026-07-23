import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Sun,
  Zap,
  Landmark,
  Route as RouteIcon,
  Building2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

// --- Contact constants ---
const PHONE_DISPLAY = "+91 78000 09165";
const PHONE_WA = "917800009165";
const EMAIL = "info@praharshinfrastructure.com";
const ADDRESS =
  "Tower-2, 12th Floor, Assotech Business Cresterra, Sector 135, Noida";
const HOURS = "Mon – Sat · 10:00 AM – 7:00 PM IST";

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  chips?: Chip[];
  actions?: ActionButton[];
  richCard?: RichCard;
};

type Chip = {
  id: string;
  label: string;
  next: MenuKey | "quote_start" | "human_handoff";
  icon?: React.ComponentType<{ className?: string }>;
};

type ActionButton = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "ghost";
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
};

type RichCard = {
  title: string;
  lines: { icon: React.ComponentType<{ className?: string }>; text: string }[];
};

type MenuKey =
  | "root"
  | "services"
  | "svc_solar"
  | "svc_electrical"
  | "svc_civil"
  | "svc_govt"
  | "svc_ads"
  | "contact"
  | "hours"
  | "projects"
  | "certs";

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const waLink = (text: string) =>
  `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;

// --- Menu builders ---
const ROOT_CHIPS: Chip[] = [
  { id: "svc", label: "Explore Services", next: "services", icon: Sparkles },
  { id: "quote", label: "Request a Quote", next: "quote_start", icon: FileText },
  { id: "contact", label: "Contact & Location", next: "contact", icon: MapPin },
  { id: "projects", label: "View Projects", next: "projects", icon: Building2 },
  { id: "certs", label: "Certifications", next: "certs", icon: CheckCircle2 },
  { id: "hours", label: "Business Hours", next: "hours", icon: Clock },
  { id: "human", label: "Talk to a Human", next: "human_handoff", icon: MessageCircle },
];

const SERVICE_CHIPS: Chip[] = [
  { id: "solar", label: "Solar Street Lighting", next: "svc_solar", icon: Sun },
  { id: "elec", label: "High-Mast & Electrical", next: "svc_electrical", icon: Zap },
  { id: "civil", label: "Civil & Road Works", next: "svc_civil", icon: RouteIcon },
  { id: "govt", label: "Government Supply (GeM)", next: "svc_govt", icon: Landmark },
  { id: "ads", label: "Outdoor & Digital Ads", next: "svc_ads", icon: Sparkles },
];

const SERVICE_COPY: Record<
  Exclude<MenuKey, "root" | "services" | "contact" | "hours" | "projects" | "certs">,
  { title: string; desc: string; waPrompt: string }
> = {
  svc_solar: {
    title: "Solar Street Lighting",
    desc: "Turnkey design, supply and installation of solar street lights and high-mast solar systems for municipalities, panchayats and PSUs.",
    waPrompt: "I'd like a quote for Solar Street Lighting.",
  },
  svc_electrical: {
    title: "High-Mast & Electrical",
    desc: "High-mast towers, LED street lighting, substations, cable networks and utility electrification.",
    waPrompt: "I'd like a quote for High-Mast / Electrical works.",
  },
  svc_civil: {
    title: "Civil & Road Infrastructure",
    desc: "Roads, highways, bridges, civil development and traffic infrastructure under PWD-grade execution.",
    waPrompt: "I'd like details on Civil & Road Infrastructure projects.",
  },
  svc_govt: {
    title: "Government Supply (GeM)",
    desc: "GeM-verified supplier for sanitation, safety, healthcare and public utility procurement.",
    waPrompt: "I'd like to discuss a Government / GeM supply requirement.",
  },
  svc_ads: {
    title: "Outdoor & Digital Advertising",
    desc: "Hoardings, unipoles, DOOH, LED walls, digital campaigns and branded signage.",
    waPrompt: "I'd like a quote for Advertising / Signage.",
  },
};

const CONTACT_CARD: RichCard = {
  title: "Reach us directly",
  lines: [
    { icon: Phone, text: PHONE_DISPLAY },
    { icon: Mail, text: EMAIL },
    { icon: MapPin, text: ADDRESS },
    { icon: Clock, text: HOURS },
  ],
};

const CONTACT_ACTIONS: ActionButton[] = [
  { id: "call", label: "Call Now", href: `tel:${PHONE_WA}`, variant: "primary", icon: Phone },
  {
    id: "wa",
    label: "WhatsApp",
    href: waLink("Hello Praharsh Infrastructure, I have an enquiry."),
    variant: "ghost",
    icon: MessageCircle,
    external: true,
  },
  { id: "email", label: "Email", href: `mailto:${EMAIL}`, variant: "ghost", icon: Mail },
];

// --- Quote flow ---
type QuoteStep = "idle" | "service" | "name" | "email" | "phone" | "brief" | "done";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quoteStep, setQuoteStep] = useState<QuoteStep>("idle");
  const [quoteData, setQuoteData] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    brief: "",
  });
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bot message helper
  const pushBot = useCallback((msg: Omit<Message, "id" | "sender">) => {
    setMessages((prev) => [...prev, { id: uid(), sender: "bot", ...msg }]);
  }, []);
  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: uid(), sender: "user", text }]);
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      pushBot({
        text: "Hi 👋 — I'm the Praharsh Assistant. Pick an option below or type your question. I'll route you to the right team.",
        chips: ROOT_CHIPS,
      });
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages.length, pushBot]);

  // Menu navigation
  const goTo = useCallback(
    (key: MenuKey) => {
      if (key === "root") {
        pushBot({
          text: "What would you like to do next?",
          chips: ROOT_CHIPS,
        });
        return;
      }
      if (key === "services") {
        pushBot({
          text: "Which service are you interested in?",
          chips: SERVICE_CHIPS,
        });
        return;
      }
      if (key === "contact") {
        pushBot({
          text: "Here's how to reach us — tap any option:",
          richCard: CONTACT_CARD,
          actions: CONTACT_ACTIONS,
        });
        return;
      }
      if (key === "hours") {
        pushBot({
          text: `We're available ${HOURS}. Outside these hours, drop a message here and we'll reply the next business morning.`,
          chips: [
            { id: "quote", label: "Request a Quote", next: "quote_start", icon: FileText },
            { id: "back", label: "Back to Menu", next: "root", icon: ArrowLeft },
          ],
        });
        return;
      }
      if (key === "projects") {
        pushBot({
          text: "See our recent work — solar street lighting, high-mast, roads and government supply.",
          actions: [
            {
              id: "view",
              label: "Open Projects Page",
              href: "/projects",
              variant: "primary",
              icon: Building2,
            },
          ],
          chips: [{ id: "back", label: "Back to Menu", next: "root", icon: ArrowLeft }],
        });
        return;
      }
      if (key === "certs") {
        pushBot({
          text: "We are ISO 9001:2015 certified, GeM verified, UDYAM & GST registered, and PWD / UPPCL empanelled.",
          actions: [
            {
              id: "view",
              label: "View Certifications",
              href: "/certifications",
              variant: "primary",
              icon: CheckCircle2,
            },
          ],
          chips: [{ id: "back", label: "Back to Menu", next: "root", icon: ArrowLeft }],
        });
        return;
      }
      // Service detail pages
      const s = SERVICE_COPY[key];
      if (s) {
        pushBot({
          text: `**${s.title}** — ${s.desc}`,
          actions: [
            {
              id: "quote",
              label: "Get a Quote on WhatsApp",
              href: waLink(s.waPrompt),
              variant: "primary",
              icon: MessageCircle,
              external: true,
            },
            {
              id: "call",
              label: "Call",
              href: `tel:${PHONE_WA}`,
              variant: "ghost",
              icon: Phone,
            },
          ],
          chips: [
            { id: "quote_form", label: "Fill Quote Form", next: "quote_start", icon: FileText },
            { id: "back_svc", label: "Other Services", next: "services", icon: ArrowLeft },
            { id: "menu", label: "Main Menu", next: "root" },
          ],
        });
      }
    },
    [pushBot],
  );

  const startQuote = useCallback(() => {
    setQuoteData({ service: "", name: "", email: "", phone: "", brief: "" });
    setQuoteStep("service");
    pushBot({
      text: "Great — a 30-second form. Which service is this quote for?",
      chips: SERVICE_CHIPS.map((c) => ({ ...c, next: "quote_start" })),
    });
  }, [pushBot]);

  const humanHandoff = useCallback(() => {
    pushBot({
      text: "Connecting you to our team on WhatsApp — you can also call or email us directly.",
      actions: [
        {
          id: "wa",
          label: "Open WhatsApp",
          href: waLink("Hello — I'd like to speak to your team."),
          variant: "primary",
          icon: MessageCircle,
          external: true,
        },
        { id: "call", label: "Call Now", href: `tel:${PHONE_WA}`, variant: "ghost", icon: Phone },
        { id: "email", label: "Email Us", href: `mailto:${EMAIL}`, variant: "ghost", icon: Mail },
      ],
      chips: [{ id: "menu", label: "Back to Menu", next: "root", icon: ArrowLeft }],
    });
  }, [pushBot]);

  // Chip click
  const onChipClick = (chip: Chip) => {
    pushUser(chip.label);

    // In-flight quote flow: chips are service pickers
    if (quoteStep === "service") {
      const svc = SERVICE_CHIPS.find((c) => c.id === chip.id);
      if (svc) {
        setQuoteData((p) => ({ ...p, service: svc.label }));
        setQuoteStep("name");
        setTimeout(
          () => pushBot({ text: "Perfect. What's your **name**?" }),
          350,
        );
        return;
      }
    }

    setTimeout(() => {
      if (chip.next === "quote_start") return startQuote();
      if (chip.next === "human_handoff") return humanHandoff();
      goTo(chip.next as MenuKey);
    }, 300);
  };

  // Free-text send — either quote flow or fallback keyword routing
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    pushUser(text);
    setInputValue("");

    // Quote flow
    if (quoteStep === "name") {
      setQuoteData((p) => ({ ...p, name: text }));
      setQuoteStep("email");
      setTimeout(() => pushBot({ text: `Thanks ${text}! Your **email**?` }), 300);
      return;
    }
    if (quoteStep === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        setTimeout(
          () => pushBot({ text: "That doesn't look like a valid email — please try again." }),
          200,
        );
        return;
      }
      setQuoteData((p) => ({ ...p, email: text }));
      setQuoteStep("phone");
      setTimeout(() => pushBot({ text: "Your **phone number** (with country code)?" }), 300);
      return;
    }
    if (quoteStep === "phone") {
      setQuoteData((p) => ({ ...p, phone: text }));
      setQuoteStep("brief");
      setTimeout(
        () =>
          pushBot({
            text: "Last one — briefly describe your **requirement** (quantity, location, timeline).",
          }),
        300,
      );
      return;
    }
    if (quoteStep === "brief") {
      const finalData = { ...quoteData, brief: text };
      setQuoteData(finalData);
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setQuoteStep("done");
        const summary = `New Quote Request%0A%0A*Service:* ${finalData.service}%0A*Name:* ${finalData.name}%0A*Email:* ${finalData.email}%0A*Phone:* ${finalData.phone}%0A*Requirement:* ${text}`;
        pushBot({
          text: "✅ Got it! Sending your enquiry to our team on WhatsApp — we typically respond within 1 business hour.",
          actions: [
            {
              id: "wa",
              label: "Send on WhatsApp",
              href: `https://wa.me/${PHONE_WA}?text=${summary}`,
              variant: "primary",
              icon: MessageCircle,
              external: true,
            },
            {
              id: "email",
              label: "Email Instead",
              href: `mailto:${EMAIL}?subject=Quote Request — ${encodeURIComponent(finalData.service)}&body=${encodeURIComponent(`Name: ${finalData.name}\nPhone: ${finalData.phone}\nRequirement: ${text}`)}`,
              variant: "ghost",
              icon: Mail,
            },
          ],
          chips: [{ id: "menu", label: "Back to Menu", next: "root", icon: ArrowLeft }],
        });
      }, 900);
      return;
    }

    // Free text keyword routing
    const lower = text.toLowerCase();
    setTimeout(() => {
      if (/(quote|price|cost|estimate|budget)/.test(lower)) return startQuote();
      if (/(solar)/.test(lower)) return goTo("svc_solar");
      if (/(mast|electric|led|light)/.test(lower)) return goTo("svc_electrical");
      if (/(road|civil|highway|bridge)/.test(lower)) return goTo("svc_civil");
      if (/(gem|govt|government|tender)/.test(lower)) return goTo("svc_govt");
      if (/(ad|signage|hoard|digital|dooh)/.test(lower)) return goTo("svc_ads");
      if (/(contact|call|phone|email|address|location|reach)/.test(lower))
        return goTo("contact");
      if (/(hour|time|open|available)/.test(lower)) return goTo("hours");
      if (/(project|portfolio|work|case)/.test(lower)) return goTo("projects");
      if (/(cert|iso|gem|empanel)/.test(lower)) return goTo("certs");
      if (/(human|agent|talk|person|team)/.test(lower)) return humanHandoff();
      pushBot({
        text: "I can help with services, quotes, projects or contact info. Choose one below, or tap **Talk to a Human** to reach our team.",
        chips: ROOT_CHIPS,
      });
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setQuoteStep("idle");
    setQuoteData({ service: "", name: "", email: "", phone: "", brief: "" });
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {showScrollTop && !isOpen && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="w-11 h-11 rounded-full bg-navy text-white shadow-2xl shadow-black/25 flex items-center justify-center hover:bg-navy/90 transition"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Praharsh Assistant chat"
          className="w-[calc(100vw-2rem)] sm:w-[380px] max-w-[420px] h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col border border-border animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-navy-deep p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="bg-gold/15 p-2 rounded-full ring-2 ring-gold/30">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-navy-deep" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-display text-sm truncate">Praharsh Assistant</h3>
                <p className="text-white/60 text-[0.68rem] truncate">
                  Online · replies in a few minutes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart chat"
                className="text-white/50 hover:text-gold text-[0.65rem] uppercase tracking-widest px-2 py-1 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat window */}
          <div className="flex-1 bg-secondary/40 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-gold" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] flex flex-col gap-2 ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {m.text && (
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        m.sender === "user"
                          ? "bg-navy text-white rounded-tr-sm"
                          : "bg-white border border-border/50 text-navy-deep rounded-tl-sm shadow-sm"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: m.text
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(
                            /\*\*(.+?)\*\*/g,
                            '<strong class="font-semibold">$1</strong>',
                          ),
                      }}
                    />
                  )}

                  {m.richCard && (
                    <div className="bg-white border border-border rounded-xl p-3 shadow-sm w-full">
                      <div className="text-[0.65rem] uppercase tracking-widest text-gold font-semibold mb-2">
                        {m.richCard.title}
                      </div>
                      <div className="space-y-2">
                        {m.richCard.lines.map((l, i) => {
                          const Icon = l.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 text-xs text-navy-deep/80"
                            >
                              <Icon className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{l.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {m.actions && (
                    <div className="flex flex-col gap-2 w-full">
                      {m.actions.map((a) => {
                        const Icon = a.icon;
                        const cls =
                          a.variant === "primary"
                            ? "bg-navy text-white hover:bg-gold hover:text-navy border border-navy"
                            : "bg-white text-navy hover:bg-navy hover:text-white border border-navy/20";
                        return (
                          <a
                            key={a.id}
                            href={a.href}
                            target={a.external ? "_blank" : undefined}
                            rel={a.external ? "noopener noreferrer" : undefined}
                            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${cls}`}
                          >
                            {Icon && <Icon className="w-3.5 h-3.5" />}
                            {a.label}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {m.chips && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.chips.map((c) => {
                        const Icon = c.icon;
                        return (
                          <button
                            key={c.id}
                            onClick={() => onChipClick(c)}
                            className="inline-flex items-center gap-1.5 bg-white border border-navy/15 text-navy-deep hover:bg-navy hover:text-white hover:border-navy px-3 py-1.5 rounded-full text-[0.72rem] font-medium transition-colors shadow-sm"
                          >
                            {Icon && <Icon className="w-3 h-3" />}
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="bg-white border border-border/50 text-navy p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span className="text-sm">Sending your enquiry…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick action bar */}
          <div className="border-t border-border bg-white px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <a
              href={`tel:${PHONE_WA}`}
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-navy hover:text-gold uppercase tracking-wider"
            >
              <Phone className="w-3 h-3" /> Call
            </a>
            <span className="w-px h-3 bg-border shrink-0" />
            <a
              href={waLink("Hello Praharsh Infrastructure, I have an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-navy hover:text-gold uppercase tracking-wider"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <span className="w-px h-3 bg-border shrink-0" />
            <a
              href={`mailto:${EMAIL}`}
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-navy hover:text-gold uppercase tracking-wider"
            >
              <Mail className="w-3 h-3" /> Email
            </a>
            <span className="w-px h-3 bg-border shrink-0" />
            <button
              onClick={() => {
                pushUser("Main menu");
                setTimeout(() => goTo("root"), 200);
              }}
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-navy hover:text-gold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3" /> Menu
            </button>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-border flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                quoteStep === "email"
                  ? "you@example.com"
                  : quoteStep === "phone"
                    ? "+91 98xxx xxxxx"
                    : quoteStep === "name"
                      ? "Your name"
                      : quoteStep === "brief"
                        ? "Describe your requirement…"
                        : "Type a message or pick an option…"
              }
              className="flex-1 bg-secondary/50 border border-border/60 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 transition-all"
              disabled={isSending}
              aria-label="Chat message"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-navy hover:text-gold active:scale-95 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Praharsh Assistant chat"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl shadow-black/30 pl-4 pr-5 py-3.5 transition-all duration-300 hover:scale-[1.03]"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
          <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2.2} />
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">Chat with us</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>
      )}
    </div>
  );
}
