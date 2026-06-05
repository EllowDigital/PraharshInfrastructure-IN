import type { Handler } from "@netlify/functions";
import { createTransport } from "nodemailer";

// ── HTML email template ──────────────────────────────────────
function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  brief: string;
}): string {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — Praharsh Infrastructure</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e4e4e7;">
          <!-- Header -->
          <tr>
            <td style="background:#0B1F4D;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-size:20px;font-weight:600;color:#D4AF37;font-family:Georgia,serif;">
                Praharsh Infrastructure
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">New Project Enquiry</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${renderRow("Name", data.name)}
                ${renderRow("Email", `<a href="mailto:${escapeAttr(data.email)}" style="color:#0B1F4D;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
                ${renderRow("Phone", data.phone || "—")}
                ${renderRow("Company", data.company || "—")}
                ${renderRow("Project Type", data.projectType || "—")}
              </table>
              <!-- Brief -->
              <h3 style="margin:24px 0 8px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Project Brief</h3>
              <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:4px;padding:16px;font-size:14px;color:#1f2937;line-height:1.6;white-space:pre-wrap;">
                ${escapeHtml(data.brief || "No details provided.")}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Received: ${now} (IST) &nbsp;|&nbsp; praharshinfrastructure.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;width:120px;font-size:13px;font-weight:600;color:#6b7280;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;font-size:14px;color:#1f2937;">${value}</td>
  </tr>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(text: string): string {
  return text.replace(/"/g, "&quot;");
}

// ── Validation ────────────────────────────────────────────────
interface ContactBody {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  brief: string;
  honeypot: string;
}

function validateBody(
  body: Record<string, unknown>,
): { valid: false; errors: string[] } | { valid: true; data: ContactBody } {
  const errors: string[] = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
  const brief = typeof body.brief === "string" ? body.brief.trim() : "";
  const honeypot = typeof body.honeypot === "string" ? body.honeypot.trim() : "";

  if (!name || name.length < 2) errors.push("Name must be at least 2 characters.");
  if (name.length > 100) errors.push("Name must be under 100 characters.");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("A valid email address is required.");
  if (email.length > 254) errors.push("Email must be under 254 characters.");

  if (phone && !/^[+\d][\d\s\-().]{6,20}$/.test(phone))
    errors.push("Phone number format is invalid.");

  if (company && company.length > 200) errors.push("Company name must be under 200 characters.");
  if (projectType && projectType.length > 200)
    errors.push("Project type must be under 200 characters.");
  if (brief && brief.length > 5000) errors.push("Project brief must be under 5000 characters.");

  // Honeypot check — if filled, silently succeed but don't send
  if (honeypot) {
    // Pretend success to not tip off bots
    return { valid: false, errors: [] };
  }

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    data: { name, email, phone, company, projectType, brief, honeypot: "" },
  };
}

// ── Rate limiter (simple in-memory, per IP) ─────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

// ── Handler ──────────────────────────────────────────────────
const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: "Method not allowed." }),
    };
  }

  // Rate limit
  const clientIp =
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ??
    event.headers["client-ip"] ??
    "unknown";
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: false,
        message: "Too many requests. Please wait a moment before trying again.",
      }),
    };
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: "Invalid JSON body." }),
    };
  }

  // Validate
  const validation = validateBody(body);
  if (!validation.valid) {
    // If honeypot triggered (empty errors), pretend success
    if (validation.errors.length === 0) {
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify({ success: true, message: "Thank you for your enquiry." }),
      };
    }
    return {
      statusCode: 422,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, errors: validation.errors }),
    };
  }

  const { data } = validation;

  // Read SMTP config from environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const contactReceiver = process.env.CONTACT_RECEIVER;

  if (!smtpHost || !emailUser || !emailPass || !contactReceiver) {
    console.error("contact-email: Missing SMTP environment variables.");
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: "Server configuration error." }),
    };
  }

  // Create transporter
  const transporter = createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transporter.sendMail({
      from: {
        name: "Praharsh Website",
        address: emailUser,
      },
      to: contactReceiver,
      replyTo: {
        name: data.name,
        address: data.email,
      },
      subject: `New Enquiry from ${data.name} — ${data.projectType || "General"}`,
      html: buildEmailHtml(data),
    });

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: true,
        message: "Thank you for your enquiry. Our team will respond within one working day.",
      }),
    };
  } catch (error) {
    console.error("contact-email: Failed to send email:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: false,
        message: "Failed to send your enquiry. Please try again or email us directly.",
      }),
    };
  }
};

function corsHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://praharshinfrastructure.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export { handler };
