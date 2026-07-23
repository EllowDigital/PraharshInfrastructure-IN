## Scope

Two parallel workstreams: (A) major upgrade to the "Chat with us" widget, (B) homepage polish + enterprise trust proof.

---

## A. Chat with us widget upgrade

**1. File upload in the 30-second quote form**

- Add an "Attach drawings / BOQ / spec sheets" step in the guided flow.
- Accept PDF, DWG, DXF, XLS/XLSX, DOC/DOCX, JPG/PNG (max 5 files, 10 MB each).
- Upload to Lovable Cloud Storage (private bucket `chat-attachments`) and collect signed URLs.
- Include a short file summary (name · size · signed URL) inside the pre-filled WhatsApp/email message.

**2. Multilingual support**

- Language switcher in the widget header: English, हिन्दी, বাংলা (extensible).
- Translate all bot copy, menus, quote-form questions, validation errors, confirmations.
- Persist the selected language in `localStorage`.

**3. Persist every chat lead**

- Enable Lovable Cloud.
- Create `chat_leads` table: `id, created_at, name, phone, email, project_type, budget_range, message, language, attachments jsonb, status text default 'new', source text`.
- Insert via an edge function `save-chat-lead` (validated with Zod; RLS: insert allowed for anon, select restricted to authenticated + admin role).
- Show a success confirmation card in the widget with a reference ID.

**4. Human handoff flow**

- New "Talk to a human" flow: captures name, phone, email, preferred time window, topic.
- Saves as a lead with `status = 'handoff_requested'`.
- Sends a structured summary email via Lovable Emails (`send-handoff-email` edge function) to the corporate inbox.
- Confirms in-widget with expected callback window.

**5. FAQ quick-replies**

- Add an "FAQs" menu with instant-answer buttons: Services offered, Typical project timelines, Certifications & compliance, Coverage area, Payment terms, Warranty, GeM/tender participation.
- Each answer rendered inline with follow-up actions (Ask another / Talk to human / Get a quote).

---

## B. Homepage polish + trust proof

**6. Spacing, alignment & responsive breakpoints**

- Normalize `Section` vertical rhythm using a single scale (`py-16 md:py-20 lg:py-28`).
- Standardize bento grid gaps (`gap-4 md:gap-6 lg:gap-8`) and container max-width (`max-w-7xl`).
- Audit each homepage block at 375 / 768 / 1280 / 1920 widths; fix overflow, wrap, and alignment issues.
- Fluid typography via `clamp()` for section headings.

**7. Client logos carousel**

- New `ClientsCarousel` component: infinite marquee of monochrome/gold client logos (UPSIC, DRDA, PWD, GeM, NHAI, etc.), pause on hover/focus, `prefers-reduced-motion` support, ARIA label.

**8. Project metrics band**

- Animated counters (projects delivered, districts covered, MW solar installed, km roads, years experience). Uses `IntersectionObserver` + `prefers-reduced-motion` fallback.

**9. Accreditation detail modals**

- Each accreditation tile (ISO 9001, ISO 14001, ISO 45001, GeM, MSME, PWD, EPFO) opens an accessible Radix Dialog with issuer, scope, validity, and a "View certificate" action.
- Full keyboard nav, focus trap, ESC to close, ARIA labelled.

---

## Technical notes

- Backend: Lovable Cloud (Supabase) — 1 storage bucket + 1 table + 2 edge functions (`save-chat-lead`, `send-handoff-email`).
- Email: Lovable Emails (requires email domain setup — will prompt user via the setup dialog if not configured).
- i18n: lightweight custom dictionary (no i18next dependency) keyed by locale, exported from `src/lib/chat-i18n.ts`.
- Validation: Zod on client + edge functions.
- Accessibility: ARIA live regions, focus management, reduced-motion, keyboard nav across all new UI.
- No design-system color hardcoding — reuse existing navy/gold tokens.

## Out of scope

- Building an admin CRM UI to browse leads (leads land in DB + email; admin view can be a follow-up).
- Additional languages beyond the three seeded (easy to extend later).
