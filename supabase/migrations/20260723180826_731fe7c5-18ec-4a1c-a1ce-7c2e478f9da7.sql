
-- Chat leads table
CREATE TABLE public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  email text,
  project_type text,
  budget_range text,
  message text,
  language text default 'en',
  attachments jsonb default '[]'::jsonb,
  preferred_time text,
  status text not null default 'new',
  source text default 'chat_widget'
);

GRANT INSERT ON public.chat_leads TO anon, authenticated;
GRANT ALL ON public.chat_leads TO service_role;

ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous chat visitors) can create a lead. No one can read/update/delete via the API.
CREATE POLICY "Anyone can insert a chat lead"
  ON public.chat_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
