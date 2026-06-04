import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import slideCivil from "@/assets/hero-slide-civil.jpg";
import slideHighmast from "@/assets/hero-slide-highmast.jpg";
import slideSolar from "@/assets/hero-slide-solar.jpg";
import slideRoads from "@/assets/hero-slide-roads.jpg";
import slideUnipole from "@/assets/hero-slide-unipole.jpg";

const slides = [
  { src: slideCivil, label: "Heavy Civil Infrastructure" },
  { src: slideHighmast, label: "High Mast Public Lighting" },
  { src: slideSolar, label: "Solar Energy Fields" },
  { src: slideRoads, label: "Urban Road Networks" },
  { src: slideUnipole, label: "Outdoor Advertising Unipoles" },
];

const INTERVAL = 5500;

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

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
            />
          </div>
        ))}
        {/* Contrast shields */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-navy-deep/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pb-24 pt-32 md:pb-28 md:pt-40 w-full">
        <div className="max-w-3xl">
          <div className="eyebrow text-gold mb-4 md:mb-6 reveal">
            <span className="gold-rule mr-3 align-middle" /> Praharsh Infrastructure · Est. 2010
          </div>
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] md:leading-[0.95] tracking-tight reveal reveal-delay-1 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            Building today,
            <br className="hidden sm:block" />{" "}
            <span className="text-gold italic font-display">empowering</span> tomorrow.
          </h1>
          <p className="mt-6 md:mt-8 max-w-xl text-white/90 text-base md:text-lg leading-relaxed reveal reveal-delay-2">
            Infrastructure, road, solar, electrical, advertising and government supply services
            delivered across India — engineered with discipline, governed by transparency.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 reveal reveal-delay-3">
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
          <div className="mt-14 md:mt-20 flex items-center gap-6 reveal reveal-delay-4">
            <div className="flex gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.label}`}
                  className={`h-[3px] transition-all duration-500 ${
                    i === active ? "w-12 bg-gold" : "w-6 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <div className="eyebrow text-white/70 text-[0.65rem]">{slides[active].label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
