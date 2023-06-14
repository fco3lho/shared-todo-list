//Importando dependências
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodeCrypto = require("node:crypto");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

//Conexão com o banco de dados
const db = require("./config/database").databaseConnection;

// Importando rotas
const createToDoList = require("./routes/createToDo");
const task = require("./routes/task");

//Register
app.post("/register", async (req, res) => {
  const { name, username, password, phone, email } = await req.body;

  const randomSalt = nodeCrypto.randomInt(10, 11);
  const passwordHash = await bcrypt.hash(password, randomSalt);

  let verifyUser = "SELECT * FROM user WHERE username = ?";
  let SQL =
    "INSERT INTO user ( name, username, password, phone, email ) VALUES ( ?, ?, ?, ?, ? )";

  db.query(verifyUser, [username], (error, results) => {
    if (error) {
      console.log(error);
      return;
    } else if (results.length > 0) {
      res.status(409).send("O nome de usuário já existe");
    } else {
      db.query(
        SQL,
        [name, username, passwordHash, phone, email],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            res.status(200).send(`Cadastro realizado com sucesso!`);
          }
        }
      );
    }
  });
});

//Login & Logout
let usernameLogged = "";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let SQL = "SELECT username FROM user WHERE username = ?";
  let verifyPassword = "SELECT password FROM user WHERE username = ?";

  db.query(SQL, [username], (error, results) => {
    if (error) res.status(500).send("Erro ao consultar banco de dados");
    else if (results.length > 0) {
      db.query(verifyPassword, [username], async (err, result) => {
        if (await bcrypt.compare(password, result[0].password)) {
          usernameLogged = username;
          res.status(200).send(["Login bem-sucedido", username]);
        } else res.status(401).send("Credenciais inválidas");
      });
    } else res.status(401).send("Credenciais inválidas");
  });
});

app.post("/logout", (req, res) => {
  if (usernameLogged === req.body.whoIs) {
    usernameLogged = "";
    res.status(200).send("Logout realizado.");
  } else {
    res.status(500).send("Houve um erro interno no servidor.");
  }
});

// criar uma To-Do List
app.use("/createToDoList", createToDoList)

// Manipular tarefas de uma To-Do List
app.use("/task", task)

//Listening port
app.listen(port, () => {
  console.log("Working...");
});
