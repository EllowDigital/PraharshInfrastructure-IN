import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, CERTIFICATIONS_ITEMS } from "@/components/site/SpecialitiesMarquee";
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

const HERO_STATS = [
  { k: "3", v: "ISO Management Systems" },
  { k: "100%", v: "Statutory Compliance" },
  { k: "GeM", v: "Verified Seller" },
];

const DOCS = [
  "GST: 09GBVPS0920R1ZI",
  "UDYAM-UP-50-0034245",
  "GeM Seller ID: 6498190000819033",
  "UPSIC Registered Activities",
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "EPF Registration",
  "ESI Registration",
];

function Certifications() {
  return (
    <>
      <SEO title="Praharsh Infrastructure" />

      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-20 bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(212,160,23,0.35), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow text-gold mb-5 flex items-center">
                <span className="gold-rule mr-3 align-middle" /> Accreditations
              </div>
              <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.02] text-balance">
                Audited.{" "}
                <span className="italic text-gold">
                  Accredited.
                  <br className="hidden sm:block" /> Accountable.
                </span>
              </h1>
              <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
                Praharsh operates under internationally recognised management systems and statutory
                registrations — a foundational requirement for the public-sector work we deliver.
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 lg:grid-cols-1">
                {HERO_STATS.map((s) => (
                  <div key={s.v} className="bg-navy/80 p-4 sm:p-5 backdrop-blur-sm">
                    <dt className="font-display text-2xl sm:text-3xl text-gold leading-none">
                      {s.k}
                    </dt>
                    <dd className="mt-2 text-[0.7rem] sm:text-xs uppercase tracking-widest text-white/65">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <SpecialitiesMarquee
        items={CERTIFICATIONS_ITEMS}
        variant="gold"
        direction="left"
        ariaLabel="Certifications and accreditations"
      />

      <Section eyebrow="Credentials" title="Certified across quality, environment and safety.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 -mt-4 sm:-mt-8">
          {certs.map((c) => (
            <div key={c.code} className="card-hover group bg-background p-6 sm:p-8 lg:p-10">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold transition-transform duration-500 group-hover:-translate-y-1">
                <c.icon className="w-6 h-6" strokeWidth={1.4} aria-hidden="true" />
              </div>
              <div className="eyebrow text-gold mt-6 mb-2 break-words">{c.code}</div>
              <h3 className="font-display text-xl sm:text-2xl text-navy leading-tight">{c.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Compliance Snapshot" title="Documents available on request.">
        <div className="grid gap-3 sm:gap-4 -mt-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOCS.map((d) => (
            <div
              key={d}
              className="bg-background border border-border rounded-lg p-4 sm:p-5 text-sm text-navy flex items-center justify-between gap-3 transition-colors hover:border-gold"
            >
              <span className="min-w-0 break-words">{d}</span>
              <BadgeCheck className="w-4 h-4 shrink-0 text-gold" aria-hidden="true" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default Certifications;
