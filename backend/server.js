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

/* CONNECT DATABASE */

db.connect((err) => {

if(err){

console.log("Database Error");

}else{

console.log("Database connected");

}

});

/* =========================
ROUTE HOME
========================= */

app.get("/", (req,res) => {

res.send("Backend Running");

});

/* =========================
GET ARTIKEL
========================= */

app.get("/api/artikel", (req,res) => {

const sql = "SELECT * FROM artikel";

db.query(sql,(err,result)=>{

if(err){

res.status(500).json(err);

}else{

res.json(result);

}

});

});

/* =========================
SERVER
========================= */

app.listen(3000, ()=>{

console.log("Server running di port 3000");

});