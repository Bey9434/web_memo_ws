const request = require("supertest");
const app = require("../../src/app"); // アプリをインポート

// メモ作成のリクエスト関数
const post_memo = async (data) => {
  return await request(app).post("/api/memos").send(data);
};

//指定したIDのメモを取得する関数
const fetch_memo = async (id) => {
  return await request(app).get(`/api/memos/${id}`);
};

// 必要なリクエスト関数をエクスポート
module.exports = { post_memo, fetch_memo };
