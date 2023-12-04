const mysql = require("mysql");

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((error: any) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Servidor rodando");
});

const tables = `select * from usuario`;

db.query(tables, (error: any, result: any | any[]) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(result);
});

//
module.exports = db;

//pscale_pw_PyPIW0lBXMiCBtnqvGkAvnAAQ1wjZRHFZVo8fvf3Xkl
