import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import slideCivil from "@/assets/images/home/featured/featured-road.png";
import slideHighmast from "@/assets/images/home/featured/featured-highmast.png";
import slideSolar from "@/assets/images/home/featured/featured-solar.png";
import slideStreetSolar from "@/assets/images/home/featured/featured-streetsolar.png";
import slideAdvertising from "@/assets/images/home/services/outdoor-advertising.png";
import slideGovernment from "@/assets/images/home/services/government-projects.png";

const slides = [
  { src: slideCivil, label: "Heavy Civil & Road Infrastructure" },
  { src: slideHighmast, label: "High Mast Public Lighting" },
  { src: slideSolar, label: "Solar Energy Projects" },
  { src: slideStreetSolar, label: "Solar Street Lighting Networks" },
  { src: slideAdvertising, label: "Outdoor Advertising Solutions" },
  { src: slideGovernment, label: "Government Supply & Procurement" },
] as const;

const INTERVAL = 5500;

type HeroSliderProps = {
  onReady?: () => void;
};

export function HeroSlider({ onReady }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [hasReportedReady, setHasReportedReady] = useState(false);

  const reportReady = () => {
    if (hasReportedReady) return;
    setHasReportedReady(true);
    onReady?.();
  };

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

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

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-navy-deep">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out will-change-[opacity,transform]"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <img
              src={s.src}
              alt={s.label}
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                i === active ? "scale-110" : "scale-100"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              onLoad={i === 0 ? reportReady : undefined}
              onError={i === 0 ? reportReady : undefined}
            />
          </div>
        ))}
        {/* Premium contrast gradient stack for perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/20" />
        <div className="absolute inset-0 bg-navy-deep/30" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pb-20 pt-32 sm:pb-24 sm:pt-36 md:pb-28 md:pt-40 w-full">
        <div className="max-w-3xl">
          <div className="eyebrow text-gold mb-4 md:mb-6 reveal text-[0.65rem] sm:text-[0.72rem]">
            <span className="gold-rule mr-3 align-middle" /> Praharsh Infrastructure · Est. 2010
          </div>
          <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] md:leading-[0.98] tracking-tight reveal reveal-delay-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">
            Building today,
            <br className="hidden sm:block" /> <span className="text-gold italic">empowering</span>{" "}
            tomorrow.
          </h1>
          <p className="mt-5 sm:mt-6 md:mt-8 max-w-xl text-white/90 text-[0.95rem] sm:text-base md:text-lg leading-relaxed reveal reveal-delay-2">
            Infrastructure, road, solar, electrical, advertising and government supply services
            delivered across India — engineered with discipline, governed by transparency.
          </p>
          <div className="mt-7 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 reveal reveal-delay-3">
            <Link
              to="/projects"
              className="group w-full sm:w-auto justify-center inline-flex items-center gap-3 bg-gold text-navy px-7 py-4 text-sm font-medium tracking-wide hover:bg-white transition-colors"
            >
              Explore Our Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-3 border border-white/40 text-white px-7 py-4 text-sm font-medium hover:border-gold hover:text-gold hover:bg-white/5 backdrop-blur-sm transition-colors"
            >
              Request Proposal
            </Link>
          </div>

          {/* Slide indicators + label */}
          <div className="mt-12 sm:mt-14 md:mt-20 flex items-center gap-5 sm:gap-6 reveal reveal-delay-4">
            <div className="flex gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.label}`}
                  className={`h-[3px] transition-all duration-500 ${
                    i === active
                      ? "w-10 sm:w-12 bg-gold"
                      : "w-5 sm:w-6 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <div className="eyebrow text-white/70 text-[0.6rem] sm:text-[0.65rem] truncate">
              {slides[active]?.label ?? slides[0]?.label ?? "Infrastructure delivery"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
