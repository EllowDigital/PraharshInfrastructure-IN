import { SEO } from "@/components/site/SEO";
import { SpecialitiesMarquee, CONTACT_ITEMS } from "@/components/site/SpecialitiesMarquee";
import { Mail, Phone, MapPin, ArrowUpRight, FileBadge2 } from "lucide-react";
import { useRef, useState, useCallback, useEffect, type FormEvent } from "react";

import { Section } from "@/components/site/Section";
import { generateReferenceId, checkClientRateLimit } from "@/lib/enquiry";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

// Validation utilities
const VALIDATION_RULES = {
  name: (value: string) => {
    if (!value?.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (value.trim().length > 100) return "Name must be less than 100 characters";
    return "";
  },
  email: (value: string) => {
    if (!value?.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  },
  phone: (value: string) => {
    if (!value) return ""; // Phone is optional
    if (!/^\+?[\d\s\-()]{7,}$/.test(value.replace(/\s/g, ""))) {
      return "Please enter a valid phone number";
    }
    return "";
  },
  company: (value: string) => {
    if (value && value.trim().length > 150) return "Company name is too long";
    return "";
  },
  type: (value: string) => {
    if (value && value.trim().length > 100) return "Project type is too long";
    return "";
  },
  brief: (value: string) => {
    if (!value?.trim()) return "";
    if (value.trim().length < 10) return "Project brief must be at least 10 characters";
    if (value.trim().length > 2000) return "Project brief must be less than 2000 characters";
    return "";
  },
};

function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const formLoadedAtRef = useRef<number>(Date.now());
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  // Auto-dismiss success message after 12 seconds
  useEffect(() => {
    if (submissionState === "success") {
      const timeout = setTimeout(() => {
        setSubmissionState("idle");
        setSuccessMessage("");
        setReferenceId("");
        formLoadedAtRef.current = Date.now();
      }, 12000);
      return () => clearTimeout(timeout);
    }
  }, [submissionState]);

  const validateField = useCallback((name: string, value: string): string => {
    const validator = VALIDATION_RULES[name as keyof typeof VALIDATION_RULES];
    return validator ? validator(value) : "";
  }, []);

  const validateForm = useCallback(
    (formData: FormData): FieldErrors => {
      const errors: FieldErrors = {};

      Object.entries(VALIDATION_RULES).forEach(([fieldName]) => {
        const value = (formData.get(fieldName) as string) || "";
        const error = validateField(fieldName, value);
        if (error) errors[fieldName] = error;
      });

      return errors;
    },
    [validateField],
  );

  const handleFieldBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      const error = validateField(name, value);

      setFieldErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Anti-spam: honeypot must be empty
    if (((formData.get("bot-field") as string) || "").trim()) {
      // Silently succeed to avoid tipping off bots
      setSuccessMessage(
        "Thank you! Your enquiry has been received. Our team will respond within one working day.",
      );
      setSubmissionState("success");
      return;
    }

    // Anti-spam: form must be visible for at least 3 seconds
    if (Date.now() - formLoadedAtRef.current < 3000) {
      setErrorMessage("Please take a moment to review your details before submitting.");
      return;
    }

    // Client-side rate limit (localStorage, no backend)
    const rl = checkClientRateLimit("contact", { max: 3, windowMs: 10 * 60 * 1000 });
    if (!rl.allowed) {
      const mins = Math.ceil(rl.retryAfterSec / 60);
      setErrorMessage(
        `You've sent several enquiries recently. Please try again in about ${mins} minute${mins === 1 ? "" : "s"}, or email info@praharshinfrastructure.com directly.`,
      );
      return;
    }

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fix the errors above before submitting.");
      return;
    }

    setFieldErrors({});
    setErrorMessage("");
    setSubmissionState("submitting");

    const data = {
      name: (formData.get("name") as string)?.trim() || "",
      company: (formData.get("company") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      phone: (formData.get("phone") as string)?.trim() || "",
      projectType: (formData.get("type") as string)?.trim() || "",
      brief: (formData.get("brief") as string)?.trim() || "",
    };

    const refId = generateReferenceId("PI");
    const subject = `[${refId}] Enquiry — ${data.projectType || "General"} — ${data.name}`;
    const body = [
      `Reference ID: ${refId}`,
      `Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
      "",
      "— Contact —",
      `Name: ${data.name}`,
      `Company: ${data.company || "—"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      "",
      "— Project —",
      `Type: ${data.projectType || "—"}`,
      "",
      "Brief:",
      data.brief || "—",
      "",
      "---",
      "Sent via praharshinfrastructure.com contact form.",
      "Please keep the Reference ID in the subject when replying.",
    ].join("\n");

    const mailto = `mailto:info@praharshinfrastructure.com?cc=${encodeURIComponent(
      data.email,
    )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open in the user's mail client. No server, no database, no network call.
    window.location.href = mailto;

    form.reset();
    formRef.current?.reset();
    formLoadedAtRef.current = Date.now();
    setReferenceId(refId);
    setSuccessMessage(
      `Your email client has opened with a pre-filled enquiry. Just hit Send — we reply within one working day. Your reference ID is ${refId}.`,
    );
    setSubmissionState("success");
  };

  return (
    <>
      <SEO title="Praharsh Infrastructure" />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="eyebrow text-gold mb-6">
            <span className="gold-rule mr-3 align-middle" /> Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl leading-[1.05] lg:leading-[1.02]">
            Let's engineer something <span className="italic text-gold">significant.</span>
          </h1>
        </div>
      </section>
      <SpecialitiesMarquee
        items={CONTACT_ITEMS}
        variant="gold"
        direction="right"
        ariaLabel="How to reach Praharsh Infrastructure"
      />

      <Section>
        <div className="grid lg:grid-cols-12 gap-16 -mt-8">
          <div className="lg:col-span-5 space-y-10">
            {[
              {
                icon: MapPin,
                t: "Corporate Office",
                d: "A-3/1202, Tower-2, 12th Floor\nPurvanchal Kings Court\nVinamra Khand, Gomti Nagar\nLucknow, Uttar Pradesh — 226010\nIndia",
              },
              {
                icon: Phone,
                t: "Phone",
                d: "+91-7800009165",
                href: "tel:+917800009165",
              },
              {
                icon: Mail,
                t: "Email",
                d: "info@praharshinfrastructure.com",
                href: "mailto:info@praharshinfrastructure.com",
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
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-sm text-muted-foreground mt-2 block whitespace-pre-line leading-relaxed hover:text-gold transition-colors"
                    >
                      {c.d}
                    </a>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                      {c.d}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-secondary p-8 lg:p-12 border-t-2 border-gold">
            {submissionState === "success" ? (
              <div className="py-20 text-center">
                <div className="eyebrow text-gold mb-4">✓ Enquiry Ready</div>
                <h3 className="font-display text-3xl text-navy">Your enquiry is on its way.</h3>
                <p className="mt-4 text-muted-foreground max-w-md mx-auto">{successMessage}</p>
                {referenceId && (
                  <div className="mt-6 inline-flex flex-col items-center gap-1 border border-gold/40 bg-gold/5 px-6 py-3">
                    <span className="eyebrow text-[0.6rem] text-muted-foreground">
                      Reference ID
                    </span>
                    <span className="font-mono text-navy tracking-widest">{referenceId}</span>
                  </div>
                )}
                <p className="mt-6 text-xs text-muted-foreground">
                  If your mail client didn't open, email us at{" "}
                  <a href="mailto:info@praharshinfrastructure.com" className="text-navy underline">
                    info@praharshinfrastructure.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <p className="sr-only">
                  <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                  <input
                    id="bot-field"
                    name="bot-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                </p>
                <h2 className="font-display text-3xl text-navy">Request a Proposal</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FieldWithError
                    label="Full Name"
                    name="name"
                    required
                    error={fieldErrors.name}
                    onBlur={handleFieldBlur}
                  />
                  <FieldWithError
                    label="Company / Organisation"
                    name="company"
                    error={fieldErrors.company}
                    onBlur={handleFieldBlur}
                  />
                  <FieldWithError
                    label="Email"
                    name="email"
                    type="email"
                    required
                    error={fieldErrors.email}
                    onBlur={handleFieldBlur}
                  />
                  <FieldWithError
                    label="Phone"
                    name="phone"
                    type="tel"
                    error={fieldErrors.phone}
                    onBlur={handleFieldBlur}
                  />
                </div>
                <FieldWithError
                  label="Project Type"
                  name="type"
                  placeholder="e.g. Solar EPC, Civil, Substation, Government Turnkey"
                  error={fieldErrors.type}
                  onBlur={handleFieldBlur}
                />
                <FieldWithError
                  label="Project Brief"
                  name="brief"
                  textarea
                  placeholder="Describe your project needs..."
                  error={fieldErrors.brief}
                  onBlur={handleFieldBlur}
                />
                {errorMessage && (
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submissionState === "submitting"}
                  className="inline-flex items-center gap-3 bg-navy text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gold hover:text-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-busy={submissionState === "submitting"}
                >
                  {submissionState === "submitting" ? "Sending..." : "Submit Enquiry"}
                  {submissionState !== "submitting" && <ArrowUpRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function FieldWithError({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  error,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const cls =
    "w-full bg-background border transition-colors outline-none px-4 py-3 text-sm text-navy focus:border-gold" +
    (error ? " border-destructive focus:border-destructive" : " border-border");

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
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cls}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </label>
  );
}

export default Contact;
