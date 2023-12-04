const mysql = require("mysql");

const db = mysql.createConnection(
  process.env.DATABASE_URL ||
    'mysql://0vfqord8ecqcisd2wgid:pscale_pw_HIj6J2Er3WvhA5SKkhxuDTJi0qpbMBMlSciW6aDTe6P@aws.connect.psdb.cloud/db_2?ssl={"rejectUnauthorized":true}'
);

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
