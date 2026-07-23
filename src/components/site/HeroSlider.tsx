import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, ChevronLeft, ShieldCheck, Award, Building2 } from "lucide-react";
import slideCivil from "@/assets/images/home/services/civil-infrastructure.jpg";
import slideHighmast from "@/assets/images/home/featured/featured-highmast.png";
import slideSolar from "@/assets/images/home/featured/featured-streetsolar.png";
import slideRoad from "@/assets/images/home/services/road-construction.png";
import slideGovt from "@/assets/images/home/services/government-projects.png";

const slides = [
  { src: slideHighmast, label: "High Mast Public Lighting", sector: "Public Lighting" },
  { src: slideCivil, label: "Civil Infrastructure & Development", sector: "Civil Works" },
  { src: slideSolar, label: "Solar Street Lighting Networks", sector: "Renewables" },
  { src: slideRoad, label: "Road & Highway Infrastructure", sector: "Roads" },
  { src: slideGovt, label: "Government Supply & Procurement", sector: "GeM Supply" },
] as const;

const INTERVAL = 6000;

type HeroSliderProps = {
  onReady?: () => void;
};

export function HeroSlider({ onReady }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [hasReportedReady, setHasReportedReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const reportReady = () => {
    if (hasReportedReady) return;
    setHasReportedReady(true);
    onReady?.();
  };

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [isHovered]);

  useEffect(() => {
    const firstSlide = slides[0]?.src;
    if (!firstSlide || typeof window === "undefined") {
      reportReady();
      return;
    }
    const image = new window.Image();
    image.src = firstSlide;
    if (image.complete) {
      reportReady();
      return;
    }
    image.onload = reportReady;
    image.onerror = reportReady;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [hasReportedReady, onReady]);

  const nextSlide = () => setActive((i) => (i + 1) % slides.length);
  const prevSlide = () => setActive((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-navy-deep"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <img
              src={s.src}
              alt={s.label}
              className={`w-full h-full object-cover transition-transform duration-[9000ms] ease-out ${
                i === active ? "scale-110" : "scale-100"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              onLoad={i === 0 ? reportReady : undefined}
              onError={i === 0 ? reportReady : undefined}
            />
          </div>
        ))}
        {/* Refined multi-layer gradient — lets imagery breathe while keeping text crisp */}
        <div className="absolute inset-0 z-10 bg-navy-deep/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/60 to-transparent lg:via-navy-deep/40" />
        {/* subtle grain / vignette */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-36 pb-40 sm:pb-44 flex flex-col justify-center flex-1">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: Headline */}
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="eyebrow flex items-center text-gold mb-5 md:mb-7 reveal text-[0.68rem] sm:text-[0.75rem] tracking-[0.22em] sm:tracking-[0.28em]">
              <span className="w-8 sm:w-12 h-[2px] bg-gold mr-4 sm:mr-5" />
              Praharsh Infrastructure · Est. 2010
            </div>

            <h1 className="font-display text-white text-[clamp(2.25rem,5.5vw+0.75rem,5.25rem)] leading-[1.05] tracking-tight reveal reveal-delay-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]">
              Building today,
              <br />
              <span className="text-gold font-serif italic pr-2">empowering</span> tomorrow.
            </h1>

            <p className="mt-5 sm:mt-7 md:mt-8 max-w-xl text-white/85 text-[0.95rem] sm:text-lg md:text-xl leading-relaxed reveal reveal-delay-2 font-light">
              Infrastructure, road, solar, electrical, advertising and government supply services
              delivered across India — engineered with discipline, governed by transparency.
            </p>

            <div className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 reveal reveal-delay-3">
              <Link
                to="/projects"
                className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gold text-navy px-7 sm:px-8 py-4 text-sm sm:text-[15px] font-semibold tracking-wide hover:bg-white transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(212,160,23,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(255,255,255,0.4)] rounded-sm"
              >
                Explore Our Work
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                to="/contact"
                className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-white/5 backdrop-blur-md border border-white/25 text-white px-7 sm:px-8 py-4 text-sm sm:text-[15px] font-medium tracking-wide hover:bg-white/15 hover:border-white transition-all duration-300 rounded-sm"
              >
                Request Proposal
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 reveal reveal-delay-4">
              {[
                { icon: ShieldCheck, label: "ISO 9001 Certified" },
                { icon: Award, label: "GeM Registered" },
                { icon: Building2, label: "PWD & UPPCL Empanelled" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/75 text-[0.72rem] sm:text-xs tracking-wide">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                  <span className="uppercase tracking-[0.15em] font-medium whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sector meta card — desktop only */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 justify-end reveal reveal-delay-3">
            <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-xl border border-white/15 p-7 xl:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] rounded-sm">
              <div className="eyebrow text-gold text-[0.65rem] tracking-[0.28em] mb-4">Now Showcasing</div>
              <div className="font-display text-white text-2xl xl:text-3xl leading-tight mb-3 min-h-[3.5rem] transition-opacity duration-500" key={active}>
                {slides[active]?.label}
              </div>
              <div className="text-white/60 text-xs tracking-[0.2em] uppercase mb-6">
                Sector · {slides[active]?.sector}
              </div>
              <div className="h-px bg-white/10 my-6" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { k: "500+", v: "Projects" },
                  { k: "15+", v: "Years" },
                  { k: "25+", v: "States" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-gold text-2xl xl:text-3xl leading-none">{s.k}</div>
                    <div className="text-white/60 text-[0.65rem] uppercase tracking-[0.15em] mt-1.5">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="absolute bottom-0 inset-x-0 z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pb-6 sm:pb-10 reveal reveal-delay-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div className="flex gap-2 sm:gap-3 items-center">
            {slides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative h-4 flex items-center cursor-pointer"
              >
                <div
                  className={`h-[2px] transition-all duration-500 rounded-full ${
                    i === active
                      ? "w-10 sm:w-16 bg-gold"
                      : "w-5 sm:w-8 bg-white/25 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="eyebrow text-white/80 text-[0.6rem] sm:text-[0.7rem] uppercase tracking-widest font-medium truncate max-w-[85vw] sm:max-w-none">
            <span className="text-gold mr-2">{String(active + 1).padStart(2, "0")}</span>/{" "}
            {String(slides.length).padStart(2, "0")} — {slides[active]?.label}
          </div>
        </div>

        <div className="hidden sm:flex gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Auto-advance progress bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-[2px] bg-white/5">
        <div
          key={active + (isHovered ? "-p" : "")}
          className="h-full bg-gold origin-left"
          style={{
            animation: isHovered ? "none" : `heroProgress ${INTERVAL}ms linear forwards`,
          }}
        />
      </div>
      <style>{`
        @keyframes heroProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
