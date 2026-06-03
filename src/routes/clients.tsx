import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Quote, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Government departments, PSUs and private clients served by Praharsh Infrastructure across India.",
      },
      { property: "og:title", content: "Our Clients" },
      { property: "og:description", content: "Trusted by the public and private sector." },
    ],
  }),
  component: Clients,
});

const clientLogos = [
  "/images/clients/client1.png",
  "/images/clients/client2.png",
  "/images/clients/client3.jfif",
  "/images/clients/client4.jpg",
  "/images/clients/client5.png",
  "/images/clients/client6.webp",
  "/images/clients/client7.jfif",
  "/images/clients/client8.jfif",
  "/images/clients/client9.jfif",
];

const clientGroups = [
  {
    label: "Government & Municipal",
    list: [
      "Govt. of Uttar Pradesh",
      "Barabanki District Administration",
      "UP Nagar Nigam",
      "State PWD",
      "District Rural Development Agency",
      "Smart City Mission",
    ],
  },
  {
    label: "PSU & Utilities",
    list: ["NTPC", "PGCIL", "BHEL", "State Electricity Boards", "UPNEDA", "DISCOMs"],
  },
  {
    label: "Private Sector",
    list: [
      "Reliance Industries",
      "Adani Group",
      "Tata Projects",
      "L&T Construction",
      "Independent Developers",
      "Industrial Estates",
    ],
  },
];

const testimonials = [
  {
    q: "Praharsh executed our 900 solar street light deployment ahead of schedule and within statutory tolerances. Documentation was audit-ready on day one.",
    n: "District Magistrate Office",
    r: "Barabanki",
  },
  {
    q: "Their high mast installation team is among the most disciplined we've engaged. Safety records and material quality were exemplary.",
    n: "Executive Engineer",
    r: "State PWD",
  },
  {
    q: "GeM compliance and billing transparency made Praharsh a preferred vendor for repeat orders across our procurement cycles.",
    n: "Procurement Officer",
    r: "Municipal Corporation",
  },
];

function Clients() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Our Clients
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Trusted by India's
            <br />
            <span className="italic text-gold">public & private sector.</span>
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-px bg-border -mt-8">
          {clientGroups.map((g) => (
            <div key={g.label} className="bg-background p-10">
              <div className="eyebrow text-gold mb-6">{g.label}</div>
              <ul className="space-y-4">
                {g.list.map((c) => (
                  <li
                    key={c}
                    className="text-navy text-lg font-display border-b border-border pb-3 last:border-0"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-navy py-20 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold text-center mb-12">Recognised By</div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {clientLogos.map((logo, idx) => (
              <div
                key={idx}
                className="bg-white p-6 flex items-center justify-center h-28 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-1.2rem)] group rounded-sm"
              >
                <img 
                  src={logo} 
                  alt={`Client ${idx + 1}`} 
                  className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mix-blend-multiply" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 flex flex-col lg:flex-row gap-10 items-center justify-between">
          <h2 className="text-white text-3xl lg:text-5xl max-w-2xl leading-tight">
            Join our roster of <span className="italic text-gold">repeat clients.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-medium hover:bg-white transition-colors"
          >
            Start a Conversation <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
