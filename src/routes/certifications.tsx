import { Section } from "@/components/site/Section";
import { Award, ShieldCheck, FileBadge2, BadgeCheck, Stamp } from "lucide-react";

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
    code: "GeM Seller ID",
    t: "Government e-Marketplace",
    d: "Verified GeM seller ID 6498190000819033 across lighting, electrical and government supply categories.",
  },
  {
    icon: Stamp,
    code: "UDYAM-UP-50-0034245",
    t: "Udyam Registration",
    d: "MSME-registered enterprise holding Udyam Registration for government project supply services.",
  },
  {
    icon: BadgeCheck,
    code: "GST: 09GBVPS0920R1ZI",
    t: "Statutory Registration",
    d: "GST registered for government procurement and infrastructure contract billing.",
  },
  {
    icon: ShieldCheck,
    code: "UPSIC Registered Activities",
    t: "Government Project Category",
    d: "Solar energy based power generation, manufacturing of electrical lighting equipment, street lighting installation, public infrastructure development.",
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
            "GST: 09GBVPS0920R1ZI",
            "UDYAM-UP-50-0034245",
            "GeM Seller ID: 6498190000819033",
            "UPSIC Registered Activities",
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

export default Certifications;
