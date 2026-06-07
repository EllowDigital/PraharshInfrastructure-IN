import { Link } from "react-router-dom";
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
} from "lucide-react";

const socialIcons = [Linkedin, Facebook, Twitter, Instagram, Youtube] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.jpeg"
              alt="Praharsh Infrastructure"
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
        </div>

        <div className="lg:col-span-2">
          <div className="eyebrow text-gold mb-5">Company</div>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gold">
                Services
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gold">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/clients" className="hover:text-gold">
                Clients
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow text-gold mb-5">Capabilities</div>
          <ul className="space-y-3 text-sm">
            <li>Infrastructure Development</li>
            <li>Road Infrastructure</li>
            <li>Solar Energy Solutions</li>
            <li>Electrical & Lighting Works</li>
            <li>Outdoor & Indoor Advertising</li>
            <li>Digital Advertising</li>
            <li>Branding & Signage</li>
            <li>Government Supply Services</li>
          </ul>
        </div>

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

          <div className="mt-6 flex gap-3">
            {socialIcons.map((Icon) => (
              <a
                key={Icon.displayName ?? Icon.name}
                href="#"
                className="w-9 h-9 grid place-items-center border border-white/20 hover:border-gold hover:text-gold transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Praharsh Infrastructure. All rights reserved.</div>
          <div className="flex flex-wrap gap-6">
            <span>GST: 09GBVPS0920R1ZI</span>
            <span>UDYAM-UP-50-0034245</span>
            <span>GeM Seller ID: 6498190000819033</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
