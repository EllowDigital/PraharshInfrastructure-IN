import React from "react";
import { Link } from "react-router-dom";
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

// --- Components ---
import { Section } from "@/components/site/Section";
import { AnimatedStat } from "@/components/site/AnimatedStat";
import { HeroSlider } from "@/components/site/HeroSlider";

// --- Assets & Images ---
import heroImg from "@/assets/hero-slide-civil.jpg";

import teamMembersImg from "@/assets/images/about/team/team-members.jpg";

// --- Services Images ---
import civilInfrastructureImg from "@/assets/images/home/services/civil-infrastructure.jpg";
import roadConstructionImg from "@/assets/images/home/services/road-construction.png";
import solarStreetLightImg from "@/assets/images/home/services/solar-street-light.jpg";
import electricalSolutionsImg from "@/assets/images/home/services/electrical-solutions.png";
import outdoorAdvertisingImg from "@/assets/images/home/services/outdoor-advertising.png";
import digitalMarketingImg from "@/assets/images/home/services/digital-marketing.png";
import brandDevelopmentImg from "@/assets/images/home/services/brand-development.png";
import governmentProjectsImg from "@/assets/images/home/services/government-projects.png";

// --- Featured Images ---
import featuredSolarProjectImg from "@/assets/images/home/featured/featured-streetsolar.png";
import highmastImg from "@/assets/images/home/featured/featured-highmast.png";
import solarLightingImg from "@/assets/images/home/featured/featured-solar.png";
import roadInfrastructureImg from "@/assets/images/home/featured/featured-road.png";

// --- Who we are ---
import teamImg from "@/assets/images/home/about-team.png";

// --- Constants & Data ---
const SERVICES = [
  {
    icon: Lightbulb,
    img: civilInfrastructureImg,
    title: "Infrastructure Development",
    titleShort: "Infrastructure",
    desc: "Comprehensive infrastructure solutions including high-mast lighting, pole installations, solar street lighting systems, and civil development works for public and private sectors.",
  },
  {
    icon: RouteIcon,
    img: roadConstructionImg,
    title: "Road & Highway Infrastructure",
    titleShort: "Roads",
    desc: "Specialized road and highway development services including lighting systems, road safety solutions, traffic management infrastructure, and retroreflective signage.",
  },
  {
    icon: Sun,
    img: solarStreetLightImg,
    title: "Solar Energy Solutions",
    titleShort: "Solar Energy",
    desc: "Sustainable solar power solutions featuring solar street lights, high-mast systems, renewable energy projects, and energy-efficient lighting infrastructure.",
  },
  {
    icon: Zap,
    img: electricalSolutionsImg,
    title: "Electrical & Lighting Solutions",
    titleShort: "Electrical",
    desc: "Professional electrical infrastructure services including LED street lighting, utility lighting systems, cable networks, and power distribution installations.",
  },
  {
    icon: Megaphone,
    img: outdoorAdvertisingImg,
    title: "Outdoor & Indoor Advertising",
    titleShort: "Advertising",
    desc: "End-to-end advertising infrastructure including unipoles, hoardings, transit media, retail branding, exhibition displays, and promotional installations.",
  },
  {
    icon: MonitorPlay,
    img: digitalMarketingImg,
    title: "Digital Media & Advertising",
    titleShort: "Digital Media",
    desc: "Integrated digital marketing solutions including social media campaigns, bulk messaging services, DOOH advertising, LED displays, and digital signage.",
  },
  {
    icon: Signpost,
    img: brandDevelopmentImg,
    title: "Branding & Signage Solutions",
    titleShort: "Branding",
    desc: "Custom branding and signage services including ACP cladding, acrylic signboards, reflective signage, wayfinding systems, and corporate branding solutions.",
  },
  {
    icon: Landmark,
    img: governmentProjectsImg,
    title: "Government Supply & Procurement",
    titleShort: "Government",
    desc: "Trusted GeM-enabled supplier providing sanitation products, healthcare equipment, industrial safety solutions, public utility materials, and institutional supplies.",
  },
];

const STATS = [
  { value: "9000+", label: "Solar Street Lights" },
  { value: "2400+", label: "High Masts Erected" },
  { value: "14+", label: "Years of Operation" },
  { value: "50+", label: "Government Clients" },
];

const FEATURED_PROJECTS = [
  {
    img: roadInfrastructureImg,
    tag: "Road Infrastructure",
    title: "Road Construction & Development",
    client: "Public infrastructure development project",
  },
  {
    img: featuredSolarProjectImg,
    tag: "Solar Infrastructure",
    title: "Solar Street Lighting Network",
    client: "Public infrastructure development project",
  },
  {
    img: highmastImg,
    tag: "Lighting Infrastructure",
    title: "High Mast Lighting System",
    client: "Government and municipal sector project",
  },
  {
    img: solarLightingImg,
    tag: "Renewable Energy",
    title: "Solar Power Infrastructure",
    client: "Clean energy and sustainability initiative",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: HardHat,
    title: "Experienced Technical Team",
    desc: "Engineers, electricians and field supervisors trained for public infrastructure delivery.",
  },
  {
    icon: FileBadge2,
    title: "Government Project Expertise",
    desc: "Proven delivery under state and municipal tender protocols.",
  },
  {
    icon: Award,
    title: "Quality Infrastructure Solutions",
    desc: "Engineered public lighting, solar and civil works built to long-term performance standards.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Work Process",
    desc: "Audit-ready documentation, reporting and procurement transparency on every contract.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    desc: "Milestone-driven execution with a strong focus on meeting project deadlines.",
  },
  {
    icon: Leaf,
    title: "Sustainable Development Focus",
    desc: "Solar and energy-efficient lighting projects with long-term operational savings.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Praharsh delivered our solar street light deployment ahead of schedule, with documentation audit-ready on day one.",
    name: "District Administration",
    role: "State Government",
  },
  {
    quote:
      "Their high mast crew is among the most disciplined we've engaged. Safety and material quality were exemplary.",
    name: "Executive Engineer",
    role: "State PWD",
  },
  {
    quote:
      "GeM compliance and billing transparency made Praharsh a preferred vendor across our procurement cycles.",
    name: "Procurement Officer",
    role: "Municipal Corp.",
  },
];

const CLIENT_LOGOS = [
  { src: "/images/clients/client1.png", name: "Panchayati Raj Directorate", url: "#" },
  { src: "/images/clients/client2.png", name: "ODOP (One District One Product)", url: "#" },
  {
    src: "/images/clients/client3.jfif",
    name: "UP Global Investors Summit (2023 Lucknow)",
    url: "#",
  },
  { src: "/images/clients/client4.jpg", name: "Uttar Pradesh Rajkya", url: "#" },
  { src: "/images/clients/client5.png", name: "UP Tourism", url: "#" },
  { src: "/images/clients/client6.webp", name: "UP Tourism Alternate", url: "#" },
  { src: "/images/clients/client7.jfif", name: "UP 100", url: "#" },
  {
    src: "/images/clients/client8.jfif",
    name: "Information and Public Relations Department UP",
    url: "#",
  },
  {
    src: "/images/clients/client9.jfif",
    name: "DIPR (Department of Information and Public Relations)",
    url: "#",
  },
];

const COMPANY_HIGHLIGHTS = [
  {
    icon: Building2,
    title: "Multi-Vertical Capability",
    desc: "Five integrated business areas under one project management system.",
  },
  {
    icon: ShieldCheck,
    title: "GeM & PSU Empanelled",
    desc: "Verified GeM seller serving municipal, district and PSU clients.",
  },
  {
    icon: Award,
    title: "ISO Certified",
    desc: "9001, 14001 and 45001 audited management systems.",
  },
];

const GOV_BADGES = [
  { text: "UPSIC Registered", icon: Landmark },
  { text: "GeM Registered Seller", icon: FileCheck2 },
  { text: "UDYAM Registered", icon: Building2 },
  { text: "GST Registered", icon: ShieldCheck },
];

export default function Home() {
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
              {COMPANY_HIGHLIGHTS.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="w-11 h-11 shrink-0 grid place-items-center bg-navy text-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display text-lg text-navy">{badge.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{badge.desc}</div>
                    </div>
                  </div>
                );
              })}
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
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={i}
                className="group overflow-hidden bg-background border border-border shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-3 rounded-sm bg-white/92 px-3 py-2 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                    <span className="font-display text-sm text-navy">{service.titleShort}</span>
                  </div>
                  <span className="absolute right-4 top-4 font-display text-sm text-white/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex h-full flex-col p-7">
                  <h3 className="font-display text-2xl text-navy leading-tight">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                  <Link
                    to="/services"
                    className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-navy transition-colors group-hover:text-gold"
                  >
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* 4. STATISTICS COUNTER */}
      <section className="bg-navy py-20 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`px-6 py-6 ${i < STATS.length - 1 ? "lg:border-r border-white/10" : ""}`}
            >
              <AnimatedStat value={stat.value} label={stat.label} />
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
          {FEATURED_PROJECTS.map((project, idx) => (
            <article key={idx} className="group">
              <div className="image-zoom aspect-[4/3] bg-secondary mb-6">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="eyebrow text-gold mb-2">{project.tag}</div>
                  <h3 className="font-display text-2xl text-navy leading-tight">{project.title}</h3>
                  <div className="text-sm text-muted-foreground mt-2">
                    Client · {project.client}
                  </div>
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
          {WHY_CHOOSE_US.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="bg-background p-8 card-hover">
                <Icon className="w-8 h-8 text-gold mb-5" strokeWidth={1.4} />
                <h3 className="font-display text-xl text-navy">{reason.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
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
            {GOV_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/20 p-6 flex flex-col items-center justify-center text-center gap-4 backdrop-blur-sm rounded-sm hover:bg-white/10 transition-colors shadow-sm"
                >
                  <Icon className="w-8 h-8 text-gold shrink-0" strokeWidth={1.5} />
                  <span className="text-white font-display tracking-wide">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <Section muted eyebrow="Testimonials" title="What our clients say.">
        <div className="grid md:grid-cols-3 gap-6 -mt-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="bg-background p-10 border-t-2 border-gold card-hover">
              <Quote className="w-8 h-8 text-gold mb-6" />
              <p className="text-navy leading-relaxed">{testimonial.quote}</p>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-display text-navy">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

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
            {CLIENT_LOGOS.map((client, idx) => (
              <a
                key={`mobile-${idx}`}
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
                  loading="lazy"
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
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <a
                key={`desktop-${idx}`}
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
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT CTA */}
      <section className="relative overflow-hidden bg-navy-deep">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-8">
              <div className="eyebrow text-gold mb-6">
                <span className="gold-rule mr-3 align-middle" />
                Start a Project
              </div>

              <h2 className="text-white text-4xl lg:text-6xl leading-[1.05] tracking-tight">
                Building something <span className="italic text-gold">significant?</span>
                <br />
                Let's engineer it together.
              </h2>

              <p className="mt-8 text-white/70 max-w-2xl text-lg leading-relaxed">
                Government departments, municipal bodies, PSUs, and private developers trust us to
                deliver infrastructure that lasts. Share your project requirements or RFP and our
                team will respond within one working day.
              </p>
            </div>

            {/* CTA */}
            <div className="lg:col-span-4 flex justify-start lg:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-6 text-base font-semibold hover:bg-white transition-all duration-300"
              >
                Request a Proposal
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
