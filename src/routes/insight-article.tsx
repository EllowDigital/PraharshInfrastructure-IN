import { Link, useParams, Navigate } from "react-router";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { INSIGHTS } from "@/data/insights";


const BASE = "https://www.praharshinfrastructure.com";

export default function InsightArticle() {
  const { slug } = useParams();
  const article = INSIGHTS.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/insights" replace />;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Praharsh Infrastructure" },
    publisher: {
      "@type": "Organization",
      name: "Praharsh Infrastructure",
      logo: { "@type": "ImageObject", url: `${BASE}/images/logo.jpeg` },
    },
    mainEntityOfPage: `${BASE}/insights/${article.slug}`,
    keywords: article.keywords,
  };

  const related = INSIGHTS.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={`${article.title} | Praharsh Insights`}
        description={article.excerpt}
        keywords={article.keywords}
        url={`${BASE}/insights/${article.slug}`}
        type="article"
        structuredData={structuredData}
      />
      <div className="pt-24" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 pt-8">
        <Breadcrumbs
          items={[
            { label: "Insights", to: "/insights" },
            { label: article.title },
          ]}
        />
      </div>
      <Section>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> All insights
        </Link>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[0.65rem] tracking-widest uppercase text-gold mb-5">
            <Tag className="w-3 h-3" /> {article.category}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-navy leading-tight">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>
        </div>

        <article className="mt-14 max-w-3xl space-y-10">
          {article.content.map((sec) => (
            <div key={sec.heading}>
              <h2 className="font-display text-2xl text-navy mb-4">{sec.heading}</h2>
              <p className="text-base leading-relaxed text-foreground/80">{sec.body}</p>
              {sec.bullets && (
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="w-1.5 h-1.5 mt-2 bg-gold shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        <div className="mt-14 max-w-3xl border-t border-border pt-10">
          <div className="eyebrow text-gold mb-4">Related capabilities</div>
          <div className="flex flex-wrap gap-3">
            {article.relatedServices.map((r) => (
              <Link
                key={r.to + r.label}
                to={r.to}
                className="inline-flex items-center gap-1.5 border border-border px-4 py-2 text-sm hover:border-gold hover:text-gold transition-colors"
              >
                {r.label} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section muted eyebrow="Keep Reading" title="More insights">
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              to={`/insights/${a.slug}`}
              className="group bg-background border border-border p-6 hover:border-gold transition-colors"
            >
              <div className="text-[0.65rem] tracking-widest uppercase text-gold mb-3">
                {a.category}
              </div>
              <div className="font-display text-lg text-navy leading-snug group-hover:text-gold transition-colors">
                {a.title}
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-gold">
                Read <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
