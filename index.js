import { callOpenAI, supabase } from "./config.js";

const movieQuiz = document.getElementById("movie-quiz");
const responseDiv = document.getElementById("response");
const startOverBtn = document.getElementById("start-over-btn");

document.body.addEventListener("click", (e) => {
  if (e.target.id === "start-over-btn") {
    movieQuiz.classList.remove("hidden");
    responseDiv.classList.add("hidden");
  }
});

movieQuiz.addEventListener("submit", async (e) => {
  e.preventDefault();

  const queryText = buildQueryText();

  const embedResp = await fetch("/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: queryText }),
  });
  const embedData = await embedResp.json();
  const queryEmbedding = embedData.data[0].embedding;

  const { data } = await supabase.rpc("match_movies", {
    query_embedding: queryEmbedding,
    match_count: 5,
  });

  const candidates = data
    .map((row, i) => `#${i + 1}\n${row.content}`)
    .join("\n\n");

  const completion = await callOpenAI({
    model: "gpt-4o-mini",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "movie_recommendation",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            year: { type: "integer" },
            reason: { type: "string" },
          },
          required: ["title", "year", "reason"],
        },
      },
    },
    messages: [
      {
        role: "system",
        content:
          "You are a movie recommender. Respond with the JSON only no extra characters or labeling",
      },
      {
        role: "user",
        content: `User preferences:\n${queryText}\n\nReturn JSON only with keys: title, year, reason.
        Database candidates (use these if they are a strong match):
        ${candidates}

        If none of the candidates are a good fit, recommend a movie outside the database instead. Always explain why.
        `,
      },
    ],
  });
  const raw = completion.choices[0].message.content.trim();
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const jsonText = raw
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/i, "")
      .trim();
    parsed = JSON.parse(jsonText);
  }
  movieQuiz.reset();
  makeMovieRecommendation(parsed);
});

function makeMovieRecommendation(movieObj) {
  movieQuiz.classList.add("hidden");
  responseDiv.classList.remove("hidden");
  const { title, year, reason } = movieObj;
  responseDiv.innerHTML = `
    <h2>${title} (${year})</h2>
    <p>
      ${reason}
    </p>
    <button id="start-over-btn">Go Again</button>
  `;
}

function buildQueryText() {
  const favorite = document.getElementById("favorite-movie").value.trim();
  const mood = document.getElementById("mood").value.trim();
  const tone = document.getElementById("fun-or-serious").value.trim();

  return [
    `Favorite movie + why: ${favorite}`,
    `Mood (new or classic): ${mood}`,
    `Tone (fun or serious): ${tone}`,
  ].join("\n");
}
