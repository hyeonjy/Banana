const HOST_IP = "172.30.1.46"; //커나
//const HOST_IP= "172.16.61.69"; //세종

/*서버 연동 */
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const router = express.Router();
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

require("dotenv").config();

// body 접근하기 위해
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mysql = require("mysql");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

// module.exports = router;
app.get("/data/:sort", function (request, response) {
  let option = null;
  const sort = request.params.sort;
  switch (sort) {
    case "hits":
      option = "hits";
      break;
    case "heart":
      option = "heart";
      break;
    default:
      option = "post_date";
      break;
  }
  const connection = mysql.createConnection({
    //host: "172.30.1.46",
    host: HOST_IP,
    // host: HOST_IP,
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
  ) AS pi_id ON p.post_id = pi_id.fk_post_id ORDER BY ${option} DESC`,
    (error, result) => {
      if (error) throw error;
      else {
        //console.log("SQL: ", result);
        response.json(result);
      }
      connection.end();
    }
  );
});

app.get("/searchdata/:searchkey/:sort", function (req, res) {
  let option = null;
  const sort = req.params.sort;
  switch (sort) {
    case "1":
      option = "hits";
      break;
    case "2":
      option = "heart";
      break;
    default:
      option = "post_date";
      break;
  }
  const searchkey = req.params.searchkey;
  console.log("sort: , type: ", sort, typeof sort);
  const connection = mysql.createConnection({
    host: HOST_IP,
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
    multipleStatements: true,
  });

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
    ) AS pi_id ON p.post_id = pi_id.fk_post_id
    WHERE p.title LIKE '%${searchkey}%' OR p.content LIKE '%${searchkey}%'
    ORDER BY p.${option} DESC;`,
    (error, result) => {
      if (error) throw error;
      else {
        //console.log("SQL: ", result);
        res.json(result);
      }
      connection.end();
    }
  );
});

app.get("/postdata/:postId", function (req, res) {
  const postId = req.params.postId;
  // const sql = `SELECT post.*, user.*, post_img.img_src
  // FROM post
  // LEFT JOIN user
  // ON post.fk_user_id = user.user_id
  // LEFT JOIN post_img
  // ON post.post_id = post_img.fk_post_id
  // WHERE post_id = ?`;
  const postQuery = `SELECT post.*, user.*, post_img.img_src
  FROM post
  LEFT JOIN user
  ON post.fk_user_id = user.user_id
  LEFT JOIN post_img
  ON post.post_id = post_img.fk_post_id
  WHERE post_id = ${postId};`;
  const heartQuery = `SELECT * FROM heart WHERE fk_user_id = 1 AND fk_post_id = ${postId}; `;
  const hitsQuery = `UPDATE post SET hits = hits + 1 WHERE post_id = ${postId};`;

  const connection = mysql.createConnection({
    //host: "172.30.1.46",
    host: HOST_IP,
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
    multipleStatements: true,
  });

  function getPostsAndHeart() {
    return new Promise((resolve, reject) => {
      connection.query(hitsQuery + postQuery + heartQuery, (error, results) => {
        if (error) {
          reject(error);
        } else {
          const post = {
            area: results[1][0].area,
            title: results[1][0].title,
            content: results[1][0].content,
            grade: results[1][0].grade,
            hits: results[1][0].hits,
            nickname: results[1][0].nickname,
            userId: results[1][0].user_id,
            post_date: results[1][0].post_date,
            profile: results[1][0].profile,
            state: results[1][0].state,
            sub_category: results[1][0].sub_category,
            imgs: [],
          };

          for (let i = 0; i < results[1].length; i++) {
            if (results[1][i].img_src) {
              post.imgs.push(results[1][i].img_src);
            }
          }
          // const post = results[0];
          const heart = results[2][0] !== undefined;
          resolve({ post, heart });
        }
      });
    });
  }

  getPostsAndHeart()
    .then(({ post, heart }) => {
      res.json({ post, heart });
    })
    .catch((error) => {
      throw error;
    });
});

app.get("/userpage/data/:userId", function (req, res) {
  const userId = req.params.userId;
  const connection = mysql.createConnection({
    host: HOST_IP,
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
      res.json({ user, posts });
    })
    .catch((error) => {
      throw error;
    });
});
app.post("/heartclick", (req, res) => {
  const connection = mysql.createConnection({
    host: HOST_IP,
    user: "banana",
    password: process.env.DB_PASSWORD,
    database: "mydatabase",
    multipleStatements: true,
  });
  const { heart, userId, postId } = req.body;
  console.log("heart:", heart);
  const addQuery = `INSERT INTO mydatabase.heart (fk_user_id, fk_post_id) VALUES (${userId}, ${postId})`;
  const removeQuery = `DELETE FROM mydatabase.heart WHERE fk_user_id=${userId} AND fk_post_id=${postId} `;
  if (heart) {
    connection.query(removeQuery, (error, result) => {
      if (error) throw error;
      else {
        res.sendStatus(200);
      }
      connection.end();
    });
  } else if (!heart) {
    connection.query(addQuery, (error, result) => {
      if (error) throw error;
      else {
        res.sendStatus(200);
      }
      connection.end();
    });
  } else {
    res.sendStatus(500);
  }
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(8080, function () {
  console.log("listening in 8080");
});
