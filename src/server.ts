const express = require("express");
const app = express();

import routes from "./routes";

app.use(routes);

const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 2000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, (error: string) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Servidor rodando na porta ${PORT}`);
});
