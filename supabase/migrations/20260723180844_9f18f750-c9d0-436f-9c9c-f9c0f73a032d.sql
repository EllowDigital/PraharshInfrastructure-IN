
DROP POLICY IF EXISTS "Anyone can insert a chat lead" ON public.chat_leads;

CREATE POLICY "Anyone can insert a chat lead with contact info"
  ON public.chat_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (name IS NOT NULL AND length(trim(name)) BETWEEN 1 AND 200)
    AND (phone IS NOT NULL OR email IS NOT NULL)
    AND (phone IS NULL OR length(phone) BETWEEN 5 AND 30)
    AND (email IS NULL OR length(email) BETWEEN 3 AND 254)
    AND (message IS NULL OR length(message) <= 5000)
  );
