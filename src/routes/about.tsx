import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import teamImg from "@/assets/about-team.jpg";
import { Target, Compass, ShieldCheck, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Praharsh Infrastructure delivers public lighting, solar energy and government supply projects with discipline, integrity and engineering rigour.",
      },
      { property: "og:title", content: "About Praharsh Infrastructure" },
      { property: "og:description", content: "Building today, empowering tomorrow." },
    ],
  }),
  component: About,
});

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
            Praharsh Infrastructure is a multi-disciplinary contractor specialising in public
            lighting, solar energy, electrical works, government supplies and branding — delivered
            with the discipline expected of a public-sector partner.
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
                d: "Deliver high-quality infrastructure and utility services with professionalism, integrity, safety, and client satisfaction.",
              },
              {
                icon: Compass,
                t: "Vision",
                d: "To become a leading infrastructure company delivering sustainable and innovative solutions across India.",
              },
              {
                icon: ShieldCheck,
                t: "Values",
                d: "Integrity in measurement. Safety without compromise. Documentation as engineering discipline. Quality as the only acceptable variable.",
              },
              {
                icon: Globe2,
                t: "Footprint",
                d: "Active project delivery across Uttar Pradesh and expanding nationally — from district headquarters to remote panchayat areas.",
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
              t: "Government Tender Experience",
              d: "Decade of e-tenders across state and municipal bodies.",
            },
            {
              t: "GeM Procurement Expertise",
              d: "Active GeM seller with proven order fulfilment record.",
            },
            {
              t: "Technical Team",
              d: "Engineers, electricians and field supervisors trained in-house.",
            },
            {
              t: "Quality Assurance",
              d: "Material inspection and field QA tied to ISO 9001 workflows.",
            },
            {
              t: "Sustainable Solutions",
              d: "Solar-first approach for public lighting deployments.",
            },
            {
              t: "Timely Delivery",
              d: "Contractual milestones met across complex multi-site rollouts.",
            },
            {
              t: "Transparent Execution",
              d: "Audit-ready billing and progress documentation by default.",
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
