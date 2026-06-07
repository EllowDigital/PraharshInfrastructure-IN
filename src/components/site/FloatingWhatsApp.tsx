import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, ChevronUp } from "lucide-react";

const PHONE = "917800009165";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "Hello! Welcome to Praharsh Infrastructure. How can we assist you today? Please briefly describe your requirement.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(0); // 0: brief, 1: name, 2: email
  const [formData, setFormData] = useState({ brief: "", name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text }]);
    setInputValue("");

    if (step === 0) {
      setFormData((prev) => ({ ...prev, brief: text }));
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Thank you. Could you please tell us your name?",
          },
        ]);
        setStep(1);
      }, 600);
    } else if (step === 1) {
      setFormData((prev) => ({ ...prev, name: text }));
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: `Nice to meet you, ${text}. Finally, what is your email address?`,
          },
        ]);
        setStep(2);
      }, 600);
    } else if (step === 2) {
      const email = text;
      setFormData((prev) => ({ ...prev, email }));

      setIsSubmitting(true);

      try {
        const payload = {
          name: formData.name,
          email: email,
          brief: formData.brief,
          projectType: "WhatsApp Bot Enquiry",
        };

        // Attempt to send email via Netlify function
        const res = await fetch("/.netlify/functions/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: "bot",
              text: "We have received your details! Redirecting you to WhatsApp...",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: "bot",
              text: "We couldn't send the email automatically, but redirecting you to WhatsApp now...",
            },
          ]);
        }
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender: "bot", text: "Redirecting you to WhatsApp..." },
        ]);
      } finally {
        setIsSubmitting(false);
        // Open WhatsApp
        const waText = encodeURIComponent(
          `Hello Praharsh Infrastructure, I'd like to request a quote / more information.\n\nName: ${formData.name}\nEmail: ${email}\nRequirement: ${formData.brief}`,
        );
        setTimeout(() => {
          window.open(`https://wa.me/${PHONE}?text=${waText}`, "_blank");
          setIsOpen(false);
          // reset for future
          setStep(0);
          setFormData({ brief: "", name: "", email: "" });
          setMessages([
            {
              id: "init-1",
              sender: "bot",
              text: "Hello! Welcome to Praharsh Infrastructure. How can we assist you today? Please briefly describe your requirement.",
            },
          ]);
        }, 1500);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          aria-label="Scroll back to top"
          className="w-11 h-11 rounded-full bg-navy text-white shadow-2xl shadow-black/25 flex items-center justify-center hover:bg-navy/90 transition"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[360px] bg-white rounded-lg shadow-2xl shadow-black/20 overflow-hidden flex flex-col border border-border animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-navy p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gold/20 p-2 rounded-full">
                <Bot className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-display text-sm">Praharsh Assistant</h3>
                <p className="text-white/70 text-[0.65rem]">We typically reply in a few minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Window */}
          <div className="h-[320px] bg-secondary/30 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    m.sender === "user"
                      ? "bg-navy text-white rounded-tr-none"
                      : "bg-white border border-border/50 text-navy rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isSubmitting && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white border border-border/50 text-navy p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  <span className="text-sm">Processing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step === 2 ? "Enter your email..." : "Type a message..."}
              className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-navy/20"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isSubmitting}
              className="w-9 h-9 rounded-full bg-gold text-navy flex items-center justify-center shrink-0 disabled:opacity-50 hover:bg-gold/90 transition-colors"
            >
              <Send className="w-4 h-4 -ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Chat with Praharsh Infrastructure on WhatsApp"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl shadow-black/30 pl-4 pr-5 py-3.5 transition-all duration-300 hover:scale-[1.03]"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
          <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span className="hidden sm:inline text-sm font-medium tracking-wide">Chat with us</span>
        </button>
      )}
    </div>
  );
}
