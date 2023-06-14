const express = require("express");
const router = express.Router();
const db = require("../../config/database").databaseConnection;

router.post("/create", (req, res) => {
    const { name, user_admin_id } = req.body;
    const sql = "INSERT INTO to_do_list (name, create_date, user_admin_id) VALUES (?, NOW(), ?)";

    db.query(sql, [name, user_admin_id], (err, result) => {
        if (err) {
            result.status(500).send("Ocorreu um erro interno no servidor.");
            console.log(err);
            return;
        }

        result.status(200).send("To-Do List criada com sucesso.");
    });
});


module.exports = router;