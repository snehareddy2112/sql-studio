import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

const API_BASE = "http://127.0.0.1:5000";

function AssignmentAttempt({ assignment, onBack }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [hint, setHint] = useState("");

  const executeQuery = async () => {
    setError("");
    setResults(null);

    try {
      const res = await axios.post(`${API_BASE}/api/query/execute`, {
        query,
      });

      setResults(res.data.rows);
    } catch (err) {
      setError(err.response?.data?.error || "Query execution failed");
    }
  };

  const getHint = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/hint`, {
        question: assignment.question,
        userQuery: query,
      });

      setHint(res.data.hint);
    } catch (err) {
      setHint("Failed to fetch hint.");
    }
  };

  return (
    <div className="attempt">
      <button onClick={onBack} className="attempt__back">
        ← Back
      </button>

      <div className="attempt__layout">
        <div className="attempt__left">
          <h2>{assignment.title}</h2>
          <p>{assignment.question}</p>

          <div className="attempt__schema">
            <h3>Table Schema</h3>
            <pre>{assignment.tableSchemas}</pre>
          </div>

          <div className="attempt__sample">
            <h3>Sample Data</h3>
            <pre>{assignment.sampleData}</pre>
          </div>

          {hint && (
            <div className="attempt__hint">
              <h3>Hint</h3>
              <p>{hint}</p>
            </div>
          )}
        </div>

        <div className="attempt__right">
          <div className="attempt__editor">
            <Editor
              height="250px"
              defaultLanguage="sql"
              value={query}
              onChange={(value) => setQuery(value)}
              theme="vs-dark"
            />
          </div>

          <div className="attempt__actions">
            <button onClick={executeQuery}>Execute Query</button>
            <button onClick={getHint}>Get Hint</button>
          </div>

          {error && <div className="attempt__error">{error}</div>}

          {results && results.length > 0 && (
            <div className="attempt__results">
              <h3>Results</h3>
              <table>
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttempt;