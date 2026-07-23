import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  HardHat,
  Route as RouteIcon,
  Sun,
  Zap,
  Landmark,
  Megaphone,
  MonitorPlay,
  Signpost,
  Lightbulb,
  Building2,
  ShieldCheck,
  Leaf,
  Award,
  Users,
  MapPin,
  Trophy,
  BadgeCheck,
  FileCheck2,
  Factory,
  Handshake,
  Phone,
  Mail,
  Clock,
  Sparkles,
  TrendingUp,
  Target,
  Briefcase,
  Pause,
  Play,
} from "lucide-react";

export type MarqueeItem = { icon: LucideIcon; label: string };

export type MarqueeVariant = "navy" | "gold" | "ivory" | "outline";

const VARIANT_STYLES: Record<
  MarqueeVariant,
  {
    section: string;
    fadeFrom: string;
    fadeTo: string;
    item: string;
    icon: string;
    label: string;
    dot: string;
    btn: string;
  }
> = {
  navy: {
    section: "bg-navy-deep border-y border-white/10",
    fadeFrom: "from-navy-deep",
    fadeTo: "to-navy-deep",
    item: "text-white/80 hover:text-gold",
    icon: "text-gold",
    label: "uppercase tracking-[0.22em] font-medium",
    dot: "text-gold/50",
    btn: "border-white/20 bg-navy-deep/70 text-white/70 hover:text-gold hover:border-gold",
  },
  gold: {
    section: "bg-gradient-to-r from-gold via-gold-light to-gold border-y border-navy/10",
    fadeFrom: "from-gold",
    fadeTo: "to-gold",
    item: "text-navy-deep hover:text-navy",
    icon: "text-navy-deep",
    label: "uppercase tracking-[0.22em] font-semibold",
    dot: "text-navy-deep/40",
    btn: "border-navy/20 bg-white/40 text-navy-deep hover:text-navy hover:border-navy",
  },
  ivory: {
    section: "bg-ivory border-y border-navy/10",
    fadeFrom: "from-ivory",
    fadeTo: "to-ivory",
    item: "text-navy-deep hover:text-gold",
    icon: "text-gold",
    label: "uppercase tracking-[0.22em] font-medium",
    dot: "text-gold/60",
    btn: "border-navy/20 bg-white/70 text-navy-deep hover:text-gold hover:border-gold",
  },
  outline: {
    section: "bg-white border-y border-navy/10",
    fadeFrom: "from-white",
    fadeTo: "to-white",
    item: "text-navy-deep/70 hover:text-navy",
    icon: "text-navy",
    label: "uppercase tracking-[0.22em] font-medium",
    dot: "text-navy/30",
    btn: "border-navy/20 bg-white/80 text-navy-deep hover:text-navy hover:border-navy",
  },
};

const DEFAULT_ITEMS: MarqueeItem[] = [
  { icon: HardHat, label: "Civil Infrastructure" },
  { icon: RouteIcon, label: "Road & Highway Construction" },
  { icon: Sun, label: "Solar Street Lighting" },
  { icon: Lightbulb, label: "High Mast Lighting" },
  { icon: Zap, label: "Electrical Solutions" },
  { icon: Landmark, label: "Government Supply (GeM)" },
  { icon: Megaphone, label: "Outdoor Advertising" },
  { icon: MonitorPlay, label: "Digital Media" },
  { icon: Signpost, label: "Signage & Branding" },
  { icon: Building2, label: "PWD & UPPCL Empanelled" },
  { icon: ShieldCheck, label: "ISO 9001 Certified" },
  { icon: Leaf, label: "Renewable Energy" },
];

type Props = {
  items?: MarqueeItem[];
  variant?: MarqueeVariant;
  direction?: "left" | "right";
  ariaLabel?: string;
  separator?: string;
  speed?: "slow" | "normal" | "fast";
};

export function SpecialitiesMarquee({
  items = DEFAULT_ITEMS,
  variant = "navy",
  direction = "left",
  ariaLabel = "Our specialities and capabilities",
  separator = "✦",
  speed = "normal",
}: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const paused = reducedMotion || userPaused;
  const loop = [...items, ...items];
  const s = VARIANT_STYLES[variant];
  const durationSec = speed === "slow" ? 55 : speed === "fast" ? 25 : 40;

  return (
    <section
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden group/marquee ${s.section}`}
    >
      <ul className="sr-only">
        {items.map((it) => (
          <li key={it.label}>{it.label}</li>
        ))}
      </ul>

      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r ${s.fadeFrom} to-transparent z-10`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l ${s.fadeTo} to-transparent z-10`}
      />

      <button
        type="button"
        onClick={() => setUserPaused((p) => !p)}
        aria-label={paused ? "Play marquee" : "Pause marquee"}
        aria-pressed={userPaused}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full border backdrop-blur opacity-0 group-hover/marquee:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-opacity duration-300 ${s.btn}`}
      >
        {paused ? (
          <Play className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <Pause className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </button>

      <div className="flex overflow-hidden py-4 sm:py-5" aria-hidden="true">
        <div
          className="flex shrink-0 gap-8 sm:gap-12 pr-8 sm:pr-12 whitespace-nowrap animate-marquee pause-on-hover motion-reduce:animate-none"
          style={{
            animationDuration: `${durationSec}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            ...(paused ? { animationPlayState: "paused" } : {}),
          }}
        >
          {loop.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={`${it.label}-${i}`}
                className={`flex items-center gap-3 transition-colors ${s.item}`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 ${s.icon}`}
                  aria-hidden="true"
                />
                <span className={`text-[0.72rem] sm:text-xs ${s.label}`}>{it.label}</span>
                <span className={`ml-4 sm:ml-6 ${s.dot}`}>{separator}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------- Preset marquees per page --------

export const ABOUT_ITEMS: MarqueeItem[] = [
  { icon: Trophy, label: "10+ Years of Excellence" },
  { icon: Users, label: "Multi-Disciplinary Team" },
  { icon: MapPin, label: "Pan-India Presence" },
  { icon: Handshake, label: "Trusted by Government Bodies" },
  { icon: Target, label: "On-Time Delivery Focus" },
  { icon: Sparkles, label: "Quality-First Approach" },
  { icon: TrendingUp, label: "Consistent Growth" },
  { icon: Briefcase, label: "Turnkey Project Execution" },
];

export const SERVICES_ITEMS: MarqueeItem[] = [
  { icon: HardHat, label: "Civil & Structural" },
  { icon: RouteIcon, label: "Roads & Highways" },
  { icon: Sun, label: "Solar Power Systems" },
  { icon: Lightbulb, label: "High Mast & Street Lighting" },
  { icon: Zap, label: "Electrical Contracting" },
  { icon: Megaphone, label: "Outdoor Advertising" },
  { icon: MonitorPlay, label: "Digital Signage" },
  { icon: Signpost, label: "Wayfinding & Branding" },
  { icon: Factory, label: "Industrial Supply" },
];

export const PROJECTS_ITEMS: MarqueeItem[] = [
  { icon: Sun, label: "Solar Street Light Projects" },
  { icon: Lightbulb, label: "High Mast Installations" },
  { icon: RouteIcon, label: "Road Construction Works" },
  { icon: Building2, label: "Government Infrastructure" },
  { icon: Megaphone, label: "Outdoor Media Campaigns" },
  { icon: MonitorPlay, label: "Digital LED Screens" },
  { icon: Signpost, label: "Signage Installations" },
  { icon: Zap, label: "Electrical Turnkey Projects" },
];

export const CERTIFICATIONS_ITEMS: MarqueeItem[] = [
  { icon: ShieldCheck, label: "ISO 9001:2015 Certified" },
  { icon: BadgeCheck, label: "GeM Registered Vendor" },
  { icon: FileCheck2, label: "PWD Empanelled" },
  { icon: FileCheck2, label: "UPPCL Approved" },
  { icon: Award, label: "MSME Registered" },
  { icon: ShieldCheck, label: "EPF & ESIC Compliant" },
  { icon: BadgeCheck, label: "GST Compliant" },
  { icon: Award, label: "Quality Assured" },
];

export const GOVERNMENT_ITEMS: MarqueeItem[] = [
  { icon: Landmark, label: "GeM Portal Vendor" },
  { icon: Building2, label: "PWD Approved Contractor" },
  { icon: Zap, label: "UPPCL Empanelled" },
  { icon: FileCheck2, label: "Tender-Ready Documentation" },
  { icon: ShieldCheck, label: "Compliance & Audit Ready" },
  { icon: Handshake, label: "Public-Sector Experience" },
  { icon: BadgeCheck, label: "DRDA / UPSIC Projects" },
  { icon: Award, label: "Government Supply Specialist" },
];

export const CLIENTS_ITEMS: MarqueeItem[] = [
  { icon: Landmark, label: "UPSIC" },
  { icon: Building2, label: "DRDA" },
  { icon: Zap, label: "UPPCL" },
  { icon: HardHat, label: "PWD Uttar Pradesh" },
  { icon: Handshake, label: "GeM Portal" },
  { icon: Factory, label: "MSME Sector Clients" },
  { icon: Briefcase, label: "Private Enterprises" },
  { icon: Users, label: "Municipal Corporations" },
];

export const CONTACT_ITEMS: MarqueeItem[] = [
  { icon: Phone, label: "+91 78000 09165" },
  { icon: Mail, label: "info@praharshinfrastructure.com" },
  { icon: MapPin, label: "Assotech Business Cresterra, Sector 135, Noida" },
  { icon: Clock, label: "Mon – Sat · 10:00 AM – 7:00 PM IST" },
  { icon: Handshake, label: "Request a Quote in 30 Seconds" },
  { icon: BadgeCheck, label: "Response Within 24 Hours" },
];
