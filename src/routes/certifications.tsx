import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Award, ShieldCheck, FileBadge2, BadgeCheck, Stamp } from "lucide-react";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "ISO certified operations, GeM registration, MSME and statutory compliance credentials of Praharsh Infrastructure.",
      },
      { property: "og:title", content: "Certifications & Compliance" },
      { property: "og:description", content: "Audited, accredited, and accountable." },
    ],
  }),
  component: Certifications,
});

const certs = [
  {
    icon: Award,
    code: "ISO 9001:2015",
    t: "Quality Management System",
    d: "Documented quality processes across estimation, procurement, execution and handover.",
  },
  {
    icon: ShieldCheck,
    code: "ISO 14001:2015",
    t: "Environmental Management",
    d: "Environmental compliance across every active project site.",
  },
  {
    icon: BadgeCheck,
    code: "ISO 45001:2018",
    t: "Occupational Health & Safety",
    d: "Zero-harm safety culture with site-level audits and incident reporting.",
  },
  {
    icon: FileBadge2,
    code: "GeM Seller",
    t: "Government e-Marketplace",
    d: "Verified seller across lighting, electrical and government supply categories.",
  },
  {
    icon: Stamp,
    code: "MSME / Udyam",
    t: "Registered Enterprise",
    d: "Udyam-registered MSME — eligible for priority procurement schemes.",
  },
  {
    icon: BadgeCheck,
    code: "GST & PAN",
    t: "Statutory Registrations",
    d: "GSTIN, PAN, TAN, EPF, ESI and labour licences in active compliance.",
  },
];

function Certifications() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Accreditations
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Audited.
            <br />
            <span className="italic text-gold">Accredited. Accountable.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Praharsh operates under internationally recognised management systems and statutory
            registrations — a foundational requirement for the public-sector work we deliver.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border -mt-8">
          {certs.map((c) => (
            <div key={c.code} className="bg-background p-10 card-hover">
              <c.icon className="w-10 h-10 text-gold mb-6" strokeWidth={1.4} />
              <div className="eyebrow text-gold mb-2">{c.code}</div>
              <h3 className="font-display text-2xl text-navy leading-tight">{c.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Compliance Snapshot" title="Documents available on request.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-4">
          {[
            "GSTIN Certificate",
            "Udyam (MSME) Certificate",
            "GeM Seller Profile",
            "ISO 9001:2015",
            "ISO 14001:2015",
            "ISO 45001:2018",
            "EPF Registration",
            "ESI Registration",
          ].map((d) => (
            <div
              key={d}
              className="bg-background border border-border p-5 text-sm text-navy flex items-center justify-between"
            >
              <span>{d}</span>
              <BadgeCheck className="w-4 h-4 text-gold" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
