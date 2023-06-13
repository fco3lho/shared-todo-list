const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodeCrypto = require("node:crypto");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// conexão com o banco de dados
const db = require("./config/database").databaseConnection;

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

app.listen(port, () => {
  console.log("Working...");
});
