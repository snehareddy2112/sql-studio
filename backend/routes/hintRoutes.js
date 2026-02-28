const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { question, userQuery } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const prompt = `
You are a SQL mentor helping a student.

STRICT RULES:
- Do NOT give the final SQL query.
- Do NOT write a complete solution.
- Only give conceptual hints.
- Keep response under 5 sentences.
- Guide the student toward thinking about filtering, conditions, joins, etc.

Assignment Question:
${question}

Student Query:
${userQuery || "No query written yet."}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful SQL mentor." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const hint = response.data.choices[0].message.content;

    res.json({ hint });

  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate hint." });
  }
});

module.exports = router;