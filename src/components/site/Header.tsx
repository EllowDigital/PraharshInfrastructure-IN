import { Link, NavLink } from "react-router-dom";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/images/logo.jpeg"
            alt="Praharsh Infrastructure"
            className="w-10 h-10 object-contain rounded-sm"
          />
          <div className="leading-tight">
            <div className="font-display text-white text-lg tracking-tight">Praharsh</div>
            <div className="eyebrow text-gold/90 text-[0.6rem]">Infrastructure</div>
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
          className="xl:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-navy-deep border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-gold py-2"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-gold text-navy text-center py-3 font-medium"
            >
              Request Proposal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
