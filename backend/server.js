const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*
=========================
GET DATA
=========================
*/
app.get("/artikel", (req, res) => {

    db.query(
        "SELECT * FROM artikel",
        (err, result) => {

        if(err){
            throw err;
        }

        res.json(result);

    });

});

/*
=========================
TAMBAH DATA
=========================
*/
app.post("/artikel", (req, res) => {

    const {
        judul,
        kategori,
        penulis,
        isi
    } = req.body;

    const sql =
    `INSERT INTO artikel
    (judul, kategori, penulis, isi)
    VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [
            judul,
            kategori,
            penulis,
            isi
        ],
        (err, result) => {

        if(err){
            throw err;
        }

        res.json({
            message: "Artikel berhasil ditambah"
        });

    });

});

/*
=========================
UPDATE DATA
=========================
*/
app.put("/artikel/:id", (req, res) => {

    const id = req.params.id;

    const {
        judul,
        kategori,
        penulis,
        isi
    } = req.body;

    const sql =
    `UPDATE artikel
    SET
    judul=?,
    kategori=?,
    penulis=?,
    isi=?
    WHERE id=?`;

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

        if(err){
            throw err;
        }

        res.json({
            message: "Artikel berhasil diupdate"
        });

    });

});

/*
=========================
DELETE DATA
=========================
*/
app.delete("/artikel/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM artikel WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send(err);
        }else{

            res.json({
                message: "Artikel berhasil dihapus"
            });

        }

    });

});

/*
=========================
JALANKAN SERVER
=========================
*/
app.listen(3000, () => {

    console.log("Server running di port 3000");

});