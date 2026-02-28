const express = require("express");
const pool = require("../config/pg");

const router = express.Router();

router.post("/execute", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // Basic safety validation (allow only SELECT queries)
  const forbiddenKeywords = [
    "DROP",
    "DELETE",
    "TRUNCATE",
    "ALTER",
    "UPDATE",
    "INSERT",
    "CREATE"
  ];

  const upperQuery = query.toUpperCase();

  if (forbiddenKeywords.some(word => upperQuery.includes(word))) {
    return res.status(400).json({
      error: "Only SELECT queries are allowed."
    });
  }

  try {
    const result = await pool.query(query);

    res.json({
      rowCount: result.rowCount,
      rows: result.rows
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;