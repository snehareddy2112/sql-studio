const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// Get single assignment
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Invalid assignment ID" });
  }
});

// Create assignment (temporary - for inserting first data)
router.post("/", async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ error: "Failed to create assignment" });
  }
});

module.exports = router;