import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, GOVERNMENT_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Link } from "react-router-dom";
import { Section } from "@/components/site/Section";
import {
  Landmark,
  FileCheck2,
  ScrollText,
  ArrowUpRight,
  CheckCircle2,
  HardHat,
  Sun,
  Zap,
  BadgeCheck,
  ShieldCheck,
  Building2,
  Trophy,
  Users,
  Handshake,
  Sparkles,
  Clock,
} from "lucide-react";
import govtImg from "@/assets/images/projects/gem-government-supply.png";

const credentials = [
  {
    icon: ScrollText,
    t: "Tender Participation",
    d: "Comprehensive experience in technical and financial bid submissions across state e-procurement portals.",
  },
  {
    icon: Landmark,
    t: "Public Sector Execution",
    d: "Proven track record of delivering multi-site government projects with strict adherence to contractual milestones.",
  },
  {
    icon: FileCheck2,
    t: "Procurement Support",
    d: "Active GeM portal seller, facilitating streamlined category-mapped procurement for state and central agencies.",
  },
  {
    icon: HardHat,
    t: "Infrastructure Development",
    d: "Turnkey civic works ranging from urban pole installations to high mast lighting across municipal jurisdictions.",
  },
  {
    icon: Sun,
    t: "Solar Projects",
    d: "Large-scale deployment of solar street lighting and renewable energy systems for rural and urban development.",
  },
  {
    icon: Zap,
    t: "Public Utility Works",
    d: "Execution of essential electrical and public utility infrastructure, including cabling, panel works, and substation upgrades.",
  },
];

const departments = [
  { name: "State Public Works Departments", icon: HardHat },
  { name: "Municipal Corporations & Nagar Panchayats", icon: Building2 },
  { name: "State Electricity Distribution Companies", icon: Zap },
  { name: "District Rural Development Agencies", icon: Users },
  { name: "Public Health & Sanitation Boards", icon: ShieldCheck },
  { name: "Smart City Special Purpose Vehicles", icon: Sparkles },
  { name: "Defence Welfare Boards", icon: Landmark },
  { name: "State Renewable Energy Development Agencies", icon: Sun },
];

const trustStats = [
  { k: "10+", v: "Years serving public sector" },
  { k: "8+", v: "Government departments engaged" },
  { k: "100%", v: "Audit-ready documentation" },
  { k: "24×7", v: "Tender-response cell" },
];

const accreditations = [
  { icon: BadgeCheck, label: "GeM Registered Vendor" },
  { icon: ShieldCheck, label: "ISO 9001:2015" },
  { icon: FileCheck2, label: "PWD Empanelled" },
  { icon: Zap, label: "UPPCL Approved" },
  { icon: Trophy, label: "MSME Registered" },
];

const workflow = [
  {
    n: "01",
    icon: ScrollText,
    t: "Bid Discovery",
    d: "Daily GeM and state e-procurement portal scanning with category-mapped alerts.",
  },
  {
    n: "02",
    icon: FileCheck2,
    t: "Compliant Submission",
    d: "In-house tender cell prepares technical and financial bids within standard timelines.",
  },
  {
    n: "03",
    icon: Handshake,
    t: "Contract Execution",
    d: "Dedicated PMC team handles delivery, inspection, billing and warranty servicing.",
  },
];

function Govt() {
  return (
    <>
      <SEO title="Government Capabilities · Praharsh Infrastructure" />



      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={govtImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/50" />
        </div>
        {/* decorative gold grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow text-gold mb-6">
                <span className="gold-rule mr-3 align-middle" /> Public Sector
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl leading-[1.05] lg:leading-[1.02]">
                Built for the
                <br />
                <span className="italic text-gold">government tender.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed">
                Praharsh Infrastructure is structured, documented and audited specifically to
                deliver public-sector projects — from GeM procurement to large turnkey civic works.
              </p>

              {/* CTA row */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-semibold hover:bg-white transition-colors uppercase tracking-wider"
                >
                  Share your RFP <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/certifications"
                  className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm font-semibold hover:border-gold hover:text-gold transition-colors uppercase tracking-wider"
                >
                  View Certifications
                </Link>
              </div>
            </div>

            {/* Accreditation stack */}
            <div className="lg:col-span-4">
              <div className="bg-white/[0.04] backdrop-blur border border-white/10 p-6 rounded-sm">
                <div className="eyebrow text-gold mb-5">Accreditations</div>
                <ul className="space-y-3">
                  {accreditations.map((a) => (
                    <li key={a.label} className="flex items-center gap-3 text-white/90 text-sm">
                      <a.icon className="w-4 h-4 text-gold shrink-0" />
                      <span>{a.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SpecialitiesMarquee
        items={GOVERNMENT_ITEMS}
        variant="navy"
        direction="right"
        ariaLabel="Government-sector capabilities"
      />

      {/* TRUST STAT STRIP */}
      <section className="bg-navy-deep border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustStats.map((s) => (
            <div key={s.v} className="text-center lg:text-left">
              <div className="font-display text-4xl lg:text-5xl text-gold leading-none">{s.k}</div>
              <div className="mt-2 text-white/60 text-xs uppercase tracking-[0.2em]">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES BENTO */}
      <Section eyebrow="Core Competencies" title="Government Capabilities">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 -mt-8">
          {credentials.map((c, i) => (
            <div
              key={c.t}
              className="group relative bg-background p-8 lg:p-10 border border-border rounded-sm overflow-hidden hover:border-gold transition-colors duration-500"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
              <div className="relative flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <c.icon className="w-7 h-7 text-gold group-hover:text-navy transition-colors" strokeWidth={1.5} />
                </div>
                <span className="font-display text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="relative font-display text-xl text-navy leading-tight">{c.t}</h3>
              <div className="relative mt-3 h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
              <p className="relative mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DEPARTMENTS */}
      <Section muted eyebrow="Who We Serve" title="Departments and agencies we work with.">
        <div className="grid sm:grid-cols-2 gap-4 -mt-4">
          {departments.map((d) => (
            <div
              key={d.name}
              className="group bg-background p-6 flex items-center gap-5 border-l-2 border-gold rounded-r-sm hover:shadow-elevated hover:translate-x-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                <d.icon className="w-5 h-5 text-gold group-hover:text-navy transition-colors" />
              </div>
              <span className="text-navy text-sm font-medium">{d.name}</span>
              <CheckCircle2 className="w-4 h-4 text-gold ml-auto shrink-0" />
            </div>
          ))}
        </div>
      </Section>

      {/* WORKFLOW TIMELINE */}
      <Section eyebrow="GeM Expertise" title="A procurement workflow tuned for public buyers.">
        <div className="relative -mt-8">
          {/* connecting line desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="grid lg:grid-cols-3 gap-6 relative">
            {workflow.map((s) => (
              <div
                key={s.n}
                className="relative bg-background border border-border p-10 rounded-sm hover:border-gold transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-navy text-gold flex items-center justify-center font-display text-lg mb-6 relative z-10">
                  {s.n}
                </div>
                <s.icon className="w-8 h-8 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-2xl text-navy">{s.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-gold uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> Standard turnaround
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Landmark className="w-10 h-10 text-gold mb-6" strokeWidth={1.4} />
            <h2 className="text-white text-3xl lg:text-5xl leading-tight">
              Government department? <span className="italic text-gold">Share your RFP.</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-xl">
              Our tender cell responds within 24 hours with a compliance checklist, prior-experience
              annexures and indicative timelines.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-semibold hover:bg-white transition-colors uppercase tracking-wider"
            >
              Submit Tender Brief <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Govt;
