"use strict";
const mysql = require("mysql");
const db = mysql.createConnection(process.env.DATABASE_URL ||
    'mysql://nwqeoav2uvwn01t36g1a:pscale_pw_ht9apa46MNsH4S7j3UPpGa2EbbqJQyhoClXKN6sT21X@aws.connect.psdb.cloud/db_2?ssl={"rejectUnauthorized":true}');
db.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Servidor rodando");
});
const tables = `create table if not exists tarefa(
	id int unsigned not null auto_increment,
    titulo varchar(20) not null,
    descricao varchar(30) not null,
    prioridade char(1) not null,
    usuario_id int unsigned not null,
    imagem_capa text,
    primary key (id)
) engine = innoDb;`;
db.query(tables, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Tabela criada!");
});
//
module.exports = db;
