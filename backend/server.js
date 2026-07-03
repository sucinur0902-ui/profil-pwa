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

    host: "localhost",
    user: "root",
    password: "",
    database: "cms_profile"

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

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

});

/* =========================
TAMBAH ARTIKEL
========================= */

app.post("/api/artikel", (req, res) => {

    const {

        judul,
        kategori,
        penulis,
        isi

    } = req.body;

    const sql = `
        INSERT INTO artikel
        (judul,kategori,penulis,isi)
        VALUES (?,?,?,?)
    `;

    db.query(

        sql,

        [

            judul,
            kategori,
            penulis,
            isi

        ],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,
                message: "Artikel berhasil ditambahkan"

            });

        }

    );

});

/* =========================
EDIT ARTIKEL
========================= */

app.put("/api/artikel/:id", (req, res) => {

    const id = req.params.id;

    const {

        judul,
        kategori,
        penulis,
        isi

    } = req.body;

    const sql = `
        UPDATE artikel
        SET
        judul=?,
        kategori=?,
        penulis=?,
        isi=?
        WHERE id=?
    `;

    db.query(

        sql,

        [

            judul,
            kategori,
            penulis,
            isi,
            id

        ],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,
                message: "Artikel berhasil diperbarui"

            });

        }

    );

});

/* =========================
HAPUS ARTIKEL
========================= */

app.delete("/api/artikel/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM artikel WHERE id=?";

    db.query(

        sql,

        [id],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,
                message: "Artikel berhasil dihapus"

            });

        }

    );

});

/* =========================
SERVER
========================= */

app.listen(3000, () => {

    console.log("🚀 Server running : http://localhost:3000");

});