// const HOST_IP = "172.30.72.97"; //스벅
// const HOST_IP = "172.30.1.48"; //커나
// const HOST_IP = "172.16.61.69"; //세종
const HOST_IP = "127.0.0.1";
// const HOST_IP = "172.30.1.18"; //파바

/*서버 연동 */
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const sharp = require("sharp");

const router = express.Router();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("dotenv").config();

//이미지 업로드
const multer = require("multer");
app.use("/upload", express.static("upload"));
const fs = require("fs");
const imageDir = path.join(__dirname, "upload");
const { default: axios } = require("axios");

// body 접근하기 위해
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

//SQL
const mysql = require("mysql");
const { error } = require("console");
const queryOption = {
  host: HOST_IP,
  user: "banana",
  password: process.env.DB_PASSWORD,
  database: "mydatabase",
  multipleStatements: true,
};
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/data/:sort", async (request, response) => {
  const connection = mysql.createConnection(queryOption);
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
    async (error, result) => {
      if (error) throw error;
      else {
        // const images = [];
        for (let i = 0; i < result.length; i++) {
          const imagePath = path.join(imageDir, result[i].img_src);
          if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const compressedImg = await sharp(imageData)
              .resize({ width: 400 })
              .toBuffer();
            const imageBase64 = compressedImg.toString("base64");
            result[i].img_src = {
              filename: result[i].img_src,
              data: imageBase64,
            };
          }
        }

        response.json(result);
      }
    }
  );
});

app.get("/searchdata/:searchkey/:sort", function (req, res) {
  const connection = mysql.createConnection(queryOption);
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
    async (error, result) => {
      if (error) throw error;
      else {
        for (let i = 0; i < result.length; i++) {
          const imagePath = path.join(imageDir, result[i].img_src);

          if (fs.existsSync(imagePath)) {
            const imageData = fs.readFileSync(imagePath);
            const compressedImg = await sharp(imageData)
              .resize({ width: 600 })
              .toBuffer();
            const imageBase64 = compressedImg.toString("base64");
            result[i].img_src = {
              filename: result[i].img_src,
              data: imageBase64,
            };
          }
        }
        res.json(result);
      }
    }
  );
});

//데스트탑용
app.get("/main/:main/:sort", function (req, res) {
  const connection = mysql.createConnection(queryOption);
  let option = null;
  const sort = req.params.sort;
  const main = req.params.main;

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

  const mainSQL = `
  SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
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
  WHERE p.main_category='${main}'
  ORDER BY ${option} DESC; `;
  connection.query(mainSQL, async (error, result) => {
    if (error) throw error;
    else {
      for (let i = 0; i < result.length; i++) {
        const imagePath = path.join(imageDir, result[i].img_src);

        if (fs.existsSync(imagePath)) {
          const imageData = fs.readFileSync(imagePath);
          const compressedImg = await sharp(imageData)
            .resize({ width: 500 })
            .toBuffer();
          const imageBase64 = compressedImg.toString("base64");
          result[i].img_src = {
            filename: result[i].img_src,
            data: imageBase64,
          };
        }
      }
      res.json(result);
    }
  });
});
//데스크탑용
app.get("/sub/:sub/:sort", function (req, res) {
  const connection = mysql.createConnection(queryOption);
  let option = null;
  const sort = req.params.sort;
  const sub = req.params.sub;
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

  const mainSQL = `
  SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
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
  WHERE p.sub_category='${sub}'
  ORDER BY ${option} DESC;
  `;
  connection.query(mainSQL, async (error, result) => {
    if (error) throw error;
    else {
      for (let i = 0; i < result.length; i++) {
        const imagePath = path.join(imageDir, result[i].img_src);

        if (fs.existsSync(imagePath)) {
          const imageData = fs.readFileSync(imagePath);
          const compressedImg = await sharp(imageData)
            .resize({ width: 500 })
            .toBuffer();
          const imageBase64 = compressedImg.toString("base64");
          result[i].img_src = {
            filename: result[i].img_src,
            data: imageBase64,
          };
        }
      }
      res.json(result);
    }
  });
});

app.get("/postdata/:postId/:userId", function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const postId = req.params.postId;
  const userId = req.params.userId;

  //로그인 or 비로그인
  const isUser = userId !== "undefined";
  const postQuery = `SELECT post.*, user.*, post_img.img_src
  FROM post
  LEFT JOIN user
  ON post.fk_user_id = user.user_id
  LEFT JOIN post_img
  ON post.post_id = post_img.fk_post_id
  WHERE post_id = ${postId}; `;
  const heartQuery = `SELECT * FROM heart WHERE fk_user_id = ${userId} AND fk_post_id = ${postId}; `;
  const hitsQuery = `UPDATE post SET hits = hits + 1 WHERE post_id = ${postId}; `;
  let Query = "";
  if (isUser) Query = hitsQuery + postQuery + heartQuery;
  else Query = hitsQuery + postQuery;
  function getPostsAndHeart() {
    return new Promise((resolve, reject) => {
      connection.query(Query, async (error, results) => {
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
            main_category: results[1][0].main_category,
            sub_category: results[1][0].sub_category,
            imgs: [],
          };

          for (let i = 0; i < results[1].length; i++) {
            if (results[1][i].img_src) {
              const imagePath = path.join(imageDir, results[1][i].img_src);
              if (fs.existsSync(imagePath)) {
                const imageData = fs.readFileSync(imagePath);
                const imageBase64 = imageData.toString("base64");
                results[1][i].img_src = {
                  filename: results[1][i].img_src,
                  data: imageBase64,
                  file: imageData,
                };
              }

              post.imgs.push(results[1][i].img_src);
            }
          }
          const profilePath = path.join(imageDir, results[1][0].profile);
          if (fs.existsSync(profilePath)) {
            const imageData = fs.readFileSync(profilePath);
            const compressedImg = await sharp(imageData)
              .resize({ width: 800 })
              .toBuffer();
            const imageBase64 = compressedImg.toString("base64");
            post.src = {
              filename: results[1][0].profile,
              data: imageBase64,
            };
          }
          let heart = false;
          //비로그인 유저일 경우 하트 여부 확인 쿼리 X
          if (isUser) {
            heart = results[2][0] !== undefined;
          }
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
  //비로그인 유저일 경우 하트 여부 확인 쿼리 X
});
app.delete("/posts/:postId", (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const postId = req.params.postId;
  const deleteSQL = `DELETE FROM mydatabase.post WHERE post_id=${postId};`;

  //CASCADE 설정하려고 했으나 MYSQL에서 Duplicate FOREIGN KEY constraint name 에러
  //(post_img 테이블의 외래키와 컬럼명이 같아서 생기는 오류로 추정)
  const deleteHeartSQL = `DELETE FROM mydatabase.heart WHERE fk_post_id=${postId};`;
  connection.query(deleteSQL + deleteHeartSQL, (error, result) => {
    if (error) throw error;
    else {
      res.sendStatus(200);
    }
  });
});

app.get("/mypage", authenticateToken, function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const { userId } = req.user;
  const query1 = `SELECT user_id, grade, profile, nickname, email FROM user WHERE user_id = ${userId}; `;
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
  const query3 = `SELECT r.*, u.nickname, u.profile
  FROM review r
  JOIN USER u ON r.fk_review_writer_id = u.user_id
  WHERE r.fk_review_receiver_id = ${userId};`;

  function getUserAndPosts() {
    return new Promise((resolve, reject) => {
      connection.query(query1 + query2 + query3, async (error, results) => {
        if (error) {
          reject(error);
        } else {
          const user = results[0][0];
          const posts = results[1];
          const reviews = results[2];

          for (let i = 0; i < posts.length; i++) {
            const imagePath = path.join(imageDir, posts[i].img_src);

            if (fs.existsSync(imagePath)) {
              const imageData = fs.readFileSync(imagePath);
              const imageBase64 = imageData.toString("base64");
              posts[i].img_src = {
                filename: posts[i].img_src,
                data: imageBase64,
              };
            }
          }
          const profilePath = path.join(imageDir, user.profile);
          if (fs.existsSync(profilePath)) {
            const imageData = fs.readFileSync(profilePath);
            const compressedImg = await sharp(imageData)
              .resize({ width: 500 })
              .toBuffer();
            const imageBase64 = compressedImg.toString("base64");
            user.profile = {
              filename: user.profile,
              data: imageBase64,
            };
          }

          resolve({ user, posts, reviews });
        }
      });
    });
  }

  getUserAndPosts()
    .then(({ user, posts, reviews }) => {
      res.json({ user, posts, reviews });
    })
    .catch((error) => {
      throw error;
    });
});

app.get("/userpage/data/:userId", function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const userId = req.params.userId;
  const query1 = `SELECT user_id, grade, profile, nickname FROM user WHERE user_id = ${userId}; `;
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
  const query3 = `SELECT r.*, u.nickname, u.profile
  FROM review r
  JOIN USER u ON r.fk_review_writer_id = u.user_id
  WHERE r.fk_review_receiver_id = ${userId};`;

  function getUserAndPosts() {
    return new Promise((resolve, reject) => {
      connection.query(query1 + query2 + query3, async (error, results) => {
        if (error) {
          reject(error);
        } else {
          const user = results[0][0];
          const posts = results[1];
          const reviews = results[2];

          for (let i = 0; i < posts.length; i++) {
            const imagePath = path.join(imageDir, posts[i].img_src);

            if (fs.existsSync(imagePath)) {
              const imageData = fs.readFileSync(imagePath);
              const imageBase64 = imageData.toString("base64");
              posts[i].img_src = {
                filename: posts[i].img_src,
                data: imageBase64,
              };
            }
          }
          const profilePath = path.join(imageDir, user.profile);
          if (fs.existsSync(profilePath)) {
            const imageData = fs.readFileSync(profilePath);
            const compressedImg = await sharp(imageData)
              .resize({ width: 500 })
              .toBuffer();
            const imageBase64 = compressedImg.toString("base64");
            user.profile = {
              filename: user.profile,
              data: imageBase64,
            };
          }

          resolve({ user, posts, reviews });
        }
      });
    });
  }

  getUserAndPosts()
    .then(({ user, posts, reviews }) => {
      res.json({ user, posts, reviews });
    })
    .catch((error) => {
      throw error;
    });
});

app.get("/mypage/heart", authenticateToken, function (req, res) {
  const connection = mysql.createConnection(queryOption);
  const { userId } = req.user;
  const query = `SELECT p.*, pi.img_src, h.heart_id
  FROM heart h
  LEFT JOIN post p ON h.fk_post_id = p.post_id
  LEFT JOIN (
    SELECT fk_post_id, MIN(img_id) AS min_img_id
    FROM post_img
    GROUP BY fk_post_id
  ) AS min_img ON p.post_id = min_img.fk_post_id
  LEFT JOIN post_img PI ON min_img.fk_post_id = pi.fk_post_id AND min_img.min_img_id = pi.img_id
  WHERE h.fk_user_id = ${userId}
  ORDER BY h.heart_id DESC`;

  function getUserAndPosts() {
    return new Promise((resolve, reject) => {
      connection.query(query, async (error, results) => {
        if (error) {
          reject(error);
        } else {
          const posts = results;
          for (let i = 0; i < posts.length; i++) {
            const imagePath = path.join(imageDir, posts[i].img_src);

            if (fs.existsSync(imagePath)) {
              const imageData = fs.readFileSync(imagePath);
              const compressedImg = await sharp(imageData)
                .resize({ width: 500 })
                .toBuffer();
              const imageBase64 = compressedImg.toString("base64");
              posts[i].img_src = {
                filename: posts[i].img_src,
                data: imageBase64,
              };
            }
          }
          resolve({ posts });
        }
      });
    });
  }

  getUserAndPosts()
    .then(({ posts }) => {
      res.json({ posts });
    })
    .catch((error) => {
      throw error;
    });
});

app.post("/heartclick", (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const { heart, userId, postId } = req.body;
  const addQuery = `INSERT INTO mydatabase.heart (fk_user_id, fk_post_id) VALUES (${userId}, ${postId})`;
  const removeQuery = `DELETE FROM mydatabase.heart WHERE fk_user_id=${userId} AND fk_post_id=${postId} `;
  if (heart) {
    connection.query(removeQuery, (error, result) => {
      if (error) throw error;
      else {
        res.sendStatus(200);
      }
    });
  } else if (!heart) {
    connection.query(addQuery, (error, result) => {
      if (error) throw error;
      else {
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(500);
  }
});

app.post("/stateChange", (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const { state, postId } = req.body;
  const stateUpdateQuery = `UPDATE post
  SET state = '${state}'
  WHERE post_id = ${postId};`;
  if (state !== null) {
    connection.query(stateUpdateQuery, (error, result) => {
      if (error) throw error;
      else {
        res.json(state);
      }
    });
  } else {
    res.sendStatus(500);
  }
});
function currentTime() {
  // 현재 시간 가져오기
  var currentDate = new Date();

  // 대한민국 서울 시간으로 변환
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  };
  var seoulTime = currentDate.toLocaleString("en-US", options);

  // 날짜와 시간을 원하는 형식으로 분리
  var datePart = seoulTime.split(",")[0];
  var timePart = seoulTime.split(",")[1].trim();

  // 연도, 월, 일을 추출
  var [month, day, year] = datePart.split("/");

  // 날짜를 '0000-00-00' 형식으로 변경
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate + " " + timePart;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const name = file.originalname.split(".")[0];
    const filename = `${Date.now()}${name}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

//게시글 작성
app.post(
  "/postwrite",
  authenticateToken,
  upload.array("images"),
  (req, res) => {
    const connection = mysql.createConnection(queryOption);

    const { userId } = req.user;
    const { title, contents, major, minor, area } = req.body;
    const time = currentTime();
    const imgFiles = req.files;
    const filenames = [];

    for (const file of imgFiles) {
      filenames.push(file.filename);
    }
    const values = filenames.map((filename) => [filename]);

    //grade 변경
    const PostCountSQL = `SELECT COUNT(*) AS count FROM mydatabase.post WHERE fk_user_id=${userId} `;

    const writeSQL = `
  INSERT INTO mydatabase.post (title, content, fk_user_id, post_date, area, main_category, sub_category, state, heart, hits) VALUES ('${title}', '${contents}', ${userId}, '${time}', '${area}', '${major}', '${minor}', 'wait', 0, 0);
  `;
    let postId = -1;
    connection.query(writeSQL, (error, result) => {
      if (error) throw error;
      else {
        postId = result.insertId;
        const imgSQL = `
      INSERT INTO mydatabase.post_img (fk_post_id,  img_src) VALUES (${postId}, ?);
    `;
        values.forEach((filename) => {
          connection.query(imgSQL, [filename], (error, result) => {
            if (error) throw error;
          });
        });
        connection.query(PostCountSQL, (error, result) => {
          if (error) throw error;
          const cnt = result[0].count;
          let grade = -1;
          if (cnt > 0) {
            switch (cnt) {
              case 4:
                grade = 1;
                break;
              case 10:
                grade = 2;
                break;
              case 20:
                grade = 3;
                break;
              default:
                grade = -1;
                break;
            }
            if (grade !== -1) {
              const GradeUpdataSQL = `UPDATE mydatabase.user SET grade=${grade} WHERE user_id=${userId} `;

              connection.query(GradeUpdataSQL, (error, result) => {
                if (error) throw error;
              });
            }
          }
          res.json(postId);
        });
      }
    });
  }
);
//게시글 수정
app.post("/postUpdate", upload.array("images"), (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const { title, contents, major, minor, area, postId, deletePost } = req.body;

  const imgFiles = req.files;
  const filenames = [];

  for (const file of imgFiles) {
    filenames.push(file.filename);
  }
  const values = filenames.map((filename) => [filename]);

  const UpdatePostSQL = `UPDATE mydatabase.post SET title='${title}', content='${contents}', main_category='${major}', sub_category='${minor}', area='${area}' WHERE post_id=${postId};`;
  const ImgAddSQL = `INSERT INTO mydatabase.post_img (fk_post_id,  img_src) VALUES (${postId}, ?); `;
  const DeleteImgSQL = `DELETE FROM mydatabase.post_img WHERE img_src=? ;`;

  const deleteFile = deletePost[0].split(",");
  connection.query(UpdatePostSQL, (error, result) => {
    if (error) throw error;
    else {
      deleteFile.forEach((filename) => {
        connection.query(DeleteImgSQL, [filename], (error, result) => {
          if (error) throw error;
        });
      });
      if (imgFiles.length > 0) {
        values.forEach((filename) => {
          connection.query(ImgAddSQL, [filename], (error, result) => {
            if (error) throw error;
          });
        });
      }
      res.json(postId);
    }
  });
});

//모바일용
app.get("/categorydata/:main/:sub", function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const main = req.params.main;
  const sub = req.params.sub;

  const query = `SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
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
  WHERE p.main_category ='${main}' AND p.sub_category ='${sub}' 
  ORDER BY p.post_date DESC;`;
  connection.query(query, async (error, result) => {
    if (error) throw error;
    else {
      for (let i = 0; i < result.length; i++) {
        const imagePath = path.join(imageDir, result[i].img_src);

        if (fs.existsSync(imagePath)) {
          const imageData = fs.readFileSync(imagePath);
          const compressedImg = await sharp(imageData)
            .resize({ width: 300 })
            .toBuffer();
          const imageBase64 = compressedImg.toString("base64");
          result[i].img_src = {
            filename: result[i].img_src,
            data: imageBase64,
          };
        }
      }
      res.json(result);
    }
  });
});

app.get("/regiondata/:region", function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const region = req.params.region;

  let query = ``;

  if (region === "전체보기") {
    query = `SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
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
    ORDER BY p.post_date DESC;`;
  } else {
    query = `SELECT p.post_id, p.title, p.content, p.post_date, p.area, pi_id.img_src, p.main_category, p.sub_category, p.state, p.hits, p.heart, p.fk_user_id
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
    WHERE p.area = '${region}'
    ORDER BY p.post_date DESC;`;
  }
  connection.query(query, async (error, result) => {
    if (error) throw error;
    else {
      for (let i = 0; i < result.length; i++) {
        const imagePath = path.join(imageDir, result[i].img_src);

        if (fs.existsSync(imagePath)) {
          const imageData = fs.readFileSync(imagePath);
          const compressedImg = await sharp(imageData)
            .resize({ width: 300 })
            .toBuffer();
          const imageBase64 = compressedImg.toString("base64");
          result[i].img_src = {
            filename: result[i].img_src,
            data: imageBase64,
          };
        }
      }
      res.json(result);
    }
  });
});

//JWT 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

//리프레시 토큰
app.post("/refreshtoken", (req, res) => {
  if (req.body && req.headers.authorization) {
    const authToken = req.headers.authorization.split("Bearer ")[1];
    const { refresh } = req.body;
    if (!refresh) {
      return res.status(400).json({ message: "Refresh token not provided" });
    }

    //유저 정보 파싱을 위한 디코딩
    const decoded = jwt.decode(authToken);

    //리프레시 토큰 검증
    jwt.verify(refresh, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      console.log(decoded.userId);
      //새 액세스 토큰 생성
      const newAccessToken = jwt.sign(
        {
          userId: decoded.userId,
          nickname: decoded.nickname,
        },
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
      );
      const data = {
        access_token: newAccessToken,
        refreshToken: refresh,
        expiresIn: jwt.decode(newAccessToken).exp,
        refreshExpiresAt: jwt.decode(refresh).exp,
      };
      res.json(data);
    });
  } else {
    res.status(400).json({ message: "Refresh token not provided" });
  }
});

//카카오 로그인
app.post("/kakao/user", (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const { access_token } = req.body;
  if (access_token) {
    axios
      .post(
        "https://kapi.kakao.com/v2/user/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const {
          email,
          profile: { nickname },
        } = data.kakao_account;

        const password = Math.random().toString(36).slice(2);
        const isUserSQL = `SELECT *, COUNT(*) AS count FROM mydatabase.user WHERE email = '${email}'`;
        const createUser = ` INSERT INTO mydatabase.user (email, password, nickname, profile, grade) VALUES ('${email}', '${password}', '${nickname}', "bananaface.png", 0);`;

        connection.query(isUserSQL, (error, result) => {
          if (error) throw error;
          else {
            const userExists = result[0].count > 0;
            let userId = -1;
            if (!userExists) {
              connection.query(createUser, (error, result) => {
                if (error) throw error;
                userId = result.insertId;
                const token = jwt.sign(
                  {
                    userId: userId,
                    nickname: nickname,
                  },
                  process.env.SECRET_KEY,
                  { expiresIn: "10m" }
                );
                const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
                  expiresIn: "7d",
                });
                const data = {
                  access_token: token,
                  refreshToken: refreshToken,
                  expiresIn: jwt.decode(token).exp,
                  refreshExpiresAt: jwt.decode(refreshToken).exp,
                };
                res.json(data);
              });
            } else {
              userId = result[0].user_id;
              const token = jwt.sign(
                {
                  userId: userId,
                  nickname: nickname,
                },
                process.env.SECRET_KEY,
                { expiresIn: "10m" }
              );
              const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
                expiresIn: "7d",
              });
              const data = {
                access_token: token,
                refreshToken: refreshToken,
                expiresIn: jwt.decode(token).exp,
                refreshExpiresAt: jwt.decode(refreshToken).exp,
              };

              res.json(data);
            }
          }
        });
      });
  } else {
    console.log("토큰 XX");
    res.sendStatus(404);
  }
});

//구글 로그인
app.post("/google/user", async (req, res) => {
  const connection = mysql.createConnection(queryOption);
  const { code } = req.body;
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const clientId = process.env.REACT_APP_GOOGLE_CLINET_ID;
  const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRETE;
  const redirectUri = process.env.REACT_APP_REDIRECT_URL;
  const tokenParams = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(tokenUrl, null, { params: tokenParams });
    const { access_token, expires_in } = response.data;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const nickname = response.data.name;
        const email = response.data.email;

        const password = Math.random().toString(36).slice(2);
        const isUserSQL = `SELECT *, COUNT(*) AS count FROM mydatabase.user WHERE email = '${email}'`;
        const createUser = ` INSERT INTO mydatabase.user (email, password, nickname, profile, grade) VALUES ('${email}', '${password}', '${nickname}', "bananaface.png", 0);`;

        connection.query(isUserSQL, (error, result) => {
          if (error) throw error;
          else {
            const userExists = result[0].count > 0;
            let userId = -1;
            if (!userExists) {
              connection.query(createUser, (error, result) => {
                if (error) throw error;
                userId = result.insertId;
                const token = jwt.sign(
                  {
                    userId: userId,
                    nickname: nickname,
                  },
                  process.env.SECRET_KEY,
                  { expiresIn: "10m" }
                );
                const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
                  expiresIn: "7d",
                });
                const data = {
                  access_token: token,
                  refreshToken: refreshToken,
                  expiresIn: jwt.decode(token).exp,
                  refreshExpiresAt: jwt.decode(refreshToken).exp,
                };
                res.json(data);
              });
            } else {
              userId = result[0].user_id;
              const token = jwt.sign(
                {
                  userId: userId,
                  nickname: nickname,
                },
                process.env.SECRET_KEY,
                { expiresIn: "10m" }
              );
              const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
                expiresIn: "7d",
              });
              const data = {
                access_token: token,
                refreshToken: refreshToken,
                expiresIn: jwt.decode(token).exp,
                refreshExpiresAt: jwt.decode(refreshToken).exp,
              };

              res.json(data);
            }
          }
        });
      });
  } catch (error) {
    console.error(
      "Error exchanging authorization code for access token:",
      error
    );
    res.status(500).send("Error");
  }
});
//일반 로그인
app.post("/login", function (req, res) {
  const connection = mysql.createConnection(queryOption);

  const { email, password } = req.body;
  const isUserSQL = `SELECT *, COUNT(*) AS count FROM mydatabase.user WHERE email = '${email}' AND password='${password}' `;

  connection.query(isUserSQL, (error, result) => {
    if (error) throw error;
    else {
      const userExists = result[0].count > 0;
      //해당 유저 존재하는 경우
      if (userExists) {
        const userId = result[0].user_id;
        const nickname = result[0].nickname;
        // -> jwt 토큰 전송
        const token = jwt.sign(
          {
            userId: userId,
            nickname: nickname,
          },
          process.env.SECRET_KEY,
          { expiresIn: "10m" }
        );

        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        const data = {
          access_token: token,
          refreshToken: refreshToken,
          expiresIn: jwt.decode(token).exp,
          refreshExpiresAt: jwt.decode(refreshToken).exp,
        };
        res.json(data);
      } else {
        //해당 유저 존재하지 않는 경우
        return res
          .status(401)
          .json({ error: "아이디 혹은 비밀번호가 일치하지 않습니다" });
      }
    }
  });
});
//일반 회원가입
app.post("/signup", (req, res) => {
  const connection = mysql.createConnection(queryOption);

  const { id, password, nickname } = req.body;
  //id는 이메일

  // 아이디가 중복된 경우
  const validEmail = `SELECT COUNT(*) AS count FROM mydatabase.user WHERE email = '${id}' AND password !='${password}' `;

  //회원가입
  const createUser = ` INSERT INTO mydatabase.user (email, password, nickname, profile, grade) VALUES ('${id}', '${password}', '${nickname}', "bananaface.png", 0);`;
  connection.query(validEmail, (error, result) => {
    if (error) throw error;
    else {
      const emailExists = result[0].count > 0;
      let userId = -1;
      if (emailExists) {
        res.status(401).json({ error: "이미 존재하는 이메일입니다" });
      } else {
        connection.query(createUser, (error, result) => {
          if (error) throw error;
          userId = result.insertId;
          const token = jwt.sign(
            {
              userId: userId,
              nickname: nickname,
            },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
          );
          const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
            expiresIn: "7d",
          });
          const data = {
            access_token: token,
            refreshToken: refreshToken,
            expiresIn: jwt.decode(token).exp,
            refreshExpiresAt: jwt.decode(refreshToken).exp,
          };
          res.json(data);
        });
      }
    }
  });
});

app.post("/profile/edit", upload.single("profile"), (req, res) => {
  const connection = mysql.createConnection(queryOption);
  const file = req.file;
  const { nickname, userId } = req.body;
  let userChangeSQL = "";
  if (file) {
    userChangeSQL = `UPDATE mydatabase.USER SET nickname='${nickname}', profile='${file.filename}' WHERE user_id=${userId}`;
  } else {
    userChangeSQL = `UPDATE mydatabase.USER SET nickname='${nickname}' WHERE user_id=${userId};`;
  }
  connection.query(userChangeSQL, (error, result) => {
    if (error) throw error;
    res.sendStatus(200);
  });
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(8080, function () {
  console.log("listening in 8080");
});
