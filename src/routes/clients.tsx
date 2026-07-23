import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, CLIENTS_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Link } from "react-router-dom";
import { Section } from "@/components/site/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Quote,
  ArrowUpRight,
  Building2,
  Landmark,
  Handshake,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";

import client1 from "@/assets/images/clients/client1.png";
import client2 from "@/assets/images/clients/client2.png";
import client3 from "@/assets/images/clients/client3.jfif";
import client4 from "@/assets/images/clients/client4.jpg";
import client5 from "@/assets/images/clients/client5.png";
import client6 from "@/assets/images/clients/client6.webp";
import client7 from "@/assets/images/clients/client7.jfif";
import client8 from "@/assets/images/clients/client8.jfif";
import client9 from "@/assets/images/clients/client9.jfif";

const clientLogos = [
  { id: 1, src: client1, name: "Panchayati Raj Directorate", url: "#" },
  { id: 2, src: client2, name: "ODOP (One District One Product)", url: "#" },
  { id: 3, src: client3, name: "UP Global Investors Summit (2023 Lucknow)", url: "#" },
  { id: 4, src: client4, name: "Uttar Pradesh Rajkya", url: "#" },
  { id: 5, src: client5, name: "UP Tourism", url: "#" },
  { id: 6, src: client6, name: "UP Tourism (Variant)", url: "#" },
  { id: 7, src: client7, name: "UP 100", url: "#" },
  { id: 8, src: client8, name: "Information and Public Relations Department UP", url: "#" },
  { id: 9, src: client9, name: "DIPR (Department of Information and Public Relations)", url: "#" },
];

const clientBuckets = [
  {
    icon: Landmark,
    label: "State Corporations & Nigams",
    list: [
      "UPSIC — UP Small Industries Corporation Ltd.",
      "UPRNN — UP Rajkiya Nirman Nigam Ltd.",
      "PWD — Public Works Department",
      "DRDA — District Rural Development Agency",
    ],
  },
  {
    icon: Building2,
    label: "Urban & Local Bodies",
    list: [
      "Nagar Palika / Nagar Panchayat",
      "Municipal Corporations",
      "Basic Shiksha Parishad",
      "Panchayati Raj Directorate",
    ],
  },
  {
    icon: Sparkles,
    label: "Tourism, Media & Publicity",
    list: [
      "UP Tourism",
      "Information & Public Relations Department, UP",
      "DIPR — Department of Information and Public Relations",
      "UPID — Uttar Pradesh Information Department",
    ],
  },
  {
    icon: Trophy,
    label: "Flagship Campaigns & Summits",
    list: [
      "ODOP — One District One Product",
      "UP Global Investors Summit (2023 Lucknow)",
      "UP 100",
      "Uttar Pradesh Government",
    ],
  },
];

const clientStats = [
  { k: "50+", v: "Government engagements" },
  { k: "15+", v: "State departments" },
  { k: "10+", v: "Years of trust" },
  { k: "100%", v: "Compliance record" },
];

const testimonials = [
  {
    q: "Praharsh executed our solar street light deployment ahead of schedule and within statutory tolerances. Documentation was audit-ready on day one.",
    n: "District Magistrate Office",
    r: "State Government",
  },
  {
    q: "Their high mast installation team is among the most disciplined we've engaged. Safety records and material quality were exemplary.",
    n: "Executive Engineer",
    r: "State PWD",
  },
  {
    q: "GeM compliance and billing transparency made Praharsh a preferred vendor for repeat orders across our procurement cycles.",
    n: "Procurement Officer",
    r: "Municipal Corporation",
  },
];

function Clients() {
  return (
    <>
      <SEO title="Clients & Partners · Praharsh Infrastructure" />



      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-24 bg-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Our Clients
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl leading-[1.05] lg:leading-[1.02]">
            Trusted by India's
            <br />
            <span className="italic text-gold">public & private sector.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75 leading-relaxed">
            A decade of repeat engagements across state corporations, municipal bodies, tourism and
            publicity departments — delivered with audit-grade documentation.
          </p>

          {/* stat strip inside hero */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {clientStats.map((s) => (
              <div
                key={s.v}
                className="bg-white/[0.04] backdrop-blur border border-white/10 p-6 rounded-sm hover:border-gold transition-colors"
              >
                <div className="font-display text-3xl lg:text-4xl text-gold leading-none">{s.k}</div>
                <div className="mt-2 text-white/60 text-[0.7rem] uppercase tracking-[0.2em]">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SpecialitiesMarquee
        items={CLIENTS_ITEMS}
        variant="ivory"
        direction="left"
        ariaLabel="Clients and government partners"
      />

      {/* CLIENT NETWORK BENTO */}
      <Section eyebrow="Client Network" title="Departments and partners across India.">
        <div className="grid md:grid-cols-2 gap-4 -mt-8">
          {clientBuckets.map((g) => (
            <div
              key={g.label}
              className="group bg-background border border-border rounded-sm p-8 lg:p-10 hover:border-gold hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <g.icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors" />
                </div>
                <h3 className="font-display text-lg text-navy">{g.label}</h3>
              </div>
              <ul className="space-y-3">
                {g.list.map((c) => (
                  <li
                    key={c}
                    className="text-navy/80 text-sm py-2 border-b border-border last:border-0 flex items-start gap-3"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-gold shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* RECOGNIZED BY LOGO GRID */}
      <section className="bg-navy py-20 border-y border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="eyebrow text-gold mb-3">Recognised By</div>
            <h2 className="text-white text-2xl lg:text-4xl font-display">
              A network of <span className="italic text-gold">government & public bodies.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {(clientLogos ?? []).map((client) => (
              <a
                key={`logo-${client.id}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="group relative bg-background/95 backdrop-blur h-28 flex items-center justify-center p-5 rounded-sm border border-white/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <img
                  src={client.src}
                  alt={`${client.name} Logo`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <span className="absolute inset-x-0 -bottom-6 opacity-0 group-hover:opacity-100 group-hover:-bottom-5 transition-all text-center text-[0.65rem] text-gold uppercase tracking-wider px-2 truncate">
                  {client.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section
        muted
        eyebrow="Testimonials"
        title="What our clients say."
        intro="Recent notes from project stakeholders across the public and private sector."
      >
        <div className="lg:hidden -mt-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {(testimonials ?? []).map((t) => (
                <CarouselItem key={t.n} className="pl-4 basis-[88%] sm:basis-[70%] md:basis-[56%]">
                  <div className="bg-background p-8 sm:p-10 border-t-2 border-gold shadow-card h-full rounded-sm">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
                      <Quote className="h-6 w-6" />
                    </div>
                    <p className="text-navy leading-relaxed text-base sm:text-lg">{t.q}</p>
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="font-display text-navy text-lg">{t.n}</div>
                      <div className="text-sm text-muted-foreground mt-1">{t.r}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex -top-16 left-auto right-14" />
            <CarouselNext className="hidden md:inline-flex -top-16 right-0" />
          </Carousel>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-6 -mt-8">
          {(testimonials ?? []).map((t, i) => (
            <div
              key={`${t.n}-${t.r}`}
              className="group relative bg-background p-10 border-t-2 border-gold shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 rounded-sm"
            >
              <span className="absolute top-6 right-6 font-display text-6xl text-gold/15 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
                <Quote className="h-6 w-6" />
              </div>
              <p className="text-navy leading-relaxed">{t.q}</p>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display text-navy">{t.n}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">
                    {t.r}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Handshake className="w-10 h-10 text-gold mb-6" strokeWidth={1.4} />
            <h2 className="text-white text-3xl lg:text-5xl leading-tight">
              Join our roster of <span className="italic text-gold">repeat clients.</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-xl">
              From single-site deployments to statewide rollouts, we scale to match your scope.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-semibold hover:bg-white transition-colors uppercase tracking-wider"
            >
              Start a Conversation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Clients;
