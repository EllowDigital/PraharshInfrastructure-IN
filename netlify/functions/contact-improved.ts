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

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1f2937; width: 120px;">${label}:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">${value}</td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; color: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #001f3f 0%, #003366 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; }
    .content { background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
    .content table { width: 100%; border-collapse: collapse; }
    .footer { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #6b7280; }
    .timestamp { text-align: right; margin-top: 20px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Enquiry Received</h1>
      <p>From Praharsh Infrastructure Website</p>
    </div>
    <div class="content">
      <table>
        ${rows}
      </table>
      <div class="timestamp">
        <p>Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from your website contact form.</p>
      <p>&copy; Praharsh Infrastructure. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
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
  const clientIp = event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
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
      connectionTimeout: 5000,
      socketTimeout: 5000,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 10,
    });

    // Verify SMTP connection
    await transporter.verify();

    // Create email content
    const htmlContent = createEmailHtml(data);
    const textContent = createPlainText(data);

    // Send email
    const info = await transporter.sendMail({
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
