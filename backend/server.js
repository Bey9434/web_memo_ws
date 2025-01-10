const express = require("express"); // ← expressのインポートが必要
const app = require("./src/app"); // app.jsをインポート

const PORT = 3001;

// サーバーを起動（本番環境用）
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// テスト用にエクスポート
module.exports = app;
