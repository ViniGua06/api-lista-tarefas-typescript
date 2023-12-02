"use strict";
const mysql = require("mysql");
const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
db.getConnection((error, connection) => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        return;
    }
    console.log("Conexão bem-sucedida.");
    connection.release();
});
//
module.exports = db;
