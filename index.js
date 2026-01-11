import { callOpenAI, supabase } from "./config.js";

const app = document.createElement("div");
app.id = "app";
app.style.maxWidth = "720px";
app.style.margin = "40px auto";
app.style.fontFamily = "system-ui, sans-serif";
app.innerHTML = `
  <h1>OpenAI Hello World</h1>
  <button id="run-hello">Run</button>
  <pre id="result" style="margin-top:16px; white-space:pre-wrap;"></pre>
`;
document.body.appendChild(app);

const button = document.getElementById("run-hello");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.textContent = "Loading...";
  button.disabled = true;
  try {
    const data = await callOpenAI({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say hello world in one sentence." }],
    });
    result.textContent = data?.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    result.textContent = `Error: ${error.message || error}`;
  } finally {
    button.disabled = false;
  }
});
