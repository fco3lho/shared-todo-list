const express = require("express");
const router = express.Router();
const db = require("../../config/database").databaseConnection;

function datetimeLocal_to_datetime(datetimelocal) {
  if (datetimelocal.length == 15) {
    datetimelocal =
      datetimelocal.substring(0, 8) + "0" + datetimelocal.substring(8);
  }

  datetimelocal =
    datetimelocal.substring(0, 10) + " " + datetimelocal.substring(11) + ":00";
  return datetimelocal;
}

// Create
router.post("/create", (req, res) => {
  const { taskName, description, expireDate, listID, username } = req.body;

  // transformar expire_date para DATETIME user EXPIRE_DATETIME
  const expireDatetime = datetimeLocal_to_datetime(expireDate);

  const sql =
    "INSERT INTO task (name, description, register_date, expire_date, completed, user_id_created, list_id) VALUES (?, ?, NOW(), ?, false, ?, ?)";
  const verifyUser = "SELECT user_id FROM user WHERE username = ?";

  db.query(verifyUser, [username], (err1, result1) => {
    if (err1) {
      res.status(500).send("Ocorreu um erro interno do servidor.");
      console.log(err1);
      return;
    } else {
      db.query(
        sql,
        [taskName, description, expireDatetime, result1[0].user_id, listID],
        (err2, result2) => {
          if (err2) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err2);
            return;
          } else {
            res.status(200).send("Tarefa cadastrada com sucesso!");
          }
        }
      );
    }
  });
});

// Read
router.get("/myTasks/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM task WHERE list_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send("Ocorreu um erro interno do servidor!");
      console.log(err);
      return;
    }

    res.status(200).send(result);
  });
});

// Update

// Delete

module.exports = router;
