import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Lightbulb,
  Sun,
  Zap,
  Landmark,
  Signpost,
  ShieldCheck,
  Award,
  Quote,
  Download,
  CheckCircle2,
  Building2,
  Users,
  FileBadge2,
  Clock,
  HardHat,
  Leaf,
} from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import civilImg from "@/assets/project-civil.jpg";
import teamImg from "@/assets/about-team.jpg";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praharsh Infrastructure — Building Today, Empowering Tomorrow" },
      {
        name: "description",
        content:
          "Praharsh Infrastructure delivers solar street lighting, high mast installations, electrical works, government supplies and branding projects across India.",
      },
      { property: "og:title", content: "Praharsh Infrastructure" },
      { property: "og:description", content: "Building Today, Empowering Tomorrow." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Lightbulb, title: "Infrastructure Development", desc: "High mast lighting, public lighting systems and urban/rural development." },
  { icon: Sun, title: "Solar Energy Solutions", desc: "Solar street lights, high mast and energy-efficient renewable installations." },
  { icon: Zap, title: "Electrical Works", desc: "Public utility lighting, cabling and electrical infrastructure." },
  { icon: Landmark, title: "Government Supply", desc: "Healthcare, sanitation, safety and utility material supplies." },
  { icon: Signpost, title: "Branding & Signage", desc: "ACP cladding, reflective signage and government branding works." },
];

const stats = [
  { v: "900+", l: "Solar Street Lights" },
  { v: "240+", l: "High Masts Erected" },
  { v: "14+", l: "Years of Operation" },
  { v: "50+", l: "Government Clients" },
];

const featured = [
  { img: solarImg, tag: "Solar", title: "900 Solar Street Light Project", client: "Barabanki District" },
  { img: electricalImg, tag: "High Mast", title: "61 High Mast Lighting Project", client: "State PWD" },
  { img: solarImg, tag: "Solar", title: "565 Solar Street Light Project", client: "Municipal Corp." },
  { img: govtImg, tag: "Government", title: "Healthcare & Sanitation Supply", client: "Health Mission" },
];

const whyUs = [
  { icon: FileBadge2, t: "GeM Procurement Expert", d: "Active GeM seller with category-mapped fulfilment." },
  { icon: Award, t: "ISO Certified Operations", d: "9001, 14001 and 45001 management systems." },
  { icon: Clock, t: "On-Time Delivery", d: "Contractual milestones met across multi-site rollouts." },
  { icon: HardHat, t: "Field-Trained Crew", d: "In-house electricians, riggers and site supervisors." },
  { icon: Leaf, t: "Sustainable First", d: "Solar-led lighting to cut public energy costs." },
  { icon: ShieldCheck, t: "Transparent Execution", d: "Audit-ready billing and progress documentation." },
];

const testimonials = [
  { q: "Praharsh delivered our 900 solar street light deployment ahead of schedule, with documentation audit-ready on day one.", n: "District Administration", r: "Barabanki" },
  { q: "Their high mast crew is among the most disciplined we've engaged. Safety and material quality were exemplary.", n: "Executive Engineer", r: "State PWD" },
  { q: "GeM compliance and billing transparency made Praharsh a preferred vendor across our procurement cycles.", n: "Procurement Officer", r: "Municipal Corp." },
];

function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Praharsh Infrastructure project site at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/85 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pb-24 pt-40 w-full">
          <div className="max-w-3xl">
            <div className="eyebrow text-gold mb-6 reveal">
              <span className="gold-rule mr-3 align-middle" /> Praharsh Infrastructure · Est. 2010
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] reveal reveal-delay-1">
              Building today,
              <br />
              <span className="text-gold italic font-display">empowering</span> tomorrow.
            </h1>
            <p className="mt-8 max-w-xl text-white/80 text-lg leading-relaxed reveal reveal-delay-2">
              A multi-disciplinary infrastructure, solar and government supply contractor — engineering
              public utility projects with discipline, integrity and measurable outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 text-sm font-medium tracking-wide hover:bg-white transition-colors"
              >
                Explore Our Work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
              >
                Request Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW */}
      <Section eyebrow="Who We Are" title="An infrastructure contractor built for the public sector.">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start -mt-8">
          <div className="lg:col-span-7 image-zoom">
            <img
              src={teamImg}
              alt="Praharsh engineering team on site"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Praharsh Infrastructure delivers solar street lighting, high mast installations,
              electrical works, government supplies and branding — to municipal corporations, state
              departments, PSUs and private clients across India.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { icon: Building2, t: "Multi-Vertical Capability", d: "Five integrated business areas under one project management system." },
                { icon: ShieldCheck, t: "GeM & PSU Empanelled", d: "Verified GeM seller serving municipal, district and PSU clients." },
                { icon: Award, t: "ISO Certified", d: "9001, 14001 and 45001 audited management systems." },
              ].map((b) => (
                <div key={b.t} className="flex gap-5">
                  <div className="w-11 h-11 shrink-0 grid place-items-center bg-navy text-gold">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display text-lg text-navy">{b.t}</div>
                    <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 text-navy font-medium link-underline"
            >
              Learn about our company <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 3. SERVICE HIGHLIGHTS */}
      <Section
        muted
        eyebrow="Services"
        title="Five business areas. One execution standard."
        intro="Integrated capabilities operating under shared engineering, procurement and HSE systems."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
          {services.map((s, i) => (
            <div key={s.title} className="bg-background p-8 card-hover group">
              <div className="flex items-start justify-between mb-8">
                <s.icon className="w-9 h-9 text-gold" strokeWidth={1.4} />
                <span className="font-display text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl text-navy leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-navy group-hover:text-gold transition-colors"
              >
                Explore <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. STATISTICS COUNTER */}
      <section className="bg-navy py-20 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`px-6 py-6 ${i < stats.length - 1 ? "lg:border-r border-white/10" : ""}`}
            >
              <div className="font-display text-5xl lg:text-6xl text-gold">{s.v}</div>
              <div className="text-xs text-white/65 mt-3 tracking-widest uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <Section
        eyebrow="Featured Projects"
        title="A portfolio measured in landmarks."
        intro="Headline solar street light and high mast projects recently delivered for government clients."
      >
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {featured.map((p) => (
            <article key={p.title} className="group">
              <div className="image-zoom aspect-[4/3] bg-secondary mb-6">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="eyebrow text-gold mb-2">{p.tag}</div>
                  <h3 className="font-display text-2xl text-navy leading-tight">{p.title}</h3>
                  <div className="text-sm text-muted-foreground mt-2">Client · {p.client}</div>
                </div>
                <ArrowUpRight className="w-6 h-6 text-navy mt-1 shrink-0 transition-transform group-hover:rotate-45 group-hover:text-gold" />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-navy text-white px-7 py-4 text-sm font-medium hover:bg-gold hover:text-navy transition-colors"
          >
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* 6. WHY CHOOSE US */}
      <Section muted eyebrow="Why Choose Us" title="Engineered for accountability.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border -mt-8">
          {whyUs.map((w) => (
            <div key={w.t} className="bg-background p-8 card-hover">
              <w.icon className="w-8 h-8 text-gold mb-5" strokeWidth={1.4} />
              <h3 className="font-display text-xl text-navy">{w.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. GOVERNMENT CREDENTIALS */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow text-gold mb-6">
              <span className="gold-rule mr-3 align-middle" /> Government Credentials
            </div>
            <h2 className="text-white text-4xl lg:text-5xl leading-[1.05]">
              Procurement-ready. <span className="italic text-gold">Tender-trained.</span>
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed max-w-md">
              Praharsh is structured specifically to deliver public-sector projects — from GeM
              procurement to turnkey civic works.
            </p>
            <Link
              to="/government-capabilities"
              className="mt-10 inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 text-sm font-medium hover:bg-white transition-colors"
            >
              See Government Capabilities <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              "GeM Portal Registered Seller",
              "ISO 9001 / 14001 / 45001 Certified",
              "MSME / Udyam Registered",
              "EPF, ESI & GST Compliant",
              "State PWD Empanelled",
              "Municipal Vendor Approvals",
            ].map((c) => (
              <div
                key={c}
                className="bg-white/5 border border-white/10 p-5 flex items-center gap-3 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span className="text-white/90 text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT LOGOS */}
      <section className="bg-background py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold text-center mb-10">
            Trusted by India's Public & Private Sector
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-10 gap-x-6 items-center text-center">
            {["NTPC", "PGCIL", "NHAI", "CPWD", "BHEL", "GAIL", "UPNEDA", "IOCL"].map((c) => (
              <div
                key={c}
                className="font-display text-xl lg:text-2xl text-navy/50 hover:text-gold transition-colors cursor-default tracking-wider"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <Section muted eyebrow="Testimonials" title="What our clients say.">
        <div className="grid md:grid-cols-3 gap-6 -mt-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background p-10 border-t-2 border-gold card-hover">
              <Quote className="w-8 h-8 text-gold mb-6" />
              <p className="text-navy leading-relaxed">{t.q}</p>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-display text-navy">{t.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 10. CONTACT CTA */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow text-gold mb-6">
              <span className="gold-rule mr-3 align-middle" /> Start a Project
            </div>
            <h2 className="text-white text-4xl lg:text-6xl leading-[1.05]">
              Building something <span className="italic text-gold">significant?</span>
              <br />
              Let's engineer it together.
            </h2>
            <p className="mt-6 text-white/70 max-w-xl">
              Government department, municipal body, PSU or private developer — share your RFP and
              our pre-bid team will respond within one working day.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-5 text-sm font-medium hover:bg-white transition-colors"
            >
              Request a Proposal <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-5 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
            >
              <Download className="w-4 h-4" /> Company Profile
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
