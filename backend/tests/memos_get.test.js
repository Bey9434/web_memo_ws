const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo, fetch_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート

describe("特定のメモを取得するテスト", () => {
  test("特定のメモを取得すると200を返す", async () => {
    //準備
    const response = await fetch_memo(3);
    //実行＆検証
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("content");
  });

  test("存在しないメモを取得すると404を返す", async () => {
    //準備
    const response = await fetch_memo(999999);
    //実行＆検証
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Memo not found." });
  });

  test("無効なIDでリクエストを送ると400を返す", async () => {
    //準備
    const response = await fetch_memo("Invalid_ID");
    //実行＆検証
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Invalid memo ID" });
  });
});
