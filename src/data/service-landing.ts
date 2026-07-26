import type { LucideIcon } from "lucide-react";
import { Sun, HardHat, Zap, Landmark } from "lucide-react";

export interface ServiceLandingPage {
  slug: string;
  icon: LucideIcon;
  hero: {
    eyebrow: string;
    h1: string;
    intro: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  offerings: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedInsights: string[]; // insight slugs
  ctaText: string;
}

export const SERVICE_PAGES: Record<string, ServiceLandingPage> = {
  solar: {
    slug: "solar",
    icon: Sun,
    hero: {
      eyebrow: "Solar Energy Solutions",
      h1: "Turnkey Solar Street Light & High Mast Projects Across India",
      intro:
        "End-to-end solar public lighting — from panel selection and battery sizing to pole erection, commissioning and 5-year O&M. MNRE-compliant, GeM-empanelled and PWD-ready.",
    },
    seo: {
      title: "Solar Street Light & High Mast EPC Company in India | Praharsh Infrastructure",
      description:
        "MNRE-approved solar street lighting, solar high mast and renewable public lighting projects for municipalities, PWDs and government agencies across India.",
      keywords:
        "solar street light EPC India, solar high mast contractor, MNRE solar lighting, PWD solar tender, GeM solar empanelled, Lucknow solar company",
    },
    offerings: [
      {
        title: "Solar Street Lighting Projects",
        body: "Integrated & split solar street lights (9W–30W LED) with LiFePO4 batteries, MPPT controllers and 4–7 m poles. Deployed at scale for municipal, panchayat and highway lighting.",
      },
      {
        title: "Solar High Mast Systems",
        body: "12–30 metre solar high mast lighting with 4/6/8 LED floodlights, hybrid backup and GI galvanised poles — suitable for junctions, parks, ports and mandi yards.",
      },
      {
        title: "Rooftop & Off-grid Solar",
        body: "Off-grid solar plants for rural infrastructure, government buildings and public utilities with battery storage and remote monitoring.",
      },
      {
        title: "Hybrid Solar-Grid Lighting",
        body: "Grid-fallback controllers for urban corridors and smart-city rollouts — best of solar with 100% uptime.",
      },
    ],
    benefits: [
      {
        title: "MNRE & BIS Compliant",
        body: "Every luminaire, panel and battery is procured from BIS/MNRE-approved OEMs with valid test certificates.",
      },
      {
        title: "GeM Empanelled",
        body: "Direct GeM procurement — faster PO, transparent pricing, government-audit ready documentation.",
      },
      {
        title: "5-Year Comprehensive O&M",
        body: "In-house field teams for preventive maintenance, cleaning, driver replacement and warranty support.",
      },
      {
        title: "Bank-Grade EPC Delivery",
        body: "Financial and technical bandwidth to execute multi-crore rollouts with ISO 9001/14001/45001 quality systems.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Site Survey",
        body: "Load analysis, sun-path & foundation assessment.",
      },
      {
        step: "02",
        title: "Design & BOQ",
        body: "MNRE-compliant design and priced BOQ within 5 days.",
      },
      {
        step: "03",
        title: "Supply & Install",
        body: "Turnkey supply, civil, erection and commissioning.",
      },
      {
        step: "04",
        title: "Handover & O&M",
        body: "Test certificates, training and 5-year O&M contract.",
      },
    ],
    faqs: [
      {
        q: "What warranty do you provide on solar street lights?",
        a: "Panels 25 years (linear performance), LiFePO4 battery 5 years, LED luminaire 5 years, pole 10 years against corrosion.",
      },
      {
        q: "Do you handle GeM tenders directly?",
        a: "Yes. Praharsh Infrastructure is GeM empanelled (Seller ID 6498190000819033) and executes central and state tenders end-to-end.",
      },
      {
        q: "What is the typical delivery timeline?",
        a: "For a 500-pole solar street light rollout, we deliver in 45–60 days from LOI including installation and commissioning.",
      },
    ],
    relatedInsights: [
      "solar-street-lighting-guide-india",
      "led-vs-conventional-public-lighting-tco",
    ],
    ctaText: "Request a Solar Project Proposal",
  },
  construction: {
    slug: "construction",
    icon: HardHat,
    hero: {
      eyebrow: "Infrastructure & Construction",
      h1: "Civil Infrastructure, Road & Public Works Contractor",
      intro:
        "Turnkey civil construction, road infrastructure and smart-city works — from asphalt & concrete pathways to highway lighting, drainage, signage and safety systems.",
    },
    seo: {
      title:
        "Civil Infrastructure & Road Construction Contractor in India | Praharsh Infrastructure",
      description:
        "Turnkey civil, road and highway infrastructure contractor executing PWD, NHAI and urban development projects across Uttar Pradesh and India.",
      keywords:
        "civil infrastructure contractor India, road construction UP, PWD contractor Lucknow, highway lighting EPC, smart city works, MoRTH road safety",
    },
    offerings: [
      {
        title: "Highway & Urban Road Construction",
        body: "Asphalt and concrete road development, resurfacing and widening for state highways, urban corridors and industrial estates.",
      },
      {
        title: "Road Safety Infrastructure",
        body: "MoRTH/IRC-compliant retroreflective signage, thermoplastic markings, W-beam barriers, delineators and solar studs.",
      },
      {
        title: "Public Utility & Civil Works",
        body: "Building construction, drainage, boundary walls, foundations and site development for government utilities and smart-city projects.",
      },
      {
        title: "Smart Traffic Infrastructure",
        body: "Adaptive traffic control (ATCS), variable message signs, and integrated CCTV/ANPR for urban and highway rollouts.",
      },
    ],
    benefits: [
      {
        title: "PWD & NHAI Panel",
        body: "Empanelled with UP PWD and cleared for MoRTH-spec works.",
      },
      {
        title: "IS/IRC Codes",
        body: "All specifications and materials to IRC:35, IS 15915, IS 5, MoRTH sections.",
      },
      {
        title: "In-House Engineering",
        body: "Structural, geotechnical and QC engineers on staff.",
      },
      {
        title: "Safety-First Sites",
        body: "ISO 45001 OH&S systems and full PPE on every project.",
      },
    ],
    process: [
      { step: "01", title: "DPR & Survey", body: "Topographical survey, DPR and design freeze." },
      {
        step: "02",
        title: "Mobilisation",
        body: "Site huts, plant, equipment and manpower deployment.",
      },
      { step: "03", title: "Execution", body: "Layered construction with daily QA/QC signoff." },
      {
        step: "04",
        title: "Handover",
        body: "As-built drawings, test reports and warranty documentation.",
      },
    ],
    faqs: [
      {
        q: "Which road works do you undertake?",
        a: "State highways, urban corridors, panchayat roads, industrial estate roads, and complete road-safety furniture installation.",
      },
      {
        q: "Do you handle end-to-end DPR to handover?",
        a: "Yes — from topographical survey and DPR through construction, safety systems and O&M.",
      },
    ],
    relatedInsights: [
      "road-infrastructure-safety-standards",
      "led-vs-conventional-public-lighting-tco",
    ],
    ctaText: "Discuss a Construction Project",
  },
  electrical: {
    slug: "electrical",
    icon: Zap,
    hero: {
      eyebrow: "Electrical & Public Lighting",
      h1: "LED Street Lighting & Electrical Infrastructure EPC",
      intro:
        "Public utility lighting, LED street lighting rollouts and complete electrical infrastructure works for municipalities, PSUs, and government establishments.",
    },
    seo: {
      title: "LED Street Lighting & Electrical EPC Contractor | Praharsh Infrastructure",
      description:
        "LED public lighting, high mast, cable and pole installation, and electrical infrastructure works for ULBs, PWDs and central PSUs across India.",
      keywords:
        "LED street lighting contractor India, electrical EPC UP, public lighting Lucknow, cable pole installation, CCMS smart lighting",
    },
    offerings: [
      {
        title: "LED Street Lighting",
        body: "20W–150W BEE-labeled LED luminaires with 5-year comprehensive warranty and CCMS-ready drivers.",
      },
      {
        title: "High Mast Lighting",
        body: "12–30 m galvanised high mast poles with 4/6/8 LED floodlights for junctions, chowks and public spaces.",
      },
      {
        title: "Pole & Cable Installation",
        body: "GI/octagonal decorative poles, feeder pillars, LT/HT cabling, earthing and lightning protection.",
      },
      {
        title: "Electrical Equipment Supply",
        body: "MCB/DBs, panels, meters, transformers and switchgear — GeM procurement and OEM-authorised supply.",
      },
    ],
    benefits: [
      { title: "BEE 5-star Lumens", body: ">120 lm/W efficacy with LM-79/LM-80 reports." },
      { title: "IP66 / IK08", body: "Weather-sealed drivers and impact-graded housings." },
      { title: "10 kV Surge", body: "Industry-leading driver protection standard." },
      { title: "Smart Ready", body: "NEMA socket + CCMS compatibility on request." },
    ],
    process: [
      {
        step: "01",
        title: "Photometric Design",
        body: "Lux-level and uniformity analysis pole-by-pole.",
      },
      {
        step: "02",
        title: "Supply & Test",
        body: "Factory-tested batches with pre-dispatch inspection.",
      },
      {
        step: "03",
        title: "Installation",
        body: "Certified electricians, torque-controlled fitments.",
      },
      {
        step: "04",
        title: "Warranty & O&M",
        body: "5-year comprehensive with SLA-based response.",
      },
    ],
    faqs: [
      {
        q: "Do you supply CCMS / smart lighting?",
        a: "Yes — we offer NEMA-socket luminaires and integrate CCMS gateways with cloud dashboards.",
      },
      {
        q: "What is your typical LED warranty?",
        a: "5-year comprehensive on luminaire and driver, with in-region field service.",
      },
    ],
    relatedInsights: [
      "led-vs-conventional-public-lighting-tco",
      "solar-street-lighting-guide-india",
    ],
    ctaText: "Request an LED Lighting Proposal",
  },
  "government-projects": {
    slug: "government-projects",
    icon: Landmark,
    hero: {
      eyebrow: "Government Projects & Supply",
      h1: "Government Supply Services & Tender-Based EPC Execution",
      intro:
        "Full-service government contracting — GeM, tender-driven and rate-contract supply to Central, State, PSU, ULB and Panchayati Raj agencies across India.",
    },
    seo: {
      title:
        "Government Supply & Tender Contractor in India | GeM Empanelled | Praharsh Infrastructure",
      description:
        "GeM-empanelled government supply and infrastructure contractor for UPSIC, DRDA, PWD, UPRNSS and Central PSUs. Solar, lighting, civil and electrical tender execution.",
      keywords:
        "government supply contractor India, GeM empanelled vendor, UPSIC contractor, DRDA supplier, PWD panel, government tender infrastructure",
    },
    offerings: [
      {
        title: "GeM & Tender Bidding",
        body: "Direct GeM sales, e-tender bidding on eProcure/UP Bhulekh, and rate-contract fulfilment for government agencies.",
      },
      {
        title: "Solar & Lighting Supply",
        body: "MNRE-compliant solar street lights, high mast, LED luminaires and public lighting kits to central and state programs.",
      },
      {
        title: "Civil & Electrical Works",
        body: "Turnkey civil construction, electrical infrastructure and rural development works for DRDA, PWD, panchayats and ULBs.",
      },
      {
        title: "Rate Contract Supply",
        body: "Long-term rate-contract fulfilment with dedicated logistics, warehousing and O&M support.",
      },
    ],
    benefits: [
      { title: "GeM ID 6498190000819033", body: "Verified Government e-Marketplace seller." },
      {
        title: "UPSIC / DRDA Empanelled",
        body: "Approved supplier across multiple UP state agencies.",
      },
      { title: "ISO 9001·14001·45001", body: "Full quality, environment and OH&S certification." },
      { title: "MSME (Udyam)", body: "MSME-registered with priority procurement eligibility." },
    ],
    process: [
      {
        step: "01",
        title: "Tender Analysis",
        body: "Eligibility, BOQ and margin analysis in 24 hrs.",
      },
      {
        step: "02",
        title: "Bid Preparation",
        body: "Technical + financial bid, EMD and BG arrangement.",
      },
      {
        step: "03",
        title: "Award & Supply",
        body: "PO acceptance, factory supply, delivery to site.",
      },
      {
        step: "04",
        title: "Handover & Invoicing",
        body: "GRN, inspection, invoice and payment tracking.",
      },
    ],
    faqs: [
      {
        q: "Which agencies have you supplied to?",
        a: "UPSIC, DRDA, PWD, UPRNSS, various Nagar Nigams, Zila Panchayats and central PSUs — see our Clients & Partners page.",
      },
      {
        q: "Do you handle EMD and Performance Bank Guarantees?",
        a: "Yes — we have banking arrangements for EMD, PBG and mobilisation guarantees required in government tenders.",
      },
    ],
    relatedInsights: ["gem-empanelment-checklist-2026", "solar-street-lighting-guide-india"],
    ctaText: "Partner With Us on a Government Project",
  },
};

export const SERVICE_LANDING_SLUGS = Object.keys(SERVICE_PAGES);
