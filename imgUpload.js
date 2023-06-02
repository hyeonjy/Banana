// const multer = require("multer");
// const crypto = require("crypto");
// const fs = require("fs");

// const randomFilename =
//   crypto.randomBytes(16).toString("hex") + "." + file.mimetype.split("/")[1];
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./imgUpload");
//     //이미지 업로드시킬 폴더 위치
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//     //서버에 저장할 파일 명
//   },
// });
// var upload = multer({ storage: storage });
// //storage는 업로드 될 폴더 위치

// module.exports = {
//   upload,
// };
