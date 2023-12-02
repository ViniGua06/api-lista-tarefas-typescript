"use strict";
const mysql = require("mysql");
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "c_sharp_teste_db",
    password: "Mel060616",
});
db.getConnection((error, connection) => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        return;
    }
    console.log("Conexão bem-sucedida.");
    connection.release();
});
module.exports = db;
