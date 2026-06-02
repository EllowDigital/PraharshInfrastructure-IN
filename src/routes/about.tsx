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
          "Praharsh Infrastructure is a multi-disciplinary EPC contractor with 14+ years of delivering large-scale civil, electrical and renewable projects across India.",
      },
      { property: "og:title", content: "About Praharsh Infrastructure" },
      { property: "og:description", content: "An engineering institution built on discipline." },
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
            An <span className="italic text-gold">engineering institution</span>, not a contractor.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed reveal reveal-delay-2">
            Founded in 2010, Praharsh Infrastructure has grown into one of India's most trusted
            mid-sized EPC firms — recognised for delivering complex government and private projects
            on schedule and within engineering tolerances measured in millimetres.
          </p>
        </div>
      </section>

      <Section eyebrow="Our Approach" title="Discipline, transferred from drawing board to field.">
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
                d: "Deliver infrastructure that endures — engineered, executed and maintained with institutional rigour, accountable to the public and private capital that funds it.",
              },
              {
                icon: Compass,
                t: "Vision",
                d: "To be India's most respected mid-sized EPC contractor by 2030, defined by engineering depth rather than aggressive bidding.",
              },
              {
                icon: ShieldCheck,
                t: "Values",
                d: "Integrity in measurement. Safety without compromise. Documentation as engineering discipline. Quality as the only acceptable variable.",
              },
              {
                icon: Globe2,
                t: "Footprint",
                d: "Project delivery across 18 states with regional offices in Bengaluru, Hyderabad, Pune, Lucknow and Bhubaneswar.",
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

      <Section muted eyebrow="Leadership" title="Engineers running an engineering firm.">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              n: "Rajesh Praharsh",
              r: "Chairman & Managing Director",
              b: "32 years across NTPC, L&T and independent practice.",
            },
            {
              n: "Anjali Iyer",
              r: "Director — Operations",
              b: "Former PGCIL substation lead. IIT Bombay alumna.",
            },
            {
              n: "Vikram Shenoy",
              r: "Director — Civil & Infrastructure",
              b: "Heavy civil specialist with 24 years across NHAI corridors.",
            },
          ].map((p) => (
            <div key={p.n} className="bg-background p-10 card-hover border-t-2 border-gold">
              <div className="font-display text-2xl text-navy">{p.n}</div>
              <div className="eyebrow text-gold mt-2">{p.r}</div>
              <p className="text-sm text-muted-foreground mt-5 leading-relaxed">{p.b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
