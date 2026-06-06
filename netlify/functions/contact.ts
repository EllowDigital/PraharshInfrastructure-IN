import nodemailer from "nodemailer";

type ContactEvent = {
  httpMethod?: string;
  body?: string;
};

export const handler = async (event: unknown) => {
  const request = event as ContactEvent;

  if (request.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  if (!request.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Request body is required." }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid JSON body." }),
    };
  }

  const { name, company, email, phone, projectType, brief, honeypot } = payload;

  if (honeypot?.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Bot detected." }),
    };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message:
          "Email service is not configured. Please set SMTP_HOST, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL.",
      }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const message = [
    `Name: ${name ?? "N/A"}`,
    `Company: ${company ?? "N/A"}`,
    `Email: ${email ?? "N/A"}`,
    `Phone: ${phone ?? "N/A"}`,
    `Project Type: ${projectType ?? "N/A"}`,
    `Brief:\n${brief ?? "N/A"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      subject: `New enquiry from ${name ?? "Website Contact"}`,
      text: message,
      html: `<pre style="font-family:system-ui, sans-serif; white-space:pre-wrap;">${message}</pre>`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Contact function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Failed to send message." }),
    };
  }
};
