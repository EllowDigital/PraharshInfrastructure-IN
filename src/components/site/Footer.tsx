import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  ChevronDown,
} from "lucide-react";
import { SmartImage } from "@/components/site/SmartImage";
import { OrganizationJsonLd } from "@/components/site/OrganizationJsonLd";

function FooterColumn({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lg:col-span-2 border-b border-white/10 lg:border-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 lg:py-0 lg:cursor-default lg:pointer-events-none"
      >
        <span className="eyebrow text-gold lg:mb-5">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gold transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        className={`space-y-3 text-sm overflow-hidden lg:!block lg:!max-h-none lg:pb-0 ${
          open ? "max-h-[600px] pb-5" : "max-h-0 lg:max-h-none"
        } transition-[max-height] duration-300`}
      >
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-gold">
        {children}
      </Link>
    </li>
  );
}

const socialIcons: { Icon: typeof Linkedin; label: string; href: string }[] = [
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

const LAST_UPDATED = "24 July 2026";

export function Footer() {
  // Newsletter code preserved but hidden from the site.
  // const [email, setEmail] = useState("");
  // const [subscribed, setSubscribed] = useState(false);
  //
  // const handleSubscribe = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!email.trim()) return;
  //   const subject = encodeURIComponent("Newsletter subscription");
  //   const body = encodeURIComponent(
  //     `Please add ${email} to the Praharsh Infrastructure newsletter.`,
  //   );
  //   window.open(
  //     `mailto:info@praharshinfrastructure.com?subject=${subject}&body=${body}`,
  //     "_blank",
  //     "noopener,noreferrer",
  //   );
  //   setSubscribed(true);
  //   setEmail("");
  //   window.setTimeout(() => setSubscribed(false), 4000);
  // };

  return (
    <footer className="bg-navy-deep text-white/80">
      <OrganizationJsonLd />
      {/* Newsletter band — temporarily hidden (code retained for future use)
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow text-gold mb-3">Stay Connected</div>
            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
              Project insights, tender updates and case studies — straight to your inbox.
            </h3>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="lg:col-span-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 bg-white/5 border border-white/15 focus:border-gold outline-none text-white placeholder:text-white/40 px-4 py-3 text-sm transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-6 py-3 text-sm font-medium hover:bg-white transition-colors"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      */}

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <SmartImage
              src="/images/logo.jpeg"
              alt="Praharsh Infrastructure"
              width={44}
              height={44}
              sizes="44px"
              loading="lazy"
              wrapperClassName="w-11 h-11 rounded-sm shrink-0"
              skeletonColor="rgba(255,255,255,0.08)"
              className="w-11 h-11 object-contain rounded-sm"
            />

            <div>
              <div className="font-display text-white text-lg">Praharsh Infrastructure</div>
              <div className="eyebrow text-gold/90 text-[0.6rem]">
                Building Today, Empowering Tomorrow
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/65 max-w-sm">
            Praharsh Infrastructure is a Lucknow-based infrastructure and government supply services
            company delivering public lighting, solar energy and electrical infrastructure projects
            across India.
          </p>

          <a
            href="/docs/company-profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-gold text-navy px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            <Download className="w-4 h-4" /> Download Company Profile
          </a>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm">
            {[
              { k: "ISO", v: "9001·14001·45001" },
              { k: "GeM", v: "Empaneled" },
              { k: "MSME", v: "Registered" },
            ].map((t) => (
              <div key={t.k} className="border border-white/10 px-3 py-2 text-center">
                <div className="text-gold text-[0.6rem] tracking-widest">{t.k}</div>
                <div className="text-[0.65rem] text-white/70 mt-0.5">{t.v}</div>
              </div>
            ))}
          </div>
        </div>

        <FooterColumn title="Company">
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/services">Services</FooterLink>
          <FooterLink to="/insights">Insights & News</FooterLink>
          <FooterLink to="/projects">Projects</FooterLink>
          <FooterLink to="/clients">Clients</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Capabilities" className="lg:col-span-3">
          <FooterLink to="/services/construction">Infrastructure & Construction</FooterLink>
          <FooterLink to="/services/solar">Solar Energy Solutions</FooterLink>
          <FooterLink to="/services/electrical">Electrical & Lighting Works</FooterLink>
          <FooterLink to="/services/government-projects">Government Projects</FooterLink>
          <FooterLink to="/services">Outdoor & Digital Advertising</FooterLink>
          <FooterLink to="/services">Branding & Signage</FooterLink>
          <FooterLink to="/government-capabilities">Government Capabilities</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/certifications">Certifications</FooterLink>
          <FooterLink to="/sitemap">Sitemap</FooterLink>
        </FooterColumn>

        <div className="lg:col-span-3">
          <div className="eyebrow text-gold mb-5">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span>
                A-3/1202, Tower-2, 12th Floor,
                <br />
                Purvanchal Kings Court, Vinamra Khand,
                <br />
                Gomti Nagar, Lucknow, Uttar Pradesh — 226010
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a href="tel:+917800009165" className="hover:text-gold">
                +91-7800009165
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <a
                href="mailto:info@praharshinfrastructure.com"
                className="hover:text-gold break-all"
              >
                info@praharshinfrastructure.com
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <div className="eyebrow text-gold mb-4">Business Hours</div>
            <div className="text-sm space-y-1 text-white/70">
              <div>Mon – Sat · 9:30 AM – 7:00 PM</div>
              <div>Sunday · Closed</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {socialIcons.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 grid place-items-center border border-white/20 hover:border-gold hover:text-gold transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col lg:flex-row justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} Praharsh Infrastructure. All rights reserved.</span>
            <span className="hidden sm:inline text-white/25">|</span>
            <span>
              Last updated: <span className="text-white/80">{LAST_UPDATED}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>GST: 09GBVPS0920R1ZI</span>
            <span>UDYAM-UP-50-0034245</span>
            <span>GeM ID: 6498190000819033</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-gold">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gold">
              Terms
            </Link>
            <Link to="/sitemap" className="hover:text-gold">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
