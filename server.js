/*서버 */
const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);

require("dotenv").config();

const mysql = require("mysql");
const connection = mysql.createConnection({
  // host: "172.30.1.84",
  // user: "banana",
  // password: "bananatree246",
  // database: "mydatabase",
  host: "172.30.1.72",
  //port: "3306",
  user: "banana",
  password: process.env.DB_PASSWORD,
  database: "mydatabase",
});
connection.connect();
connection.query("SELECT * FROM mydatabase.user", (error, rows, fields) => {
  if (error) throw error;
  console.log("SQL: ", rows);
});
connection.end();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});
console.log(path.join(__dirname, "build/index.html"));
//
app.listen(8080, function () {
  console.log("listening in 8080");
});
