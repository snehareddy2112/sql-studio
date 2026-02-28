const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = require("./config/db");
require("./config/pg");

const assignmentRoutes = require("./routes/assignmentRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectMongo();

app.get("/", (req, res) => {
  res.send("CipherSQLStudio API running");
});

app.use("/api/assignments", assignmentRoutes);
app.use("/api/query", queryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});