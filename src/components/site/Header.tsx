import { Link, NavLink, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import { SearchDialog } from "./SearchDialog";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/government-capabilities", label: "Government" },
  { to: "/certifications", label: "Certifications" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Use a ref for the open state to access it in the scroll listener without recreating it
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setScrolled(currentScrollY > 20);

          // 1. Auto-hide header on scroll down, show on scroll up
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }

          // 2. Automatically close mobile menu if user scrolls
          if (openRef.current && Math.abs(currentScrollY - lastScrollY) > 15) {
            setOpen(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to set initial state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setHidden(false); // Ensure header shows when navigating to a new page
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-500 ease-in-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          scrolled || open
            ? "bg-navy-deep/95 backdrop-blur-md shadow-card border-b border-white/5"
            : "bg-gradient-to-b from-navy-deep/70 to-transparent"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 z-50">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/images/logo.jpeg"
            alt="Praharsh Infrastructure"
            width={40}
            height={40}
            loading="eager"
            
            fetchPriority="high"
            decoding="sync"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-sm shadow-sm"
          />
          <div className="leading-tight">
            <div className="font-display text-white text-base sm:text-lg tracking-tight">
              Praharsh
            </div>
            <div className="eyebrow text-gold/90 text-[0.55rem] sm:text-[0.6rem]">
              Infrastructure
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `text-[0.82rem] tracking-wide transition-colors link-underline whitespace-nowrap ${
                  isActive ? "text-gold" : "text-white/85 hover:text-gold"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the site"
            title="Search (⌘K)"
            className="hidden md:inline-flex items-center gap-2 border border-white/20 text-white/85 hover:text-gold hover:border-gold px-3 py-2 text-xs transition-colors shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="tracking-wide">Search</span>
            <kbd className="ml-1 hidden xl:inline-block text-[0.6rem] px-1 py-0.5 border border-white/20 rounded-sm text-white/60">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="md:hidden text-white p-2 grid place-items-center"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-gold text-navy px-4 xl:px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-white transition-colors shadow-sm shrink-0"
          >
            Request Proposal
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-white p-2 -mr-2 grid place-items-center transition-transform active:scale-95 z-50"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 animate-in fade-in zoom-in duration-300" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 animate-in fade-in zoom-in duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        className={`lg:hidden absolute top-0 left-0 w-full h-[100dvh] bg-navy-deep/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col pt-24 border-t border-white/5 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="flex-1 overflow-y-auto px-6 pb-12 flex flex-col items-center justify-center gap-7">
          {nav.map((n, i) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-2xl sm:text-3xl font-display tracking-tight transition-all duration-500 transform ${
                  open ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                } ${isActive ? "text-gold" : "text-white/80 hover:text-white"}`
              }
              style={{ transitionDelay: `${open ? i * 60 + 100 : 0}ms` }}
            >
              {n.label}
            </NavLink>
          ))}

          <div
            className={`w-full max-w-xs mt-6 pt-8 border-t border-white/10 flex flex-col items-center transition-all duration-500 transform ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${open ? nav.length * 60 + 150 : 0}ms` }}
          >
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center bg-gold text-navy py-4 px-8 text-base font-medium tracking-wide hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Request Proposal
            </Link>
          </div>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
