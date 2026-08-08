import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Award,
  Building2,
  Pause,
  Play,
} from "lucide-react";

// Responsive picture sources (avif/webp/jpg) via vite-imagetools
const IMG_QUERY = "?w=640;1024;1600;1920&format=avif;webp;jpg&as=picture";
// @ts-ignore vite-imagetools returns a PictureData object at build time
import slideCivil from "@/assets/images/home/services/civil-infrastructure.jpg?w=640;1024;1600;1920&format=avif;webp;jpg&as=picture";
// @ts-ignore vite-imagetools returns a PictureData object at build time
import slideHighmast from "@/assets/images/home/featured/featured-highmast.webp?w=640;1024;1600;1920&format=avif;webp;png&as=picture";
// @ts-ignore vite-imagetools returns a PictureData object at build time
import slideSolar from "@/assets/images/home/featured/featured-streetsolar.webp?w=640;1024;1600;1920&format=avif;webp;png&as=picture";
// @ts-ignore vite-imagetools returns a PictureData object at build time
import slideRoad from "@/assets/images/home/services/road-construction.webp?w=640;1024;1600;1920&format=avif;webp;png&as=picture";
// @ts-ignore vite-imagetools returns a PictureData object at build time
import slideGovt from "@/assets/images/home/services/government-projects.webp?w=640;1024;1600;1920&format=avif;webp;png&as=picture";

type PictureData = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

const slides: ReadonlyArray<{
  data: PictureData;
  label: string;
  sector: string;
}> = [
  {
    data: slideHighmast as unknown as PictureData,
    label: "High Mast Public Lighting",
    sector: "Public Lighting",
  },
  {
    data: slideCivil as unknown as PictureData,
    label: "Civil Infrastructure & Development",
    sector: "Civil Works",
  },
  {
    data: slideSolar as unknown as PictureData,
    label: "Solar Street Lighting Networks",
    sector: "Renewables",
  },
  {
    data: slideRoad as unknown as PictureData,
    label: "Road & Highway Infrastructure",
    sector: "Roads",
  },
  {
    data: slideGovt as unknown as PictureData,
    label: "Government Supply & Procurement",
    sector: "GeM Supply",
  },
];

const INTERVAL = 6000;
void IMG_QUERY;

type HeroSliderProps = { onReady?: () => void };

export function HeroSlider({ onReady }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Record<number, boolean>>({});
  const [hasReportedReady, setHasReportedReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const regionRef = useRef<HTMLElement | null>(null);

  const isPaused = hovering || userPaused || prefersReducedMotion;

  const reportReady = useCallback(() => {
    setHasReportedReady((prev) => (prev ? prev : true));
  }, []);

  useEffect(() => {
    if (hasReportedReady) onReady?.();
  }, [hasReportedReady, onReady]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    const firstSrc = slides[0]?.data.img.src;
    if (!firstSrc || typeof window === "undefined") {
      reportReady();
      return;
    }
    const image = new window.Image();
    image.decoding = "async";
    image.src = firstSrc;
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
  }, [reportReady]);

  const nextSlide = useCallback(() => setActive((i) => (i + 1) % slides.length), []);
  const prevSlide = useCallback(
    () => setActive((i) => (i - 1 + slides.length) % slides.length),
    [],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(slides.length - 1);
    } else if (e.key === " " || e.key === "Spacebar") {
      // Space toggles play/pause
      e.preventDefault();
      setUserPaused((p) => !p);
    }
  };

  return (
    <section
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Praharsh Infrastructure highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-inset"
    >
      {/* Slides Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => {
          const isActive = i === active;
          const { sources, img } = s.data;
          return (
            <div
              key={img.src}
              id={`hero-slide-${i}`}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
              aria-hidden={!isActive}
            >
              <picture>
                {Object.entries(sources).map(([fmt, srcSet]) => (
                  <source key={fmt} type={`image/${fmt}`} srcSet={srcSet} sizes="100vw" />
                ))}
                <img
                  src={img.src}
                  width={img.w}
                  height={img.h}
                  alt=""
                  draggable={false}
                  className={`w-full h-full object-cover ${
                    prefersReducedMotion
                      ? ""
                      : `transition-transform duration-[9000ms] ease-out ${
                          isActive ? "scale-110" : "scale-100"
                        }`
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding={i === 0 ? "sync" : "async"}
                  onLoad={i === 0 ? reportReady : undefined}
                  onError={i === 0 ? reportReady : undefined}
                />
              </picture>
            </div>
          );
        })}
        <div className="absolute inset-0 z-10 bg-navy-deep/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/60 to-transparent lg:via-navy-deep/40" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* SR-only live announcer */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {active + 1} of {slides.length}: {slides[active]?.label}
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pt-28 sm:pt-32 md:pt-36 pb-40 sm:pb-44 flex flex-col justify-center flex-1">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="eyebrow flex items-center text-gold mb-5 md:mb-7 reveal text-[0.68rem] sm:text-[0.75rem] tracking-[0.22em] sm:tracking-[0.28em]">
              <span className="w-8 sm:w-12 h-[2px] bg-gold mr-4 sm:mr-5" />
              Praharsh Infrastructure · Est. 2010
            </div>

            <h1 className="font-display text-white text-[clamp(2.1rem,4.6vw+0.6rem,5.5rem)] leading-[1.05] tracking-tight reveal reveal-delay-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] text-balance max-w-[16ch] sm:max-w-[18ch]">
              Building today, <span className="text-gold font-serif italic pr-2">empowering</span>{" "}
              tomorrow.
            </h1>

            <p className="mt-5 sm:mt-7 md:mt-8 max-w-[38ch] sm:max-w-[52ch] text-white/85 text-[0.98rem] sm:text-lg md:text-xl leading-relaxed reveal reveal-delay-2 font-light text-pretty">
              Infrastructure, road, solar, electrical, advertising and government supply services
              delivered across India — engineered with discipline, governed by transparency.
            </p>

            <div className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 reveal reveal-delay-3">
              <Link
                to="/projects"
                className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gold text-navy px-7 sm:px-8 h-12 sm:h-[52px] min-w-[11rem] text-sm sm:text-[15px] font-semibold tracking-wide hover:bg-white hover:text-navy-deep active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(212,160,23,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(255,255,255,0.4)] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
              >
                Explore Our Work
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link
                to="/contact"
                className="group w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-white/5 backdrop-blur-md border border-white/25 text-white px-7 sm:px-8 h-12 sm:h-[52px] min-w-[11rem] text-sm sm:text-[15px] font-medium tracking-wide hover:bg-white hover:text-navy hover:border-white active:scale-[0.98] transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
              >
                Request Proposal
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 reveal reveal-delay-4">
              {[
                { icon: ShieldCheck, label: "ISO 9001 Certified" },
                { icon: Award, label: "GeM Registered" },
                { icon: Building2, label: "PWD & UPPCL Empanelled" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-white/75 text-[0.72rem] sm:text-xs tracking-wide"
                >
                  <Icon
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  <span className="uppercase tracking-[0.15em] font-medium whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 justify-end reveal reveal-delay-3">
            <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-xl border border-white/15 p-7 xl:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] rounded-sm">
              <div className="eyebrow text-gold text-[0.65rem] tracking-[0.28em] mb-4">
                Now Showcasing
              </div>
              <div
                className="font-display text-white text-2xl xl:text-3xl leading-tight mb-3 min-h-[3.5rem] transition-opacity duration-500"
                key={active}
              >
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
                    <div className="font-display text-gold text-2xl xl:text-3xl leading-none">
                      {s.k}
                    </div>
                    <div className="text-white/60 text-[0.65rem] uppercase tracking-[0.15em] mt-1.5">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav & Controls */}
      <div className="absolute bottom-0 inset-x-0 z-20 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 pb-6 sm:pb-10 reveal reveal-delay-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div
            className="flex gap-2 sm:gap-3 items-center"
            role="tablist"
            aria-label="Select slide"
          >
            {slides.map((s, i) => (
              <button
                key={s.data.img.src}
                type="button"
                role="tab"
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}: ${s.label}`}
                aria-selected={i === active}
                aria-controls={`hero-slide-${i}`}
                className="group relative h-4 flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
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

        <div className="flex gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={userPaused}
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gold hover:text-navy hover:border-gold active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            {userPaused ? (
              <Play className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Pause className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gold hover:text-navy hover:border-gold active:scale-95 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            <ChevronLeft
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gold hover:text-navy hover:border-gold active:scale-95 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
          >
            <ChevronRight
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Auto-advance progress bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-[2px] bg-white/5" aria-hidden="true">
        <div
          key={active + (isPaused ? "-p" : "")}
          className="h-full bg-gold origin-left"
          style={{ animation: isPaused ? "none" : `heroProgress ${INTERVAL}ms linear forwards` }}
        />
      </div>
      <style>{`@keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
}
