import { Link } from "react-router-dom";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";

const GROUPS: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "Company",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { to: "/services", label: "Services" },
      { to: "/projects", label: "Projects" },
      { to: "/government-capabilities", label: "Government Capabilities" },
      { to: "/certifications", label: "Certifications" },
      { to: "/clients", label: "Clients & Partners" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Sitemap() {
  return (
    <>
      <SEO
        title="Sitemap | Praharsh Infrastructure"
        description="Overview of all pages on the Praharsh Infrastructure website."
      />
      <div className="pt-24" />
      <Section eyebrow="Navigation" title="Sitemap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div className="eyebrow text-gold mb-5">{g.title}</div>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-navy hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
