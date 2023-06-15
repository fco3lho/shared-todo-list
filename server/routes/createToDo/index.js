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

router.delete(`/delete/:list_id`, (req, res) => {
  const { list_id } = req.params;

  const tableUserList = "DELETE FROM user_list WHERE list_id = ?";
  const tableInvitation = "DELETE FROM invitation WHERE id_todo_list = ?";
  const tableTask = "DELETE FROM task WHERE list_id = ?";
  const tableToDoList = "DELETE FROM to_do_list WHERE list_id = ?";

  db.query(tableUserList, [list_id], (err1, res1) => {
    if (err1) {
      res.status(500).send("Erro ao excluir pelada.");
      console.log("Erro ao excluir pelada.");
      return;
    } else {
      db.query(tableInvitation, [list_id], (err2, res2) => {
        if (err2) {
          res.status(500).send("Erro ao excluir pelada.");
          console.log("Erro ao excluir pelada.");
          return;
        } else {
          db.query(tableTask, [list_id], (err3, res3) => {
            if (err3) {
              res.status(500).send("Erro ao excluir pelada.");
              console.log("Erro ao excluir pelada.");
              return;
            } else {
              db.query(tableToDoList, [list_id], (err4, res4) => {
                if (err4) {
                  res.status(500).send("Erro ao excluir pelada.");
                  console.log("Erro ao excluir pelada.");
                  return;
                } else {
                  res.status(200).send("Lista excluída.");
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
