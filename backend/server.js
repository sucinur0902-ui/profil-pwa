const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
DATABASE CONFIG (SAFE)
========================= */

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

/* =========================
CONNECT DATABASE (DEBUG FIX)
========================= */

db.connect((err) => {
    if (err) {
        console.log("❌ Database Error:");
        console.log(err.code);
        console.log(err.message);
        return;
    }

    console.log("✅ Database Connected");
});

/* =========================
HOME ROUTE
========================= */

app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

/* =========================
GET ARTIKEL
========================= */

app.get("/api/artikel", (req, res) => {
    const sql = "SELECT * FROM artikel ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(result);
    });
});

/* =========================
TAMBAH ARTIKEL
========================= */

app.post("/api/artikel", (req, res) => {
    const { judul, kategori, penulis, isi } = req.body;

    if (!judul || !kategori || !penulis || !isi) {
        return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const sql =
        "INSERT INTO artikel (judul, kategori, penulis, isi) VALUES (?, ?, ?, ?)";

    db.query(sql, [judul, kategori, penulis, isi], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Insert gagal" });
        }

        res.json({ success: true });
    });
});

/* =========================
EDIT ARTIKEL
========================= */

app.put("/api/artikel/:id", (req, res) => {
    const { judul, kategori, penulis, isi } = req.body;

    const sql =
        "UPDATE artikel SET judul=?, kategori=?, penulis=?, isi=? WHERE id=?";

    db.query(sql, [judul, kategori, penulis, isi, req.params.id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Update gagal" });
        }

        res.json({ success: true });
    });
});

/* =========================
HAPUS ARTIKEL
========================= */

app.delete("/api/artikel/:id", (req, res) => {
    const sql = "DELETE FROM artikel WHERE id=?";

    db.query(sql, [req.params.id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Delete gagal" });
        }

        res.json({ success: true });
    });
});

/* =========================
SERVER (RAILWAY SAFE)
========================= */

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});