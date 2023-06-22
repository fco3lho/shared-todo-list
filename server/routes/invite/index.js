const express = require("express");
const router = express.Router();
const db = require("../../config/database").databaseConnection;

router.post("/", (req, res) => {
  const { admin_username, username_invited, id_todo_list } = req.body;

  const admin_id = `SELECT user_id FROM user WHERE username = ?`;
  const invited_id = `SELECT user_id FROM user WHERE username = ?`;
  const sql = `INSERT INTO invitation (id_user_admin, id_user_invited, id_todo_list, accepted) VALUES (?, ?, ?, false)`;

  db.query(admin_id, [admin_username], (err1, res1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno no servidor.");
      console.log(err1);
      return;
    }

    db.query(invited_id, [username_invited], (err2, res2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno no servidor.");
        console.log(err2);
        return;
      }

      db.query(
        sql,
        [res1[0].user_id, res2[0].user_id, id_todo_list],
        (err3, res3) => {
          if (err3) {
            res.status(500).send("Usuário já foi convidado.");
            console.log(err3);
            return;
          }

          res.status(200).send("Convite enviado com sucesso.");
        }
      );
    });
  });
});

router.get("/myInvites/:username", (req, res) => {
  const { username } = req.params;

  const user_id = `SELECT user_id FROM user WHERE username = ?`;
  const sql = `SELECT * FROM invitation AS i JOIN user AS u ON i.id_user_admin = u.user_id WHERE i.id_user_invited = ? AND i.accepted = 0`;

  db.query(user_id, [username], (err1, res1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno do servidor.");
      console.log(err1);
      return;
    }

    db.query(sql, [res1[0].user_id], (err2, res2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno do servidor.");
        console.log(err2);
        return;
      }

      res.status(200).send(res2);
    });
  });
});

router.get("/users/:username", (req, res) => {
  const { username } = req.params;

  const sql = `SELECT * FROM user WHERE username != ?`;

  db.query(sql, [username], (err, result) => {
    if (err) {
      res.status(500).send("Ocorreu um erro interno do servidor.");
      console.log(err);
      return;
    }

    res.status(200).send(result);
  });
});

router.post("/myInvites/:username/:list_id/accept", (req, res) => {
  const { username, list_id } = req.params;

  const user_id = `SELECT user_id FROM user WHERE username = ?`;
  const sql = `UPDATE invitation SET accepted = true WHERE id_user_invited = ? AND id_todo_list = ?`;
  const sql_user_list = `INSERT INTO user_list (user_id, list_id) VALUES (?, ?)`;

  db.query(user_id, [username], (err1, res1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno do servidor. 1");
      console.log(err1);
      return;
    }

    db.query(sql, [res1[0].user_id, list_id], (err2, res2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno do servidor. 2");
        console.log(err2);
        return;
      }

      db.query(sql_user_list, [res1[0].user_id, list_id], (err3, res3) => {
        if (err3) {
          res.status(500).send("Ocorreu um erro interno do servidor. 3");
          console.log(err3);
          return;
        }

        res.status(200).send("Você entrou na lista de tarefas com sucesso!");

        db.query;
      });
    });
  });
});

router.post("/myInvites/:username/:list_id/refuse", (req, res) => {
  const { username, list_id } = req.params;

  const user_id = `SELECT user_id FROM user WHERE username = ?`;
  const sql = `DELETE FROM invitation WHERE id_user_invited = ? AND id_todo_list = ?`;

  db.query(user_id, [username], (err1, res1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno do servidor. 1");
      console.log(err1);
      return;
    }

    db.query(sql, [res1[0].user_id, list_id], (err2, res2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno do servidor. 1");
        console.log(err2);
        return;
      }

      res.status(200).send("Convite recusado com sucesso!");
    });
  });
});

router.get("/invitedLists/:username", (req, res) => {
  const { username } = req.params;

  const verifyUser = "SELECT user_id FROM user WHERE username = ?";
  const sql = `SELECT t.list_id, t.name, t.create_date, t.last_mod, t.user_last_mod_id, t.user_admin_id 
  FROM user_list AS u 
    JOIN to_do_list as t 
    ON u.list_id = t.list_id 
  WHERE u.user_id = ?`;

  db.query(verifyUser, [username], (err1, res1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno do servidor. 1");
      console.log(err1);
      return;
    }

    db.query(sql, [res1[0].user_id], (err2, res2) => {
      if (err2) {
        res.status(500).send("Ocorreu um erro interno do servidor. 1");
        console.log(err2);
        return;
      }

      res.status(200).send(res2);
    });
  });
});

module.exports = router;
