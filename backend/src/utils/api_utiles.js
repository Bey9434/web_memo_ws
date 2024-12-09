const request = require("supertest");
const app = require("../../src/app"); // アプリをインポート

// メモ作成のリクエスト関数
const post_memo = async (data) => {
  return await request(app).post("/api/memos").send(data);
};

// 必要なリクエスト関数をエクスポート
module.exports = { post_memo };
