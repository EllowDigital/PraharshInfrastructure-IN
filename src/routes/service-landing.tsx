import { Link, Navigate, useParams } from "react-router";
import { ArrowUpRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SERVICE_PAGES } from "@/data/service-landing";
import { INSIGHTS } from "@/data/insights";


const BASE = "https://www.praharshinfrastructure.com";

export default function ServiceLanding() {
  const { slug } = useParams();
  const page = slug ? SERVICE_PAGES[slug] : undefined;
  if (!page) return <Navigate to="/services" replace />;

  const Icon = page.icon;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.hero.h1,
      description: page.seo.description,
      provider: { "@type": "Organization", name: "Praharsh Infrastructure" },
      areaServed: "India",
      url: `${BASE}/services/${page.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const relatedArticles = INSIGHTS.filter((a) => page.relatedInsights.includes(a.slug));

  return (
    <>
      <SEO
        title={page.seo.title}
        description={page.seo.description}
        keywords={page.seo.keywords}
        url={`${BASE}/services/${page.slug}`}
        structuredData={structuredData}
      />

      {/* Hero */}
      <div className="pt-24 bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-8">
          <Breadcrumbs
            items={[
              { label: "Services", to: "/services" },
              { label: page.hero.eyebrow },
            ]}
            className="text-white/70 [&_a:hover]:text-gold [&_[aria-current='page']]:text-white"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-end">

          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-[0.65rem] tracking-widest uppercase text-gold mb-5">
              <Icon className="w-4 h-4" /> {page.hero.eyebrow}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              {page.hero.h1}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              {page.hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
              >
                {page.ctaText} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+917800009165"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" /> +91-7800009165
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {page.benefits.slice(0, 4).map((b) => (
              <div key={b.title} className="border border-white/10 p-4">
                <div className="text-gold text-[0.65rem] tracking-widest uppercase">{b.title}</div>
                <div className="text-xs text-white/70 mt-2 leading-relaxed">{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offerings */}
      <Section eyebrow="What we deliver" title={`${page.hero.eyebrow} — full scope`}>
        <div className="grid gap-6 md:grid-cols-2">
          {page.offerings.map((o) => (
            <div
              key={o.title}
              className="border border-border p-7 hover:border-gold transition-colors"
            >
              <h2 className="font-display text-xl text-navy">{o.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{o.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section muted eyebrow="How we work" title="From enquiry to handover in four steps">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {page.process.map((p) => (
            <div key={p.step} className="bg-background border border-border p-6">
              <div className="text-gold font-display text-3xl">{p.step}</div>
              <div className="mt-3 font-display text-lg text-navy">{p.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{p.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section
        eyebrow="Why Praharsh"
        title="Enterprise-grade delivery, government-grade compliance"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {page.benefits.map((b) => (
            <div key={b.title} className="border-l-2 border-gold pl-5">
              <div className="font-display text-navy text-lg">{b.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{b.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section muted eyebrow="Frequently Asked" title={`${page.hero.eyebrow} FAQs`}>
        <div className="max-w-3xl space-y-5">
          {page.faqs.map((f) => (
            <details key={f.q} className="group bg-background border border-border p-6">
              <summary className="font-display text-navy text-lg cursor-pointer flex justify-between items-start gap-4">
                <span>{f.q}</span>
                <span className="text-gold text-xl leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Related insights */}
      {relatedArticles.length > 0 && (
        <Section eyebrow="Read more" title="Related insights">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                to={`/insights/${a.slug}`}
                className="group border border-border p-6 hover:border-gold transition-colors"
              >
                <div className="text-[0.65rem] tracking-widest uppercase text-gold mb-3">
                  {a.category}
                </div>
                <div className="font-display text-lg text-navy group-hover:text-gold transition-colors">
                  {a.title}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-gold">
                  Read <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8">
            <div className="eyebrow text-gold mb-3">Ready to start?</div>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              {page.ctaText.replace(
                /^Request a?n? |^Partner With Us on a |^Discuss a /,
                "Let's talk about your ",
              )}
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              Request Proposal <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:info@praharshinfrastructure.com"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
