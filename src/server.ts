const express = require("express");
const app = express();

import routes from "./routes";

const cors = require("cors");

app.use(cors());

app.use(routes);

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, (error: string) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Servidor rodando na porta ${PORT}`);
});
