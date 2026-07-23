
-- Allow anyone (anon + authenticated) to upload into chat-attachments bucket.
-- No SELECT/UPDATE/DELETE policies -> uploaders cannot list or read back files.
-- Signed URLs are generated server-side via the save-chat-lead edge function.
CREATE POLICY "Public can upload chat attachments"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'chat-attachments');
