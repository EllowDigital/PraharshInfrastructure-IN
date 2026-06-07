import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    let prevOverflow: string | null = null;
    let prevPosition: string | null = null;
    let prevTop: string | null = null;
    let scrollY = 0;

    if (open) {
      scrollY = window.scrollY || window.pageYOffset || 0;
      prevOverflow = document.documentElement.style.overflow;
      prevPosition = document.body.style.position;
      prevTop = document.body.style.top;

      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      if (open) {
        document.documentElement.style.overflow = prevOverflow || "";
        document.body.style.position = prevPosition || "";
        const top = prevTop || document.body.style.top || "0px";
        document.body.style.top = "";
        // restore scroll position
        const restored = -parseInt(top || "0") || 0;
        window.scrollTo(0, restored);
      }
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md shadow-card border-b border-white/5"
          : "bg-gradient-to-b from-navy-deep/60 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/images/logo.jpeg"
            alt="Praharsh Infrastructure"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-sm"
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

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center gap-2 bg-gold text-navy px-4 xl:px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-white transition-colors shrink-0"
        >
          Request Proposal
        </Link>

        <button
          className="lg:hidden text-white p-2 -mr-2 grid place-items-center"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[59] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-navy shadow-2xl transition-transform duration-300 ease-out border-l border-white/5 flex flex-col z-[60] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
          <div className="font-display text-white text-lg tracking-tight">
            Menu
          </div>
          <button
            className="text-white/70 hover:text-white p-2 -mr-2 grid place-items-center transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3.5 border-b border-white/5 text-sm sm:text-base tracking-wide transition-colors ${
                  isActive ? "text-gold font-medium" : "text-white/80 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>
        
        <div className="p-6 mt-auto border-t border-white/5">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full bg-gold text-navy py-3.5 px-4 text-sm sm:text-base font-medium tracking-wide hover:bg-white transition-colors"
          >
            Request Proposal
          </Link>
        </div>
      </div>
    </header>
  );
}
