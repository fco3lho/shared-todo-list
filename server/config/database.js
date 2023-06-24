const mysql = require("mysql");

// Estabelecendo conexão
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
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
