const express = require("express");
const router = express.Router();
const db = require("../../config/database").databaseConnection;

function datetimeLocal_to_datetime (datetimelocal) {
    if (datetimelocal.length == 15) {
        datetimelocal = datetimelocal.substring(0, 8) + '0' + datetimelocal.substring(8)
    }
  
    datetimelocal = datetimelocal.substring(0, 10) + ' ' + datetimelocal.substring(11) + ':00'
    return datetimelocal
}


// Create
router.post("/create", (req, res) => {
    const { name, description, expire_date, user_id_created ,list_id } = req.body;
    
    // transformar expire_date para DATETIME user EXPIRE_DATETIME
    const expire_datetime = datetimeLocal_to_datetime(expire_date);

    const sql =
    "INSERT INTO task (name, description, register_date, expire_date, completed, user_id_created, list_id) VALUES (?, ?, NOW(), ?, false, ?, ?)"

    db.query(sql, [name, description, expire_datetime, user_id_created, list_id], (err, result) => {
        if (err) {
            res.status(500).send("Ocorreu um erro interno do servidor.");
            console.log(err);
            return;
        }

        res.status(200).send("Task criada com sucesso!")
    })
})

// Read
router.get("/myTasks")

// Update


// Delete

module.exports = router;