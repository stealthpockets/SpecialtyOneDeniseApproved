// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const url = new URL(req.url);
  const seriesParam = url.searchParams.get("series_id");
  if (!seriesParam) {
    return new Response(JSON.stringify({ error: "Missing series_id" }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  const apiKey = Deno.env.get("FRED_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing FRED_API_KEY" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  // Support multiple series IDs, comma-separated
  const seriesIds = seriesParam.split(",").map((s) => s.trim()).filter(Boolean);
  const results: Record<string, any> = {};
  const currentDate = new Date().toISOString().split("T")[0]; // e.g., "2025-06-16"

  for (const id of seriesIds) {
    // First try with realtime_end parameter
    let fredUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${apiKey}&file_type=json&realtime_end=${currentDate}&limit=5&sort_order=desc`;
    
    console.log(`[fred-proxy] Fetching FRED API: ${fredUrl}`);
    
    try {
      let fredRes = await fetch(fredUrl);
      
      // If the first request fails with 400, try without realtime_end
      if (!fredRes.ok && fredRes.status === 400) {
        console.log(`[fred-proxy] First attempt failed for ${id} with status 400, trying without realtime_end`);
        fredUrl = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${apiKey}&file_type=json&limit=5&sort_order=desc`;
        fredRes = await fetch(fredUrl);
      }
      
      if (!fredRes.ok) {
        throw new Error(`FRED API returned status ${fredRes.status}`);
      }
      
      const data = await fredRes.json();
      console.log(`[fred-proxy] Response for ${id}:`, JSON.stringify(data, null, 2));

      // Filter out invalid observations and take the 2 most recent valid ones
      const validObservations = data.observations.filter((obs: any) => obs.value !== ".");
      if (validObservations.length > 0) {
        // Take the 2 most recent valid observations for change calculation
        results[id] = { observations: validObservations.slice(0, 2) };
      } else {
        console.warn(`[fred-proxy] No valid observations for ${id}`);
        results[id] = { observations: [] };
      }
    } catch (e) {
      console.error(`[fred-proxy] Error fetching ${id}:`, e.message);
      results[id] = { error: `Failed to fetch: ${e.message}` };
    }
  }

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/fred-proxy' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
