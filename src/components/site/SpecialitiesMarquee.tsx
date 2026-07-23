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
} from "lucide-react";

const ITEMS = [
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
] as const;

export function SpecialitiesMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Our specialities"
      className="relative w-full bg-navy-deep border-y border-white/10 overflow-hidden"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy-deep to-transparent z-10" />

      <div className="flex overflow-hidden py-4 sm:py-5">
        <div className="flex shrink-0 animate-marquee pause-on-hover gap-8 sm:gap-12 pr-8 sm:pr-12 whitespace-nowrap">
          {loop.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors"
              >
                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gold shrink-0" />
                <span className="text-[0.72rem] sm:text-xs uppercase tracking-[0.22em] font-medium">
                  {it.label}
                </span>
                <span className="text-gold/50 ml-4 sm:ml-6" aria-hidden="true">
                  ✦
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
