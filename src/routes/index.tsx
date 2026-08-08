import { SEO } from "@/components/site/SEO";
import { SmartImage } from "@/components/site/SmartImage";
import React from "react";
import { Link } from "react-router";
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
import { AppErrorBoundary } from "@/components/site/ErrorBoundary";
import { HeroSlider } from "@/components/site/HeroSlider";
import { SpecialitiesMarquee } from "@/components/site/SpecialitiesMarquee";
import { AccreditationsPanel } from "@/components/site/AccreditationsPanel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// --- Services Images ---
import civilInfrastructureImg from "@/assets/images/home/services/civil-infrastructure.jpg";
import roadConstructionImg from "@/assets/images/home/services/road-construction.webp";
import solarStreetLightImg from "@/assets/images/home/services/solar-street-light.webp";
import electricalSolutionsImg from "@/assets/images/home/services/electrical-solutions.webp";
import outdoorAdvertisingImg from "@/assets/images/home/services/outdoor-advertising.webp";
import digitalMarketingImg from "@/assets/images/home/services/digital-marketing.webp";
import brandDevelopmentImg from "@/assets/images/home/services/brand-development.webp";
import governmentProjectsImg from "@/assets/images/home/services/government-projects.webp";

// --- Client Images ---
import client1 from "@/assets/images/clients/client1.png";
import client2 from "@/assets/images/clients/client2.png";
import client3 from "@/assets/images/clients/client3.jfif";
import client4 from "@/assets/images/clients/client4.jpg";
import client5 from "@/assets/images/clients/client5.png";
import client6 from "@/assets/images/clients/client6.webp";
import client7 from "@/assets/images/clients/client7.jfif";
import client8 from "@/assets/images/clients/client8.jfif";
import client9 from "@/assets/images/clients/client9.jfif";

// --- Featured Images ---
import featuredSolarProjectImg from "@/assets/images/home/featured/featured-streetsolar.webp";
import highmastImg from "@/assets/images/home/featured/featured-highmast.webp";
import solarLightingImg from "@/assets/images/home/featured/featured-solar.webp";
import roadInfrastructureImg from "@/assets/images/home/featured/featured-road.webp";

// --- Who we are ---
import teamImg from "@/assets/images/home/about-team.webp";

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
  { src: client1, name: "Panchayati Raj Directorate", url: "#" },
  { src: client2, name: "ODOP (One District One Product)", url: "#" },
  {
    src: client3,
    name: "UP Global Investors Summit (2023 Lucknow)",
    url: "#",
  },
  { src: client4, name: "Uttar Pradesh Rajkya", url: "#" },
  { src: client5, name: "UP Tourism", url: "#" },
  { src: client6, name: "UP Tourism Alternate", url: "#" },
  { src: client7, name: "UP 100", url: "#" },
  {
    src: client8,
    name: "Information and Public Relations Department UP",
    url: "#",
  },
  {
    src: client9,
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

type HomeProps = {
  onHeroReady?: () => void;
};

export default function Home({ onHeroReady }: HomeProps) {
  return (
    <>
      <SEO title="Praharsh Infrastructure" />
      {/* 1. HERO */}
      <AppErrorBoundary sectionName="home_hero">
        <HeroSlider onReady={onHeroReady} />
      </AppErrorBoundary>

      <AppErrorBoundary sectionName="home_specialities_marquee">
        <SpecialitiesMarquee />
      </AppErrorBoundary>

      {/* 2. BENTO — WHO WE ARE + HEADLINE STATS */}
      <AppErrorBoundary sectionName="home_bento_intro">
        <section className="bg-navy-deep py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
              {/* Editorial headline tile */}
              <div className="col-span-12 lg:col-span-8 bg-navy border border-navy-mid p-8 sm:p-12 lg:p-16 flex flex-col justify-end min-h-[420px] lg:min-h-[520px] relative overflow-hidden group image-zoom">
                <SmartImage
                  src={teamImg}
                  alt=""
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  loading="lazy"
                  wrapperClassName="absolute inset-0"
                  skeletonColor="rgba(11,31,77,0.6)"
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  aria-hidden="true"
                />
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                  <span className="uppercase tracking-[0.22em] text-gold text-[0.65rem] sm:text-xs font-semibold">
                    Established 2010
                  </span>
                </div>
                <div className="relative">
                  <h2 className="font-display text-white leading-[1.05] text-[clamp(2rem,4.2vw,4.5rem)] mb-6 sm:mb-8 text-balance">
                    Building the <span className="italic text-gold">framework</span> of tomorrow's
                    India.
                  </h2>
                  <p className="text-white/70 max-w-xl text-base sm:text-lg leading-relaxed font-light">
                    With 15+ years of disciplined delivery, Praharsh Infrastructure bridges vision
                    and reality through precision engineering and sustainable public infrastructure.
                  </p>
                  <Link
                    to="/about"
                    className="mt-8 inline-flex items-center gap-3 text-white text-sm font-semibold group/link"
                  >
                    <span className="relative">
                      About the Company
                      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gold origin-left scale-x-50 transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </Link>
                </div>
              </div>

              {/* Stats column */}
              <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 grid-rows-1 lg:grid-rows-2 gap-4 sm:gap-5 lg:gap-6">
                <div className="bg-gold p-6 sm:p-8 flex flex-col justify-between min-h-[180px]">
                  <span className="uppercase tracking-[0.22em] text-navy-deep text-[0.65rem] sm:text-xs font-bold">
                    Track Record
                  </span>
                  <div>
                    <div className="font-display text-5xl sm:text-6xl text-navy-deep leading-none">
                      500+
                    </div>
                    <div className="text-navy-deep/80 text-xs sm:text-sm font-medium mt-2">
                      Projects Delivered
                    </div>
                  </div>
                </div>
                <div className="bg-navy-mid p-6 sm:p-8 flex flex-col justify-between text-white min-h-[180px]">
                  <span className="uppercase tracking-[0.22em] text-gold text-[0.65rem] sm:text-xs font-bold">
                    Reach
                  </span>
                  <div>
                    <div className="font-display text-5xl sm:text-6xl leading-none">25+</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-2">
                      States Across the Nation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AppErrorBoundary>

      {/* 3. BENTO — SERVICES */}
      <AppErrorBoundary sectionName="home_services">
        <section className="bg-navy-deep pb-20 sm:pb-24 lg:pb-28 px-5 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
              {/* Section header */}
              <div className="col-span-12 lg:col-span-4 p-2 sm:p-4 flex flex-col justify-end mb-2 lg:mb-0">
                <div className="eyebrow text-gold mb-3 text-xs">
                  <span className="gold-rule mr-3 align-middle" />
                  Services
                </div>
                <h3 className="font-display text-white text-4xl sm:text-5xl leading-[1.05] mb-4">
                  Specialized <br />
                  <span className="italic text-gold">Verticals.</span>
                </h3>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-sm">
                  Integrated solutions across civil engineering, renewable energy, and public sector
                  supply chains — one execution standard.
                </p>
              </div>

              {/* Hero service tile (large) */}
              {(() => {
                const feature = SERVICES[0];
                const FeatureIcon = feature.icon;
                return (
                  <Link
                    to="/services"
                    className="col-span-12 lg:col-span-8 relative bg-navy border border-navy-mid p-8 sm:p-10 hover:border-gold/40 transition-all group min-h-[320px] flex flex-col justify-end overflow-hidden"
                  >
                    <SmartImage
                      src={feature.img}
                      alt=""
                      width={1200}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      loading="lazy"
                      wrapperClassName="absolute inset-0"
                      skeletonColor="rgba(11,31,77,0.6)"
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <div className="flex justify-between items-start mb-10 sm:mb-14">
                        <div className="h-12 w-12 border border-gold flex items-center justify-center text-gold">
                          <FeatureIcon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      <h4 className="font-display text-3xl sm:text-4xl text-white mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </Link>
                );
              })()}

              {/* Two medium tiles */}
              {SERVICES.slice(1, 3).map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    to="/services"
                    className="col-span-12 sm:col-span-6 lg:col-span-3 bg-navy/40 border border-navy-mid p-7 sm:p-8 hover:border-gold/40 hover:bg-navy transition-all group flex flex-col justify-between min-h-[240px]"
                  >
                    <Icon className="w-10 h-10 text-gold" strokeWidth={1.5} />
                    <div>
                      <h4 className="font-display text-xl text-white mb-2 leading-tight">
                        {s.title}
                      </h4>
                      <p className="text-white/45 text-xs leading-relaxed line-clamp-3">{s.desc}</p>
                    </div>
                  </Link>
                );
              })}

              {/* Gold GeM highlight tile */}
              {(() => {
                const gov = SERVICES.find((s) => s.icon === Landmark) ?? SERVICES[7];
                return (
                  <Link
                    to="/government-capabilities"
                    className="col-span-12 lg:col-span-6 bg-gold p-8 sm:p-10 flex flex-col justify-between hover:bg-gold/90 transition-all min-h-[260px] group"
                  >
                    <div>
                      <div className="eyebrow text-navy-deep/70 text-[0.65rem] mb-4">
                        Government Portal
                      </div>
                      <h4 className="font-display text-3xl sm:text-4xl text-navy-deep italic mb-4">
                        {gov.title}
                      </h4>
                      <p className="text-navy-deep/70 text-sm sm:text-base max-w-md leading-relaxed">
                        {gov.desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-8">
                      {["ISO 9001:2015", "UPPCL Empanelled", "GeM Verified"].map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 border border-navy-deep text-[0.65rem] uppercase font-bold text-navy-deep tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })()}

              {/* Small tiles row (remaining verticals) */}
              {SERVICES.slice(3, 7).map((s, i) => {
                const bgVariants = ["bg-navy-mid", "bg-navy", "bg-navy/40", "bg-navy"];
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    to="/services"
                    className={`col-span-6 sm:col-span-6 lg:col-span-3 ${bgVariants[i]} border border-navy-mid p-6 sm:p-7 hover:border-gold/40 transition-all group flex flex-col justify-between min-h-[160px]`}
                  >
                    <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                    <div>
                      <div className="text-[0.6rem] uppercase tracking-[0.22em] text-gold/70 mb-2">
                        {s.titleShort}
                      </div>
                      <h4 className="font-display text-lg sm:text-xl text-white leading-snug">
                        {s.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* View all */}
            <div className="mt-10 sm:mt-12 flex justify-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-gold hover:text-navy-deep hover:border-gold transition-all"
              >
                View All Services
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </AppErrorBoundary>

      {/* 4. STATS STRIP */}
      <AppErrorBoundary sectionName="home_stats">
        <section className="bg-navy py-16 border-y border-gold/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4">
            {(STATS ?? []).map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 py-6 ${i < STATS.length - 1 ? "lg:border-r border-white/10" : ""}`}
              >
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </section>
      </AppErrorBoundary>

      {/* 5. FEATURED PROJECTS — asymmetric bento */}
      <AppErrorBoundary sectionName="home_featured_projects">
        <section className="bg-navy-deep py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <div className="eyebrow text-gold mb-3 text-xs">
                  <span className="gold-rule mr-3 align-middle" />
                  Case Studies
                </div>
                <h2 className="font-display text-white text-4xl sm:text-5xl leading-[1.05] max-w-2xl">
                  A portfolio measured in <span className="italic text-gold">landmarks.</span>
                </h2>
              </div>
              <Link
                to="/projects"
                className="text-white text-xs uppercase tracking-[0.22em] font-semibold border-b border-gold pb-1 hover:text-gold transition-colors self-start sm:self-auto"
              >
                View Portfolio
              </Link>
            </div>

            <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
              {/* Large feature project */}
              <Link
                to="/projects"
                className="col-span-12 lg:col-span-7 relative overflow-hidden border border-navy-mid group min-h-[380px] lg:min-h-[520px] image-zoom"
              >
                <SmartImage
                  src={FEATURED_PROJECTS[0].img}
                  alt={FEATURED_PROJECTS[0].title}
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  loading="lazy"
                  wrapperClassName="absolute inset-0"
                  skeletonColor="rgba(11,31,77,0.6)"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                  <div className="eyebrow text-gold mb-2 text-[0.7rem]">
                    {FEATURED_PROJECTS[0].tag}
                  </div>
                  <h3 className="font-display text-white text-2xl sm:text-4xl leading-tight mb-3 max-w-xl">
                    {FEATURED_PROJECTS[0].title}
                  </h3>
                  <div className="text-white/70 text-sm">
                    Client · {FEATURED_PROJECTS[0].client}
                  </div>
                </div>
              </Link>

              {/* Right column list of case studies */}
              <div className="col-span-12 lg:col-span-5 bg-navy border border-navy-mid p-8 sm:p-10 flex flex-col">
                <div className="space-y-5 flex-1">
                  {FEATURED_PROJECTS.slice(1).map((p) => (
                    <Link key={p.title} to="/projects" className="group block">
                      <div className="flex justify-between items-end gap-4 border-b border-navy-mid pb-4 group-hover:border-gold/60 transition-colors">
                        <div className="min-w-0">
                          <span className="text-gold text-[0.65rem] uppercase tracking-[0.22em] font-semibold">
                            {p.tag}
                          </span>
                          <h5 className="font-display text-lg sm:text-xl text-white mt-1 leading-tight">
                            {p.title}
                          </h5>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/projects"
                  className="mt-8 inline-flex items-center justify-center gap-3 bg-navy-deep text-white py-4 uppercase tracking-[0.22em] text-xs font-bold hover:bg-gold hover:text-navy-deep transition-colors"
                >
                  Browse All Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AppErrorBoundary>

      {/* 6. WHY CHOOSE US + ACCREDITATIONS SPLIT */}
      <AppErrorBoundary sectionName="home_why_choose_us">
        <section className="bg-navy-deep pb-20 sm:pb-24 lg:pb-28 px-5 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
            {/* Why choose us — bento of 6 tiles */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
              <div className="col-span-2 mb-2">
                <div className="eyebrow text-gold mb-3 text-xs">
                  <span className="gold-rule mr-3 align-middle" />
                  Why Choose Us
                </div>
                <h2 className="font-display text-white text-4xl sm:text-5xl leading-[1.05]">
                  Engineered for <span className="italic text-gold">accountability.</span>
                </h2>
              </div>
              {(WHY_CHOOSE_US ?? []).map((reason) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="bg-navy border border-navy-mid p-6 sm:p-7 hover:border-gold/40 transition-colors group"
                  >
                    <Icon className="w-7 h-7 text-gold mb-4" strokeWidth={1.4} />
                    <h3 className="font-display text-lg text-white leading-tight">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/55 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Accreditations panel (light) */}
            <AccreditationsPanel />
          </div>
        </section>
      </AppErrorBoundary>

      {/* 9. TESTIMONIALS */}
      <AppErrorBoundary sectionName="home_testimonials">
        <Section muted eyebrow="Testimonials" title="What our clients say.">
          <div className="lg:hidden -mt-8 px-2">
            <Carousel opts={{ align: "center", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {(TESTIMONIALS ?? []).map((testimonial) => (
                  <CarouselItem
                    key={testimonial.name}
                    className="pl-4 basis-full sm:basis-[80%] md:basis-[60%]"
                  >
                    <div className="bg-background p-8 sm:p-10 border-t-2 border-gold shadow-card card-hover h-full flex flex-col">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-6 shrink-0">
                        <Quote className="h-6 w-6" />
                      </div>
                      <p className="text-navy leading-relaxed text-base sm:text-lg flex-1">
                        {testimonial.quote}
                      </p>
                      <div className="mt-8 pt-6 border-t border-border shrink-0">
                        <div className="font-display text-navy text-lg">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">{testimonial.role}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:inline-flex -top-16 left-auto right-14" />
              <CarouselNext className="hidden md:inline-flex -top-16 right-0" />
            </Carousel>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 gap-6 -mt-8">
            {(TESTIMONIALS ?? []).map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-background p-10 border-t-2 border-gold shadow-card card-hover flex flex-col"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-6 shrink-0">
                  <Quote className="h-6 w-6" />
                </div>
                <p className="text-navy leading-relaxed flex-1">{testimonial.quote}</p>
                <div className="mt-8 pt-6 border-t border-border shrink-0">
                  <div className="font-display text-navy text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </AppErrorBoundary>

      {/* 8. CLIENT LOGOS */}
      <AppErrorBoundary sectionName="home_client_logos">
        <section className="bg-background py-20 border-b border-border overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-8 lg:mb-12">
            <div className="eyebrow text-gold text-center">
              Trusted by India's Public & Private Sector
            </div>
          </div>

          <div className="relative w-full overflow-hidden group">
            <div className="absolute inset-y-0 left-0 w-28 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee pause-on-hover min-w-max items-center gap-4 py-6 px-6 sm:px-10">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
                <a
                  key={`logo-marquee-${idx}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={client.name}
                  className="bg-white p-4 flex items-center justify-center h-24 w-40 sm:h-28 sm:w-56 shrink-0 rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={client.src}
                    alt={`${client.name} Logo`}
                    width={200}
                    height={100}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </AppErrorBoundary>

      {/* 10. CONTACT CTA */}
      <AppErrorBoundary sectionName="home_contact_cta">
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
                  className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-5 text-sm font-semibold hover:bg-white transition-all duration-300"
                >
                  Request a Proposal
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AppErrorBoundary>
    </>
  );
}
