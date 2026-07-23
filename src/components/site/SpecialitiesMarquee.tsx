import { useEffect, useState } from "react";
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
  Pause,
  Play,
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
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Our specialities and capabilities"
      className="relative w-full bg-navy-deep border-y border-white/10 overflow-hidden group/marquee"
    >
      {/* screen-reader accessible static list */}
      <ul className="sr-only">
        {ITEMS.map((it) => (
          <li key={it.label}>{it.label}</li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy-deep to-transparent z-10" />

      {/* Pause / play toggle */}
      <button
        type="button"
        onClick={() => setUserPaused((p) => !p)}
        aria-label={paused ? "Play specialities marquee" : "Pause specialities marquee"}
        aria-pressed={userPaused}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-white/20 bg-navy-deep/70 backdrop-blur text-white/70 hover:text-gold hover:border-gold opacity-0 group-hover/marquee:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-opacity duration-300"
      >
        {paused ? <Play className="w-3.5 h-3.5" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
      </button>

      <div className="flex overflow-hidden py-4 sm:py-5" aria-hidden="true">
        <div
          className="flex shrink-0 gap-8 sm:gap-12 pr-8 sm:pr-12 whitespace-nowrap animate-marquee pause-on-hover motion-reduce:animate-none"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {loop.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors"
              >
                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gold shrink-0" aria-hidden="true" />
                <span className="text-[0.72rem] sm:text-xs uppercase tracking-[0.22em] font-medium">
                  {it.label}
                </span>
                <span className="text-gold/50 ml-4 sm:ml-6">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
