import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import About from "@/routes/about";
import Certifications from "@/routes/certifications";
import Clients from "@/routes/clients";
import Contact from "@/routes/contact";
import GovernmentCapabilities from "@/routes/government-capabilities";
import Home from "@/routes/index";
import Projects from "@/routes/projects";
import Services from "@/routes/services";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/government-capabilities" element={<GovernmentCapabilities />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}

export default App;
