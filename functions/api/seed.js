import movies from "../../content.js";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Seed-Token",
  };
}

function buildContent(movie) {
  return `Title: ${movie.title}\nRelease Year: ${movie.releaseYear}\nContent: ${movie.content}`;
}

export async function onRequest(context) {
  const origin = context.env.ALLOWED_ORIGIN || "*";
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return new Response("Not found", { status: 404 });
  }

  if (context.env.SEED_TOKEN) {
    const token = request.headers.get("X-Seed-Token");
    if (token !== context.env.SEED_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const supabaseUrl = context.env.SUPABASE_URL;
  const supabaseServiceKey = context.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = context.env.SUPABASE_TABLE || "movies";

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response("Missing Supabase server env vars", { status: 500 });
  }

  const inputs = movies.map(buildContent);
  const embedResponse = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: inputs,
    }),
  });

  if (!embedResponse.ok) {
    const message = await embedResponse.text();
    return new Response(message || "Embedding failed", { status: 502 });
  }

  const embedData = await embedResponse.json();
  const rows = inputs.map((content, index) => ({
    content,
    embedding: embedData.data[index].embedding,
  }));

  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rows),
  });

  if (!insertResponse.ok) {
    const message = await insertResponse.text();
    return new Response(message || "Insert failed", { status: 502 });
  }

  return new Response(JSON.stringify({ inserted: rows.length }), {
    status: 200,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}
