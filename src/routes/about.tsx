import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, ABOUT_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Section } from "@/components/site/Section";
import teamImg from "@/assets/images/about/about.png";
import { Target, Compass, ShieldCheck, Globe2 } from "lucide-react";

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

function About() {
  return (
    <main>
      <SEO title="Praharsh Infrastructure" />
      <SpecialitiesMarquee items={ABOUT_ITEMS} variant="gold" direction="right" ariaLabel="About Praharsh Infrastructure" />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy pt-28 sm:pt-36 pb-16 sm:pb-24 text-white">
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

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow reveal mb-6 flex items-center text-gold">
            <span className="gold-rule mr-3 inline-block align-middle" />
            About Praharsh
          </div>

          <h1 className="reveal reveal-delay-1 max-w-4xl text-4xl sm:text-5xl lg:text-7xl leading-[1.05] lg:leading-[1.02]">
            Building today, <span className="italic text-gold">empowering tomorrow.</span>
          </h1>

          <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Praharsh Infrastructure is a fast-growing infrastructure and 360° branding solutions
            company based in Lucknow, UP — specialising in illumination, electrical installations,
            road infrastructure, solar energy, healthcare supplies and government civil development.
            We deliver projects for UPSIC, DRDA, UPRNN, PWD, Nagar Palika / Panchayat, UP Tourism,
            UP 100, ODOP, DIPR, UPID and other state and central agencies.
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <Section eyebrow="Our Approach" title="Engineering discipline. Public-sector accountability.">
        <div className="grid gap-12 lg:-mt-8 lg:grid-cols-12">
          <div className="image-zoom overflow-hidden rounded-xl lg:col-span-6">
            <img
              src={teamImg}
              alt="Praharsh engineers reviewing site plans"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-10 lg:col-span-6 lg:pt-12">
            <ul className="flex flex-col">
              {APPROACH_DATA.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="mb-10 flex gap-6 border-b border-border pb-10 last:mb-0 last:border-0 last:pb-0"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-gold shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-navy">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Core Strengths Section */}
      <Section muted eyebrow="Core Strengths" title="What sets Praharsh apart.">
        <ul className="-mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CORE_STRENGTHS.map((strength) => (
            <li key={strength.title} className="card-hover bg-background p-8">
              <h3 className="font-display text-xl text-navy">{strength.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {strength.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

export default About;
