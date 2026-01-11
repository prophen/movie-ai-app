import { createClient } from "@supabase/supabase-js";

/** Supabase config (anon key is safe for client when RLS is enabled) */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
if (!supabaseUrl) throw new Error("Expected env var VITE_SUPABASE_URL");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseAnonKey) throw new Error("Expected env var VITE_SUPABASE_ANON_KEY");
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** OpenAI via Cloudflare Pages Function (no secrets in the browser) */
const workerBaseUrl = import.meta.env.VITE_WORKER_URL || "";
const openAiEndpoint = workerBaseUrl ? `${workerBaseUrl}/api/openai` : "/api/openai";

export async function callOpenAI(payload) {
  const response = await fetch(openAiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "OpenAI request failed");
  }

  return response.json();
}
