import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | Praharsh Infrastructure"
        description="Terms governing use of the Praharsh Infrastructure website and engagement with our services."
      />
      <div className="pt-24" />
      <Section eyebrow="Legal" title="Terms of Service" intro="Last updated: 24 July 2026">
        <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-6">
          <p>
            By accessing praharshinfrastructure.com you agree to these terms. Content on the
            site is for informational purposes only and does not constitute a binding offer.
            Project execution is governed by the signed proposal, work order or tender terms.
          </p>
          <h3 className="font-display text-2xl text-navy">Intellectual property</h3>
          <p>
            All brand elements, imagery, project descriptions and written content are the
            property of Praharsh Infrastructure and may not be reproduced without written
            permission.
          </p>
          <h3 className="font-display text-2xl text-navy">Third-party links</h3>
          <p>
            The website may link to external resources (GeM, department portals, certification
            issuers). We are not responsible for the content or availability of those sites.
          </p>
          <h3 className="font-display text-2xl text-navy">Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, Praharsh Infrastructure shall not be
            liable for any indirect, incidental or consequential loss arising from use of the
            website.
          </p>
          <h3 className="font-display text-2xl text-navy">Governing law</h3>
          <p>
            These terms are governed by the laws of India and subject to the exclusive
            jurisdiction of the courts at Lucknow, Uttar Pradesh.
          </p>
        </div>
      </Section>
    </>
  );
}
