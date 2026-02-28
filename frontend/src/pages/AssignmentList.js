import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:5000";

function AssignmentList({ onSelect }) {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/assignments`);
      setAssignments(res.data);
    } catch (error) {
      setError("Failed to load assignments");
    }
  };

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Easy") return "badge badge--easy";
    if (difficulty === "Medium") return "badge badge--medium";
    if (difficulty === "Hard") return "badge badge--hard";
    return "badge";
  };

  return (
    <div className="assignment-list">
      <h2>SQL Assignments</h2>

      {error && <p>{error}</p>}

      {assignments.map((item) => (
        <div
          key={item._id}
          className="assignment-card"
          onClick={() => onSelect(item)}
        >
          <h3 className="assignment-card__title">{item.title}</h3>
          <p>{item.description}</p>

          <span className={getDifficultyClass(item.difficulty)}>
            {item.difficulty}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AssignmentList;