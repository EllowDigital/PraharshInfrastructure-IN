import { useMemo, useState } from "react";
import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, CERTIFICATIONS_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  ShieldCheck,
  FileBadge2,
  BadgeCheck,
  Stamp,
  Search,
  Download,
  Mail,
  X,
  type LucideIcon,
} from "lucide-react";

const BASE = "https://www.praharshinfrastructure.com";
const CONTACT_EMAIL = "info@praharshinfrastructure.com";

type Cert = {
  id: string;
  icon: LucideIcon;
  code: string;
  t: string;
  d: string;
  category: "Management Systems" | "Government Registration" | "Statutory Compliance";
  issuer: string;
  year: string;
  validity: string;
  scope: string;
};

const certs: Cert[] = [
  {
    id: "iso-9001",
    icon: Award,
    code: "ISO 9001:2015",
    t: "Quality Management System",
    d: "Documented quality processes across estimation, procurement, execution and handover.",
    category: "Management Systems",
    issuer: "Accredited Certification Body (IAF member)",
    year: "2015 standard · maintained annually",
    validity: "Subject to annual surveillance audit",
    scope: "Infrastructure execution, electrical works, solar installation and government supply.",
  },
  {
    id: "iso-14001",
    icon: ShieldCheck,
    code: "ISO 14001:2015",
    t: "Environmental Management",
    d: "Environmental compliance across every active project site.",
    category: "Management Systems",
    issuer: "Accredited Certification Body (IAF member)",
    year: "2015 standard · maintained annually",
    validity: "Subject to annual surveillance audit",
    scope: "Site waste handling, emissions control and environmental risk management.",
  },
  {
    id: "iso-45001",
    icon: BadgeCheck,
    code: "ISO 45001:2018",
    t: "Occupational Health & Safety",
    d: "Zero-harm safety culture with site-level audits and incident reporting.",
    category: "Management Systems",
    issuer: "Accredited Certification Body (IAF member)",
    year: "2018 standard · maintained annually",
    validity: "Subject to annual surveillance audit",
    scope: "Worker safety, PPE compliance, hazard reporting and site-level safety audits.",
  },
  {
    id: "gem",
    icon: FileBadge2,
    code: "GeM Seller ID",
    t: "Government e-Marketplace",
    d: "Verified GeM seller ID 6498190000819033 across lighting, electrical and government supply categories.",
    category: "Government Registration",
    issuer: "Government e-Marketplace (GeM), Government of India",
    year: "Active registration",
    validity: "Active · verified seller profile",
    scope: "Lighting, electrical equipment, solar products and general government supply.",
  },
  {
    id: "udyam",
    icon: Stamp,
    code: "UDYAM-UP-50-0034245",
    t: "Udyam Registration",
    d: "MSME-registered enterprise holding Udyam Registration for government project supply services.",
    category: "Government Registration",
    issuer: "Ministry of MSME, Government of India",
    year: "Active registration",
    validity: "Permanent registration number",
    scope: "MSME benefits and eligibility for government tender participation.",
  },
  {
    id: "gst",
    icon: BadgeCheck,
    code: "GST: 09GBVPS0920R1ZI",
    t: "Statutory Registration",
    d: "GST registered for government procurement and infrastructure contract billing.",
    category: "Statutory Compliance",
    issuer: "GST Department, Government of India",
    year: "Active registration",
    validity: "Active",
    scope: "Tax-compliant billing for government and institutional contracts.",
  },
  {
    id: "upsic",
    icon: ShieldCheck,
    code: "UPSIC Registered Activities",
    t: "Government Project Category",
    d: "Solar energy based power generation, manufacturing of electrical lighting equipment, street lighting installation, public infrastructure development.",
    category: "Government Registration",
    issuer: "UP State Industrial Corporation (UPSIC)",
    year: "Active registration",
    validity: "Active",
    scope:
      "Solar power generation, lighting equipment, street lighting and public infrastructure development.",
  },
];

const CATEGORIES = ["All", "Management Systems", "Government Registration", "Statutory Compliance"];

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

function downloadProof(c: Cert) {
  const body = [
    "PRAHARSH INFRASTRUCTURE — CREDENTIAL PROOF SUMMARY",
    "==================================================",
    "",
    `Credential   : ${c.code}`,
    `Title        : ${c.t}`,
    `Category     : ${c.category}`,
    `Issuing body : ${c.issuer}`,
    `Year / status: ${c.year}`,
    `Validity     : ${c.validity}`,
    `Scope        : ${c.scope}`,
    "",
    `Generated on : ${new Date().toLocaleString()}`,
    "",
    "Certified hard copies and signed certificates are issued on written request to",
    `${CONTACT_EMAIL} for tender, empanelment and due-diligence purposes.`,
    "",
    `${BASE}/certifications`,
  ].join("\n");

  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = `praharsh-${c.id}-proof.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

function Certifications() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Cert | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certs.filter((c) => {
      const matchesCategory = category === "All" || c.category === category;
      const matchesQuery =
        !q ||
        [c.code, c.t, c.d, c.issuer, c.category, c.scope].some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE}/certifications#webpage`,
      url: `${BASE}/certifications`,
      name: "Certifications & Accreditations | Praharsh Infrastructure",
      description:
        "ISO 9001, ISO 14001, ISO 45001, GeM, Udyam, GST and UPSIC credentials held by Praharsh Infrastructure for government and institutional project delivery.",
      isPartOf: { "@type": "WebSite", url: BASE, name: "Praharsh Infrastructure" },
      about: { "@type": "Organization", name: "Praharsh Infrastructure", url: BASE },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Praharsh Infrastructure Certifications and Registrations",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: certs.length,
      itemListElement: certs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Certification",
          name: `${c.code} — ${c.t}`,
          description: c.d,
          issuedBy: { "@type": "Organization", name: c.issuer },
          url: `${BASE}/certifications#${c.id}`,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="Certifications & Accreditations | Praharsh Infrastructure"
        description="ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, GeM seller registration, Udyam MSME, GST and UPSIC credentials held by Praharsh Infrastructure."
        keywords="ISO 9001 certified infrastructure company, ISO 14001, ISO 45001, GeM seller, Udyam MSME registration, UPSIC registered, Lucknow"
        url={`${BASE}/certifications`}
        canonicalUrl={`${BASE}/certifications`}
        structuredData={structuredData}
      />

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
          <Breadcrumbs
            items={[{ label: "Certifications" }]}
            className="mb-6 text-white/70 [&_[aria-current]]:text-gold"
          />
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
              <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
                Praharsh operates under internationally recognised management systems and statutory
                registrations — a foundational requirement for the public-sector work we deliver.
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/20 bg-white/10 lg:grid-cols-1">
                {HERO_STATS.map((s) => (
                  <div key={s.v} className="bg-navy/80 p-4 sm:p-5 backdrop-blur-sm">
                    <dt className="font-display text-2xl sm:text-3xl text-gold leading-none">
                      {s.k}
                    </dt>
                    <dd className="mt-2 text-[0.7rem] sm:text-xs uppercase tracking-widest text-white/75">
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
        {/* Search + category filter */}
        <div className="-mt-4 sm:-mt-8 mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="cert-search" className="sr-only">
                Search certifications
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="cert-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ISO, GeM, GST, Udyam…"
                className="focus-ring w-full rounded-lg border border-border bg-background py-3 pl-10 pr-10 text-sm text-navy placeholder:text-muted-foreground"
                aria-describedby="cert-results-count"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="focus-ring absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-navy"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div
              role="group"
              aria-label="Filter certifications by category"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((cat) => {
                const selected = cat === category;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={selected}
                    className={`focus-ring rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      selected
                        ? "border-navy bg-navy text-white"
                        : "border-border bg-background text-navy hover:border-gold hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <p
            id="cert-results-count"
            role="status"
            aria-live="polite"
            className="mt-4 text-sm text-muted-foreground"
          >
            Showing {filtered.length} of {certs.length} credentials
            {category !== "All" ? ` in ${category}` : ""}.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-background p-8 sm:p-12 text-center">
            <p className="font-display text-xl text-navy">No credentials match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword or reset the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="focus-ring mt-6 rounded-lg bg-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <Reveal as="li" key={c.id} delay={Math.min(i, 5) * 70} className="bg-background">
                <article
                  id={c.id}
                  className="lift-card group relative h-full overflow-hidden bg-background p-6 sm:p-8 lg:p-10"
                >
                  <div className="icon-pop grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold">
                    <c.icon className="w-6 h-6" strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  <div className="eyebrow text-gold mt-6 mb-2 break-words">{c.code}</div>
                  <h3 className="font-display text-xl sm:text-2xl text-navy leading-tight">
                    <button
                      type="button"
                      onClick={() => setActive(c)}
                      aria-haspopup="dialog"
                      className="focus-ring text-left after:absolute after:inset-0 after:content-['']"
                    >
                      {c.t}
                      <span className="sr-only"> — view certification details</span>
                    </button>
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy transition-colors group-hover:text-gold">
                    View details
                    <span aria-hidden="true">→</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <Section muted eyebrow="Compliance Snapshot" title="Documents available on request.">
        <ul className="grid gap-3 sm:gap-4 -mt-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOCS.map((d, i) => (
            <Reveal as="li" key={d} delay={Math.min(i, 5) * 60}>
              <div className="flex h-full items-center justify-between gap-3 rounded-lg border border-border bg-background p-4 sm:p-5 text-sm text-navy transition-colors hover:border-gold">
                <span className="min-w-0 break-words">{d}</span>
                <BadgeCheck className="w-4 h-4 shrink-0 text-gold" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Certification details modal */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy text-gold">
                    <active.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="eyebrow text-gold break-words">{active.code}</span>
                </div>
                <DialogTitle className="font-display text-2xl text-navy text-left">
                  {active.t}
                </DialogTitle>
                <DialogDescription className="text-left text-muted-foreground">
                  {active.d}
                </DialogDescription>
              </DialogHeader>

              <dl className="mt-2 divide-y divide-border rounded-lg border border-border">
                {[
                  ["Category", active.category],
                  ["Issuing body", active.issuer],
                  ["Year / status", active.year],
                  ["Validity", active.validity],
                  ["Scope", active.scope],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 p-3 sm:grid-cols-3 sm:gap-3">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="text-sm text-navy sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => downloadProof(active)}
                  className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download proof summary
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    `Certified copy request — ${active.code}`,
                  )}&body=${encodeURIComponent(
                    `Please share the certified copy of ${active.code} (${active.t}).`,
                  )}`}
                  className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-navy px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-navy"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Request certified copy
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Certifications;
