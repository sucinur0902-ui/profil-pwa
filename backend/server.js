const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
DATABASE
========================= */

const db = mysql.createConnection({

    host: process.env.MYSQLHOST,

    user: process.env.MYSQLUSER,

    password: process.env.MYSQLPASSWORD,

    database: process.env.MYSQLDATABASE,

    port: process.env.MYSQLPORT

});

/* =========================
CONNECT DATABASE
========================= */

db.connect((err) => {

    if (err) {

        console.log("❌ Database Error");
        console.log(err);

    } else {

        console.log("✅ Database Connected");

    }

});

/* =========================
HOME
========================= */

app.get("/", (req, res) => {

    res.send("Backend Running");

});

/* =========================
GET ARTIKEL
========================= */

app.get("/api/artikel", (req, res) => {

    const sql = "SELECT * FROM artikel ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});

/* =========================
TAMBAH ARTIKEL
========================= */

app.post("/api/artikel", (req, res) => {

    const { judul, kategori, penulis, isi } = req.body;

    db.query(

        "INSERT INTO artikel (judul,kategori,penulis,isi) VALUES (?,?,?,?)",

        [judul, kategori, penulis, isi],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ success: true });

        }

    );

});

/* =========================
EDIT ARTIKEL
========================= */

app.put("/api/artikel/:id", (req, res) => {

    const { judul, kategori, penulis, isi } = req.body;

    db.query(

        "UPDATE artikel SET judul=?, kategori=?, penulis=?, isi=? WHERE id=?",

        [judul, kategori, penulis, isi, req.params.id],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ success: true });

        }

    );

});

/* =========================
HAPUS ARTIKEL
========================= */

app.delete("/api/artikel/:id", (req, res) => {

    db.query(

        "DELETE FROM artikel WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ success: true });

        }

    );

});

/* =========================
SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});