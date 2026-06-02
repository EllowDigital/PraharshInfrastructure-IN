import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ArrowUpRight } from "lucide-react";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import civilImg from "@/assets/project-civil.jpg";
import heroImg from "@/assets/hero-construction.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Praharsh Infrastructure" },
      { name: "description", content: "Selected works delivered for India's leading PSUs, state governments and private developers." },
      { property: "og:title", content: "Praharsh Projects" },
      { property: "og:description", content: "A portfolio measured in landmarks." },
    ],
  }),
  component: Projects,
});

const projects = [
  { img: solarImg, tag: "Renewables", title: "150 MW Solar Park", location: "Bikaner, Rajasthan", client: "NTPC Renewable Energy", value: "₹612 Cr", year: "2024" },
  { img: electricalImg, tag: "Power T&D", title: "400 kV GIS Substation", location: "Pune, Maharashtra", client: "Power Grid Corporation", value: "₹438 Cr", year: "2023" },
  { img: govtImg, tag: "Government", title: "State Assembly Complex", location: "Bengaluru, Karnataka", client: "Govt. of Karnataka", value: "₹520 Cr", year: "2024" },
  { img: civilImg, tag: "Civil", title: "Coastal Highway Viaduct", location: "Mangaluru, Karnataka", client: "NHAI", value: "₹389 Cr", year: "2025" },
  { img: heroImg, tag: "Power T&D", title: "765 kV Transmission Corridor", location: "MP — UP Interstate", client: "Power Grid Corporation", value: "₹712 Cr", year: "2025" },
  { img: solarImg, tag: "Renewables", title: "85 MW Rooftop C&I Portfolio", location: "Pan-India", client: "Reliance Industries", value: "₹248 Cr", year: "2023" },
];

function Projects() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6"><span className="gold-rule mr-3 align-middle" /> Selected Works</div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            A portfolio measured<br /> in <span className="italic text-gold">landmarks.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Active and recently commissioned projects across renewable, electrical, civil and
            government infrastructure — delivered for clients who measure performance in decades.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-y-24 -mt-8">
          {projects.map((p, i) => (
            <article key={p.title} className={`group ${i % 2 === 1 ? "md:mt-20" : ""}`}>
              <div className="image-zoom aspect-[4/3] bg-secondary mb-6">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-gold">{p.tag}</span>
                <span className="font-display text-sm text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="font-display text-3xl text-navy leading-tight mt-3">{p.title}</h3>
              <div className="text-sm text-muted-foreground mt-2">{p.location}</div>
              <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                <div>
                  <div className="eyebrow text-muted-foreground text-[0.65rem]">Client</div>
                  <div className="text-sm text-navy mt-1">{p.client}</div>
                </div>
                <div className="text-right">
                  <div className="eyebrow text-muted-foreground text-[0.65rem]">Value</div>
                  <div className="font-display text-lg text-gold mt-1">{p.value}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
