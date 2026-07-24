import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";

const OPENINGS = [
  {
    title: "Site Engineer — Electrical & Solar",
    location: "Lucknow, UP",
    type: "Full-time",
  },
  {
    title: "Project Manager — Road Infrastructure",
    location: "Uttar Pradesh (Field)",
    type: "Full-time",
  },
  {
    title: "GeM & Tender Executive",
    location: "Lucknow, UP",
    type: "Full-time",
  },
  {
    title: "Business Development Manager",
    location: "Lucknow / Delhi NCR",
    type: "Full-time",
  },
  {
    title: "Design & Signage Production Lead",
    location: "Lucknow, UP",
    type: "Full-time",
  },
];

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers | Praharsh Infrastructure"
        description="Join Praharsh Infrastructure. Explore engineering, project management, GeM/tender and business development roles across India."
      />
      <div className="pt-24" />
      <Section
        eyebrow="Careers"
        title="Build the infrastructure of tomorrow with us"
        intro="We are a growing infrastructure and government supply company. If you thrive on ownership, precision and impact — we would love to hear from you."
      />
      <Section muted eyebrow="Open Positions" title="Current openings">
        <div className="grid gap-4">
          {OPENINGS.map((o) => (
            <a
              key={o.title}
              href="mailto:careers@praharshinfrastructure.com?subject=Application%20-%20${encodeURIComponent(o.title)}"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background border border-border p-6 hover:border-gold transition-colors"
            >
              <div>
                <div className="font-display text-xl text-navy group-hover:text-gold transition-colors">
                  {o.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {o.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> {o.type}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:text-gold">
                Apply <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Don&apos;t see your role? Write to us at{" "}
          <a
            href="mailto:careers@praharshinfrastructure.com"
            className="text-navy underline hover:text-gold"
          >
            careers@praharshinfrastructure.com
          </a>
          .
        </p>
      </Section>
    </>
  );
}
