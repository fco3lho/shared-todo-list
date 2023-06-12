const express = require("express");
const app = express();
const port = 3001;

// conexão com o banco de dados
const db = require('./config/database').databaseConnection;

app.listen(port, () => {
  console.log("Working...");
});
