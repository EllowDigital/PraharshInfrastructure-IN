import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({
  title = "Praharsh Infrastructure | Building Today, Empowering Tomorrow",
  description = "Praharsh Infrastructure is a Lucknow-based infrastructure and government supply services company delivering public lighting, solar energy, and electrical infrastructure projects across India.",
  keywords = "Infrastructure, Government Supply, Public Lighting, Solar Energy, Electrical Infrastructure, Road Construction, Civil Infrastructure, Lucknow, UP",
  image = "https://www.praharshinfrastructure.com/images/logo.jpeg",
  url = "https://www.praharshinfrastructure.com",
  type = "website",
  canonicalUrl,
  structuredData,
}: SEOProps) {
  const defaultCanonicalUrl = url;
  const finalCanonicalUrl = canonicalUrl || defaultCanonicalUrl;

  // Site-wide Organization data is emitted once by <OrganizationJsonLd /> in the footer,
  // so pages only add their own structured data when provided.
  const finalStructuredData = structuredData;


  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Advanced SEO & Crawling */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Praharsh Infrastructure" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {finalStructuredData ? (
        <script type="application/ld+json">{JSON.stringify(finalStructuredData)}</script>
      ) : null}
    </Helmet>
  );
}
