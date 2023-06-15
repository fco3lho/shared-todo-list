const express = require("express");
const router = express.Router();
const db = require("../../config/database").databaseConnection;

router.get("/:username", (req, res) => {
  const { username } = req.params;

  const sql = "SELECT * FROM to_do_list WHERE user_admin_id = ?";
  const verifyUser = "SELECT user_id FROM user WHERE username = ?";

  db.query(verifyUser, [username], (err1, result1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno no servidor.");
      console.log(err1);
      return;
    }

    const username_id = JSON.parse(JSON.stringify(result1[0].user_id));

    db.query(sql, [username_id], (err2, result2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno do servidor!");
        console.log(err2);
        return;
      }

      res.status(200).send(result2);
    });
  });
});

router.post("/create", (req, res) => {
  const { name, username_admin } = req.body;

  const verifyUser = "SELECT user_id FROM user WHERE username = ?";
  const sql =
    "INSERT INTO to_do_list (name, create_date, user_admin_id) VALUES (?, NOW(), ?)";

  db.query(verifyUser, [username_admin], (err1, result1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno no servidor.");
      console.log(err1);
      return;
    }

    const user_admin_id = JSON.parse(JSON.stringify(result1[0].user_id));

    db.query(sql, [name, user_admin_id], (err2, result2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno no servidor.");
        console.log(err2);
        return;
      }

      res.status(200).send("To-Do List criada com sucesso.");
    });
  });
});

module.exports = router;
