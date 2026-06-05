import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { FloatingWhatsApp } from "../components/site/FloatingWhatsApp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Praharsh Infrastructure — Engineering India's Backbone" },
      {
        name: "description",
        content:
          "Praharsh Infrastructure is a multi-disciplinary EPC contractor delivering civil, electrical, solar and government infrastructure projects across India.",
      },
      { property: "og:title", content: "Praharsh Infrastructure" },
      {
        property: "og:description",
        content: "Civil, Electrical, Solar & Government EPC Contractor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Praharsh Infrastructure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "apple-mobile-web-app-title", content: "Praharsh Infrastructure" },
      {
        name: "keywords",
        content:
          "Solar Street Light Contractor, High Mast Lighting Contractor, Government Infrastructure Contractor, Solar Energy Solutions Lucknow, Electrical Infrastructure Company UP, GeM Registered Supplier, Government Tender Contractor, Praharsh Infrastructure",
      },
      { name: "author", content: "Praharsh Infrastructure" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0B1F4D" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon/favicon-96x96.png?v=20260603",
        sizes: "96x96",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg?v=20260603" },
      { rel: "shortcut icon", href: "/favicon/favicon.ico?v=20260603" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png?v=20260603",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest?v=20260603" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Praharsh Infrastructure",
          alternateName: "Praharsh Infrastructure Pvt. Ltd.",
          url: "https://www.praharshinfrastructure.com",
          logo: "https://www.praharshinfrastructure.com/images/logo.jpeg",
          description:
            "GeM-registered infrastructure, solar, electrical, road, advertising and government supply contractor headquartered in Lucknow, Uttar Pradesh.",
          telephone: "+91-7800009165",
          email: "info@praharshinfrastructure.com",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "A-3/1202, Tower-2, 12th Floor, Purvanchal Kings Court, Vinamra Khand, Gomti Nagar",
            addressLocality: "Lucknow",
            addressRegion: "Uttar Pradesh",
            postalCode: "226010",
            addressCountry: "IN",
          },
          areaServed: "IN",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
