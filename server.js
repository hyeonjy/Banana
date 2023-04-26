/*서버 */
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

const http = require("http").createServer(app);

require("dotenv").config();

const mysql = require("mysql");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});
app.get("/data", function (request, response) {
  const connection = mysql.createConnection({
    host: "172.30.1.46",
    //port: "3306",
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
  });
  //connection.connect();
  connection.query("SELECT * FROM mydatabase.post", (error, result) => {
    if (error) throw error;
    else {
      console.log("SQL: ", result);
      response.json(result);
    }
    connection.end();
  });
  //response.sendFile(path.join(__dirname, "build/index.html"));
});
//
app.listen(8080, function () {
  console.log("listening in 8080");
});
