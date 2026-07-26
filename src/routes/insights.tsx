import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { INSIGHTS, INSIGHT_CATEGORIES } from "@/data/insights";

const BASE = "https://www.praharshinfrastructure.com";

export default function Insights() {
  const [active, setActive] = useState<(typeof INSIGHT_CATEGORIES)[number]>("All");
  const filtered = useMemo(
    () => (active === "All" ? INSIGHTS : INSIGHTS.filter((a) => a.category === active)),
    [active],
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Praharsh Insights",
    url: `${BASE}/insights`,
    blogPost: INSIGHTS.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      datePublished: a.date,
      url: `${BASE}/insights/${a.slug}`,
      keywords: a.keywords,
      author: { "@type": "Organization", name: "Praharsh Infrastructure" },
    })),
  };

  return (
    <>
      <SEO
        title="Insights & News | Infrastructure, Solar & Government Contracting"
        description="Expert insights on solar street lighting, GeM empanelment, road safety, LED public lighting and government infrastructure procurement in India."
        keywords="infrastructure blog India, solar street lighting, GeM empanelment, PWD tender, road safety infrastructure, LED lighting TCO"
        url={`${BASE}/insights`}
        structuredData={structuredData}
      />
      <div className="pt-24" />
      <Section
        eyebrow="Insights & News"
        title="Field notes from India's infrastructure frontline"
        intro="Practical guides on solar, public lighting, road safety and government procurement — written by our engineering and tender teams."
      />
      <Section muted>
        <div className="flex flex-wrap gap-2 mb-10">
          {INSIGHT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                active === c
                  ? "bg-navy text-white border-navy"
                  : "bg-background text-navy border-border hover:border-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              to={`/insights/${a.slug}`}
              className="group flex flex-col bg-background border border-border p-7 hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-2 text-[0.65rem] tracking-widest uppercase text-gold mb-4">
                <Tag className="w-3 h-3" /> {a.category}
              </div>
              <h2 className="font-display text-xl text-navy leading-snug group-hover:text-gold transition-colors">
                {a.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {a.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {new Date(a.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {a.readTime}
                </span>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:text-gold">
                Read article <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
