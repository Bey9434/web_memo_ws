const express = require("express");
const app = express();

// ルート定義
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// アプリケーションをエクスポート
module.exports = app;
