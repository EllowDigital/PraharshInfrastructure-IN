import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 grid place-items-center bg-gold text-navy font-display font-semibold text-lg">
              P
            </div>
            <div>
              <div className="font-display text-white text-lg">Praharsh</div>
              <div className="eyebrow text-gold/90 text-[0.6rem]">Infrastructure</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/65 max-w-xs">
            Engineering the backbone of modern India — civil, electrical, solar and turnkey
            government infrastructure delivered at scale.
          </p>
        </div>

        <div>
          <div className="eyebrow text-gold mb-5">Company</div>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/sectors" className="hover:text-gold">
                Sectors
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gold">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-gold mb-5">Capabilities</div>
          <ul className="space-y-3 text-sm">
            <li>Civil & Structural</li>
            <li>Solar EPC</li>
            <li>Electrical & T&D</li>
            <li>Government Contracts</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-gold mb-5">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" /> Corporate Office, Bengaluru,
              India
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" /> +91 80 0000 0000
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" /> contact@praharsh-infra.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Praharsh Infrastructure Pvt. Ltd. CIN:
            U45200KA2010PTC000000
          </div>
          <div className="flex gap-6">
            <span>ISO 9001:2015</span>
            <span>ISO 14001:2015</span>
            <span>OHSAS 18001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
