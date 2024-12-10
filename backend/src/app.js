const express = require("express");
const app = express();

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
