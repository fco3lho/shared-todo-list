const mysql = require("mysql");

// Estabelecendo conexão
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todolist",
});

// Realizando conexão
conn.connect((err) => {
  if (err) {
    console.log(err);
  }

  console.log("Database connected");
});

exports.databaseConnection = conn;
