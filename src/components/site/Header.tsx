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
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-navy-deep/95 backdrop-blur-md shadow-card border-b border-white/5"
          : "bg-gradient-to-b from-navy-deep/60 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-6">
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

        <nav className="hidden xl:flex items-center gap-7">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `text-[0.82rem] tracking-wide transition-colors link-underline ${
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
          className="hidden xl:inline-flex items-center gap-2 bg-gold text-navy px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-white transition-colors shrink-0"
        >
          Request Proposal
        </Link>

        <button
          className="xl:hidden text-white p-2 -mr-2 grid place-items-center"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`xl:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-navy-deep transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="h-full overflow-y-auto px-6 py-8 flex flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-4 border-b border-white/10 text-base tracking-wide ${
                  isActive ? "text-gold" : "text-white/90"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 bg-gold text-navy text-center py-4 font-medium tracking-wide"
          >
            Request Proposal
          </Link>
        </div>
      </div>
    </header>
  );
}
