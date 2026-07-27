import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Search, X, ArrowRight, FileText, Building2, Sparkles, BookOpen } from "lucide-react";
import { INSIGHTS } from "@/data/insights";
import { SERVICE_PAGES } from "@/data/service-landing";

type Kind = "page" | "service" | "insight" | "project";
interface Entry {
  kind: Kind;
  title: string;
  description: string;
  to: string;
  keywords?: string;
}

const STATIC_PAGES: Entry[] = [
  { kind: "page", title: "Home", description: "Praharsh Infrastructure overview", to: "/" },
  {
    kind: "page",
    title: "About",
    description: "Our story, leadership and mission",
    to: "/about",
    keywords: "company history leadership team",
  },
  {
    kind: "page",
    title: "Services",
    description: "Full service portfolio",
    to: "/services",
    keywords: "solar electrical infrastructure road construction government",
  },
  {
    kind: "page",
    title: "Projects",
    description: "Featured infrastructure projects",
    to: "/projects",
    keywords: "portfolio case studies",
  },
  {
    kind: "page",
    title: "Government Capabilities",
    description: "GeM, PWD, DRDA & UPSIC empanelment",
    to: "/government-capabilities",
    keywords: "gem pwd drda upsic tender government",
  },
  {
    kind: "page",
    title: "Certifications",
    description: "ISO 9001, 14001, 45001, MSME",
    to: "/certifications",
    keywords: "iso msme certifications compliance",
  },
  {
    kind: "page",
    title: "Clients & Partners",
    description: "Government and private clients",
    to: "/clients",
  },
  {
    kind: "page",
    title: "Insights & News",
    description: "Field notes and industry insights",
    to: "/insights",
    keywords: "blog articles news",
  },
  {
    kind: "page",
    title: "Careers",
    description: "Open roles and applications",
    to: "/careers",
    keywords: "jobs hiring recruitment",
  },
  { kind: "page", title: "Contact", description: "Reach our team", to: "/contact" },
  { kind: "page", title: "FAQ", description: "Frequently asked questions", to: "/faq" },
];

function buildIndex(): Entry[] {
  const services: Entry[] = Object.values(SERVICE_PAGES).map((s) => ({
    kind: "service",
    title: s.hero.h1,
    description: s.hero.intro,
    to: `/services/${s.slug}`,
    keywords: s.seo.keywords,
  }));
  const insights: Entry[] = INSIGHTS.map((a) => ({
    kind: "insight",
    title: a.title,
    description: a.excerpt,
    to: `/insights/${a.slug}`,
    keywords: `${a.keywords} ${a.category}`,
  }));
  return [...STATIC_PAGES, ...services, ...insights];
}

const KIND_META: Record<Kind, { label: string; icon: typeof FileText; color: string }> = {
  page: { label: "Page", icon: FileText, color: "text-navy" },
  service: { label: "Service", icon: Sparkles, color: "text-gold" },
  insight: { label: "Insight", icon: BookOpen, color: "text-gold" },
  project: { label: "Project", icon: Building2, color: "text-navy" },
};

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    const tokens = q.split(/\s+/);
    return index
      .map((e) => {
        const haystack = `${e.title} ${e.description} ${e.keywords ?? ""}`.toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (!haystack.includes(t)) return { e, score: -1 };
          if (e.title.toLowerCase().includes(t)) score += 5;
          if ((e.keywords ?? "").toLowerCase().includes(t)) score += 3;
          score += 1;
        }
        return { e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.e);
  }, [index, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      const link = document.getElementById(`search-result-${active}`) as HTMLAnchorElement | null;
      link?.click();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh] bg-navy-deep/70 backdrop-blur-sm animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-background border border-border shadow-elevated animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search services, insights, pages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base text-navy placeholder:text-muted-foreground/70"
            aria-label="Search"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-muted-foreground hover:text-navy transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No matches for “{query}”. Try “solar”, “tender”, or “GeM”.
            </div>
          ) : (
            <ul>
              {results.map((r, i) => {
                const meta = KIND_META[r.kind];
                const Icon = meta.icon;
                const isActive = i === active;
                return (
                  <li key={`${r.to}-${i}`}>
                    <Link
                      id={`search-result-${i}`}
                      to={r.to}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      className={`flex items-start gap-3 px-4 py-3 border-l-2 transition-colors ${
                        isActive
                          ? "bg-secondary border-gold"
                          : "border-transparent hover:bg-secondary/60"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-8 h-8 grid place-items-center bg-secondary ${meta.color} shrink-0`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-[0.6rem] tracking-widest uppercase text-gold">
                            {meta.label}
                          </span>
                        </span>
                        <span className="block text-sm font-medium text-navy truncate">
                          {r.title}
                        </span>
                        <span className="block text-xs text-muted-foreground line-clamp-1">
                          {r.description}
                        </span>
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 mt-2 shrink-0 transition-colors ${isActive ? "text-gold" : "text-muted-foreground/50"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-4 py-2.5 text-[0.65rem] tracking-wider uppercase text-muted-foreground flex items-center justify-between">
          <span>
            <kbd className="px-1.5 py-0.5 bg-secondary border border-border">↑↓</kbd> navigate
            <span className="mx-2">·</span>
            <kbd className="px-1.5 py-0.5 bg-secondary border border-border">↵</kbd> open
            <span className="mx-2">·</span>
            <kbd className="px-1.5 py-0.5 bg-secondary border border-border">Esc</kbd> close
          </span>
          <span className="hidden sm:inline text-gold">Praharsh search</span>
        </div>
      </div>
    </div>
  );
}
