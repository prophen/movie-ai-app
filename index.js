import { callOpenAI, supabase } from "./config.js";

// button.addEventListener("click", async () => {
//   result.textContent = "Loading...";
//   button.disabled = true;
//   try {
//     const data = await callOpenAI({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: "Say hello world in one sentence." }],
//     });
//     result.textContent = data?.choices?.[0]?.message?.content || "No response";
//   } catch (error) {
//     result.textContent = `Error: ${error.message || error}`;
//   } finally {
//     button.disabled = false;
//   }
// });
