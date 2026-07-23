// Save a chat lead (quote request or human handoff) into the chat_leads table.
// Public endpoint — no JWT required. Zod-validated.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.24.2";

const AttachmentSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().int().nonnegative().max(10 * 1024 * 1024),
  type: z.string().max(200),
  path: z.string().max(500).optional(),
  signed_url: z.string().url().max(2000).optional(),
});

const BodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(5).max(30).optional().nullable(),
  email: z.string().trim().email().max(254).optional().nullable(),
  project_type: z.string().trim().max(120).optional().nullable(),
  budget_range: z.string().trim().max(80).optional().nullable(),
  message: z.string().trim().max(5000).optional().nullable(),
  language: z.enum(["en", "hi", "bn"]).optional().default("en"),
  attachments: z.array(AttachmentSchema).max(5).optional().default([]),
  preferred_time: z.string().trim().max(120).optional().nullable(),
  status: z.enum(["new", "handoff_requested"]).optional().default("new"),
  source: z.string().trim().max(60).optional().default("chat_widget"),
}).refine((v) => v.phone || v.email, {
  message: "Provide at least a phone number or email.",
  path: ["phone"],
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "invalid_input", details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const data = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inserted, error } = await supabase
      .from("chat_leads")
      .insert({
        name: data.name,
        phone: data.phone ?? null,
        email: data.email ?? null,
        project_type: data.project_type ?? null,
        budget_range: data.budget_range ?? null,
        message: data.message ?? null,
        language: data.language ?? "en",
        attachments: data.attachments ?? [],
        preferred_time: data.preferred_time ?? null,
        status: data.status ?? "new",
        source: data.source ?? "chat_widget",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("insert failed:", error);
      return new Response(
        JSON.stringify({ error: "insert_failed", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Short human-friendly reference derived from UUID
    const ref = `PI-${String(inserted.id).slice(0, 8).toUpperCase()}`;
    return new Response(
      JSON.stringify({ ok: true, id: inserted.id, reference: ref, created_at: inserted.created_at }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("unexpected:", e);
    return new Response(
      JSON.stringify({ error: "server_error", details: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
