import React, { useState } from "react";
import AssignmentList from "./pages/AssignmentList";
import AssignmentAttempt from "./pages/AssignmentAttempt";

function App() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  return (
    <div className="app">
      {!selectedAssignment ? (
        <AssignmentList onSelect={setSelectedAssignment} />
      ) : (
        <AssignmentAttempt
          assignment={selectedAssignment}
          onBack={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}

export default App;