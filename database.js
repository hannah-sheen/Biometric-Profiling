const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Client Configuration
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433, // Change this to your PostgreSQL port
  password: "hannahbisheen",
  database: "hannah",
});

client.connect();

// POST Endpoint to Insert Data into PostgreSQL
app.post("/api/insert", async (req, res) => {
  const { firstname, lastname, age } = req.body;

  try {
    const insertQuery = `
      INSERT INTO PROFILE (firstname, lastname, age) 
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const result = await client.query(insertQuery, [firstname, lastname, age]);

    res.status(201).json({
      message: "Data inserted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
