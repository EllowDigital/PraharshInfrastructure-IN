import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import civilImg from "@/assets/project-civil.jpg";
import heroImg from "@/assets/hero-construction.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Major solar street lighting, high mast and government infrastructure projects delivered by Praharsh Infrastructure.",
      },
      { property: "og:title", content: "Praharsh Projects" },
      { property: "og:description", content: "A portfolio measured in landmarks." },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "900 Solar Street Light Project",
    location: "Barabanki, Uttar Pradesh",
    client: "District Administration",
    year: "2024",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "565 Solar Street Light Deployment",
    location: "Uttar Pradesh",
    client: "Municipal Corporation",
    year: "2023",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "160 Solar Street Light Installation",
    location: "Uttar Pradesh",
    client: "Nagar Panchayat",
    year: "2023",
  },
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "64 Solar Street Light Project",
    location: "Rural Development Block",
    client: "DRDA",
    year: "2022",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "61 High Mast Lighting Project",
    location: "Uttar Pradesh",
    client: "State PWD",
    year: "2024",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "57 High Mast Lighting Programme",
    location: "Uttar Pradesh",
    client: "Municipal Corporation",
    year: "2023",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "43 High Mast Lighting Installation",
    location: "Uttar Pradesh",
    client: "Smart City SPV",
    year: "2023",
  },
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "19 High Mast Lighting Project",
    location: "Uttar Pradesh",
    client: "Nagar Nigam",
    year: "2022",
  },
  {
    img: govtImg,
    tag: "Government Supply",
    title: "Sanitation & Cleaning Material Supply",
    location: "Multi-District",
    client: "State Health Department",
    year: "2024",
  },
  {
    img: civilImg,
    tag: "Infrastructure",
    title: "Pole Installation Programme",
    location: "Uttar Pradesh",
    client: "Electricity Distribution",
    year: "2023",
  },
  {
    img: heroImg,
    tag: "Branding & Signage",
    title: "ACP & Reflective Signage Rollout",
    location: "Multi-Site",
    client: "Government Department",
    year: "2024",
  },
  {
    img: govtImg,
    tag: "Government Supply",
    title: "Healthcare Equipment Supply",
    location: "District Hospitals",
    client: "Health Mission",
    year: "2023",
  },
];

function Projects() {
  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Selected Works
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            A portfolio measured
            <br /> in <span className="italic text-gold">landmarks.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Headline projects across solar street lighting, high mast installations, government
            supply and public utility infrastructure.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 -mt-8">
          {projects.map((p) => (
            <article key={p.title} className="group">
              <div className="image-zoom aspect-[4/3] bg-secondary mb-6">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow text-gold">{p.tag}</span>
                <span className="font-display text-sm text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="font-display text-2xl text-navy leading-tight mt-3">{p.title}</h3>
              <div className="text-sm text-muted-foreground mt-2">{p.location}</div>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="eyebrow text-muted-foreground text-[0.65rem]">Client</div>
                <div className="text-sm text-navy mt-1">{p.client}</div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
