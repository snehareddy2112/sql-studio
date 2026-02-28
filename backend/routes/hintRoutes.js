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
- Do NOT provide the final SQL query.
- Do NOT write a complete solution.
- Only give conceptual hints.
- Keep response short (max 4 sentences).

Assignment Question:
${question}

Student Query:
${userQuery || "No query written yet."}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "system", content: "You are a helpful SQL mentor." },
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 120
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "CipherSQLStudio",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("OpenRouter Full Response:", response.data);

    if (!response.data.choices || !response.data.choices[0]) {
      return res.status(500).json({ error: "Invalid response from model." });
    }

    const hint = response.data.choices[0].message.content;

    res.json({ hint });

  } catch (error) {
    console.error("OpenRouter ERROR DETAILS:");
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate hint." });
  }
});

module.exports = router;