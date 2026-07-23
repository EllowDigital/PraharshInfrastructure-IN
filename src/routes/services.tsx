import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, SERVICES_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Link } from "react-router-dom";
import { Section } from "@/components/site/Section";
import {
  Lightbulb,
  Sun,
  Zap,
  Landmark,
  Signpost,
  ArrowUpRight,
  Route as RouteIcon,
  Megaphone,
  MonitorPlay,
} from "lucide-react";

// Services Page Assets
import civilImg from "@/assets/images/services/civil.png";
import roadsImg from "@/assets/images/services/road.png";
import solarImg from "@/assets/images/services/solar.png";
import electricalImg from "@/assets/images/services/electrical&lighting.png";
import unipoleImg from "@/assets/images/services/indoor&outdoor.png";
import DigitalImg from "@/assets/images/services/digital.png";
import brandImg from "@/assets/images/services/branding.png";
import servicesGovtImg from "@/assets/images/services/govt.png";

const services = [
  {
    icon: Lightbulb,
    img: civilImg,
    name: "Infrastructure Development",
    desc: "Turnkey infrastructure projects for public lighting, urban and rural development, smart city works and government utilities.",
    items: [
      "High Mast Light Installation",
      "Solar Street Light Projects",
      "Electrical Infrastructure Works",
      "Pole Installation & Public Lighting",
      "Rural & Urban Development Works",
      "Smart City Development Projects",
      "Civil Development Works (Roads, Highways & Buildings)",
    ],
  },
  {
    icon: RouteIcon,
    img: roadsImg,
    name: "Road Infrastructure Projects",
    desc: "Highway, expressway and urban road infrastructure with integrated safety, lighting and smart traffic systems.",
    items: [
      "Highway & Expressway Lighting",
      "Road Safety & Traffic Management Systems",
      "Asphalt & Concrete Pathway Development",
      "Retroreflective Road Signage & Markers",
      "Smart Traffic Control Infrastructure",
    ],
  },
  {
    icon: Sun,
    img: solarImg,
    name: "Solar Energy Solutions",
    desc: "Renewable energy systems for streets, high mast lighting and energy-efficient public infrastructure.",
    items: [
      "Solar Street Lights",
      "Solar High Mast Systems",
      "Renewable Energy Installations",
      "Energy Efficient Lighting Systems",
    ],
  },
  {
    icon: Zap,
    img: electricalImg,
    name: "Electrical & Lighting Works",
    desc: "Public utility lighting, electrical equipment and cabling services for municipal and government infrastructure.",
    items: [
      "LED Street Lighting",
      "Public Utility Lighting",
      "Electrical Equipment Installation",
      "Cable & Pole Installation",
    ],
  },
  {
    icon: Megaphone,
    img: unipoleImg,
    name: "Outdoor & Indoor Advertising",
    desc: "End-to-end OOH and indoor brand visibility — from highway unipoles to retail and event environments.",
    items: [
      "Unipoles & Hoardings (OOH)",
      "Bus Shelter & Transit Advertising",
      "In-Store & Retail Branding Displays",
      "Exhibition Stalls & Event Kiosks",
    ],
  },
  {
    icon: MonitorPlay,
    img: DigitalImg,
    name: "Digital Advertising",
    desc: "Digital and DOOH media solutions for government, public and enterprise brand building campaigns.",
    items: [
      "Social Media Management",
      "Bulk SMS & WhatsApp Messages",
      "Bulk Voice Calling",
      "DOOH Screens & LED Walls",
      "360° Media Solutions",
      "Smart Digital Signage",
      "Digital Brand Building Solutions",
    ],
  },
  {
    icon: Signpost,
    img: brandImg,
    name: "Branding & Signage Works",
    desc: "High-strength external signage, cladding and branding solutions for government and infrastructure projects.",
    items: [
      "ACP Sheet Cladding",
      "Acrylic Sign Boards",
      "Reflective Signage",
      "Government Branding Works",
    ],
  },
  {
    icon: Landmark,
    img: servicesGovtImg,
    name: "Government Supply Services",
    desc: "GeM-registered sourcing and delivery of hygiene, safety, healthcare and utility materials.",
    items: [
      "Sanitation Products",
      "Healthcare Supplies",
      "Industrial Safety Equipment",
      "Public Utility Materials",
      "Chemical & Cleaning Supplies",
    ],
  },
];

function Services() {
  return (
    <>
      <SEO title="Praharsh Infrastructure" />
      
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> What We Do
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl leading-[1.05] lg:leading-[1.02]">
            Eight verticals.
            <br />
            <span className="italic text-gold">One execution standard.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Integrated infrastructure, road, solar, electrical, advertising, digital media, branding
            and government supply capabilities — operating under shared engineering, procurement and
            HSE systems.
          </p>
        </div>
      </section>
      <SpecialitiesMarquee items={SERVICES_ITEMS} variant="navy" direction="left" ariaLabel="Our service capabilities" />

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

export default Services;
