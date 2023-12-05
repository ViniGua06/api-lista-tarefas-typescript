"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const routes_1 = __importDefault(require("./routes"));
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(routes_1.default);
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 2000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(`Servidor rodando na porta ${PORT}`);
});
