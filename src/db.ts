const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "c_sharp_teste_db",
  password: "Mel060616",
});

db.connect((error: string) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Servidor mysql rodando!`);
});

module.exports = db;
