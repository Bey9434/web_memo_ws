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
    //準備
    const response = await request(app).delete(`/api/memos/${created_memo_id}`);
    //実行＆検証
    expect(response.statusCode).toBe(200);
  });

  test("存在しないメモを削除しようとするとステータス404が返る", async () => {
    //準備
    //実行＆検証
    const response = await request(app).delete(`/api/memos/9999`);
    expect(response.statusCode).toBe(404);
  });
});
