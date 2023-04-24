/*서버 */
const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

//
app.listen(8080, function () {
  console.log("listening in 8080");
});
