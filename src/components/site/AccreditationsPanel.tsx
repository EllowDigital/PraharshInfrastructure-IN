import { useState } from "react";
import {
  ArrowUpRight,
  X,
  CheckCircle2,
  ShieldCheck,
  Award,
  Landmark,
  Building2,
  FileCheck2,
} from "lucide-react";
import { Link } from "react-router-dom";

type Accreditation = {
  id: string;
  title: string;
  short: string;
  authority: string;
  scope: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  details: string[];
};

const ITEMS: Accreditation[] = [
  {
    id: "gem",
    title: "GeM Authorized OEM Supplier",
    short: "GeM",
    authority: "Government e-Marketplace, Ministry of Commerce & Industry",
    scope: "Verified seller for solar, LED, high-mast, sanitation and public utility categories.",
    icon: Landmark,
    details: [
      "Active seller ID with full OEM authorization documentation on file.",
      "Bid-ready technical & financial catalogues across 40+ product SKUs.",
      "EMD, PBG and buyer-specific compliance affidavits handled in-house.",
      "Post-award installation, warranty and AMC executed under GeM SLAs.",
    ],
  },
  {
    id: "iso9001",
    title: "ISO 9001:2015 — Quality Management",
    short: "ISO 9001",
    authority: "Accredited certification body (IAF signatory)",
    scope: "Design, supply, installation and maintenance of infrastructure & lighting systems.",
    icon: Award,
    details: [
      "Documented QMS covering procurement, execution and post-delivery quality.",
      "Annual surveillance audits and corrective-action closure records.",
      "Traceable material dispatch, incoming QC and site handover protocols.",
    ],
  },
  {
    id: "iso14001",
    title: "ISO 14001 — Environment Management",
    short: "ISO 14001",
    authority: "Accredited certification body (IAF signatory)",
    scope: "Environmental compliance for solar, civil and lighting installations.",
    icon: ShieldCheck,
    details: [
      "Waste, e-waste and battery disposal aligned with CPCB norms.",
      "Environmental impact controls for civil & road-adjacent work zones.",
      "Reporting matrix for renewable energy and clean-energy contributions.",
    ],
  },
  {
    id: "iso45001",
    title: "ISO 45001 — Occupational Health & Safety",
    short: "ISO 45001",
    authority: "Accredited certification body (IAF signatory)",
    scope: "Site safety governance for high-mast, road-side and electrical works.",
    icon: ShieldCheck,
    details: [
      "PPE, toolbox talks and hazard identification on every active site.",
      "Trained safety supervisors, incident reporting and near-miss registers.",
      "Zero lost-time incident record maintained through disciplined execution.",
    ],
  },
  {
    id: "pwd",
    title: "PWD & Irrigation Dept. Empanelled",
    short: "PWD",
    authority: "State Public Works & Irrigation Departments",
    scope: "Empanelled contractor for road-adjacent lighting, high-mast and civil works.",
    icon: Building2,
    details: [
      "Cleared prequalification for state-level electrical & lighting tenders.",
      "Executed multi-crore packages with milestone-based invoicing.",
      "In-house liaison with divisional engineers for smooth site handover.",
    ],
  },
  {
    id: "uppcl",
    title: "UPPCL Empanelled Contractor",
    short: "UPPCL",
    authority: "Uttar Pradesh Power Corporation Ltd.",
    scope: "Electrical contracting, LT/HT infrastructure and street lighting works.",
    icon: FileCheck2,
    details: [
      "Approved for LT/HT electrical works and utility-grade lighting.",
      "Compliance with UPPCL technical specifications and safety code.",
      "Long-term relationships with divisional and sub-divisional offices.",
    ],
  },
  {
    id: "udyam",
    title: "UDYAM Registered (MSME)",
    short: "UDYAM",
    authority: "Ministry of MSME, Government of India",
    scope: "Recognized MSME with statutory benefits for public procurement.",
    icon: Building2,
    details: [
      "Eligible for MSME price preference and tender relaxations.",
      "PAN, GST and UDYAM verifiable through official portals.",
      "Complete statutory & tax compliance across all business verticals.",
    ],
  },
  {
    id: "gst",
    title: "GST Registered & Compliant",
    short: "GST",
    authority: "Goods & Services Tax Network",
    scope: "Nationwide invoicing across states with e-invoicing enabled.",
    icon: ShieldCheck,
    details: [
      "E-invoicing enabled for all B2B, B2G and PSU transactions.",
      "Monthly & annual returns filed on schedule; no active notices.",
      "Reconciliation-ready records for buyer procurement audits.",
    ],
  },
];

export function AccreditationsPanel() {
  const [active, setActive] = useState<Accreditation | null>(null);

  return (
    <div className="col-span-12 lg:col-span-5 bg-secondary p-8 sm:p-10 flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="eyebrow text-navy-deep/60 mb-3 text-xs">
          <span className="inline-block w-8 h-[2px] bg-gold mr-3 align-middle" />
          Accredited & Authorized
        </div>
        <h4 className="font-display text-3xl sm:text-4xl text-navy-deep italic leading-tight mb-8">
          Procurement- <br />
          ready. Tender-trained.
        </h4>
        <ul className="space-y-2">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => setActive(it)}
                  className="group w-full flex items-center gap-4 py-2.5 text-left border-b border-navy-deep/10 hover:border-gold transition-colors"
                >
                  <Icon className="w-4 h-4 text-gold shrink-0" strokeWidth={1.8} />
                  <span className="flex-1 text-sm font-medium text-navy-deep group-hover:text-navy transition-colors">
                    {it.title}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy-deep/40 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        to="/government-capabilities"
        className="mt-8 inline-flex items-center justify-center gap-3 bg-navy-deep text-white py-4 uppercase tracking-[0.22em] text-xs font-bold hover:bg-gold hover:text-navy-deep transition-colors"
      >
        See Government Capabilities
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      {active && <AccreditationModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function AccreditationModal({ item, onClose }: { item: Accreditation; onClose: () => void }) {
  const Icon = item.icon;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`accr-${item.id}-title`}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-navy-deep/70 backdrop-blur-sm px-4 py-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-navy-deep text-white p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 text-white/70 hover:text-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="text-[0.65rem] uppercase tracking-[0.22em] text-gold font-semibold mb-1">
                {item.short}
              </div>
              <h5
                id={`accr-${item.id}-title`}
                className="font-display text-xl sm:text-2xl leading-tight"
              >
                {item.title}
              </h5>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <div className="text-[0.65rem] uppercase tracking-widest text-navy-deep/50 mb-1 font-semibold">
              Issuing Authority
            </div>
            <div className="text-sm text-navy-deep">{item.authority}</div>
          </div>
          <div>
            <div className="text-[0.65rem] uppercase tracking-widest text-navy-deep/50 mb-1 font-semibold">
              Scope
            </div>
            <div className="text-sm text-navy-deep/85 leading-relaxed">{item.scope}</div>
          </div>
          <div>
            <div className="text-[0.65rem] uppercase tracking-widest text-navy-deep/50 mb-2 font-semibold">
              What it means
            </div>
            <ul className="space-y-2">
              {item.details.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-navy-deep/85 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
