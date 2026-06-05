import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Government departments, PSUs and private clients served by Praharsh Infrastructure across India.",
      },
      { property: "og:title", content: "Our Clients" },
      { property: "og:description", content: "Trusted by the public and private sector." },
    ],
  }),
  component: Clients,
});

const clientLogos = [
  { src: "/images/clients/client1.png", name: "Uttar Pradesh Government", url: "#" },
  {
    src: "/images/clients/client5.png",
    name: "UP Global Investors Summit (2023 Lucknow)",
    url: "#",
  },
  { src: "/images/clients/client3.jfif", name: "ODOP (One District One Product)", url: "#" },
  { src: "/images/clients/client3.jfif", name: "UPRNN", url: "#" },
  { src: "/images/clients/client4.jpg", name: "UP Tourism", url: "#" },
  { src: "/images/clients/client7.jfif", name: "Basic Shiksha Parishad", url: "#" },
  {
    src: "/images/clients/client8.jfif",
    name: "Information and Public Relations Department UP",
    url: "#",
  },
  { src: "/images/clients/client2.png", name: "Panchayati Raj Directorate", url: "#" },
];

const clientGroups = [
  {
    label: "Government & Public Sector Network",
    list: [
      "UPSIC — UP Small Industries Corporation Ltd.",
      "DRDA — District Rural Development Agency",
      "UPRNN — UP Rajkiya Nirman Nigam Ltd.",
      "PWD — Public Works Department",
      "Nagar Palika / Nagar Panchayat",
      "UP Tourism",
      "UP 100",
      "ODOP — One District One Product",
      "UP Global Investors Summit (2023 Lucknow)",
      "Panchayati Raj Directorate",
      "Basic Shiksha Parishad",
      "Information & Public Relations Department, UP",
      "DIPR — Department of Information and Public Relations",
      "UPID — Uttar Pradesh Information Department",
      "Uttar Pradesh Government",
    ],
  },
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
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Our Clients
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Trusted by India's
            <br />
            <span className="italic text-gold">public & private sector.</span>
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-px bg-border -mt-8">
          {clientGroups.map((g) => (
            <div key={g.label} className="bg-background p-10">
              <div className="eyebrow text-gold mb-6">{g.label}</div>
              <ul className="space-y-4">
                {g.list.map((c) => (
                  <li
                    key={c}
                    className="text-navy text-lg font-display border-b border-border pb-3 last:border-0"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-navy py-20 border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold text-center mb-12">Recognised By</div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {clientLogos.map((client, idx) => (
              <a
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="bg-white p-6 flex items-center justify-center h-28 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-1.2rem)] group rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={client.src}
                  alt={`${client.name} Logo`}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section
        muted
        eyebrow="Testimonials"
        title="What our clients say."
        intro="Swipe through a few recent notes from project stakeholders across the public and private sector."
      >
        <div className="lg:hidden -mt-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 basis-[88%] sm:basis-[70%] md:basis-[56%]">
                  <div className="bg-background p-8 sm:p-10 border-t-2 border-gold shadow-card card-hover h-full">
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
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background p-10 border-t-2 border-gold shadow-card card-hover"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-6">
                <Quote className="h-6 w-6" />
              </div>
              <p className="text-navy leading-relaxed">{t.q}</p>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-display text-navy text-lg">{t.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 flex flex-col lg:flex-row gap-10 items-center justify-between">
          <h2 className="text-white text-3xl lg:text-5xl max-w-2xl leading-tight">
            Join our roster of <span className="italic text-gold">repeat clients.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-sm font-medium hover:bg-white transition-colors"
          >
            Start a Conversation <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
