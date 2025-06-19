import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const UPLOAD_BUCKET = 'contact-form-attachments';
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

serve(async (req) => {
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization')! } } });

    const formData = await req.formData();
    const file = formData.get('attachment') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Server-side validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return new Response(JSON.stringify({ error: `File size exceeds ${MAX_FILE_SIZE_MB}MB.` }), { status: 413, headers: { 'Content-Type': 'application/json' } });
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type.' }), { status: 415, headers: { 'Content-Type': 'application/json' } });
    }

    // In a real-world app, you would scan the file for malware here.
    // This is a placeholder for that logic.
    const isMalicious = false; // Replace with actual scan result
    if (isMalicious) {
        return new Response(JSON.stringify({ error: 'Malicious file detected.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const filePath = `public/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(UPLOAD_BUCKET).upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage.from(UPLOAD_BUCKET).getPublicUrl(filePath);

    return new Response(JSON.stringify({ publicUrl: publicUrlData.publicUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
