import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Building2, Sun, Zap, Landmark, ArrowUpRight } from "lucide-react";
import civilImg from "@/assets/project-civil.jpg";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";

export const Route = createFileRoute("/sectors")({
  head: () => ({
    meta: [
      { title: "Sectors — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Civil, Solar EPC, Electrical T&D and Government turnkey infrastructure capabilities.",
      },
      { property: "og:title", content: "Sectors We Serve" },
      { property: "og:description", content: "Four sectors. One standard of execution." },
    ],
  }),
  component: Sectors,
});

const sectors = [
  {
    icon: Building2,
    img: civilImg,
    name: "Civil & Structural",
    desc: "Highways, bridges, viaducts, industrial buildings and high-rise commercial structures executed with deep formwork, post-tension and pre-cast capabilities.",
    items: [
      "Bridges & Viaducts",
      "Highway & Expressway Packages",
      "Industrial Buildings",
      "High-Rise Construction",
    ],
  },
  {
    icon: Sun,
    img: solarImg,
    name: "Solar EPC",
    desc: "Utility-scale ground-mount and rooftop PV plants engineered for 30-year design life, with in-house O&M division managing 480 MW under contract.",
    items: [
      "Utility-Scale Solar Parks",
      "Rooftop & C&I Solar",
      "Floating Solar Pilots",
      "Long-term O&M Contracts",
    ],
  },
  {
    icon: Zap,
    img: electricalImg,
    name: "Electrical & T&D",
    desc: "GIS and AIS substations up to 765 kV, transmission line packages and distribution network strengthening for PGCIL and state utilities.",
    items: [
      "GIS / AIS Substations",
      "Transmission Lines (220–765 kV)",
      "Distribution Strengthening",
      "Underground Cabling",
    ],
  },
  {
    icon: Landmark,
    img: govtImg,
    name: "Government Turnkey",
    desc: "End-to-end delivery of civic, defence and public-sector projects — from administrative complexes to ITI campuses, hospitals and smart-city packages.",
    items: [
      "Administrative Complexes",
      "Public Healthcare Facilities",
      "Educational Campuses",
      "Smart City Packages",
    ],
  },
];

function Sectors() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Capabilities
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Four sectors.
            <br />
            <span className="italic text-gold">One standard.</span>
          </h1>
        </div>
      </section>

      <div className="bg-background">
        {sectors.map((s, i) => (
          <section key={s.name} className={`${i % 2 === 1 ? "bg-secondary" : ""}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
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
                  <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3">
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
    </>
  );
}
