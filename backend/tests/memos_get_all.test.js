const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo, fetch_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート

describe("メモ一覧の取得テスト", () => {
  test("メモ一覧を取得すると200を返す。", async () => {
    //準備
    const response = await request(app).get("/api/memos");
    //実行＆検証
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("content");
    }
  });
  /*test("データベースが空の場合、からの配列を返す。", async () => {
    //準備
    const response = await request(app).get("/api/memos");
    //実行＆検証
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });*/
});
