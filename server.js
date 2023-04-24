/*서버 */
const express = require("express");
const path = require("path");
const app = express();

const http = require("http").createServer(app);

//
app.listen(8080, function () {
  console.log("listening in 8080");
});
