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
  Building2,
  FileBadge2,
  FileCheck2,
  Clock,
  HardHat,
  Leaf,
  Route as RouteIcon,
  Megaphone,
  MonitorPlay,
} from "lucide-react";
import heroImg from "@/assets/hero-slide-civil.jpg";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import civilImg from "@/assets/project-civil.jpg";
import roadsImg from "@/assets/hero-slide-roads.jpg";
import unipoleImg from "@/assets/hero-slide-unipole.jpg";
import teamImg from "@/assets/about-team.jpg";
import { Section } from "@/components/site/Section";
import { AnimatedStat } from "@/components/site/AnimatedStat";
import { HeroSlider } from "@/components/site/HeroSlider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praharsh Infrastructure — Building Today, Empowering Tomorrow" },
      {
        name: "description",
        content:
          "Praharsh Infrastructure delivers infrastructure, road, solar, electrical, advertising and government supply services across India.",
      },
      { property: "og:title", content: "Praharsh Infrastructure" },
      { property: "og:description", content: "Building Today, Empowering Tomorrow." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const services = [
  {
    icon: Lightbulb,
    img: civilImg,
    title: "Infrastructure Development",
    titleShort: "Infrastructure",
    desc: "High mast lighting, solar street lights, pole installation, public utility works and civil development for roads, highways and buildings.",
  },
  {
    icon: RouteIcon,
    img: roadsImg,
    title: "Road Infrastructure",
    titleShort: "Roads",
    desc: "Highway & expressway lighting, road safety, asphalt & concrete pathway development, retroreflective signage and smart traffic control.",
  },
  {
    icon: Sun,
    img: solarImg,
    title: "Solar Energy Solutions",
    titleShort: "Solar Energy",
    desc: "Solar street lights, solar high mast systems, renewable energy installations and energy-efficient public lighting.",
  },
  {
    icon: Zap,
    img: electricalImg,
    title: "Electrical & Lighting",
    titleShort: "Electrical",
    desc: "LED street lighting, public utility lighting, electrical equipment installation, cable and pole installation.",
  },
  {
    icon: Megaphone,
    img: unipoleImg,
    title: "Outdoor & Indoor Advertising",
    titleShort: "Advertising",
    desc: "Unipoles & hoardings (OOH), bus shelter & transit advertising, in-store retail branding, exhibition stalls and event kiosks.",
  },
  {
    icon: MonitorPlay,
    img: heroImg,
    title: "Digital Advertising",
    titleShort: "Digital Media",
    desc: "Social media, Bulk SMS / WhatsApp / Voice, DOOH screens, LED walls, 360° media solutions and smart digital signage.",
  },
  {
    icon: Signpost,
    img: govtImg,
    title: "Branding & Signage",
    titleShort: "Branding",
    desc: "ACP sheet cladding, acrylic sign boards, reflective signage and government branding works.",
  },
  {
    icon: Landmark,
    img: govtImg,
    title: "Government Supply",
    titleShort: "Government",
    desc: "Sanitation, healthcare, industrial safety, public utility, chemical and cleaning supplies — GeM enabled.",
  },
];

const stats = [
  { v: "900+", l: "Solar Street Lights" },
  { v: "240+", l: "High Masts Erected" },
  { v: "14+", l: "Years of Operation" },
  { v: "50+", l: "Government Clients" },
];

const featured = [
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "900 Solar Street Light Project – Barabanki",
    client: "Executed under DRDA standards",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "565 Solar Street Light Project",
    client: "Large-scale rural infrastructure",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "160 Solar Street Light Project",
    client: "Public lighting deployment",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "64 Solar Street Light Project",
    client: "Rural electrification initiative",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "61 High Mast Lighting Project",
    client: "Government-approved public illumination",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "57 High Mast 200 Watt Lighting Project",
    client: "Urban lighting standard rollout",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "43 High Mast Lighting Project",
    client: "District-level public lighting",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "19 High Mast 200 Watt Lighting Project",
    client: "Government street illumination",
  },
];

const whyUs = [
  {
    icon: HardHat,
    t: "Experienced Technical Team",
    d: "Engineers, electricians and field supervisors trained for public infrastructure delivery.",
  },
  {
    icon: FileBadge2,
    t: "Government Project Expertise",
    d: "Proven delivery under state and municipal tender protocols.",
  },
  {
    icon: Award,
    t: "Quality Infrastructure Solutions",
    d: "Engineered public lighting, solar and civil works built to long-term performance standards.",
  },
  {
    icon: ShieldCheck,
    t: "Transparent Work Process",
    d: "Audit-ready documentation, reporting and procurement transparency on every contract.",
  },
  {
    icon: Clock,
    t: "Timely Delivery",
    d: "Milestone-driven execution with a strong focus on meeting project deadlines.",
  },
  {
    icon: Leaf,
    t: "Sustainable Development Focus",
    d: "Solar and energy-efficient lighting projects with long-term operational savings.",
  },
];

const testimonials = [
  {
    q: "Praharsh delivered our 900 solar street light deployment ahead of schedule, with documentation audit-ready on day one.",
    n: "District Administration",
    r: "Barabanki",
  },
  {
    q: "Their high mast crew is among the most disciplined we've engaged. Safety and material quality were exemplary.",
    n: "Executive Engineer",
    r: "State PWD",
  },
  {
    q: "GeM compliance and billing transparency made Praharsh a preferred vendor across our procurement cycles.",
    n: "Procurement Officer",
    r: "Municipal Corp.",
  },
];

const clientLogos = [
  { src: "/images/clients/client1.png", name: "Uttar Pradesh Government", url: "#" },
  {
    src: "/images/clients/client5.png",
    name: "UP Global Investors Summit (2023 Lucknow)",
    url: "#",
  },
  { src: "/images/clients/client3.jfif", name: "ODOP (One District One Product)", url: "#" },
  { src: "/images/clients/client3.jfif", name: "UPRNN", url: "#" },
  { src: "/images/clients/client4.jpg", name: "UP Tourism", url: "#" },
  { src: "/images/clients/client7.jfif", name: "Basic Shiksha Parishad", url: "#" },
  {
    src: "/images/clients/client8.jfif",
    name: "Information and Public Relations Department UP",
    url: "#",
  },
  { src: "/images/clients/client2.png", name: "Panchayati Raj Directorate", url: "#" },
];

function Home() {
  return (
    <>
      {/* 1. HERO */}
      <HeroSlider />

      {/* 2. COMPANY OVERVIEW */}
      <Section
        eyebrow="Who We Are"
        title="An infrastructure contractor built for the public sector."
      >
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
                {
                  icon: Building2,
                  t: "Multi-Vertical Capability",
                  d: "Five integrated business areas under one project management system.",
                },
                {
                  icon: ShieldCheck,
                  t: "GeM & PSU Empanelled",
                  d: "Verified GeM seller serving municipal, district and PSU clients.",
                },
                {
                  icon: Award,
                  t: "ISO Certified",
                  d: "9001, 14001 and 45001 audited management systems.",
                },
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
        title="Eight business areas. One execution standard."
        intro="Integrated capabilities across infrastructure, roads, energy, advertising and government supply — operating under shared engineering, procurement and HSE systems."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group overflow-hidden bg-background border border-border shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-3 rounded-sm bg-white/92 px-3 py-2 backdrop-blur-sm">
                  <s.icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                  <span className="font-display text-sm text-navy">{s.titleShort}</span>
                </div>
                <span className="absolute right-4 top-4 font-display text-sm text-white/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex h-full flex-col p-7">
                <h3 className="font-display text-2xl text-navy leading-tight">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <Link
                  to="/services"
                  className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-navy transition-colors group-hover:text-gold"
                >
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
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
              <AnimatedStat value={s.v} label={s.l} />
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
              { text: "UPSIC Registered", icon: Landmark },
              { text: "GeM Registered Seller", icon: FileCheck2 },
              { text: "UDYAM Registered", icon: Building2 },
              { text: "GST Registered", icon: ShieldCheck },
            ].map((badge) => (
              <div
                key={badge.text}
                className="bg-white/5 border border-white/20 p-6 flex flex-col items-center justify-center text-center gap-4 backdrop-blur-sm rounded-sm hover:bg-white/10 transition-colors shadow-sm"
              >
                <badge.icon className="w-8 h-8 text-gold shrink-0" strokeWidth={1.5} />
                <span className="text-white font-display tracking-wide">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT LOGOS */}
      <section className="bg-background py-20 border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-8 lg:mb-12">
          <div className="eyebrow text-gold text-center">
            Trusted by India's Public & Private Sector
          </div>
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="lg:hidden mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {clientLogos.map((client, idx) => (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="bg-white p-4 flex items-center justify-center h-24 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={client.src}
                  alt={`${client.name} Logo`}
                  className="max-h-full max-w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* PC Marquee */}
        <div className="hidden lg:block relative w-full group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee pause-on-hover min-w-max items-center">
            {/* Double the logos for a seamless infinite loop */}
            {[...clientLogos, ...clientLogos].map((client, idx) => (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="bg-white p-6 mx-4 flex items-center justify-center h-28 w-56 shrink-0 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={client.src}
                  alt={`${client.name} Logo`}
                  className="max-h-full max-w-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300"
                />
              </a>
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
              href="/docs/company-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
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
