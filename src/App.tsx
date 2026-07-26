import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AppErrorBoundary } from "@/components/site/ErrorBoundary";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Preloader } from "@/components/site/Preloader";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { SEO } from "@/components/site/SEO";
import About from "@/routes/about";
import Careers from "@/routes/careers";
import Certifications from "@/routes/certifications";
import Clients from "@/routes/clients";
import Contact from "@/routes/contact";
import Faq from "@/routes/faq";
import GovernmentCapabilities from "@/routes/government-capabilities";
import Home from "@/routes/index";
import Privacy from "@/routes/privacy";
import Projects from "@/routes/projects";
import Services from "@/routes/services";
import Sitemap from "@/routes/sitemap";
import Terms from "@/routes/terms";
import Insights from "@/routes/insights";
import InsightArticle from "@/routes/insight-article";
import ServiceLanding from "@/routes/service-landing";

function AppShell() {
  const location = useLocation();
  const [appMounted, setAppMounted] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAppMounted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHeroReady(location.pathname !== "/");
  }, [location.pathname]);

  const isReady = useMemo(() => appMounted && heroReady, [appMounted, heroReady]);

  return (
    <>
      <SEO />
      <Preloader isVisible={!isReady} progressLabel="Loading..." />
      <ScrollToTop />
      <AppErrorBoundary sectionName="site_shell">
        <Header />
      </AppErrorBoundary>
      <main className="min-h-dvh">
        <Routes>
          <Route
            path="/"
            element={
              <AppErrorBoundary sectionName="home_page">
                <Home onHeroReady={() => setHeroReady(true)} />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <AppErrorBoundary sectionName="about_page">
                <About />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/services"
            element={
              <AppErrorBoundary sectionName="services_page">
                <Services />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <AppErrorBoundary sectionName="service_landing_page">
                <ServiceLanding />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/insights"
            element={
              <AppErrorBoundary sectionName="insights_page">
                <Insights />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/insights/:slug"
            element={
              <AppErrorBoundary sectionName="insight_article_page">
                <InsightArticle />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/projects"
            element={
              <AppErrorBoundary sectionName="projects_page">
                <Projects />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/government-capabilities"
            element={
              <AppErrorBoundary sectionName="government_page">
                <GovernmentCapabilities />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/certifications"
            element={
              <AppErrorBoundary sectionName="certifications_page">
                <Certifications />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/clients"
            element={
              <AppErrorBoundary sectionName="clients_page">
                <Clients />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/contact"
            element={
              <AppErrorBoundary sectionName="contact_page">
                <Contact />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/faq"
            element={
              <AppErrorBoundary sectionName="faq_page">
                <Faq />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/careers"
            element={
              <AppErrorBoundary sectionName="careers_page">
                <Careers />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/privacy"
            element={
              <AppErrorBoundary sectionName="privacy_page">
                <Privacy />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/terms"
            element={
              <AppErrorBoundary sectionName="terms_page">
                <Terms />
              </AppErrorBoundary>
            }
          />
          <Route
            path="/sitemap"
            element={
              <AppErrorBoundary sectionName="sitemap_page">
                <Sitemap />
              </AppErrorBoundary>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <AppErrorBoundary sectionName="footer">
        <Footer />
      </AppErrorBoundary>
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
