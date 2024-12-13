const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo, fetch_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート
const { clear_database } = require("../src/utils/clear_database");
const { create_test_database } = require("../src/db/test_memory_db");
describe("特定のメモを取得するテスト。", () => {
  let created_memo_id;
  let db;
  beforeEach(async () => {
    db = create_test_database();
    app.locals.db = db; // アプリケーションで使用するデータベースを上書き
    const response = await post_memo({
      title: "特定のメモを取得するテストだよ",
      content: "これは特定のメモを取得するテストのメモやで",
    });
    console.log("Created memo response:", response.body); // レスポンス確認
    created_memo_id = response.body.id; // 作成されたメモのIDを保持
    console.log("BeforeEach is running");
  });
  afterEach(async () => {
    db.close();
  });
  test("特定のメモを取得すると200を返す", async () => {
    //準備
    const response = await fetch_memo(created_memo_id);
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
