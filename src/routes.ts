import { Request, Response, Router } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");

const router = Router();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

import controller from "./controller/controllers";

router.get("/", (req: Request, res: Response) => {
  res.send("Olá, servidor!");
});

//Usuario

let idF: number,
  nomeF: string,
  emailF: string,
  senhaF: string,
  idadeF: number,
  logado: boolean = false;

////////////

router.post("/cadastrar", async (req, res) => {
  try {
    const { nome, email, senha, idade } = req.body;
    const check = "select count(*) as total from usuario where email = ?";

    const feedback = await controller.check({ script: check, campos: [email] });

    if (feedback == 0) {
      const script =
        "insert into usuario (nome, email, senha, idade) values (?, ?, ?, ?)";

      const insert = await controller.insert({
        script: script,
        campos: [nome, email, senha, idade],
      });

      const data =
        "select id, nome, email, senha, idade from usuario where email = ? and senha = ?";
      const getData = await controller.getdata({
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
      } else {
        res.status(400).json({ message: "algum erro ocorreu!" });
      }
    } else {
      res.status(500).json({ message: "email ja cadastrado!" });
    }
  } catch (error) {
    console.log("erro aí!!!!!");
  }
});

router.post("/logar", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const script =
      "select count(*) as total from usuario where email = ? and senha = ?";

    const feedback = await controller.check({
      script: script,
      campos: [email, senha],
    });

    if (feedback == 1) {
      const data =
        "select id, nome, email, senha, idade from usuario where email = ? and senha = ?";
      const getData = await controller.getdata({
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
    } else {
      res.status(400).json({ message: "Email ou senha inválidos!" });
    }
  } catch (error) {
    console.log("erro2");
  }
});

router.post("/addTask", async (req, res) => {
  try {
    const { titulo, descricao, prioridade, usuario_id, imagem_capa } = req.body;

    const script =
      "insert into tarefa (titulo, descricao, prioridade, usuario_id, imagem_capa, concluida) values (?, ?, ?, ?, ?, 0)";

    const insert = await controller.insert({
      script: script,
      campos: [titulo, descricao, prioridade, usuario_id, imagem_capa],
    });

    if (insert == 1) {
      res.status(200).json({ message: "tarefa adicionada com sucesso!" });
    } else {
      res.status(400).json({ message: "houve algum erro!" });
    }
  } catch (error) {
    console.log("Erro3");
  }
});

router.get("/getData", async (req, res) => {
  const data = {
    id: idF,
    nome: nomeF,
    email: emailF,
    senha: senhaF,
    idade: idadeF,
    logado: logado,
  };

  res.status(200).json(data);
});

router.get("/getTasks/:id", async (req, res) => {
  const id = req.params.id;

  const script = "select * from tarefa where usuario_id = ? and concluida = 0";

  const getTasks = await controller.getTasks({
    script: script,
    campos: id,
  });

  res.status(200).json(getTasks);
});

router.get("/getCompletedTasks/:id", async (req, res) => {
  const id = req.params.id;

  const script = "select * from tarefa where usuario_id = ? and concluida = 1";

  const getTasks = await controller.getTasks({ script: script, campos: id });

  console.log(getTasks);

  res.status(200).json(getTasks);
});

router.get("/removeItem/:id", async (req, res) => {
  const id = req.params.id;

  const script = "delete from tarefa where id = ?";

  const feedback = await controller.delete({ script: script, campos: id });

  if (feedback == 1) {
    res.status(200).json({ message: "Tarefa deletada!" });
  } else {
    res.status(400).json({ message: "Erro!" });
  }
});

router.get("/completeTask/:id", async (req, res) => {
  const id = req.params.id;

  const script = "update tarefa set concluida = true where id = ?";

  const feedback = await controller.insert({ script: script, campos: id });

  if (feedback == 1) {
    res.status(200).json({ message: "Tarefa concluída com sucesso!" });
  } else {
    res.status(400).json({ message: "Houuve algum erro!" });
  }
});

router.get("/sair", async (req, res) => {
  logado = false;

  res.status(200).json({ message: "deslogado!" });
});

export default router;
