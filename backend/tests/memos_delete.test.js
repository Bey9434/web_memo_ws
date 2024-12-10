const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート

describe("メモ削除のテスト", () => {
  let created_memo_id;
  beforeAll(async () => {
    const response = await post_memo({
      title: "削除テストだよ",
      content: "これは削除テストの内容のメモやで",
    });
    console.log("Created memo response:", response.body); // レスポンス確認
    created_memo_id = response.body.id; // 作成されたメモのIDを保持
  });
  test("メモ保存をするとステータス200が返され、データが保存される", async () => {
    const delete_response = await request(app).delete(
      `/api/memos/${created_memo_id}`
    );
    expect(delete_response.statusCode).toBe(200);

    //削除後にデータが存在しないことを確認する。
    const fetch_response = await request(app).delete(
      `/api/memos/${created_memo_id}`
    );
    expect(fetch_response.statusCode).toBe(404);
    expect(fetch_response.body).toEqual({ error: "Memo not found." });
  });

  test("存在しないメモを削除しようとするとステータス404が返る", async () => {
    const response = await request(app).delete(`/api/memos/9999`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Memo not found." });
  });

  test("無効なIDで削除リクエストを送るとステータス400が返る", async () => {
    const response = await request(app).delete(`/api/memos/invalid_id`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Invalid memo ID" });
  });
});
