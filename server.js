/*서버 연동 */
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const router = express.Router();
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

require("dotenv").config();

const mysql = require("mysql");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

// module.exports = router;
app.get("/data", function (request, response) {
  const connection = mysql.createConnection({
    host: "172.30.1.46",
    // host: "172.16.61.69",
    //port: "3306",
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
  });
  //connection.connect();
  connection.query(
    `SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
  FROM post p
  LEFT JOIN (
  SELECT t.img_id, t.fk_post_id, t.img_src
  FROM post_img t
  WHERE t.img_id = (
  SELECT MIN(img_id)
  FROM post_img
  WHERE fk_post_id = t.fk_post_id
  )
  ) AS pi_id ON p.post_id = pi_id.fk_post_id ORDER BY post_id DESC`,
    (error, result) => {
      if (error) throw error;
      else {
        //console.log("SQL: ", result);
        response.json(result);
      }
      connection.end();
    }
  );
  //response.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/postdata/:postId", function (req, res) {
  const postId = req.params.postId;
  const sql = `SELECT post.*, user.*, post_img.img_src
  FROM post
  LEFT JOIN user
  ON post.fk_user_id = user.user_id
  LEFT JOIN post_img
  ON post.post_id = post_img.fk_post_id
  WHERE post_id = ?`;
  const connection = mysql.createConnection({
    host: "172.30.1.46",
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
  });
  //connection.connect();
  connection.query(sql, [postId], (error, result) => {
    if (error) throw error;
    else {
      //console.log("result: ", result);

      const post = {
        area: result[0].area,
        title: result[0].title,
        content: result[0].content,
        grade: result[0].grade,
        hits: result[0].hits,
        nickname: result[0].nickname,
        userId: result[0].user_id,
        post_date: result[0].post_date,
        profile: result[0].profile,
        state: result[0].state,
        sub_category: result[0].sub_category,
        imgs: [],
      };

      for (let i = 0; i < result.length; i++) {
        if (result[i].img_src) {
          post.imgs.push(result[i].img_src);
        }
      }

      res.json(post);
      //res.json(result[0]);
    }
    connection.end();
  });
});

app.get("/userpage/data/:userId", function (req, res) {
  const userId = req.params.userId;
  const connection = mysql.createConnection({
    host: "172.30.1.46",
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
    multipleStatements: true,
  });
  const query1 = `SELECT * FROM user WHERE user_id = ${userId}; `;
  const query2 = `SELECT p.*, pi.img_src as img_src
  FROM post p
  LEFT JOIN (
      SELECT fk_post_id, MIN(img_id) as min_img_id
      FROM post_img
      GROUP BY fk_post_id
  ) as select_thum
  ON p.post_id = select_thum.fk_post_id
  LEFT JOIN post_img as pi
  ON select_thum.fk_post_id = pi.fk_post_id AND select_thum.min_img_id = pi.img_id
  WHERE p.fk_user_id = ${userId};`;
  function getUserAndPosts() {
    return new Promise((resolve, reject) => {
      connection.query(query1 + query2, (error, results) => {
        if (error) {
          reject(error);
        } else {
          //console.log("results :", results);
          const user = results[0][0];
          const posts = results[1];
          resolve({ user, posts });
        }
      });
    });
  }

  getUserAndPosts()
    .then(({ user, posts }) => {
      console.log("User:", user);
      console.log("Posts:", posts);
      res.json({ user, posts });
    })
    .catch((error) => {
      throw error;
    });
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(8080, function () {
  console.log("listening in 8080");
});
