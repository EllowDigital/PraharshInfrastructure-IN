import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  Paperclip,
  Globe,
  HelpCircle,
  User,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CHAT_LOCALES, t, type ChatLocale } from "@/lib/chat-i18n";

const PHONE_DISPLAY = "+91 78000 09165";
const PHONE_WA = "917800009165"; // digits only for wa.me
const PHONE_TEL = "+917800009165"; // E.164 for tel:
const EMAIL = "info@praharshinfrastructure.com";
const ADDRESS =
  "Tower-2, 12th Floor, Assotech Business Cresterra, Sector 135, Noida";
const HOURS = "Mon – Sat · 10:00 AM – 7:00 PM IST";

// --- Robust cross-window openers ---------------------------------------------
// In the Lovable preview iframe, `wa.me` follows a redirect to `api.whatsapp.com`
// which is blocked in-frame (ERR_BLOCKED_BY_RESPONSE). We must open in the TOP
// window (or a new tab) and provide a copy fallback if the browser blocks it.
function isInIframe(): boolean {
  try {
    return typeof window !== "undefined" && window.self !== window.top;
  } catch {
    return true; // cross-origin access threw — we ARE in an iframe
  }
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Open an external URL as reliably as possible.
 * Order: window.open (new tab) → top.location → self.location.
 * Returns true if we believe navigation was initiated.
 */
function openExternal(url: string): boolean {
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return true;
  } catch {}
  try {
    if (isInIframe() && window.top) {
      (window.top as Window).location.href = url;
      return true;
    }
  } catch {}
  try {
    window.location.href = url;
    return true;
  } catch {}
  return false;
}

function buildWaUrl(text: string): string {
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;
}

function buildMailUrl(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png";
const ACCEPTED_EXT = [
  "pdf", "dwg", "dxf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png",
];

const LOCALE_STORAGE_KEY = "praharsh_chat_locale";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
  path?: string;
  signed_url?: string;
};

type Chip = {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
};

type ActionButton = {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "ghost";
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
  /** kind drives fallback behavior: whatsapp/email get openExternal + clipboard, tel stays as-is */
  kind?: "whatsapp" | "email" | "tel" | "link";
  /** text to copy to clipboard as a fallback if the browser blocks navigation */
  copyText?: string;
};


type RichCard = {
  title: string;
  lines: { icon: React.ComponentType<{ className?: string }>; text: string }[];
};

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  chips?: Chip[];
  actions?: ActionButton[];
  richCard?: RichCard;
  files?: UploadedFile[];
};

type Flow =
  | { kind: "idle" }
  | { kind: "quote"; step: QuoteStep; data: QuoteData }
  | { kind: "handoff"; step: HandoffStep; data: HandoffData };

type QuoteStep = "service" | "name" | "email" | "phone" | "budget" | "brief" | "attach" | "done";
type HandoffStep = "name" | "phone" | "email" | "time" | "topic" | "done";

type QuoteData = {
  service: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  brief: string;
  files: UploadedFile[];
};

type HandoffData = {
  name: string;
  phone: string;
  email: string;
  time: string;
  topic: string;
};

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const waLink = (text: string) => buildWaUrl(text);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
};

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocaleState] = useState<ChatLocale>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [flow, setFlow] = useState<Flow>({ kind: "idle" });
  const [isSending, setIsSending] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<UploadedFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [attachError, setAttachError] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  const showNotice = useCallback((text: string, ms = 4500) => {
    setNotice(text);
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), ms);
  }, []);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  const handleActionClick = useCallback(
    async (a: ActionButton, e: React.MouseEvent) => {
      const kind =
        a.kind ??
        (a.href.startsWith("tel:")
          ? "tel"
          : a.href.startsWith("mailto:")
            ? "email"
            : a.href.startsWith("https://wa.me") || a.href.startsWith("https://api.whatsapp")
              ? "whatsapp"
              : "link");

      // tel: links are safe as normal anchors — let default happen
      if (kind === "tel") return;

      e.preventDefault();
      const opened = openExternal(a.href);
      if (!opened && a.copyText) {
        const ok = await copyToClipboard(a.copyText);
        showNotice(
          ok
            ? `Couldn't open ${kind === "whatsapp" ? "WhatsApp" : "your email app"} — the message was copied to your clipboard. Paste it into ${kind === "whatsapp" ? `WhatsApp (${PHONE_DISPLAY})` : `an email to ${EMAIL}`}.`
            : `Couldn't open ${kind === "whatsapp" ? "WhatsApp" : "email"}. Please contact us at ${PHONE_DISPLAY} or ${EMAIL}.`,
          7000,
        );
      } else if (!opened) {
        showNotice(`Couldn't open the link. Please call ${PHONE_DISPLAY} or email ${EMAIL}.`, 6000);
      }
    },
    [showNotice],
  );


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const dict = useMemo(() => t(locale), [locale]);

  // --- Locale persistence ---
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && CHAT_LOCALES.some((l) => l.code === saved)) {
        setLocaleState(saved as ChatLocale);
      }
    } catch {}
  }, []);

  const setLocale = useCallback((l: ChatLocale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {}
    setShowLangMenu(false);
  }, []);

  // --- Scroll ---
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Bot / user helpers ---
  const pushBot = useCallback((msg: Omit<Message, "id" | "sender">) => {
    setMessages((prev) => [...prev, { id: uid(), sender: "bot", ...msg }]);
  }, []);
  const pushUser = useCallback((text?: string, files?: UploadedFile[]) => {
    setMessages((prev) => [...prev, { id: uid(), sender: "user", text, files }]);
  }, []);

  // --- Service chips builder ---
  const serviceChips = useCallback(
    (onPick: (label: string) => void): Chip[] => [
      { id: "solar", label: dict.service_solar, icon: Sun, onClick: () => onPick(dict.service_solar) },
      { id: "elec", label: dict.service_electrical, icon: Zap, onClick: () => onPick(dict.service_electrical) },
      { id: "civil", label: dict.service_civil, icon: RouteIcon, onClick: () => onPick(dict.service_civil) },
      { id: "govt", label: dict.service_govt, icon: Landmark, onClick: () => onPick(dict.service_govt) },
      { id: "ads", label: dict.service_ads, icon: Sparkles, onClick: () => onPick(dict.service_ads) },
    ],
    [dict],
  );

  // --- Root menu ---
  const rootChips = useCallback((): Chip[] => [
    { id: "svc", label: dict.chip_services, icon: Sparkles, onClick: () => showServices() },
    { id: "quote", label: dict.chip_quote, icon: FileText, onClick: () => startQuote() },
    { id: "faq", label: dict.chip_faq, icon: HelpCircle, onClick: () => showFaq() },
    { id: "contact", label: dict.chip_contact, icon: MapPin, onClick: () => showContact() },
    { id: "projects", label: dict.chip_projects, icon: Building2, onClick: () => showProjects() },
    { id: "certs", label: dict.chip_certs, icon: CheckCircle2, onClick: () => showCerts() },
    { id: "hours", label: dict.chip_hours, icon: Clock, onClick: () => showHours() },
    { id: "human", label: dict.chip_human, icon: User, onClick: () => startHandoff() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [dict]);

  const goRoot = useCallback(() => {
    pushBot({ text: dict.menu_prompt, chips: rootChips() });
  }, [dict, pushBot, rootChips]);

  const showServices = useCallback(() => {
    pushBot({
      text: dict.services_prompt,
      chips: [
        ...serviceChips(() => {}),
        { id: "back", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot },
      ],
    });
  }, [dict, pushBot, serviceChips, goRoot]);

  const showContact = useCallback(() => {
    pushBot({
      text: dict.contact_prompt,
      richCard: {
        title: dict.contact_title,
        lines: [
          { icon: Phone, text: PHONE_DISPLAY },
          { icon: Mail, text: EMAIL },
          { icon: MapPin, text: ADDRESS },
          { icon: Clock, text: HOURS },
        ],
      },
      actions: [
        { id: "call", label: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, variant: "primary", icon: Phone, kind: "tel" },
        {
          id: "wa",
          label: "WhatsApp",
          href: waLink("Hello Praharsh Infrastructure, I have an enquiry."),
          variant: "ghost",
          icon: MessageCircle,
          external: true,
          kind: "whatsapp",
          copyText: "Hello Praharsh Infrastructure, I have an enquiry.",
        },
        {
          id: "email",
          label: "Email",
          href: buildMailUrl("Website Enquiry", "Hello Praharsh Infrastructure, I have an enquiry."),
          variant: "ghost",
          icon: Mail,
          kind: "email",
          copyText: EMAIL,
        },
      ],
      chips: [{ id: "menu", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot }],
    });
  }, [dict, pushBot, goRoot]);

  const showHours = useCallback(() => {
    pushBot({
      text: dict.hours_msg(HOURS),
      chips: [
        { id: "quote", label: dict.chip_quote, icon: FileText, onClick: () => startQuote() },
        { id: "back", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot },
      ],
    });
  }, [dict, pushBot, goRoot]);

  const showProjects = useCallback(() => {
    pushBot({
      text: dict.projects_msg,
      actions: [
        { id: "view", label: dict.open_projects, href: "/projects", variant: "primary", icon: Building2 },
      ],
      chips: [{ id: "back", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot }],
    });
  }, [dict, pushBot, goRoot]);

  const showCerts = useCallback(() => {
    pushBot({
      text: dict.certs_msg,
      actions: [
        { id: "view", label: dict.view_certs, href: "/certifications", variant: "primary", icon: CheckCircle2 },
      ],
      chips: [{ id: "back", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot }],
    });
  }, [dict, pushBot, goRoot]);

  // --- FAQ ---
  const faqItems = useMemo(
    () => [
      { id: "svc", q: dict.faq_services_q, a: dict.faq_services_a },
      { id: "time", q: dict.faq_timeline_q, a: dict.faq_timeline_a },
      { id: "cert", q: dict.faq_certifications_q, a: dict.faq_certifications_a },
      { id: "cov", q: dict.faq_coverage_q, a: dict.faq_coverage_a },
      { id: "pay", q: dict.faq_payment_q, a: dict.faq_payment_a },
      { id: "war", q: dict.faq_warranty_q, a: dict.faq_warranty_a },
      { id: "tender", q: dict.faq_tender_q, a: dict.faq_tender_a },
    ],
    [dict],
  );

  const showFaq = useCallback(() => {
    pushBot({
      text: dict.faq_prompt,
      chips: [
        ...faqItems.map((f) => ({
          id: f.id,
          label: f.q,
          icon: HelpCircle,
          onClick: () => answerFaq(f.q, f.a),
        })),
        { id: "back", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot },
      ],
    });
  }, [dict, pushBot, faqItems, goRoot]);

  const answerFaq = useCallback(
    (q: string, a: string) => {
      pushUser(q);
      setTimeout(
        () =>
          pushBot({
            text: a,
            chips: [
              { id: "another", label: dict.chip_ask_another, icon: HelpCircle, onClick: showFaq },
              { id: "quote", label: dict.chip_start_quote, icon: FileText, onClick: () => startQuote() },
              { id: "human", label: dict.chip_human, icon: User, onClick: () => startHandoff() },
              { id: "menu", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot },
            ],
          }),
        250,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dict, pushBot, pushUser, showFaq, goRoot],
  );

  // --- Quote flow ---
  const startQuote = useCallback(() => {
    setFlow({
      kind: "quote",
      step: "service",
      data: { service: "", name: "", email: "", phone: "", budget: "", brief: "", files: [] },
    });
    setPendingFiles([]);
    setAttachError(null);
    pushBot({
      text: dict.quote_intro,
      chips: serviceChips((label) => {
        pushUser(label);
        setFlow((f) =>
          f.kind === "quote"
            ? { ...f, step: "name", data: { ...f.data, service: label } }
            : f,
        );
        setTimeout(() => pushBot({ text: dict.quote_name }), 300);
      }),
    });
  }, [dict, pushBot, pushUser, serviceChips]);

  const askBudget = useCallback(() => {
    pushBot({
      text: dict.quote_budget,
      chips: dict.quote_budget_ranges.map((r, i) => ({
        id: `br-${i}`,
        label: r,
        onClick: () => {
          pushUser(r);
          setFlow((f) =>
            f.kind === "quote" ? { ...f, step: "brief", data: { ...f.data, budget: r } } : f,
          );
          setTimeout(() => pushBot({ text: dict.quote_brief }), 200);
        },
      })),
    });
  }, [dict, pushBot, pushUser]);

  const askAttach = useCallback(() => {
    setPendingFiles([]);
    setAttachError(null);
    setFlow((f) => (f.kind === "quote" ? { ...f, step: "attach" } : f));
    pushBot({ text: dict.quote_attach_prompt });
  }, [dict, pushBot]);

  // --- Handoff flow ---
  const startHandoff = useCallback(() => {
    setFlow({
      kind: "handoff",
      step: "name",
      data: { name: "", phone: "", email: "", time: "", topic: "" },
    });
    pushBot({ text: dict.human_intro });
    setTimeout(() => pushBot({ text: dict.quote_name }), 400);
  }, [dict, pushBot]);

  const askHandoffTime = useCallback(() => {
    pushBot({
      text: dict.human_time_prompt,
      chips: dict.human_time_options.map((opt, i) => ({
        id: `ht-${i}`,
        label: opt,
        icon: Clock,
        onClick: () => {
          pushUser(opt);
          setFlow((f) =>
            f.kind === "handoff" ? { ...f, step: "topic", data: { ...f.data, time: opt } } : f,
          );
          setTimeout(() => pushBot({ text: dict.human_topic }), 200);
        },
      })),
    });
  }, [dict, pushBot, pushUser]);

  // --- Save lead to CRM ---
  const saveLead = useCallback(
    async (payload: {
      name: string;
      phone?: string;
      email?: string;
      project_type?: string;
      budget_range?: string;
      message?: string;
      attachments?: UploadedFile[];
      preferred_time?: string;
      status?: "new" | "handoff_requested";
    }): Promise<{ reference: string } | null> => {
      try {
        const { data, error } = await supabase.functions.invoke("save-chat-lead", {
          body: { ...payload, language: locale, source: "chat_widget" },
        });
        if (error) {
          console.error("save-chat-lead error:", error);
          return null;
        }
        if (data && (data as any).ok) return { reference: (data as any).reference };
        return null;
      } catch (e) {
        console.error("save lead exception:", e);
        return null;
      }
    },
    [locale],
  );

  // --- File uploads ---
  const handleFilesPicked = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setAttachError(null);
      const files = Array.from(fileList);
      if (pendingFiles.length + files.length > MAX_FILES) {
        setAttachError(dict.quote_attach_max);
        return;
      }
      setUploadingFile(true);
      const uploaded: UploadedFile[] = [];
      try {
        for (const file of files) {
          if (file.size > MAX_FILE_BYTES) {
            setAttachError(dict.quote_attach_error_size);
            continue;
          }
          const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
          if (!ACCEPTED_EXT.includes(ext)) {
            setAttachError(dict.quote_attach_error_type);
            continue;
          }
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
          const path = `${new Date().toISOString().slice(0, 10)}/${uid()}-${safeName}`;
          const { error } = await supabase.storage
            .from("chat-attachments")
            .upload(path, file, {
              contentType: file.type || "application/octet-stream",
              upsert: false,
            });
          if (error) {
            console.error("upload error:", error);
            setAttachError(error.message);
            continue;
          }
          const { data: signed } = await supabase.storage
            .from("chat-attachments")
            .createSignedUrl(path, 60 * 60 * 24 * 30); // 30 days
          uploaded.push({
            name: file.name,
            size: file.size,
            type: file.type || ext,
            path,
            signed_url: signed?.signedUrl,
          });
        }
        if (uploaded.length) setPendingFiles((p) => [...p, ...uploaded]);
      } finally {
        setUploadingFile(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [dict, pendingFiles.length],
  );

  const removePendingFile = (idx: number) => {
    setPendingFiles((p) => p.filter((_, i) => i !== idx));
  };

  const finalizeQuote = useCallback(
    async (quoteData: QuoteData) => {
      setIsSending(true);
      const filesText =
        quoteData.files.length > 0
          ? "\n\n*Attachments:*\n" +
            quoteData.files
              .map(
                (f) =>
                  `• ${f.name} (${formatBytes(f.size)})${f.signed_url ? ` — ${f.signed_url}` : ""}`,
              )
              .join("\n")
          : "";

      const summary =
        `New Quote Request\n\n` +
        `*Service:* ${quoteData.service}\n` +
        `*Name:* ${quoteData.name}\n` +
        `*Email:* ${quoteData.email}\n` +
        `*Phone:* ${quoteData.phone}\n` +
        `*Budget:* ${quoteData.budget}\n` +
        `*Requirement:* ${quoteData.brief}` +
        filesText;

      const saved = await saveLead({
        name: quoteData.name,
        email: quoteData.email,
        phone: quoteData.phone,
        project_type: quoteData.service,
        budget_range: quoteData.budget,
        message: quoteData.brief,
        attachments: quoteData.files,
        status: "new",
      });

      setIsSending(false);
      setFlow({ kind: "idle" });
      setPendingFiles([]);

      const waHref = buildWaUrl(summary);
      const mailSubject = `Quote Request — ${quoteData.service}`;
      const mailHref = buildMailUrl(mailSubject, summary);

      const actions: ActionButton[] = [
        {
          id: "wa",
          label: dict.quote_send_wa,
          href: waHref,
          variant: "primary",
          icon: MessageCircle,
          external: true,
          kind: "whatsapp",
          copyText: summary,
        },
        {
          id: "email",
          label: dict.quote_send_email,
          href: mailHref,
          variant: "ghost",
          icon: Mail,
          kind: "email",
          copyText: `To: ${EMAIL}\nSubject: ${mailSubject}\n\n${summary}`,
        },
      ];

      pushBot({
        text: saved
          ? `${dict.quote_success_title}\n\n${dict.quote_success_body(saved.reference)}`
          : dict.save_failed,
        actions,
        chips: [{ id: "menu", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot }],
      });

    },
    [dict, goRoot, pushBot, saveLead],
  );

  const finalizeHandoff = useCallback(
    async (data: HandoffData) => {
      setIsSending(true);
      const summary =
        `Human Handoff Request\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Email:* ${data.email}\n` +
        `*Preferred time:* ${data.time}\n` +
        `*Topic:* ${data.topic}`;

      const saved = await saveLead({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.topic,
        preferred_time: data.time,
        status: "handoff_requested",
      });

      setIsSending(false);
      setFlow({ kind: "idle" });

      const waHref = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(summary)}`;
      const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Callback request from website")}&body=${encodeURIComponent(summary)}`;

      pushBot({
        text: saved ? dict.human_success(saved.reference) : dict.save_failed,
        actions: [
          { id: "call", label: PHONE_DISPLAY, href: `tel:${PHONE_WA}`, variant: "primary", icon: Phone },
          { id: "wa", label: "WhatsApp", href: waHref, variant: "ghost", icon: MessageCircle, external: true },
          { id: "email", label: "Email", href: mailHref, variant: "ghost", icon: Mail },
        ],
        chips: [{ id: "menu", label: dict.chip_menu, icon: ArrowLeft, onClick: goRoot }],
      });
    },
    [dict, goRoot, pushBot, saveLead],
  );

  // --- Free-text send ---
  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    pushUser(text);
    setInputValue("");

    // Quote flow text steps
    if (flow.kind === "quote") {
      if (flow.step === "name") {
        setFlow({ ...flow, step: "email", data: { ...flow.data, name: text } });
        setTimeout(() => pushBot({ text: dict.quote_email_prompt(text) }), 250);
        return;
      }
      if (flow.step === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
          setTimeout(() => pushBot({ text: dict.quote_email_invalid }), 200);
          return;
        }
        setFlow({ ...flow, step: "phone", data: { ...flow.data, email: text } });
        setTimeout(() => pushBot({ text: dict.quote_phone }), 250);
        return;
      }
      if (flow.step === "phone") {
        setFlow({ ...flow, step: "budget", data: { ...flow.data, phone: text } });
        setTimeout(() => askBudget(), 250);
        return;
      }
      if (flow.step === "brief") {
        setFlow({ ...flow, step: "attach", data: { ...flow.data, brief: text } });
        setTimeout(() => askAttach(), 250);
        return;
      }
    }

    // Handoff flow text steps
    if (flow.kind === "handoff") {
      if (flow.step === "name") {
        setFlow({ ...flow, step: "phone", data: { ...flow.data, name: text } });
        setTimeout(() => pushBot({ text: dict.quote_phone }), 250);
        return;
      }
      if (flow.step === "phone") {
        setFlow({ ...flow, step: "email", data: { ...flow.data, phone: text } });
        setTimeout(() => pushBot({ text: dict.quote_email_prompt(flow.data.name || "") }), 250);
        return;
      }
      if (flow.step === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
          setTimeout(() => pushBot({ text: dict.quote_email_invalid }), 200);
          return;
        }
        setFlow({ ...flow, step: "time", data: { ...flow.data, email: text } });
        setTimeout(() => askHandoffTime(), 250);
        return;
      }
      if (flow.step === "topic") {
        const final = { ...flow.data, topic: text };
        setFlow({ ...flow, step: "done", data: final });
        finalizeHandoff(final);
        return;
      }
    }

    // Fallback keyword routing
    const lower = text.toLowerCase();
    setTimeout(() => {
      if (/(quote|price|cost|estimate|budget|कोट|मूल्य|कीमत|কোট)/.test(lower)) return startQuote();
      if (/(faq|question|help|प्रश्न|প্রশ্ন)/.test(lower)) return showFaq();
      if (/(solar|सोलर|সোলার)/.test(lower)) return startQuote();
      if (/(contact|call|phone|email|address|संपर्क|যোগাযোগ)/.test(lower)) return showContact();
      if (/(hour|time|open|समय|সময়)/.test(lower)) return showHours();
      if (/(project|portfolio|प्रोजेक्ट|প্রকল্প)/.test(lower)) return showProjects();
      if (/(cert|iso|प्रमाण|সার্টিফিকেট)/.test(lower)) return showCerts();
      if (/(human|agent|talk|person|प्रतिनिधि|প্রতিনিধি)/.test(lower)) return startHandoff();
      pushBot({ text: dict.fallback, chips: rootChips() });
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setFlow({ kind: "idle" });
    setInputValue("");
    setPendingFiles([]);
    setAttachError(null);
  };

  // Greeting when opened / when locale changes on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      pushBot({ text: dict.greeting, chips: rootChips() });
      setTimeout(() => inputRef.current?.focus(), 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, dict]);

  // When locale changes mid-conversation, offer a menu refresh
  useEffect(() => {
    if (isOpen && messages.length > 0 && flow.kind === "idle") {
      pushBot({ text: dict.menu_prompt, chips: rootChips() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // --- Render helpers ---
  const currentPlaceholder = (() => {
    if (flow.kind === "quote") {
      if (flow.step === "email") return dict.input_email_placeholder;
      if (flow.step === "phone") return dict.input_phone_placeholder;
      if (flow.step === "name") return dict.input_name_placeholder;
      if (flow.step === "brief") return dict.input_brief_placeholder;
    }
    if (flow.kind === "handoff") {
      if (flow.step === "email") return dict.input_email_placeholder;
      if (flow.step === "phone") return dict.input_phone_placeholder;
      if (flow.step === "name") return dict.input_name_placeholder;
      if (flow.step === "topic") return dict.input_brief_placeholder;
    }
    return dict.input_placeholder;
  })();

  const showAttachPanel = flow.kind === "quote" && flow.step === "attach";

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
          className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[440px] h-[78vh] max-h-[640px] bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col border border-border animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-navy-deep p-4 flex items-center justify-between border-b border-white/5 relative">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="bg-gold/15 p-2 rounded-full ring-2 ring-gold/30">
                  <Bot className="w-5 h-5 text-gold" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-navy-deep" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-display text-sm truncate">{dict.header_title}</h3>
                <p className="text-white/60 text-[0.68rem] truncate">{dict.header_status}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu((v) => !v)}
                  title={dict.language}
                  aria-label={dict.language}
                  aria-expanded={showLangMenu}
                  className="inline-flex items-center gap-1 text-white/70 hover:text-gold text-[0.68rem] font-semibold uppercase tracking-widest px-2 py-1 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {locale.toUpperCase()}
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-2xl border border-border py-1 min-w-[140px] z-10">
                    {CHAT_LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setLocale(l.code)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${
                          l.code === locale ? "font-bold text-navy" : "text-navy-deep/80"
                        }`}
                      >
                        {l.native}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={resetChat}
                title={dict.reset}
                aria-label={dict.reset}
                className="text-white/50 hover:text-gold text-[0.65rem] uppercase tracking-widest px-2 py-1 transition-colors"
              >
                {dict.reset}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={dict.close}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat window */}
          <div
            ref={messagesRef}
            className="flex-1 bg-secondary/40 p-4 overflow-y-auto flex flex-col gap-3"
            aria-live="polite"
          >
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
                      className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        m.sender === "user"
                          ? "bg-navy text-white rounded-tr-sm"
                          : "bg-white border border-border/50 text-navy-deep rounded-tl-sm shadow-sm"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: escapeHtml(m.text).replace(
                          /\*\*(.+?)\*\*/g,
                          '<strong class="font-semibold">$1</strong>',
                        ),
                      }}
                    />
                  )}

                  {m.files && m.files.length > 0 && (
                    <div className="flex flex-col gap-1.5 w-full">
                      {m.files.map((f, i) => (
                        <div
                          key={i}
                          className="bg-white/80 border border-navy/20 rounded-lg px-3 py-2 text-xs text-navy-deep flex items-center gap-2"
                        >
                          <Paperclip className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="truncate flex-1">{f.name}</span>
                          <span className="text-navy-deep/50 shrink-0">
                            {formatBytes(f.size)}
                          </span>
                        </div>
                      ))}
                    </div>
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
                            target={a.external || a.kind === "whatsapp" ? "_blank" : undefined}
                            rel={a.external || a.kind === "whatsapp" ? "noopener noreferrer" : undefined}
                            onClick={(e) => handleActionClick(a, e)}
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
                            onClick={c.onClick}
                            className="inline-flex items-center gap-1.5 bg-white border border-navy/15 text-navy-deep hover:bg-navy hover:text-white hover:border-navy px-3 py-1.5 rounded-full text-[0.72rem] font-medium transition-colors shadow-sm text-left"
                          >
                            {Icon && <Icon className="w-3 h-3 shrink-0" />}
                            <span>{c.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Attachment panel */}
            {showAttachPanel && flow.kind === "quote" && (
              <div className="bg-white border border-navy/15 rounded-xl p-3 shadow-sm">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPT}
                  className="hidden"
                  onChange={(e) => handleFilesPicked(e.target.files)}
                />
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile || pendingFiles.length >= MAX_FILES}
                    className="inline-flex items-center gap-1.5 bg-navy text-white text-[0.7rem] font-semibold uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-gold hover:text-navy disabled:opacity-50 transition-colors"
                  >
                    {uploadingFile ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Paperclip className="w-3.5 h-3.5" />
                    )}
                    {dict.quote_attach_add}
                  </button>
                  <span className="text-[0.68rem] text-navy-deep/60">
                    {pendingFiles.length}/{MAX_FILES}
                  </span>
                </div>
                {pendingFiles.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {pendingFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-secondary/70 rounded-md px-2 py-1.5 text-[0.72rem] text-navy-deep"
                      >
                        <Paperclip className="w-3 h-3 text-gold shrink-0" />
                        <span className="truncate flex-1">{f.name}</span>
                        <span className="text-navy-deep/50 shrink-0">
                          {formatBytes(f.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePendingFile(i)}
                          aria-label="Remove file"
                          className="text-navy-deep/40 hover:text-red-500 shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {attachError && (
                  <div className="text-[0.7rem] text-red-600 mb-2">{attachError}</div>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const data = { ...flow.data, files: pendingFiles };
                      pushUser(
                        pendingFiles.length
                          ? `📎 ${pendingFiles.length} file(s) attached`
                          : "—",
                        pendingFiles,
                      );
                      finalizeQuote(data);
                    }}
                    className="flex-1 bg-gold text-navy-deep text-[0.72rem] font-bold uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-navy hover:text-gold transition-colors"
                  >
                    {pendingFiles.length ? dict.quote_attach_continue : dict.quote_attach_skip}
                  </button>
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="bg-white border border-border/50 text-navy p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span className="text-sm">{dict.quote_sending}</span>
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
                pushUser(dict.chip_menu);
                setTimeout(goRoot, 150);
              }}
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-navy hover:text-gold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3" /> {dict.chip_menu}
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
              placeholder={currentPlaceholder}
              className="flex-1 bg-secondary/50 border border-border/60 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 transition-all"
              disabled={isSending}
              aria-label="Chat message"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSending}
              aria-label={dict.send}
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
          aria-label={dict.open_chat}
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl shadow-black/30 pl-4 pr-5 py-3.5 transition-all duration-300 hover:scale-[1.03]"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
          <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2.2} />
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">
            {dict.open_chat}
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>
      )}
    </div>
  );
}
