# 🚀 CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform that allows students to practice SQL queries against pre-configured assignments with real-time execution and intelligent hints.

The platform focuses on providing a clean learning experience where users can write SQL queries, execute them securely, and receive conceptual guidance without being given full solutions.

---

# 🌟 Features

## ✅ Core Features

* View multiple SQL assignments (Easy, Medium, Hard)
* Browser-based SQL editor (Monaco Editor)
* Real-time query execution
* Secure sandboxed PostgreSQL execution
* Query validation (only SELECT queries allowed)
* Intelligent hint generation using LLM (OpenRouter API)
* Results displayed in formatted table
* Mobile-first responsive UI using SCSS

---

# 🏗️ System Architecture

Frontend (React)
⬇
Express API (Node.js)
⬇
PostgreSQL (Query Execution Sandbox)
⬇
MongoDB (Assignments Storage)
⬇
OpenRouter API (LLM Hints)

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vanilla SCSS (mobile-first approach)
* Monaco Editor
* Axios

## Backend

* Node.js
* Express.js
* PostgreSQL (Sandbox Database)
* MongoDB (Assignments Persistence)
* OpenRouter API (LLM Integration)

---

# 📂 Project Structure

```
cipher-sql-studio/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── styles/
│   └── App.js
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/cipher-sql-studio.git
cd cipher-sql-studio
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
POSTGRES_URI=postgresql://username:password@localhost:5432/ciphersql
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start backend:

```
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔐 Security Implementation

* Only SELECT queries are allowed
* Dangerous keywords blocked:

  * DROP
  * DELETE
  * ALTER
  * INSERT
  * UPDATE
  * TRUNCATE
* Query validation before execution
* Environment variables excluded from Git

---

# 🧠 LLM Hint Strategy

The system integrates OpenRouter API to provide hints.

Strict prompt engineering rules:

* No full SQL solutions
* No complete query generation
* Only conceptual guidance
* Short, focused hints

Example Hint:

> Think about filtering rows using a WHERE clause based on department.

---

# 📊 Data Flow (Execution Process)

### Execute Query Flow

1. User writes SQL in Monaco Editor
2. User clicks "Execute Query"
3. Frontend sends POST request to `/api/query/execute`
4. Backend validates query
5. Backend executes query in PostgreSQL
6. PostgreSQL returns result
7. Backend sends JSON response
8. Frontend updates state
9. Results rendered in table

---

### Hint Generation Flow

1. User clicks "Get Hint"
2. Frontend sends question + user query to `/api/hint`
3. Backend constructs strict prompt
4. Backend calls OpenRouter API
5. LLM returns conceptual hint
6. Frontend displays hint

---

# 📱 Responsive Design

* Mobile-first layout (320px base)
* Tablet breakpoint (641px+)
* Desktop breakpoint (1024px+)
* Two-column layout on large screens
* SCSS variables
* SCSS nesting
* Media queries
* BEM-style class naming

---

# 📌 Sample Assignments Included

### 🟢 Easy

Fetch names of employees in Engineering department.

### 🟡 Medium

Find average salary grouped by department.

### 🔴 Hard

Find departments where average salary is greater than 60000.

---

# 🎯 Key Design Decisions

* PostgreSQL used strictly as sandbox execution database
* MongoDB used for assignment persistence
* Separation of concerns between frontend and backend
* Clean route modularization
* Secure query filtering before execution
* Lightweight UI focused on usability

---

# ✅ Final Notes

* This platform focuses on SQL practice, not database creation.
* Assignments and schema are pre-configured.
* Built with emphasis on understanding system architecture and data flow.

---

---
