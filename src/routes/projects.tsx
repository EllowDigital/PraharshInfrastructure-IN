import { Section } from "@/components/site/Section";
// --- Assets/Porjects ---
import solarStreetLightingImg from "@/assets/images/projects/solar-street-lighting.png";
import solarHighMastImg from "@/assets/images/projects/solar-high-mast-lighting.png";
import highMastLightingImg from "@/assets/images/projects/high-mast-lighting.png";

import highwayLightingInfrastructureImg from "@/assets/images/projects/highway-lighting-infrastructure.png";
import roadSafetySignageImg from "@/assets/images/projects/road-safety-signage.png";
import urbanRoadDevelopmentImg from "@/assets/images/projects/urban-road-development.png";
import trafficManagementInfrastructureImg from "@/assets/images/projects/traffic-management-infrastructure.png";

import traditionalHoardingsImg from "@/assets/images/projects/traditional-hoardings.png";
import transitRetailBrandingImg from "@/assets/images/projects/transit-retail-branding.png";
import ledVideoWallsImg from "@/assets/images/projects/led-video-walls.png";
import digitalCampaignInfrastructureImg from "@/assets/images/projects/digital-campaign-infrastructure.png";
import publicityDisplaySignageImg from "@/assets/images/projects/publicity-display-signage.png";
import acpFacadeBrandingImg from "@/assets/images/projects/acp-facade-branding.png";
import publicInformationDisplayImg from "@/assets/images/projects/public-information-display.png";

import gemGovernmentSupplyImg from "@/assets/images/projects/gem-government-supply.png";
import solarLightingEquipmentSupplyImg from "@/assets/images/projects/solar-lighting-equipment-supply.png";
import signageDisplayMaterialSupplyImg from "@/assets/images/projects/signage-display-material-supply.png";
import civilInfrastructureMaterialSupplyImg from "@/assets/images/projects/civil-infrastructure-material-supply.png";

const projects = [
  // Solar Light Illumination
  {
    img: solarStreetLightingImg,
    tag: "Solar Street Lighting",
    title: "Solar Street Light Project",
    location: "District Rural Development Agency rollout",
    client: "DRDA / State Government",
    year: "2024",
  },
  {
    img: solarHighMastImg,
    tag: "Solar High Mast",
    title: "Solar High Mast Street Light Project",
    location: "Public hubs & junctions",
    client: "Municipal & PWD",
    year: "2023",
  },

  // High Mast Electric Light Illumination
  {
    img: highMastLightingImg,
    tag: "High Mast Lighting",
    title: "High Mast Lighting Project",
    location: "Municipal lighting deployment",
    client: "Urban Local Bodies",
    year: "2023",
  },

  // Road & Civil
  {
    img: highwayLightingInfrastructureImg,
    tag: "Road Infrastructure",
    title: "Highway & Expressway Lighting Project",
    location: "Multi-corridor public lighting",
    client: "State Highway Authorities",
    year: "2024",
  },
  {
    img: roadSafetySignageImg,
    tag: "Road Safety",
    title: "Road Safety & Signage Installation",
    location: "Statewide retroreflective signage",
    client: "PWD & Traffic Police",
    year: "2024",
  },
  {
    img: urbanRoadDevelopmentImg,
    tag: "Civil Works",
    title: "Urban Roadway Development Work",
    location: "Asphalt & concrete pathway delivery",
    client: "Urban Local Bodies",
    year: "2023",
  },
  {
    img: trafficManagementInfrastructureImg,
    tag: "Traffic Management",
    title: "Traffic Management Infrastructure",
    location: "Smart traffic control deployment",
    client: "Municipal & State Police",
    year: "2024",
  },

  // Media, Signage & Displays
  {
    img: traditionalHoardingsImg,
    tag: "Outdoor Advertising",
    title: "Traditional OOH Hoardings",
    location: "Pan-state unipole & hoarding network",
    client: "Government & Enterprise",
    year: "2024",
  },
  {
    img: transitRetailBrandingImg,
    tag: "Transit & Retail",
    title: "Transit & Retail Branding",
    location: "Bus shelters, transit corridors & stores",
    client: "Public Transit & Retail Partners",
    year: "2024",
  },
  {
    img: ledVideoWallsImg,
    tag: "Digital Media",
    title: "High-Definition LED Video Walls",
    location: "Public & enterprise venues",
    client: "Government & Corporate",
    year: "2024",
  },
  {
    img: digitalCampaignInfrastructureImg,
    tag: "Digital Media",
    title: "360° Digital Campaign Infrastructure",
    location: "Multi-platform brand campaigns",
    client: "Public Sector & Enterprise",
    year: "2024",
  },
  {
    img: publicityDisplaySignageImg,
    tag: "Outdoor Advertising",
    title: "Publicity Display & Outdoor Signage Project",
    location: "Unipoles & hoardings deployment",
    client: "Information & PR Department, UP",
    year: "2023",
  },
  {
    img: acpFacadeBrandingImg,
    tag: "Branding & Signage",
    title: "ACP Sign Board & Facade Branding Work",
    location: "Government facility facades",
    client: "State Departments",
    year: "2023",
  },
  {
    img: publicInformationDisplayImg,
    tag: "Public Information",
    title: "Public Information Display Systems",
    location: "Urban public information rollout",
    client: "Municipal Corporations",
    year: "2024",
  },

  // GeM Supply
  {
    img: gemGovernmentSupplyImg,
    tag: "GeM Supply",
    title: "GeM Government Supply Contracts",
    location: "Pan-India procurement fulfilment",
    client: "Central & State Agencies",
    year: "2024",
  },
  {
    img: solarLightingEquipmentSupplyImg,
    tag: "GeM Supply",
    title: "Solar & Lighting Equipment Supply",
    location: "Bulk procurement orders",
    client: "Government Buyers via GeM",
    year: "2024",
  },
  {
    img: signageDisplayMaterialSupplyImg,
    tag: "GeM Supply",
    title: "Signage & Display Material Supply",
    location: "Government branding rollout",
    client: "Public Sector Buyers",
    year: "2023",
  },
  {
    img: civilInfrastructureMaterialSupplyImg,
    tag: "GeM Supply",
    title: "Civil & Infrastructure Material Supply",
    location: "Project-tied material delivery",
    client: "State Infrastructure Agencies",
    year: "2023",
  },
];

function Projects() {
  return (
    <>
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-navy text-white">
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

export default Projects;
