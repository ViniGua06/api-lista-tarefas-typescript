"use strict";
const mysql = require("mysql");
const db = mysql.createConnection(process.env.DATABASE_URL ||
    'mysql://qojfwreq7oqhykdp8c6y:pscale_pw_PyPIW0lBXMiCBtnqvGkAvnAAQ1wjZRHFZVo8fvf3Xkl@aws.connect.psdb.cloud/db_2?ssl={"rejectUnauthorized":true}');
db.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Servidor rodando");
});
const tables = `select * from usuario`;
db.query(tables, (error, result) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(result);
});
//
module.exports = db;
//pscale_pw_PyPIW0lBXMiCBtnqvGkAvnAAQ1wjZRHFZVo8fvf3Xkl
