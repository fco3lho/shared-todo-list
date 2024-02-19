const mysql = require("mysql2");

// Estabelecendo conexão
const conn = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "todolist",
});

// Realizando conexão
conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Database connected");
});

exports.databaseConnection = conn;
