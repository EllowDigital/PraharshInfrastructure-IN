import { Link } from "react-router-dom";
import { Section } from "@/components/site/Section";
import {
  Landmark,
  ShieldCheck,
  FileCheck2,
  ScrollText,
  Building2,
  ArrowUpRight,
  CheckCircle2,
  HardHat,
  Sun,
  Zap,
} from "lucide-react";
import govtImg from "@/assets/project-govt.jpg";

const credentials = [
  {
    icon: ScrollText,
    t: "Tender Participation",
    d: "Comprehensive experience in technical and financial bid submissions across state e-procurement portals.",
  },
  {
    icon: Landmark,
    t: "Public Sector Execution",
    d: "Proven track record of delivering multi-site government projects with strict adherence to contractual milestones.",
  },
  {
    icon: FileCheck2,
    t: "Procurement Support",
    d: "Active GeM portal seller, facilitating streamlined category-mapped procurement for state and central agencies.",
  },
  {
    icon: HardHat,
    t: "Infrastructure Development",
    d: "Turnkey civic works ranging from urban pole installations to high mast lighting across municipal jurisdictions.",
  },
  {
    icon: Sun,
    t: "Solar Projects",
    d: "Large-scale deployment of solar street lighting and renewable energy systems for rural and urban development.",
  },
  {
    icon: Zap,
    t: "Public Utility Works",
    d: "Execution of essential electrical and public utility infrastructure, including cabling, panel works, and substation upgrades.",
  },
];

const departments = [
  "State Public Works Departments",
  "Municipal Corporations & Nagar Panchayats",
  "State Electricity Distribution Companies",
  "District Rural Development Agencies",
  "Public Health & Sanitation Boards",
  "Smart City Special Purpose Vehicles",
  "Defence Welfare Boards",
  "State Renewable Energy Development Agencies",
];

function Govt() {
  return (
    <>
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={govtImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Public Sector
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Built for the
            <br />
            <span className="italic text-gold">government tender.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed">
            Praharsh Infrastructure is structured, documented and audited specifically to deliver
            public-sector projects — from GeM procurement to large turnkey civic works.
          </p>
        </div>
      </section>

      <Section eyebrow="Core Competencies" title="Government Capabilities">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border -mt-8">
          {credentials.map((c, i) => (
            <div key={c.t} className="bg-background p-10 card-hover">
              <div className="flex items-start justify-between mb-8">
                <c.icon className="w-9 h-9 text-gold" strokeWidth={1.4} />
                <span className="font-display text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl text-navy leading-tight">{c.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Who We Serve" title="Departments and agencies we work with.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 -mt-4">
          {departments.map((d) => (
            <div
              key={d}
              className="bg-background p-6 flex items-center gap-4 border-l-2 border-gold"
            >
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
              <span className="text-navy text-sm">{d}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="GeM Expertise" title="A procurement workflow tuned for public buyers.">
        <div className="grid lg:grid-cols-3 gap-px bg-border -mt-8">
          {[
            {
              n: "01",
              t: "Bid Discovery",
              d: "Daily GeM and state e-procurement portal scanning with category-mapped alerts.",
            },
            {
              n: "02",
              t: "Compliant Submission",
              d: "In-house tender cell prepares technical and financial bids within standard timelines.",
            },
            {
              n: "03",
              t: "Contract Execution",
              d: "Dedicated PMC team handles delivery, inspection, billing and warranty servicing.",
            },
          ].map((s) => (
            <div key={s.n} className="bg-background p-10">
              <div className="font-display text-5xl text-gold/70">{s.n}</div>
              <h3 className="font-display text-2xl text-navy mt-6">{s.t}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Landmark className="w-10 h-10 text-gold mb-6" strokeWidth={1.4} />
            <h2 className="text-white text-3xl lg:text-5xl leading-tight">
              Government department? <span className="italic text-gold">Share your RFP.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-medium hover:bg-white transition-colors"
            >
              Submit Tender Brief <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Govt;
