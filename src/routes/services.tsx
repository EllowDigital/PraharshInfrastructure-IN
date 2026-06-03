import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Lightbulb, Sun, Zap, Landmark, Signpost, ArrowUpRight } from "lucide-react";
import civilImg from "@/assets/project-civil.jpg";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import heroImg from "@/assets/hero-construction.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Infrastructure development, solar energy, electrical works, government supplies and branding services by Praharsh Infrastructure.",
      },
      { property: "og:title", content: "Our Services" },
      { property: "og:description", content: "Five integrated business verticals." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Lightbulb,
    img: civilImg,
    name: "Infrastructure Development",
    desc: "Public lighting and urban infrastructure programmes delivered for municipal corporations, panchayats and state agencies across rural and urban India.",
    items: [
      "High Mast Light Installation",
      "Public Lighting Systems",
      "Pole Installation",
      "Urban/Rural Development Projects",
    ],
  },
  {
    icon: Sun,
    img: solarImg,
    name: "Solar Energy Solutions",
    desc: "End-to-end renewable energy installations — from individual solar street lights to large-scale solar high mast and energy-efficient lighting deployments.",
    items: [
      "Solar Street Lights",
      "Solar High Mast Systems",
      "Renewable Energy Installations",
      "Energy Efficient Lighting",
    ],
  },
  {
    icon: Zap,
    img: electricalImg,
    name: "Electrical Works",
    desc: "Turnkey electrical infrastructure for municipal, industrial and public utility projects — including cable laying, panel installation and substation works.",
    items: [
      "Electrical Infrastructure",
      "Public Utility Lighting",
      "Cable/Equipment Installation",
    ],
  },
  {
    icon: Landmark,
    img: govtImg,
    name: "Government Supply Services",
    desc: "GeM-empanelled supplier of healthcare, sanitation, safety and utility materials to central and state government departments across India.",
    items: [
      "Healthcare Supplies",
      "Industrial Safety Equipment",
      "Sanitation Products",
      "Utility Materials",
      "Cleaning Chemicals",
    ],
  },
  {
    icon: Signpost,
    img: heroImg,
    name: "Branding & Signage",
    desc: "Architectural branding and statutory signage for government, public infrastructure and corporate clients — engineered for outdoor durability.",
    items: [
      "ACP Cladding",
      "Acrylic Sign Boards",
      "Reflective Signage",
      "Government Branding Projects",
    ],
  },
];

function Services() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> What We Do
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Five verticals.
            <br />
            <span className="italic text-gold">One execution standard.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Integrated infrastructure, solar, electrical, government supply and branding
            capabilities — operating under shared engineering, procurement and HSE systems.
          </p>
        </div>
      </section>

      <div className="bg-background">
        {services.map((s, i) => (
          <section key={s.name} className={`${i % 2 === 1 ? "bg-secondary" : ""}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-28">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7 image-zoom">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full aspect-[16/11] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-5xl text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <s.icon className="w-8 h-8 text-navy" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-4xl lg:text-5xl text-navy leading-[1.05]">
                    {s.name}
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-navy">
                        <ArrowUpRight className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Section dark align="center">
        <div className="text-center -mt-8">
          <h2 className="text-white text-3xl lg:text-5xl max-w-3xl mx-auto leading-tight">
            Need a customised scope? Our pre-bid team will respond within 24 hours.
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-medium hover:bg-white transition-colors"
          >
            Request a Proposal <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
