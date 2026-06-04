import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Mail, Phone, MapPin, ArrowUpRight, FileBadge2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Praharsh Infrastructure" },
      {
        name: "description",
        content:
          "Speak with our pre-bid team. Corporate office: A-3/1202, Purvanchal Kings Court, Vinamra Khand, Gomti Nagar, Lucknow — 226010.",
      },
      { property: "og:title", content: "Contact Praharsh Infrastructure" },
      { property: "og:description", content: "Engineering teams ready for your project brief." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-40 pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Get in Touch
          </div>
          <h1 className="text-5xl lg:text-7xl max-w-4xl leading-[1.02]">
            Let's engineer something <span className="italic text-gold">significant.</span>
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-12 gap-16 -mt-8">
          <div className="lg:col-span-5 space-y-10">
            {[
              {
                icon: MapPin,
                t: "Corporate Office",
                d: "A-3/1202, Purvanchal Kings Court\nVinamra Khand, Gomti Nagar\nPO: Gomtinagar, Lucknow — 226010\nUttar Pradesh, India",
              },
              { icon: Phone, t: "Phone", d: "+91-7800009165" },
              {
                icon: Mail,
                t: "Email",
                d: "info@praharshinfrastructure.com",
              },
              {
                icon: FileBadge2,
                t: "Registrations",
                d: "GST: 09GBVPS0920R1ZI\nUDYAM: UDYAM-UP-50-0034245\nGeM Seller ID: 6498190000819033",
              },
            ].map((c) => (
              <div key={c.t} className="flex gap-5 pb-10 border-b border-border last:border-0">
                <div className="w-12 h-12 shrink-0 grid place-items-center bg-navy text-gold">
                  <c.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-xl text-navy">{c.t}</div>
                  <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                    {c.d}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-secondary p-8 lg:p-12 border-t-2 border-gold">
            {submitted ? (
              <div className="py-20 text-center">
                <div className="eyebrow text-gold mb-4">Thank you</div>
                <h3 className="font-display text-3xl text-navy">Your enquiry has been received.</h3>
                <p className="mt-4 text-muted-foreground">
                  Our pre-construction team will respond within one working day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <h2 className="font-display text-3xl text-navy">Request a Proposal</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Full Name" name="name" required />
                  <Field label="Company / Organisation" name="company" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <Field
                  label="Project Type"
                  name="type"
                  placeholder="e.g. Solar EPC, Civil, Substation, Government Turnkey"
                />
                <Field label="Project Brief" name="brief" textarea />
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-navy text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gold hover:text-navy transition-colors"
                >
                  Submit Enquiry <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-background border border-border focus:border-gold outline-none px-4 py-3 text-sm text-navy transition-colors";
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground text-[0.65rem] mb-2 block">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
