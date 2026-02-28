const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.error("PostgreSQL Error:", err.message));

module.exports = pool;