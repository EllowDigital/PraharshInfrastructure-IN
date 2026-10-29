import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.praharshinfrastructure.com";

/**
 * Public social profiles. Add the real profile URLs here — only absolute
 * https URLs are emitted in `sameAs` (placeholders are filtered out).
 */
export const SOCIAL_PROFILES: string[] = [
  // "https://www.linkedin.com/company/praharsh-infrastructure",
  // "https://www.facebook.com/praharshinfrastructure",
  // "https://twitter.com/praharshinfra",
  // "https://www.instagram.com/praharshinfrastructure",
  // "https://www.youtube.com/@praharshinfrastructure",
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Praharsh Infrastructure",
  legalName: "Praharsh Infrastructure",
  alternateName: "Praharsh Infra",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo.jpeg`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/images/logo.jpeg`,
  slogan: "Building Today, Empowering Tomorrow",
  description:
    "Praharsh Infrastructure is a Lucknow-based infrastructure and government supply services company delivering public lighting, solar energy, road, civil and electrical infrastructure projects across India.",
  foundingDate: "2010",
  areaServed: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "A-3/1202, Tower-2, 12th Floor, Purvanchal Kings Court, Vinamra Khand, Gomti Nagar",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226010",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-7800009165",
      email: "info@praharshinfrastructure.com",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-7800009165",
      email: "info@praharshinfrastructure.com",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  ...(SOCIAL_PROFILES.filter((u) => u.startsWith("https://")).length
    ? { sameAs: SOCIAL_PROFILES.filter((u) => u.startsWith("https://")) }
    : {}),
};

/** Site-wide Organization structured data (rendered once from the footer). */
export function OrganizationJsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}

export default OrganizationJsonLd;
