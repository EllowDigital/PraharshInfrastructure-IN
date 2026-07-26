export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Solar" | "Infrastructure" | "Electrical" | "Government" | "Industry";
  date: string;
  readTime: string;
  cover?: string;
  keywords: string;
  relatedServices: { label: string; to: string }[];
  content: { heading: string; body: string; bullets?: string[] }[];
}

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "solar-street-lighting-guide-india",
    title: "Solar Street Lighting in India: A Complete Guide for Municipalities & PWDs",
    excerpt:
      "How solar street lighting projects are transforming urban and rural infrastructure across India — component selection, tender specifications and lifecycle costs.",
    category: "Solar",
    date: "2026-07-18",
    readTime: "8 min read",
    keywords:
      "solar street lighting India, solar high mast, PWD solar tender, municipal solar lighting, EESL solar",
    relatedServices: [
      { label: "Solar Energy Solutions", to: "/services/solar" },
      { label: "Electrical & Lighting Works", to: "/services/electrical" },
      { label: "Featured Projects", to: "/projects" },
    ],
    content: [
      {
        heading: "Why solar street lighting is the new default",
        body: "Municipalities, PWDs and rural development authorities across India are moving from grid-tied HPSV/LED poles to fully solar-integrated street lighting. Falling panel prices, LiFePO4 battery reliability, and mature EPC vendors have made solar the lowest lifecycle-cost option for most public lighting mandates.",
      },
      {
        heading: "Core components of a compliant solar street light",
        body: "A tender-grade solar street light is more than a panel and a lamp. The specification must call out each subsystem with BIS and MNRE compliance.",
        bullets: [
          "Mono-PERC solar module (50–100 Wp) with IEC 61215/61730 certification",
          "LiFePO4 battery with BMS, IP65 enclosure, 2000+ deep-cycle life",
          "MPPT-based integrated charge controller with dusk-to-dawn logic",
          "12–24W LED luminaire — >120 lm/W, CRI >70, 5-year warranty",
          "GI/aluminium pole 4–9 m with foundation as per site loading",
        ],
      },
      {
        heading: "Tender & GeM procurement notes",
        body: "GeM category listings for solar street lights now enforce MNRE benchmark specifications. Bidders should carry MSME/GeM empanelment, ISO 9001/14001/45001 and prior PWD/UPSIC/DRDA experience to qualify comfortably.",
      },
      {
        heading: "Talk to our solar team",
        body: "Praharsh Infrastructure has delivered solar street light, high mast and hybrid public lighting projects for state agencies across Uttar Pradesh. Explore our Solar Energy Solutions page or request a BOQ-ready proposal.",
      },
    ],
  },
  {
    slug: "gem-empanelment-checklist-2026",
    title: "GeM Empanelment in 2026: Documentation Checklist for Infra Contractors",
    excerpt:
      "A step-by-step GeM (Government e-Marketplace) empanelment checklist for infrastructure, electrical and solar contractors bidding for central and state tenders.",
    category: "Government",
    date: "2026-07-12",
    readTime: "6 min read",
    keywords:
      "GeM empanelment, government tender India, PWD contractor, UPSIC vendor, DRDA supply, MSME registration",
    relatedServices: [
      { label: "Government Projects", to: "/services/government-projects" },
      { label: "Government Capabilities", to: "/government-capabilities" },
      { label: "Certifications", to: "/certifications" },
    ],
    content: [
      {
        heading: "Why GeM matters",
        body: "The Government e-Marketplace is the single largest B2G procurement channel in India. For infrastructure suppliers, GeM offers direct access to Central Ministries, State PSUs, PWDs and Panchayati Raj procurement — without the traditional tender-house friction.",
      },
      {
        heading: "The empanelment checklist",
        body: "Before submitting a GeM seller registration, keep the following documents ready in your primary authorised signatory's Aadhaar-verified profile.",
        bullets: [
          "PAN, GST, MSME (Udyam) certificates",
          "ISO 9001/14001/45001 (recommended for infra tenders)",
          "OEM authorisation or manufacturer declarations for supplied goods",
          "3-year audited financials, ITR and bank solvency certificate",
          "Past performance certificates from Central/State agencies",
        ],
      },
      {
        heading: "Category-specific gotchas",
        body: "Solar, LED, and high-mast categories now require MNRE/BEE labeling; civil supply categories require BIS conformance. A generic OEM authorisation letter is often rejected — insist on category-specific ones.",
      },
      {
        heading: "How Praharsh helps",
        body: "As a GeM-empanelled infrastructure and government supply firm, we regularly execute tender-driven contracts for UPSIC, DRDA, PWD, UPRNSS and municipal bodies. See our Government Capabilities and Clients pages for the full portfolio.",
      },
    ],
  },
  {
    slug: "led-vs-conventional-public-lighting-tco",
    title: "LED vs Conventional Public Lighting: A 10-Year Total Cost of Ownership View",
    excerpt:
      "Comparing HPSV, metal halide and modern LED street lighting on capex, opex and lifecycle cost — with realistic Indian tender numbers.",
    category: "Electrical",
    date: "2026-06-28",
    readTime: "5 min read",
    keywords:
      "LED street light TCO, HPSV vs LED, public lighting India, energy efficient lighting tender",
    relatedServices: [
      { label: "Electrical & Lighting Works", to: "/services/electrical" },
      { label: "Infrastructure Projects", to: "/services/construction" },
      { label: "Featured Projects", to: "/projects" },
    ],
    content: [
      {
        heading: "The old assumption is broken",
        body: "For decades, HPSV lamps were the default choice for Indian street lighting because of low upfront cost. In 2026, modern LED luminaires from BEE-labeled OEMs deliver 3–4x the useful life at a fraction of the annual energy bill.",
      },
      {
        heading: "10-year cost stack",
        body: "For a 1000-pole ULB rollout, LEDs typically break even on TCO in 24–30 months and save 55–65% on electricity across the lifecycle.",
        bullets: [
          "HPSV 150W: high replacement (2 yr lamp life), 220V grid-only",
          "LED 60W: 50,000 h L70 life, driver-warranty 5 years",
          "Smart LED w/ CCMS: additional 10–15% opex saving via dimming",
        ],
      },
      {
        heading: "What good tender copy looks like",
        body: "Specify lumen-per-watt (>120 lm/W), driver surge protection (10 kV), IP66/IK08, and 5-year comprehensive warranty. Reference IS 10322 / LM-80 / LM-79 test reports rather than brand names.",
      },
      {
        heading: "Design a lighting rollout with us",
        body: "Explore our Electrical & Lighting Works page or contact our BD team for a pole-by-pole audit and BOQ.",
      },
    ],
  },
  {
    slug: "road-infrastructure-safety-standards",
    title: "Building Safer Roads: Signage, Reflectivity & Traffic Management Standards",
    excerpt:
      "A field guide to road safety infrastructure — retroreflective signage, thermoplastic markings, guardrails and IRC-compliant traffic management for state and NH projects.",
    category: "Infrastructure",
    date: "2026-06-14",
    readTime: "7 min read",
    keywords:
      "road safety infrastructure India, IRC signage, retroreflective signs, thermoplastic road marking, PWD road works",
    relatedServices: [
      { label: "Road Infrastructure", to: "/services/construction" },
      { label: "Government Projects", to: "/services/government-projects" },
      { label: "Featured Projects", to: "/projects" },
    ],
    content: [
      {
        heading: "The road-safety spec that actually matters",
        body: "The Ministry of Road Transport and Highways (MoRTH) and IRC have codified road safety furniture requirements — but tender enforcement varies. Delivering compliant, audit-safe roads means calling out the right IS numbers up-front.",
      },
      {
        heading: "Non-negotiable line items",
        body: "For every kilometre of NH / SH / MDR you construct or refurbish, plan for:",
        bullets: [
          "Retroreflective signage on Type-IV sheeting (IS 15915)",
          "Thermoplastic road markings — MoRTH-approved white/yellow paint",
          "W-beam metal crash barriers on embankments >3m",
          "Delineators, cat-eyes and edge markers at horizontal curves",
          "Solar blinker studs at unsignalised intersections",
        ],
      },
      {
        heading: "Smart traffic control",
        body: "Adaptive traffic control (ATCS), variable message signs and integrated CCTV are now baseline for urban and smart-city road tenders. Praharsh integrates these systems with the underlying civil and lighting scope.",
      },
    ],
  },
  {
    slug: "outdoor-advertising-permit-guide-lucknow",
    title: "Outdoor Advertising Permits in UP: Unipole, Hoarding & Digital Screen Approvals",
    excerpt:
      "How brands and OOH agencies can obtain unipole, hoarding and LED wall permissions from Lucknow Nagar Nigam, LDA and highway authorities.",
    category: "Industry",
    date: "2026-05-30",
    readTime: "6 min read",
    keywords:
      "outdoor advertising Lucknow, unipole permission UP, hoarding license, LED wall permit, OOH India",
    relatedServices: [
      { label: "Advertising & Outdoor Media", to: "/services" },
      { label: "Branding & Signage", to: "/services" },
      { label: "Contact Our Team", to: "/contact" },
    ],
    content: [
      {
        heading: "OOH is regulated locally",
        body: "Outdoor advertising in Uttar Pradesh is regulated by Lucknow Nagar Nigam, LDA, NHAI and PWD depending on where the structure is placed. Each authority has separate permission, safety and structural requirements.",
      },
      {
        heading: "Documents to prepare",
        body: "Before you approach any authority, keep these ready:",
        bullets: [
          "Structural stability certificate from a licensed engineer",
          "Site plan with dimensions, illumination and viewing angles",
          "NOC from adjacent land-owner (private / govt.)",
          "Advertisement design mock-ups and lighting spec",
          "Payment challan for annual advertisement tax",
        ],
      },
      {
        heading: "Digital and interactive OOH",
        body: "LED walls and DOOH screens need additional electrical safety clearance and content compliance under the Advertising Standards Council of India (ASCI) code.",
      },
    ],
  },
];

export const INSIGHT_CATEGORIES = [
  "All",
  "Solar",
  "Infrastructure",
  "Electrical",
  "Government",
  "Industry",
] as const;
