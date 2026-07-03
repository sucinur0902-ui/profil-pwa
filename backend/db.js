const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "reseau.proxy.rlwy.net",
    user: "root",
    password: "XHkElVdPdpsaRDGqaWCgsVAsAbHhjJKT",
    database: "railway",
    port: 14654
});

connection.connect((err) => {

    if(err){
        console.log("❌ Database gagal connect");
        console.log(err);
    } else {
        console.log("✅ Database Connected");
    }

});

module.exports = connection;
