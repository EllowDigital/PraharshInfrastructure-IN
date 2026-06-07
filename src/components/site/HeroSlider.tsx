import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import slideCivil from "@/assets/images/home/services/civil-infrastructure.jpg";
import slideHighmast from "@/assets/images/home/featured/featured-highmast.png";
import slideSolar from "@/assets/images/home/featured/featured-streetsolar.png";
import slideRoad from "@/assets/images/home/services/road-construction.png";
import slideGovt from "@/assets/images/home/services/government-projects.png";

const slides = [
  { src: slideHighmast, label: "High Mast Public Lighting" },
  { src: slideCivil, label: "Civil Infrastructure & Development" },
  { src: slideSolar, label: "Solar Street Lighting Networks" },
  { src: slideRoad, label: "Road & Highway Infrastructure" },
  { src: slideGovt, label: "Government Supply & Procurement" },
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
      className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-navy-deep"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{
              opacity: i === active ? 1 : 0,
              zIndex: i === active ? 1 : 0,
            }}
            aria-hidden={i !== active}
          >
            <img
              src={s.src}
              alt={s.label}
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                i === active ? "scale-105" : "scale-100"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              onLoad={i === 0 ? reportReady : undefined}
              onError={i === 0 ? reportReady : undefined}
            />
          </div>
        ))}
        {/* Premium multi-layered gradient for optimal text legibility */}
        <div className="absolute inset-0 z-10 bg-navy-deep/60" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-deep/90 via-navy-deep/70 to-transparent sm:via-navy-deep/50 md:w-3/4" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 py-24 sm:py-32 md:py-40 flex flex-col justify-center flex-1">
        <div className="max-w-3xl lg:max-w-4xl pt-10 sm:pt-0">
          <div className="eyebrow flex items-center text-gold mb-5 md:mb-7 reveal text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] tracking-[0.2em] sm:tracking-[0.25em]">
            <span className="w-8 sm:w-12 h-[2px] bg-gold mr-4 sm:mr-5" />
            Praharsh Infrastructure · Est. 2010
          </div>

          <h1 className="font-display text-white text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.1] md:leading-[1.05] tracking-tight reveal reveal-delay-1 drop-shadow-2xl">
            Building today,
            <br />
            <span className="text-gold font-serif italic pr-2">empowering</span> tomorrow.
          </h1>

          <p className="mt-6 md:mt-8 max-w-xl text-white/90 text-base sm:text-lg md:text-xl leading-relaxed reveal reveal-delay-2 font-light drop-shadow-md">
            Infrastructure, road, solar, electrical, advertising and government supply services
            delivered across India — engineered with discipline, governed by transparency.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5 reveal reveal-delay-3">
            <Link
              to="/projects"
              className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gold text-navy px-8 py-4 sm:py-4.5 text-sm sm:text-[15px] font-semibold tracking-wide hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm"
            >
              Explore Our Work
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              to="/contact"
              className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-white/5 backdrop-blur-md border border-white/30 text-white px-8 py-4 sm:py-4.5 text-sm sm:text-[15px] font-medium tracking-wide hover:bg-white/15 hover:border-white transition-all duration-300 rounded-sm"
            >
              Request Proposal
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pb-8 sm:pb-12 reveal reveal-delay-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-auto">
        {/* Slide Indicators */}
        <div className="flex flex-col gap-3">
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
                      ? "w-12 sm:w-16 bg-gold"
                      : "w-6 sm:w-8 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="eyebrow text-white/80 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-medium">
            <span className="text-gold mr-2">{String(active + 1).padStart(2, "0")}</span>/{" "}
            {String(slides.length).padStart(2, "0")} — {slides[active]?.label}
          </div>
        </div>

        {/* Next/Prev Arrows */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
