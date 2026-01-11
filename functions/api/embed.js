export async function onRequest({ request, env }) {
  if (request.method !== "POST")
    return new Response("Not found", { status: 404 });
  const { input } = await request.json();

  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input }),
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: { "Content-Type": "application/json" },
  });
}
