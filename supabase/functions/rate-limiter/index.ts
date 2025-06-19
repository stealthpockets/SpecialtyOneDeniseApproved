import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RATE_LIMIT_TABLE = 'rate_limit';
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_SIZE_MS = 60000; // 1 minute

serve(async (req) => {
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: req.headers.get('Authorization')! } } });
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    const now = Date.now();
    const windowStart = now - WINDOW_SIZE_MS;

    const { data, error } = await supabase
      .from(RATE_LIMIT_TABLE)
      .select('timestamp')
      .eq('ip_address', ip)
      .gte('timestamp', new Date(windowStart).toISOString());

    if (error) {
      throw error;
    }

    if (data && data.length >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(JSON.stringify({ error: 'Too many requests.' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }

    const { error: insertError } = await supabase.from(RATE_LIMIT_TABLE).insert({ ip_address: ip });

    if (insertError) {
      throw insertError;
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
