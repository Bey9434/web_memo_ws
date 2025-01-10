const express = require("express");
const app = express();

const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // フロントエンドのオリジンを許可
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

let db;
/// データベース設定（本番 or テスト切り替え）
db = new sqlite3.Database(
  path.resolve(__dirname, "./db/database.sqlite"), // 本番DB
  (err) => {
    if (err) {
      console.error("Error connecting to database:", err.message);
    } else {
      console.log("Connected to production database.");
    }
  }
);

// データベースをアプリケーションにセット
app.locals.db = db;
// ルート定義
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//アプリケーション・レベルのミドルウェア設定
app.use(express.json()); // JSONボディのパース。req.bodyを使うため。

//ルート登録。ルーター・レベルのミドルウェア設定。
const memosRouter = require("./routes/memos_routes");
app.use("/api/memos", memosRouter);

// アプリケーションをエクスポート
module.exports = app;
