import nodemailer from "nodemailer";
import type { Handler } from "@netlify/functions";

// Type definitions
interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  brief?: string;
  honeypot?: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
  timestamp?: string;
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  const phoneRegex = /^\+?[\d\s\-()]{7,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function validatePayload(payload: unknown): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Invalid payload format" };
  }

  const data = payload as Record<string, unknown>;

  // Required fields
  const name = data.name as string;
  const email = data.email as string;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Invalid name" };
  }

  if (!email || typeof email !== "string") {
    return { valid: false, error: "Invalid email" };
  }

  if (!validateEmail(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Optional phone
  const phone = data.phone as string | undefined;
  if (phone && !validatePhone(phone)) {
    return { valid: false, error: "Invalid phone format" };
  }

  // Optional fields length validation
  const company = data.company as string | undefined;
  if (company && company.length > 150) {
    return { valid: false, error: "Company name too long" };
  }

  const brief = data.brief as string | undefined;
  if (brief && (brief.length < 10 || brief.length > 2000)) {
    return { valid: false, error: "Brief must be between 10 and 2000 characters" };
  }

  return { valid: true };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitStore.get(ip) || [];

  // Remove old requests outside the window
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function createEmailHtml(payload: ContactPayload): string {
  const fields = [
    ["Name", sanitizeHtml(payload.name)],
    ["Email", sanitizeHtml(payload.email)],
    ["Phone", sanitizeHtml(payload.phone || "N/A")],
    ["Company", sanitizeHtml(payload.company || "N/A")],
    ["Project Type", sanitizeHtml(payload.projectType || "N/A")],
    ["Brief", sanitizeHtml(payload.brief || "N/A")],
  ];

  const rowsHtml = fields
    .map(
      ([label, value]) => `
        <tr>
          <td class="row-key">${label}</td>
          <td class="row-val">${value}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin:0; padding:0; background:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color:#1f2937; }
    .wrapper { width:100%; table-layout:fixed; background:#f4f6f8; padding:24px 0; }
    .container { width:100%; max-width:620px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(16,24,40,0.08); border:1px solid rgba(16,24,40,0.04); }
    .header { background:linear-gradient(135deg,#04273a 0%,#0a4370 100%); color:#ffffff; padding:20px 20px; display:flex; align-items:center; gap:16px; }
    .logo { display:block; width:120px; max-width:33%; height:auto; border-radius:6px; background:white; padding:4px; }
    .brand { flex:1; }
    .brand h1 { margin:0; font-size:18px; letter-spacing:0.2px; font-weight:700; }
    .brand p { margin:4px 0 0 0; font-size:13px; opacity:0.92; }
    .hero { padding:20px; }
    .title { font-size:20px; margin:0 0 10px 0; color:#0f172a; font-weight:700; }
    .subtitle { margin:0 0 18px 0; color:#475569; font-size:14px; }
    .content-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
    .row-key { width:36%; padding:12px 12px; background:#f8fafc; color:#475569; font-weight:600; vertical-align:top; border-bottom:1px solid #eef2f7; font-size:14px; }
    .row-val { padding:12px 12px; color:#0f172a; vertical-align:top; border-bottom:1px solid #eef2f7; font-size:14px; }
    .timestamp { text-align:right; color:#94a3b8; font-size:12px; margin-top:6px; }
    .cta { display:block; text-align:center; margin:18px 0 0; }
    .button { background:#0a66c2; color:#ffffff; text-decoration:none; padding:10px 18px; border-radius:8px; display:inline-block; font-weight:600; font-size:14px; }
    .footer { background:#fbfdff; padding:16px 20px; border-top:1px solid #eef2f7; color:#64748b; font-size:12px; text-align:center; }
    .small { font-size:12px; color:#94a3b8; }
    @media (max-width:420px) {
      .header { padding:14px; gap:10px; }
      .logo { width:92px; }
      .brand h1 { font-size:16px; }
      .hero { padding:16px; }
      .row-key, .row-val { display:block; width:100%; box-sizing:border-box; }
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" class="container" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td class="header">
                <img class="logo" src="https://praharshinfrastructure.com/images/logo.jpeg" alt="Praharsh Infrastructure logo" width="140" />
                <div class="brand" style="line-height:1;">
                  <h1>Praharsh Infrastructure</h1>
                  <p style="margin:4px 0 0 0; font-size:13px; opacity:0.95;">New enquiry received from website contact form</p>
                </div>
              </td>
            </tr>

            <tr>
              <td class="hero" style="padding-top:18px;">
                <p class="title">New Enquiry — Details</p>
                <p class="subtitle">Below are the details submitted via the contact form. Reply promptly to convert the lead.</p>

                <table class="content-table" role="presentation" cellspacing="0" cellpadding="0" border="0">
                  ${rowsHtml}
                </table>

                <div class="timestamp">
                  Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </div>

                <div class="cta">
                  <a class="button" href="https://praharshinfrastructure.com" target="_blank" rel="noopener">Open Dashboard</a>
                </div>
              </td>
            </tr>

            <tr>
              <td class="footer">
                <div style="max-width:560px; margin:0 auto;">
                  <div style="margin-bottom:6px;">This is an automated message from your website contact form.</div>
                  <div style="color:#6b7280; font-size:12px; margin-bottom:6px;">&copy; Praharsh Infrastructure</div>
                  <div class="small"><a href="https://praharshinfrastructure.com" style="color:#0a66c2; text-decoration:none;">Visit our website</a> &nbsp;|&nbsp; <span style="color:#94a3b8;">Prefer not to receive these messages? Update your settings.</span></div>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
}

function createPlainText(payload: ContactPayload): string {
  return `
NEW ENQUIRY RECEIVED
====================

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || "N/A"}
Company: ${payload.company || "N/A"}
Project Type: ${payload.projectType || "N/A"}
Brief: ${payload.brief || "N/A"}

---
Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
  `.trim();
}

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Get client IP for rate limiting
  const clientIp =
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers["client-ip"] ||
    context.clientContext?.identity?.sourceIp ||
    "unknown";

  // Check rate limiting
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      body: JSON.stringify({
        success: false,
        message: "Too many requests. Please try again later.",
      }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Validate request body exists
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Request body is required" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Parse JSON body
  let payload: unknown;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid JSON format" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Validate payload structure
  const validation = validatePayload(payload);
  if (!validation.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: validation.error }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const data = payload as ContactPayload;

  // Bot detection (honeypot)
  if (data.honeypot?.trim()) {
    // Silently accept to fool bots, but don't process
    console.warn(`Honeypot triggered from IP: ${clientIp}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Get environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const toEmail = process.env.CONTACT_RECEIVER ?? smtpUser;

  // Validate environment configuration
  if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
    console.error("Email service not configured", {
      hasHost: !!smtpHost,
      hasUser: !!smtpUser,
      hasPass: !!smtpPass,
      hasTo: !!toEmail,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Email service is currently unavailable. Please try again later.",
      }),
      headers: { "Content-Type": "application/json" },
    };
  }

  try {
    // Create transporter with connection pool
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // increase timeouts to allow providers a bit more time
      connectionTimeout: 20000,
      socketTimeout: 20000,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 10,
    });

    // Log SMTP host/port (do not log secrets)
    console.log("SMTP config", { host: smtpHost, port: smtpPort, secure: smtpSecure });

    // Verify SMTP connection with safe error reporting
    try {
      await transporter.verify();
      console.log("SMTP verification succeeded");
    } catch (verifyErr) {
      console.error(
        "SMTP verify failed:",
        verifyErr instanceof Error ? verifyErr.stack || verifyErr.message : String(verifyErr),
      );
      throw verifyErr;
    }

    // Create email content
    const htmlContent = createEmailHtml(data);
    const textContent = createPlainText(data);

    // Send email
    // attempt send with a small retry loop to mitigate transient timeouts
    let info: any = null;
    const maxSendAttempts = 3;
    for (let attempt = 1; attempt <= maxSendAttempts; attempt++) {
      try {
        info = await transporter.sendMail({
          from: `"Praharsh Enquiry" <${smtpUser}>`,
          to: toEmail,
          replyTo: data.email,
          subject: `New Enquiry from ${data.name} - ${data.projectType || "Website Contact"}`,
          text: textContent,
          html: htmlContent,
          headers: {
            "X-Enquiry-Source": "website-contact-form",
            "X-Client-IP": clientIp,
          },
        });
        break; // success
      } catch (sendErr) {
        console.error(
          `sendMail attempt ${attempt} failed:`,
          sendErr instanceof Error ? sendErr.stack || sendErr.message : String(sendErr),
        );
        if (attempt === maxSendAttempts) throw sendErr;
        // small backoff before retrying
        await new Promise((res) => setTimeout(res, 1000 * attempt));
      }
    }

    console.log("Email sent successfully", {
      messageId: info.messageId,
      response: info.response,
      from: data.email,
    });

    // Close transporter
    transporter.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Enquiry received successfully",
        timestamp: new Date().toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Contact form error:", {
      error: errorMsg,
      clientIp,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to send enquiry. Please try again or contact us directly.",
      }),
      headers: { "Content-Type": "application/json" },
    };
  }
};
