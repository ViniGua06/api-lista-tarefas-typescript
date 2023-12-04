"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = (0, express_1.Router)();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const controllers_1 = __importDefault(require("./controller/controllers"));
router.get("/", (req, res) => {
    res.send("Olá, servidor!");
});
//Usuario
let idF, nomeF, emailF, senhaF, idadeF, logado = false;
////////////
router.post("/cadastrar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha, idade } = req.body;
        const check = "select count(*) as total from usuario where email = ?";
        const feedback = yield controllers_1.default.check({ script: check, campos: [email] });
        if (feedback == 0) {
            const script = "insert into usuario (nome, email, senha, idade) values (?, ?, ?, ?)";
            const insert = yield controllers_1.default.insert({
                script: script,
                campos: [nome, email, senha, idade],
            });
            const data = "select id, nome, email, senha, idade from usuario where email = ? and senha = ?";
            const getData = yield controllers_1.default.getdata({
                script: data,
                campos: [email, senha],
            });
            idF = getData[0].id;
            nomeF = getData[0].nome;
            emailF = getData[0].email;
            senhaF = getData[0].senha;
            idadeF = getData[0].idade;
            logado = true;
            const dataF = {
                id: idF,
                nome: nomeF,
                email: emailF,
                senha: senhaF,
                idade: idadeF,
                logado: logado,
            };
            if (insert == 1) {
                res.status(200).json(dataF);
            }
            else {
                res.status(400).json({ message: "algum erro ocorreu!" });
            }
        }
        else {
            res.status(500).json({ message: "email ja cadastrado!" });
        }
    }
    catch (error) {
        console.log("erro aí!!!!!");
    }
}));
router.post("/logar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const script = "select count(*) as total from usuario where email = ? and senha = ?";
        const feedback = yield controllers_1.default.check({
            script: script,
            campos: [email, senha],
        });
        if (feedback == 1) {
            const data = "select id, nome, email, senha, idade from usuario where email = ? and senha = ?";
            const getData = yield controllers_1.default.getdata({
                script: data,
                campos: [email, senha],
            });
            idF = getData[0].id;
            nomeF = getData[0].nome;
            emailF = getData[0].email;
            senhaF = getData[0].senha;
            idadeF = getData[0].idade;
            logado = true;
            const dataF = {
                id: idF,
                nome: nomeF,
                email: emailF,
                senha: senhaF,
                idade: idadeF,
                logado: logado,
            };
            res.status(200).json(dataF);
        }
        else {
            res.status(400).json({ message: "Email ou senha inválidos!" });
        }
    }
    catch (error) {
        console.log("erro2");
    }
}));
router.post("/addTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, descricao, prioridade, usuario_id, imagem_capa } = req.body;
        const script = "insert into tarefa (titulo, descricao, prioridade, usuario_id, imagem_capa, concluida) values (?, ?, ?, ?, ?, 0)";
        const insert = yield controllers_1.default.insert({
            script: script,
            campos: [titulo, descricao, prioridade, usuario_id, imagem_capa],
        });
        if (insert == 1) {
            res.status(200).json({ message: "tarefa adicionada com sucesso!" });
        }
        else {
            res.status(400).json({ message: "houve algum erro!" });
        }
    }
    catch (error) {
        console.log("Erro3");
    }
}));
router.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id: idF,
        nome: nomeF,
        email: emailF,
        senha: senhaF,
        idade: idadeF,
        logado: logado,
    };
    res.status(200).json(data);
}));
router.get("/getTasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const script = "select * from tarefa where usuario_id = ? and concluida = 0";
    const getTasks = yield controllers_1.default.getTasks({
        script: script,
        campos: id,
    });
    res.status(200).json(getTasks);
}));
router.get("/getCompletedTasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const script = "select * from tarefa where usuario_id = ? and concluida = 1";
    const getTasks = yield controllers_1.default.getTasks({ script: script, campos: id });
    console.log(getTasks);
    res.status(200).json(getTasks);
}));
router.get("/removeItem/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const script = "delete from tarefa where id = ?";
    const feedback = yield controllers_1.default.delete({ script: script, campos: id });
    if (feedback == 1) {
        res.status(200).json({ message: "Tarefa deletada!" });
    }
    else {
        res.status(400).json({ message: "Erro!" });
    }
}));
router.get("/completeTask/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const script = "update tarefa set concluida = true where id = ?";
    const feedback = yield controllers_1.default.insert({ script: script, campos: id });
    if (feedback == 1) {
        res.status(200).json({ message: "Tarefa concluída com sucesso!" });
    }
    else {
        res.status(400).json({ message: "Houuve algum erro!" });
    }
}));
router.get("/sair", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logado = false;
    res.status(200).json({ message: "deslogado!" });
}));
exports.default = router;
