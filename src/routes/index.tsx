import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Sun, Zap, Landmark, ShieldCheck, Award, Users, HardHat } from "lucide-react";
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
      { title: "Praharsh Infrastructure — EPC Contractor for Civil, Solar & Electrical Projects" },
      { name: "description", content: "Multi-crore EPC contractor delivering government-grade civil, electrical, solar and turnkey infrastructure projects across India." },
      { property: "og:title", content: "Praharsh Infrastructure" },
      { property: "og:description", content: "Engineering India's infrastructure backbone." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const sectors = [
  { icon: Building2, title: "Civil & Structural", desc: "Bridges, highways, industrial facilities and high-rise construction." },
  { icon: Sun, title: "Solar EPC", desc: "Utility-scale and rooftop solar plants with full O&M lifecycle." },
  { icon: Zap, title: "Electrical & T&D", desc: "Substations, transmission lines and distribution infrastructure." },
  { icon: Landmark, title: "Government Projects", desc: "Turnkey delivery for central and state PSU contracts." },
];

const stats = [
  { v: "14+", l: "Years of Operation" },
  { v: "₹2,400Cr+", l: "Projects Delivered" },
  { v: "320+", l: "Engineering Professionals" },
  { v: "18", l: "States Across India" },
];

const projects = [
  { img: solarImg, tag: "Renewables", title: "150 MW Solar Park, Rajasthan", client: "NTPC Renewable Energy" },
  { img: electricalImg, tag: "Power T&D", title: "400 kV GIS Substation", client: "Power Grid Corporation of India" },
  { img: govtImg, tag: "Government", title: "State Assembly Complex", client: "Government of Karnataka" },
  { img: civilImg, tag: "Civil", title: "Coastal Highway Viaduct", client: "National Highways Authority of India" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Praharsh Infrastructure project site at dusk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/85 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pb-24 pt-40 w-full">
          <div className="max-w-3xl">
            <div className="eyebrow text-gold mb-6 reveal">
              <span className="gold-rule mr-3 align-middle" /> Est. 2010 · EPC Contractor of Record
            </div>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] reveal reveal-delay-1">
              Engineering the<br />
              <span className="text-gold italic font-display">backbone</span> of modern India.
            </h1>
            <p className="mt-8 max-w-xl text-white/80 text-lg leading-relaxed reveal reveal-delay-2">
              From transmission corridors to solar parks and civic landmarks — Praharsh delivers
              complex, large-scale infrastructure with the precision of an engineering institution.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 reveal reveal-delay-3">
              <Link to="/projects" className="group inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 text-sm font-medium tracking-wide hover:bg-white transition-colors">
                Explore Our Work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                Request Proposal
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 hidden lg:block">
          <div className="mx-auto max-w-7xl px-10">
            <div className="bg-navy-deep/90 backdrop-blur-sm border-t border-gold/30 grid grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="px-8 py-7 border-r border-white/10 last:border-r-0">
                  <div className="font-display text-3xl text-gold">{s.v}</div>
                  <div className="text-xs text-white/60 mt-1 tracking-wide uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STATS */}
      <div className="lg:hidden bg-navy-deep">
        <div className="grid grid-cols-2 px-6 py-2">
          {stats.map((s) => (
            <div key={s.l} className="px-3 py-6 border-b border-white/10 [&:nth-child(odd)]:border-r">
              <div className="font-display text-2xl text-gold">{s.v}</div>
              <div className="text-[0.65rem] text-white/60 mt-1 tracking-wide uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <Section eyebrow="Who We Are" title="A construction institution built on engineering discipline.">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start -mt-8">
          <div className="lg:col-span-7 image-zoom">
            <img src={teamImg} alt="Praharsh engineering team on site" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Praharsh Infrastructure is a multi-disciplinary EPC contractor delivering civil,
              electrical, solar and government turnkey projects across India. We have completed
              works worth ₹2,400+ crore for PSUs, state governments and private developers.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { icon: ShieldCheck, t: "Pre-qualified Contractor", d: "Empanelled with PGCIL, NTPC, NHAI, CPWD and 14 state PWDs." },
                { icon: Award, t: "Certified Operations", d: "ISO 9001, 14001 and OHSAS 18001 across every active site." },
                { icon: HardHat, t: "Zero Lost-Time Incidents", d: "27 million safe person-hours over the last 36 months." },
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
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-navy font-medium link-underline">
              Learn about our company <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* SECTORS */}
      <Section eyebrow="Capabilities" title="Four sectors. One standard of execution." muted intro="We operate as a single integrated EPC team across civil, power, renewables and government infrastructure — sharing engineering, procurement and HSE systems across every site.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {sectors.map((s, i) => (
            <div key={s.title} className="bg-background p-10 card-hover group">
              <div className="flex items-start justify-between mb-10">
                <s.icon className="w-9 h-9 text-gold" strokeWidth={1.4} />
                <span className="font-display text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-2xl text-navy leading-tight">{s.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <Link to="/sectors" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-navy group-hover:text-gold transition-colors">
                Explore <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section eyebrow="Selected Projects" title="A portfolio measured in landmarks." intro="Active and recently commissioned works for India's leading PSUs, governments and private developers.">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((p) => (
            <article key={p.title} className="group">
              <div className="image-zoom aspect-[4/3] bg-secondary mb-6">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
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
          <Link to="/projects" className="inline-flex items-center gap-3 bg-navy text-white px-7 py-4 text-sm font-medium hover:bg-gold hover:text-navy transition-colors">
            View All Projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* CLIENTS BAND */}
      <section className="bg-navy py-16 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold text-center mb-10">Trusted by India's Public & Private Sector</div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-8 gap-x-6 items-center text-center">
            {["NTPC", "PGCIL", "NHAI", "CPWD", "BHEL", "GAIL", "IOCL"].map((c) => (
              <div key={c} className="font-display text-xl lg:text-2xl text-white/55 hover:text-gold transition-colors cursor-default tracking-wider">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 lg:py-36 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow text-gold mb-6"><span className="gold-rule mr-3 align-middle" /> Start a Project</div>
            <h2 className="text-white text-4xl lg:text-6xl leading-[1.05]">
              Building something <span className="italic text-gold">significant?</span><br />
              Let's engineer it together.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-5 text-sm font-medium hover:bg-white transition-colors">
              Request a Proposal <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
