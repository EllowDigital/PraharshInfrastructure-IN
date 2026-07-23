import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, PROJECTS_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { useState, useMemo } from "react";
import { Section } from "@/components/site/Section";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

// --- Assets/Projects ---
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
    category: "Solar",
    img: solarStreetLightingImg,
    tag: "Solar Street Lighting",
    title: "Solar Street Light Project",
    location: "District Rural Development Agency rollout",
    client: "DRDA / State Government",
    year: "2024",
  },
  {
    category: "Solar",
    img: solarHighMastImg,
    tag: "Solar High Mast",
    title: "Solar High Mast Street Light Project",
    location: "Public hubs & junctions",
    client: "Municipal & PWD",
    year: "2023",
  },

  // High Mast Electric Light Illumination
  {
    category: "Electrical",
    img: highMastLightingImg,
    tag: "High Mast Lighting",
    title: "High Mast Lighting Project",
    location: "Municipal lighting deployment",
    client: "Urban Local Bodies",
    year: "2023",
  },

  // Road & Civil
  {
    category: "Road & Civil",
    img: highwayLightingInfrastructureImg,
    tag: "Road Infrastructure",
    title: "Highway & Expressway Lighting Project",
    location: "Multi-corridor public lighting",
    client: "State Highway Authorities",
    year: "2024",
  },
  {
    category: "Road & Civil",
    img: roadSafetySignageImg,
    tag: "Road Safety",
    title: "Road Safety & Signage Installation",
    location: "Statewide retroreflective signage",
    client: "PWD & Traffic Police",
    year: "2024",
  },
  {
    category: "Road & Civil",
    img: urbanRoadDevelopmentImg,
    tag: "Civil Works",
    title: "Urban Roadway Development Work",
    location: "Asphalt & concrete pathway delivery",
    client: "Urban Local Bodies",
    year: "2023",
  },
  {
    category: "Road & Civil",
    img: trafficManagementInfrastructureImg,
    tag: "Traffic Management",
    title: "Traffic Management Infrastructure",
    location: "Smart traffic control deployment",
    client: "Municipal & State Police",
    year: "2024",
  },

  // Media, Signage & Displays
  {
    category: "Advertising",
    img: traditionalHoardingsImg,
    tag: "Outdoor Advertising",
    title: "Traditional OOH Hoardings",
    location: "Pan-state unipole & hoarding network",
    client: "Government & Enterprise",
    year: "2024",
  },
  {
    category: "Advertising",
    img: transitRetailBrandingImg,
    tag: "Transit & Retail",
    title: "Transit & Retail Branding",
    location: "Bus shelters, transit corridors & stores",
    client: "Public Transit & Retail Partners",
    year: "2024",
  },
  {
    category: "Digital Media",
    img: ledVideoWallsImg,
    tag: "Digital Media",
    title: "High-Definition LED Video Walls",
    location: "Public & enterprise venues",
    client: "Government & Corporate",
    year: "2024",
  },
  {
    category: "Digital Media",
    img: digitalCampaignInfrastructureImg,
    tag: "Digital Media",
    title: "360° Digital Campaign Infrastructure",
    location: "Multi-platform brand campaigns",
    client: "Public Sector & Enterprise",
    year: "2024",
  },
  {
    category: "Advertising",
    img: publicityDisplaySignageImg,
    tag: "Outdoor Advertising",
    title: "Publicity Display & Outdoor Signage Project",
    location: "Unipoles & hoardings deployment",
    client: "Information & PR Department, UP",
    year: "2023",
  },
  {
    category: "Advertising",
    img: acpFacadeBrandingImg,
    tag: "Branding & Signage",
    title: "ACP Sign Board & Facade Branding Work",
    location: "Government facility facades",
    client: "State Departments",
    year: "2023",
  },
  {
    category: "Digital Media",
    img: publicInformationDisplayImg,
    tag: "Public Information",
    title: "Public Information Display Systems",
    location: "Urban public information rollout",
    client: "Municipal Corporations",
    year: "2024",
  },

  // GeM Supply
  {
    category: "GeM Supply",
    img: gemGovernmentSupplyImg,
    tag: "GeM Supply",
    title: "GeM Government Supply Contracts",
    location: "Pan-India procurement fulfilment",
    client: "Central & State Agencies",
    year: "2024",
  },
  {
    category: "GeM Supply",
    img: solarLightingEquipmentSupplyImg,
    tag: "GeM Supply",
    title: "Solar & Lighting Equipment Supply",
    location: "Bulk procurement orders",
    client: "Government Buyers via GeM",
    year: "2024",
  },
  {
    category: "GeM Supply",
    img: signageDisplayMaterialSupplyImg,
    tag: "GeM Supply",
    title: "Signage & Display Material Supply",
    location: "Government branding rollout",
    client: "Public Sector Buyers",
    year: "2023",
  },
  {
    category: "GeM Supply",
    img: civilInfrastructureMaterialSupplyImg,
    tag: "GeM Supply",
    title: "Civil & Infrastructure Material Supply",
    location: "Project-tied material delivery",
    client: "State Infrastructure Agencies",
    year: "2023",
  },
];

const CATEGORIES = [
  "All",
  "Solar",
  "Electrical",
  "Road & Civil",
  "Advertising",
  "Digital Media",
  "GeM Supply",
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <SEO title="Praharsh Infrastructure" />
      
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep to-transparent z-0 opacity-80" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6 reveal">
            <span className="gold-rule mr-3 align-middle" /> Selected Works
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl leading-[1.05] lg:leading-[1.02] reveal reveal-delay-1">
            A portfolio measured
            <br /> in <span className="italic text-gold font-serif">landmarks.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed font-light reveal reveal-delay-2">
            Headline projects across solar street lighting, high mast installations, government
            supply and public utility infrastructure.
          </p>
        </div>
      </section>
      <SpecialitiesMarquee items={PROJECTS_ITEMS} variant="ivory" direction="right" ariaLabel="Project portfolio highlights" />

      <Section className="pb-24">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 sm:mb-16 -mt-4 border-b border-border pb-6">
          <div className="flex items-center gap-2 text-navy font-semibold">
            <Filter className="w-5 h-5 text-gold" />
            <span className="uppercase tracking-widest text-xs">Filter by Sector</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-navy text-white shadow-md"
                    : "bg-secondary text-navy hover:bg-gold/10 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with Framer Motion for smooth layout shifts */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, index) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                className="group flex flex-col h-full bg-background border border-border/50 hover:border-gold/30 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm shadow-sm flex items-center gap-2 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[0.7rem] font-semibold tracking-wider text-navy uppercase">
                      {p.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="eyebrow text-gold">{p.category}</span>
                    <span className="font-display text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-sm">
                      {p.year}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-navy leading-tight line-clamp-2">
                    {p.title}
                  </h3>

                  <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed flex-1 line-clamp-2">
                    {p.location}
                  </p>

                  <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                      <span className="font-display text-gold text-xs">{p.client.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                        Client
                      </div>
                      <div className="text-sm font-medium text-navy line-clamp-1">{p.client}</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-display">
              No projects found in this category.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 text-gold font-semibold hover:text-navy transition-colors link-underline"
            >
              View all projects
            </button>
          </div>
        )}
      </Section>
    </>
  );
}

export default Projects;
