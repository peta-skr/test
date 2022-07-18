const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { protect } = require("./middleware");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 5000;

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.create({
    data: { uid: "1234", name: "test" },
  });
  console.log(user);
};

main();

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(cors());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: process.env.USER_NAME,
//   password: process.env.PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("error connecting: " + err.stack);
//     return;
//   }
//   console.log("success");
// });

// //認証してuidをdbに登録する
// app.get("/api/verify", protect, (req, res) => {
//   connection.query(
//     `SELECT * FROM users WHERE uid = "${req.user.uid}"`,
//     (error, results) => {
//       console.log(results);
//       if (results.length === 0) {
//         connection.query(
//           `INSERT INTO users(uid, name) VALUE ("${req.user.uid}", "${req.user.name}")`
//         );
//       }
//       // console.log(results);
//       res.send(results);
//     }
//   );
// });

// //ログイン

// //スレッド作成
// app.post("/thread/create", protect, (req, res) => {
//   const thread = req.body;
//   console.log(thread.title, thread.description);
//   connection.query(
//     `SELECT id FROM users WHERE uid = "${req.user.uid}"`,
//     (error, results) => {
//       console.log(results[0].id);
//       connection.query(
//         `INSERT INTO thread(user_id, title, description) VALUE (${results[0].id},"${thread.title}","${thread.description}")`
//       );
//     }
//   );
// });

// //get all thread
// app.get("/thread/getAll", (req, res) => {
//   connection.query(`SELECT * FROM thread`, (error, results) => {
//     res.send(results);
//   });
// });

// //選択threadのレスポンスを取得
// ///thread?id=xxx
// app.get("/thread", (req, res) => {
//   let data = {
//     thread: [],
//     response: [],
//   };
//   connection.query(
//     `SELECT * FROM thread WHERE id = ${req.query.threadId}`,
//     (error, results) => {
//       console.log(results);
//       data.thread = results;
//       // res.send(results);
//       connection.query(
//         `SELECT * FROM response WHERE thread_id = ${req.query.threadId}`,
//         (error, results) => {
//           data.response = results;
//           console.log(data);
//           res.send(data);
//         }
//       );
//     }
//   );
// });

// //レス
// app.post("/response/create", protect, (req, res) => {
//   const response = req.body;
//   connection.query(
//     `SELECT id FROM users WHERE uid = "${req.user.uid}"`,
//     (error, results) => {
//       console.log(results[0].id);
//       connection.query(
//         `INSERT INTO response(thread_id, user_id, text) VALUE (${response.thread_id},${results[0].id},"${response.text}")`
//       );
//     }
//   );
// });

// //get all users
// app.get("/users", (req, res) => {
//   connection.query(`SELECT * FROM users`, (error, results) => {
//     console.log(results);
//     res.send(results);
//   });
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
