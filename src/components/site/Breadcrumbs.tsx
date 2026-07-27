import { Fragment } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

const BASE = "https://www.praharshinfrastructure.com";

export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const full: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${BASE}${c.to}` } : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav
        aria-label="Breadcrumb"
        className={`text-xs sm:text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {full.map((c, i) => {
            const isLast = i === full.length - 1;
            return (
              <Fragment key={`${c.label}-${i}`}>
                <li className="flex items-center">
                  {i === 0 ? (
                    <Link
                      to={c.to || "/"}
                      className="inline-flex items-center gap-1 hover:text-gold transition-colors"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span className="sr-only sm:not-sr-only">{c.label}</span>
                    </Link>
                  ) : isLast || !c.to ? (
                    <span aria-current="page" className="text-navy font-medium">
                      {c.label}
                    </span>
                  ) : (
                    <Link to={c.to} className="hover:text-gold transition-colors">
                      {c.label}
                    </Link>
                  )}
                </li>
                {!isLast && (
                  <li aria-hidden="true">
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
