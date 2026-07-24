import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Praharsh Infrastructure"
        description="How Praharsh Infrastructure collects, uses and protects information shared through our website and communication channels."
      />
      <div className="pt-24" />
      <Section eyebrow="Legal" title="Privacy Policy" intro="Last updated: 24 July 2026">
        <div className="prose max-w-3xl text-muted-foreground leading-relaxed space-y-6">
          <p>
            Praharsh Infrastructure (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your
            privacy. This policy explains what information we collect on praharshinfrastructure.com
            and through our WhatsApp, email and phone channels, and how we use it.
          </p>
          <h3 className="font-display text-2xl text-navy">Information we collect</h3>
          <p>
            Name, email, phone, company, project brief, and any attachments you share when
            requesting a quote or contacting us. We do not run any tracking database on this website
            — enquiries reach us directly via WhatsApp or email.
          </p>
          <h3 className="font-display text-2xl text-navy">How we use it</h3>
          <p>
            Solely to respond to your enquiry, prepare proposals, deliver contracted work and share
            periodic updates about our services. We do not sell or rent personal data.
          </p>
          <h3 className="font-display text-2xl text-navy">Retention & security</h3>
          <p>
            Enquiry data is retained only as long as necessary to serve you and meet statutory
            obligations. Access is restricted to authorised team members.
          </p>
          <h3 className="font-display text-2xl text-navy">Your rights</h3>
          <p>
            You can request access, correction or deletion of your personal information at any time
            by writing to{" "}
            <a
              href="mailto:info@praharshinfrastructure.com"
              className="text-navy underline hover:text-gold"
            >
              info@praharshinfrastructure.com
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
