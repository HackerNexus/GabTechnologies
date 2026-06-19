import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({
  path: "./backend/.env"
});

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// MYSQL CONNECTION
// ======================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

// ======================
// CREATE FEEDBACK (FIXED + DEBUG)
// ======================
app.post("/feedback", (req, res) => {
  console.log("🔥 RECEIVED BODY:", req.body);

  const { name, email, phone, rating, message } = req.body;

  // STRICT VALIDATION (prevents silent DB failure)
  if (!name || !phone || !rating || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
    });
  }

  const sql = `
    INSERT INTO feedbacks
    (name, email, phone, rating, message, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;

  db.query(sql, [name, email || null, phone, rating, message], (err, result) => {
    if (err) {
      console.error("❌ INSERT ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ INSERT SUCCESS:", result);

    res.json({
      success: true,
      id: result.insertId,
    });
  });
});

// ======================
// ADMIN: GET ALL FEEDBACKS
// ======================
app.get("/feedback", (req, res) => {
  db.query(
    "SELECT * FROM feedbacks ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

// ======================
// PUBLIC: ONLY APPROVED FEEDBACKS (NO PRIVATE DATA)
// ======================
app.get("/public-feedbacks", (req, res) => {
  const sql = `
    SELECT id, name, rating, message, created_at
    FROM feedbacks
    WHERE status = 'approved'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ======================
// DELETE FEEDBACK
// ======================
app.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM feedbacks WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true, message: "Deleted successfully" });
  });
});

// ======================
// APPROVE FEEDBACK
// ======================
app.put("/feedback/:id/approve", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE feedbacks SET status='approved' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true, message: "Approved" });
    }
  );
});

// ======================
// REJECT FEEDBACK
// ======================
app.put("/feedback/:id/reject", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE feedbacks SET status='rejected' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true, message: "Rejected" });
    }
  );
});

// ======================
// REVIEW FEEDBACK
// ======================
app.put("/feedback/:id/review", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE feedbacks SET status='reviewed' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true, message: "Reviewed" });
    }
  );
});

// ======================
// STATS
// ======================
app.get("/feedback-stats", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total,
      SUM(status='pending') AS pending,
      SUM(status='approved') AS approved,
      SUM(status='rejected') AS rejected,
      SUM(status='reviewed') AS reviewed
    FROM feedbacks
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results[0]);
  });
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
