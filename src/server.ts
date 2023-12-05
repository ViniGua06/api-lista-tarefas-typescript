const express = require("express");
const app = express();

import routes from "./routes";

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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
