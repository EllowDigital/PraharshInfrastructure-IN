import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import solarImg from "@/assets/project-solar.jpg";
import electricalImg from "@/assets/project-electrical.jpg";
import govtImg from "@/assets/project-govt.jpg";
import roadsImg from "@/assets/hero-slide-roads.jpg";
import unipoleImg from "@/assets/hero-slide-unipole.jpg";
import civilImg from "@/assets/project-civil.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Solar, lighting, road, civil, media display and GeM supply projects delivered by Praharsh Infrastructure across India.",
      },
      { property: "og:title", content: "Praharsh Projects" },
      { property: "og:description", content: "A portfolio measured in landmarks." },
    ],
  }),
  component: Projects,
});

const projects = [
  // Solar Light Illumination
  {
    img: solarImg,
    tag: "Solar Street Lighting",
    title: "Solar Street Light Project",
    location: "District Rural Development Agency rollout",
    client: "DRDA / State Government",
    year: "2024",
  },
  {
    img: solarImg,
    tag: "Solar High Mast",
    title: "Solar High Mast Street Light Project",
    location: "Public hubs & junctions",
    client: "Municipal & PWD",
    year: "2023",
  },
  // High Mast Electric Light Illumination
  {
    img: electricalImg,
    tag: "High Mast Lighting",
    title: "High Mast Lighting Project",
    location: "Municipal lighting deployment",
    client: "Urban Local Bodies",
    year: "2023",
  },
  // Road & Civil
  {
    img: roadsImg,
    tag: "Road Infrastructure",
    title: "Highway & Expressway Lighting Project",
    location: "Multi-corridor public lighting",
    client: "State highway authorities",
    year: "2024",
  },
  {
    img: roadsImg,
    tag: "Road Safety",
    title: "Road Safety & Signage Installation",
    location: "Statewide retroreflective signage",
    client: "PWD & Traffic Police",
    year: "2024",
  },
  {
    img: civilImg,
    tag: "Civil Works",
    title: "Urban Roadway Development Work",
    location: "Asphalt & concrete pathway delivery",
    client: "Urban Local Bodies",
    year: "2023",
  },
  {
    img: roadsImg,
    tag: "Traffic Management",
    title: "Traffic Management Infrastructure",
    location: "Smart traffic control deployment",
    client: "Municipal & State Police",
    year: "2024",
  },
  // Media, Signage & Displays
  {
    img: unipoleImg,
    tag: "Outdoor Advertising",
    title: "Traditional OOH Hoardings",
    location: "Pan-state unipole & hoarding network",
    client: "Government & enterprise",
    year: "2024",
  },
  {
    img: unipoleImg,
    tag: "Transit & Retail",
    title: "Transit & Retail Branding",
    location: "Bus shelters, transit corridors & stores",
    client: "Public transit & retail partners",
    year: "2024",
  },
  {
    img: unipoleImg,
    tag: "Digital Media",
    title: "High-Definition LED Video Walls",
    location: "Public & enterprise venues",
    client: "Government & corporate",
    year: "2024",
  },
  {
    img: unipoleImg,
    tag: "Digital Media",
    title: "360° Digital Campaign Infrastructure",
    location: "Multi-platform brand campaigns",
    client: "Public sector & enterprise",
    year: "2024",
  },
  {
    img: unipoleImg,
    tag: "Outdoor Advertising",
    title: "Publicity Display & Outdoor Signage Project",
    location: "Unipoles & hoardings deployment",
    client: "Information & PR Department, UP",
    year: "2023",
  },
  {
    img: govtImg,
    tag: "Branding & Signage",
    title: "ACP Sign Board & Facade Branding Work",
    location: "Government facility facades",
    client: "State departments",
    year: "2023",
  },
  {
    img: unipoleImg,
    tag: "Public Information",
    title: "Public Information Display Systems",
    location: "Urban public information rollout",
    client: "Municipal Corporations",
    year: "2024",
  },
  // GeM Supply
  {
    img: govtImg,
    tag: "GeM Supply",
    title: "GeM Government Supply Contracts",
    location: "Pan-India procurement fulfilment",
    client: "Central & State Agencies",
    year: "2024",
  },
  {
    img: govtImg,
    tag: "GeM Supply",
    title: "Solar & Lighting Equipment Supply",
    location: "Bulk procurement orders",
    client: "Government buyers via GeM",
    year: "2024",
  },
  {
    img: govtImg,
    tag: "GeM Supply",
    title: "Signage & Display Material Supply",
    location: "Government branding rollout",
    client: "Public sector buyers",
    year: "2023",
  },
  {
    img: govtImg,
    tag: "GeM Supply",
    title: "Civil & Infrastructure Material Supply",
    location: "Project-tied material delivery",
    client: "State infrastructure agencies",
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
