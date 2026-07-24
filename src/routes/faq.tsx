import { useState } from "react";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { Plus, Minus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What services does Praharsh Infrastructure offer?",
    a: "We deliver infrastructure development, road works, solar energy solutions, electrical & lighting works, outdoor/indoor advertising, digital media, branding & signage and government supply services across India.",
  },
  {
    q: "Do you work with government departments and PSUs?",
    a: "Yes. We are an empaneled vendor for multiple state and central departments (PWD, UPSIC, DRDA) and an active GeM seller with a strong tender delivery track record.",
  },
  {
    q: "Which certifications and registrations do you hold?",
    a: "ISO 9001, ISO 14001 and ISO 45001, GeM Seller registration, Udyam (MSME) registration, EPFO registration and PWD empanelment. GST: 09GBVPS0920R1ZI.",
  },
  {
    q: "What geographies do you serve?",
    a: "Headquartered in Lucknow, we execute projects pan-India with a strong footprint across Uttar Pradesh and neighbouring states.",
  },
  {
    q: "How do I request a quote or proposal?",
    a: "Use the Chat with us widget for a 30-second guided quote, call +91-7800009165, email info@praharshinfrastructure.com or fill the form on the Contact page.",
  },
  {
    q: "What are your typical project timelines?",
    a: "Timelines depend on scope. Small electrical/signage jobs are delivered in 1–3 weeks; solar and road projects typically span 8–20 weeks. We share a firm schedule in the proposal.",
  },
  {
    q: "Do you provide warranty and post-installation support?",
    a: "Yes. All installations carry manufacturer warranty plus a workmanship warranty. AMC and O&M contracts are available on request.",
  },
  {
    q: "What are your payment terms?",
    a: "Standard commercial terms are shared per proposal. For government tenders, we follow the tender-specified payment milestones.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <SEO
        title="FAQ | Praharsh Infrastructure"
        description="Frequently asked questions about services, certifications, timelines, warranty and how to work with Praharsh Infrastructure."
      />
      <div className="pt-24" />
      <Section
        eyebrow="Support"
        title="Frequently Asked Questions"
        intro="Answers to the questions clients, government departments and partners ask us most often."
      >
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl text-navy group-hover:text-gold transition-colors">
                    {f.q}
                  </span>
                  <span className="shrink-0 w-9 h-9 grid place-items-center border border-border text-navy group-hover:border-gold group-hover:text-gold transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-6 -mt-2 text-muted-foreground leading-relaxed max-w-3xl">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
