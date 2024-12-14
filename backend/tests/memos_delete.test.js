const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート
const { create_test_database } = require("../src/db/test_memory_db");

// メモ削除の共通化関数
const send_delete_response = async (id) => {
  return await request(app).delete(`/api/memos/${id}`);
};
describe("メモ削除のテスト", () => {
  let created_memo_id;
  let db;
  beforeEach(async () => {
    db = create_test_database();
    app.locals.db = db; // アプリケーションで使用するデータベースを上書き
    const response = await post_memo({
      title: "削除テストだよ",
      content: "これは削除テストの内容のメモやで",
    });
    console.log("Created memo response:", response.body); // レスポンス確認
    created_memo_id = response.body.id; // 作成されたメモのIDを保持
    console.log("BeforeEach is running");
  });
  afterEach(async () => {
    db.close();
  });

  test("メモ削除するとステータス200が返され、データが削除される.", async () => {
    const delete_response = await send_delete_response(created_memo_id);
    expect(delete_response.statusCode).toBe(200);

    //削除後にデータが存在しないことを確認する。
    const fetch_response = await send_delete_response(created_memo_id);
    expect(fetch_response.statusCode).toBe(404);
    expect(fetch_response.body).toEqual({ error: "Memo not found." });
  });

  test("存在しないメモを削除しようとするとステータス404が返る", async () => {
    const delete_response = await send_delete_response(999999);
    expect(delete_response.statusCode).toBe(404);
    expect(delete_response.body).toEqual({ error: "Memo not found." });
  });

  test("無効なIDで削除リクエストを送るとステータス400が返る", async () => {
    const delete_response = await send_delete_response("invalid_id");
    expect(delete_response.statusCode).toBe(400);
    expect(delete_response.body).toEqual({ error: "Invalid memo ID" });
  });
});
