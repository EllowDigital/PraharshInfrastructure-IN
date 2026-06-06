import { Section } from "@/components/site/Section";
import teamImg from "@/assets/about-team.jpg";
import { Target, Compass, ShieldCheck, Globe2 } from "lucide-react";

function About() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(212,160,23,0.4), transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6 reveal">
            <span className="gold-rule mr-3 align-middle" /> About Praharsh
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02] reveal reveal-delay-1">
            Building today, <span className="italic text-gold">empowering tomorrow.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed reveal reveal-delay-2">
            Praharsh Infrastructure is a fast-growing infrastructure and 360° branding solutions
            company based in Lucknow, UP — specialising in illumination, electrical installations,
            road infrastructure, solar energy, healthcare supplies and government civil development.
            We deliver projects for UPSIC, DRDA, UPRNN, PWD, Nagar Palika / Panchayat, UP Tourism,
            UP 100, ODOP, DIPR, UPID and other state and central agencies.
          </p>
        </div>
      </section>

      <Section eyebrow="Our Approach" title="Engineering discipline. Public-sector accountability.">
        <div className="grid lg:grid-cols-12 gap-12 -mt-8">
          <div className="lg:col-span-6 image-zoom">
            <img
              src={teamImg}
              alt="Praharsh engineers reviewing site plans"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-6 space-y-10 lg:pt-12">
            {[
              {
                icon: Target,
                t: "Mission",
                d: "To provide high-quality infrastructure and utility services; support smart and sustainable public development; deliver projects with integrity and professionalism; ensure timely and cost-effective project execution; maintain long-term client satisfaction.",
              },
              {
                icon: Compass,
                t: "Vision",
                d: "To become a trusted and leading infrastructure and 360° branding solutions company, delivering innovative, sustainable, and world-class solutions across India.",
              },
              {
                icon: ShieldCheck,
                t: "Values",
                d: "Quality Workmanship, Integrity & Transparency, Professional Excellence, Timely Delivery, Sustainable Development, Customer Satisfaction.",
              },
              {
                icon: Globe2,
                t: "Government Delivery",
                d: "Project execution through government departments with UPSIC, DRDA, Nagar Panchayats and other statutory partners.",
              },
            ].map((b) => (
              <div key={b.t} className="flex gap-6 pb-10 border-b border-border last:border-0">
                <div className="w-12 h-12 shrink-0 grid place-items-center bg-navy text-gold">
                  <b.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-2xl text-navy">{b.t}</div>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section muted eyebrow="Core Strengths" title="What sets Praharsh apart.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border -mt-8">
          {[
            {
              t: "Experienced Technical Team",
              d: "Experienced engineers and field supervisors trained for government infrastructure delivery.",
            },
            {
              t: "Government Project Expertise",
              d: "Executed projects for UPSIC, DRDA, Nagar Panchayats and state departments.",
            },
            {
              t: "Quality Infrastructure Solutions",
              d: "Quality-certified material usage and public safety compliance on every delivery.",
            },
            {
              t: "Transparent Work Process",
              d: "Proper documentation, reporting and audit-ready project controls.",
            },
            {
              t: "Timely Delivery",
              d: "On-schedule execution and contractual milestone adherence across sites.",
            },
            {
              t: "Sustainable Development Focus",
              d: "Solar energy and energy-efficient lighting solutions for public infrastructure.",
            },
            {
              t: "Reliable After-Sales Support",
              d: "Long-term maintenance support and post-installation verification.",
            },
          ].map((s) => (
            <div key={s.t} className="bg-background p-8 card-hover">
              <h3 className="font-display text-xl text-navy">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default About;
