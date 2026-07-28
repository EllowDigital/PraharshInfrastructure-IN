import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { SEO } from "@/components/site/SEO";
import { Section } from "@/components/site/Section";
import { Briefcase, MapPin, Upload, CheckCircle2, Send, FileText, X } from "lucide-react";
import { generateReferenceId, checkClientRateLimit } from "@/lib/enquiry";

const OPENINGS = [
  { title: "Site Engineer — Electrical & Solar", location: "Lucknow, UP", type: "Full-time" },
  {
    title: "Project Manager — Road Infrastructure",
    location: "Uttar Pradesh (Field)",
    type: "Full-time",
  },
  { title: "GeM & Tender Executive", location: "Lucknow, UP", type: "Full-time" },
  { title: "Business Development Manager", location: "Lucknow / Delhi NCR", type: "Full-time" },
  { title: "Design & Signage Production Lead", location: "Lucknow, UP", type: "Full-time" },
  { title: "General Application", location: "Anywhere", type: "Any" },
];

const MAX_MB = 10;

export default function Careers() {
  const formLoadedAtRef = useRef<number>(Date.now());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: OPENINGS[0].title,
    experience: "",
    location: "",
    message: "",
    website: "", // honeypot
  });
  const [resume, setResume] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [refId, setRefId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Resume must be under ${MAX_MB} MB.`);
      return;
    }
    setResume(file);
  };

  const scrollToForm = (role: string) => {
    setForm((f) => ({ ...f, role }));
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot
    if (form.website.trim()) {
      setSent(true);
      return;
    }
    // Time trap
    if (Date.now() - formLoadedAtRef.current < 3000) {
      setError("Please take a moment to review your details before submitting.");
      return;
    }
    // Client-side rate limit
    const rl = checkClientRateLimit("careers", { max: 3, windowMs: 10 * 60 * 1000 });
    if (!rl.allowed) {
      const mins = Math.ceil(rl.retryAfterSec / 60);
      setError(
        `You've submitted several applications recently. Please try again in about ${mins} minute${mins === 1 ? "" : "s"}.`,
      );
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in your name, email and phone.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    const reference = generateReferenceId("PI-CAR");
    const subject = `[${reference}] Application: ${form.role} — ${form.name}`;
    const bodyLines = [
      `Reference ID: ${reference}`,
      `Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
      "",
      `Applicant: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Role: ${form.role}`,
      `Experience: ${form.experience || "—"}`,
      `Current Location: ${form.location || "—"}`,
      "",
      "Cover Note:",
      form.message || "—",
      "",
      resume
        ? `Resume: ${resume.name} (${(resume.size / 1024).toFixed(0)} KB) — please attach this file to the email before sending.`
        : "Resume: (not attached — please attach before sending)",
    ];
    const mailto = `mailto:careers@praharshinfrastructure.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
    setRefId(reference);
    setSent(true);
    window.setTimeout(() => setSent(false), 12000);
  };

  return (
    <>
      <SEO
        title="Careers at Praharsh Infrastructure | Engineering & Project Jobs"
        description="Join Praharsh Infrastructure. Explore engineering, project management, GeM/tender and business development roles across India."
        keywords="infrastructure jobs India, solar engineer Lucknow, GeM tender executive, PWD site engineer, careers Praharsh"
        url="https://www.praharshinfrastructure.com/careers"
      />
      <div className="pt-24" />
      <Section
        eyebrow="Careers"
        title="Build the infrastructure of tomorrow with us"
        intro="We are a growing infrastructure and government supply company. If you thrive on ownership, precision and impact — we would love to hear from you."
      />

      <Section muted eyebrow="Open Positions" title="Current openings">
        <div className="grid gap-4">
          {OPENINGS.filter((o) => o.title !== "General Application").map((o) => (
            <button
              key={o.title}
              type="button"
              onClick={() => scrollToForm(o.title)}
              className="group text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-background border border-border p-6 hover:border-gold transition-colors"
            >
              <div>
                <div className="font-display text-xl text-navy group-hover:text-gold transition-colors">
                  {o.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {o.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> {o.type}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:text-gold">
                Apply now →
              </span>
            </button>
          ))}
        </div>
      </Section>

      <div id="apply-form" />
      <Section
        eyebrow="Application Form"
        title="Send us your application"
        intro="Fill in your details, select the role and upload your resume. We'll open your email client with a pre-filled application — just attach your resume file and send."
      >
        <form
          onSubmit={onSubmit}
          className="max-w-3xl bg-background border border-border p-8 grid gap-5"
          noValidate
        >
          {/* Honeypot — hidden from real users */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website (leave blank)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name *">
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none"
              />
            </Field>
            <Field label="Email *">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none"
              />
            </Field>
            <Field label="Phone *">
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none"
              />
            </Field>
            <Field label="Current Location">
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="City, State"
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none"
              />
            </Field>
            <Field label="Role Applying For *">
              <select
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none bg-background"
              >
                {OPENINGS.map((o) => (
                  <option key={o.title} value={o.title}>
                    {o.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Years of Experience">
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="e.g. 4 years"
                className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none"
              />
            </Field>
          </div>

          <Field label="Cover Note (optional)">
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Briefly tell us why you'd be a great fit..."
              className="w-full border border-border px-4 py-3 text-sm focus:border-gold outline-none resize-none"
            />
          </Field>

          <Field label={`Resume (PDF/DOC, max ${MAX_MB} MB)`}>
            {!resume ? (
              <label className="flex items-center gap-3 border border-dashed border-border p-5 cursor-pointer hover:border-gold transition-colors">
                <Upload className="w-5 h-5 text-navy" />
                <span className="text-sm text-muted-foreground">Click to upload your resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center gap-3 border border-border p-4 bg-muted/30">
                <FileText className="w-5 h-5 text-gold" />
                <div className="text-sm text-navy flex-1 truncate">
                  {resume.name}{" "}
                  <span className="text-muted-foreground">
                    ({(resume.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setResume(null)}
                  className="p-1 text-muted-foreground hover:text-navy"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </Field>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {sent && (
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="w-4 h-4" /> Email client opened — please attach your resume
              and hit send.
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 text-sm font-medium hover:bg-gold hover:text-navy transition-colors w-full sm:w-auto"
          >
            <Send className="w-4 h-4" /> Submit Application
          </button>

          <p className="text-xs text-muted-foreground">
            Your application opens in your default email app addressed to{" "}
            <span className="text-navy">careers@praharshinfrastructure.com</span>. Attach your
            resume file in the email before sending. We reply within 5 working days.
          </p>
        </form>
      </Section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-widest uppercase text-navy mb-2">{label}</span>
      {children}
    </label>
  );
}
