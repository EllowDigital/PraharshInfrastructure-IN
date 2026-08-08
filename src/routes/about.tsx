import { SEO } from "@/components/site/SEO";
import { SmartImage } from "@/components/site/SmartImage";
import { SpecialitiesMarquee, ABOUT_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import teamImg from "@/assets/images/about/about.webp";
import { Target, Compass, ShieldCheck, Globe2 } from "lucide-react";

const BASE = "https://www.praharshinfrastructure.com";

// 1. Extract static data outside the component to prevent unnecessary re-allocations
const APPROACH_DATA = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To provide high-quality infrastructure and utility services; support smart and sustainable public development; deliver projects with integrity and professionalism; ensure timely and cost-effective project execution; maintain long-term client satisfaction.",
  },
  {
    icon: Compass,
    title: "Vision",
    description:
      "To become a trusted and leading infrastructure and 360° branding solutions company, delivering innovative, sustainable, and world-class solutions across India.",
  },
  {
    icon: ShieldCheck,
    title: "Values",
    description:
      "Quality Workmanship, Integrity & Transparency, Professional Excellence, Timely Delivery, Sustainable Development, Customer Satisfaction.",
  },
  {
    icon: Globe2,
    title: "Government Delivery",
    description:
      "Project execution through government departments with UPSIC, DRDA, Nagar Panchayats and other statutory partners.",
  },
];

const CORE_STRENGTHS = [
  {
    title: "Experienced Technical Team",
    description:
      "Experienced engineers and field supervisors trained for government infrastructure delivery.",
  },
  {
    title: "Government Project Expertise",
    description: "Executed projects for UPSIC, DRDA, Nagar Panchayats and state departments.",
  },
  {
    title: "Quality Infrastructure Solutions",
    description: "Quality-certified material usage and public safety compliance on every delivery.",
  },
  {
    title: "Transparent Work Process",
    description: "Proper documentation, reporting and audit-ready project controls.",
  },
  {
    title: "Timely Delivery",
    description: "On-schedule execution and contractual milestone adherence across sites.",
  },
  {
    title: "Sustainable Development Focus",
    description: "Solar energy and energy-efficient lighting solutions for public infrastructure.",
  },
  {
    title: "Reliable After-Sales Support",
    description: "Long-term maintenance support and post-installation verification.",
  },
  {
    title: "Client-Centered Collaboration",
    description:
      "Transparent communication, proactive coordination, and client-focused project execution.",
  },
];

const HERO_FACTS = [
  { k: "Head Office", v: "Lucknow, Uttar Pradesh" },
  { k: "Sectors Served", v: "Infrastructure · Solar · Branding" },
  { k: "Delivery Model", v: "Government & Institutional" },
];

const ABOUT_STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/about#webpage`,
    url: `${BASE}/about`,
    name: "About Praharsh Infrastructure",
    description:
      "Praharsh Infrastructure is a Lucknow-based infrastructure and 360° branding solutions company delivering illumination, electrical, solar and civil projects for government departments.",
    isPartOf: { "@type": "WebSite", url: BASE, name: "Praharsh Infrastructure" },
    about: {
      "@type": "Organization",
      name: "Praharsh Infrastructure",
      url: BASE,
      areaServed: "IN",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Core Strengths of Praharsh Infrastructure",
    numberOfItems: CORE_STRENGTHS.length,
    itemListElement: CORE_STRENGTHS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.description,
    })),
  },
];

function About() {
  return (
    <>
      <SEO
        title="About Us | Praharsh Infrastructure, Lucknow"
        description="Praharsh Infrastructure is a Lucknow-based infrastructure and 360° branding solutions company delivering illumination, electrical, road, solar and civil projects for UPSIC, DRDA, PWD and other government agencies."
        keywords="About Praharsh Infrastructure, infrastructure company Lucknow, government contractor UP, solar and electrical infrastructure"
        url={`${BASE}/about`}
        canonicalUrl={`${BASE}/about`}
        structuredData={ABOUT_STRUCTURED_DATA}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-20 lg:pb-24 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(212,160,23,0.4), transparent 50%)",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Breadcrumbs
            items={[{ label: "About" }]}
            className="mb-6 text-white/70 [&_[aria-current]]:text-gold"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow reveal mb-5 flex items-center text-gold">
                <span className="gold-rule mr-3 inline-block align-middle" />
                About Praharsh
              </div>

              <h1 className="reveal reveal-delay-1 text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.02] text-balance">
                Building today, <span className="italic text-gold">empowering tomorrow.</span>
              </h1>

              <p className="reveal reveal-delay-2 mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80">
                Praharsh Infrastructure is a fast-growing infrastructure and 360° branding solutions
                company based in Lucknow, UP — specialising in illumination, electrical
                installations, road infrastructure, solar energy, healthcare supplies and government
                civil development. We deliver projects for UPSIC, DRDA, UPRNN, PWD, Nagar Palika /
                Panchayat, UP Tourism, UP 100, ODOP, DIPR, UPID and other state and central
                agencies.
              </p>
            </div>

            <div className="reveal reveal-delay-3 lg:col-span-4">
              <dl className="grid gap-px overflow-hidden rounded-xl border border-white/20 bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
                {HERO_FACTS.map((f) => (
                  <div key={f.k} className="bg-navy/80 p-5 backdrop-blur-sm">
                    <dt className="eyebrow text-gold">{f.k}</dt>
                    <dd className="mt-2 text-sm text-white/85">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <SpecialitiesMarquee
        items={ABOUT_ITEMS}
        variant="gold"
        direction="right"
        ariaLabel="About Praharsh Infrastructure"
      />

      {/* Approach Section */}
      <Section eyebrow="Our Approach" title="Engineering discipline. Public-sector accountability.">
        <div className="grid gap-8 sm:gap-10 lg:gap-14 lg:-mt-8 lg:grid-cols-12">
          <Reveal className="image-zoom overflow-hidden rounded-xl lg:col-span-5 bg-secondary aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] lg:sticky lg:top-28">
            <SmartImage
              src={teamImg}
              alt="Praharsh engineers reviewing site plans"
              width={800}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 42vw"
              loading="lazy"
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {APPROACH_DATA.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    as="li"
                    key={item.title}
                    delay={Math.min(i, 4) * 80}
                    className="lift-card group bg-background p-6 sm:p-8"
                  >
                    <div className="icon-pop grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy text-gold shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-xl sm:text-2xl text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Core Strengths Section */}
      <Section muted eyebrow="Core Strengths" title="What sets Praharsh apart.">
        <ul className="-mt-4 sm:-mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CORE_STRENGTHS.map((strength, i) => (
            <Reveal
              as="li"
              key={strength.title}
              delay={Math.min(i, 6) * 60}
              className="lift-card group bg-background p-6 sm:p-8"
            >
              <span className="font-display text-3xl text-gold/80 transition-colors group-hover:text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg sm:text-xl text-navy leading-tight">
                {strength.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {strength.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}

export default About;
