const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// サーバーをテスト環境で直接使うためにエクスポート
module.exports = app;

// サーバーを実行するコード（テスト時は実行されない）
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
