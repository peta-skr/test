const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { protect } = require("./middleware");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: "date",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

//認証してuidをdbに登録する
app.get("/api/verify", protect, (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE uid = "${req.user.uid}"`,
    (error, results) => {
      console.log(results);
      if (results.length === 0) {
        connection.query(
          `INSERT INTO user(name, uid) VALUE ("${req.user.name}","${req.user.uid}" )`
        );
      }
      console.log(results);
      res.send(results);
    }
  );
});

//ログイン

//スレッド作成
app.post("/thread/create", protect, (req, res) => {
  const thread = req.body;
  console.log(thread.title, thread.description);
  console.log(req.user.uid);
  connection.query(
    `SELECT id FROM user WHERE uid = "${req.user.uid}"`,
    (error, results) => {
      connection.query(
        `INSERT INTO thread(userId, title, description) VALUE (${results[0].id},"${thread.title}","${thread.description}")`
      );
    }
  );
});

//get all thread
app.get("/thread/getAll", (req, res) => {
  connection.query(`SELECT * FROM thread`, (error, results) => {
    res.send(results);
  });
});

//選択threadのレスポンスを取得
///thread?id=xxx
app.get("/thread", (req, res) => {
  let data = {
    thread: [],
    response: [],
  };
  connection.query(
    `SELECT * FROM thread WHERE id = ${req.query.threadId}`,
    (error, results) => {
      console.log(results);
      data.thread = results;
      // res.send(results);
      connection.query(
        `SELECT * FROM response WHERE threadId = ${req.query.threadId}`,
        (error, results) => {
          data.response = results;
          console.log(data);
          res.send(data);
        }
      );
    }
  );
});

//レス
app.post("/response/create", protect, (req, res) => {
  const response = req.body;
  connection.query(
    `SELECT id FROM user WHERE uid = "${req.user.uid}"`,
    (error, results) => {
      console.log(results[0].id);
      connection.query(
        `INSERT INTO response(threadId, userId, text) VALUE (${response.thread_id},${results[0].id},"${response.text}")`
      );
    }
  );
});

//get all users
app.get("/users", (req, res) => {
  connection.query(`SELECT * FROM user`, (error, results) => {
    console.log(results);
    res.send(results);
  });
});

//タイトルキーワード検索
app.get("/thread/search", (req, res) => {
  console.log(req.query);
  connection.query(
    `SELECT * FROM thread WHERE title LIKE "%${req.query.keyword}%"`,
    (error, results) => {
      res.send(results);
    }
  );
});

//年月日検索
//とりあえず指定した日以降に作成されたもの
//といっても年は今年作成したばっかなのであってないようなもの
app.get("/thread/search/date", (req, res) => {
  console.log(req.query);
  connection.query(
    `SELECT * FROM thread WHERE DATE_FORMAT(createdAt, '%Y-%m-%d') >= DATE_FORMAT('${req.query.date}', '%Y-%m-%d')`,
    (error, results) => {
      res.send(results);
      console.log(results);
    }
  );
});

//タイトルキーワード検索
app.get("/thread/search/both", (req, res) => {
  console.log(req.query);
  connection.query(
    `SELECT * FROM thread WHERE title LIKE "%${req.query.keyword}%" AND DATE_FORMAT(createdAt, '%Y-%m-%d') >= DATE_FORMAT('${req.query.date}', '%Y-%m-%d`,
    (error, results) => {
      res.send(results);
      console.log(results);
    }
  );
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
