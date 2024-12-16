const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート
const { create_test_database } = require("../src/db/test_memory_db");

// メモ更新の共通化関数
const send_put_response = async (id) => {
  return await request(app).put(`/api/memos/${id}`).send({
    title: "ほげほげほげほげほげ更新タイトル",
    content: "hogehogehogehogehogehoge更新内容",
  });
};
describe("メモ更新のテスト", () => {
  let created_memo_id;
  let db;
  beforeEach(async () => {
    db = create_test_database();
    app.locals.db = db; // アプリケーションで使用するデータベースを上書き
    const response = await post_memo({
      title: "更新テストだよ",
      content: "これは更新テストの内容のメモやで",
    });
    console.log("Created memo response:", response.body); // レスポンス確認
    created_memo_id = response.body.id; // 作成されたメモのIDを保持
    console.log("BeforeEach is running");
  });
  afterEach(async () => {
    db.close();
  });

  test("メモを更新するとステータス200が返され、データが更新される.", async () => {
    const put_response = await send_put_response(created_memo_id);
    expect(put_response.statusCode).toBe(200);
    expect(put_response.body).toEqual({
      message: "Memo put successfully.",
      id: created_memo_id,
      title: "ほげほげほげほげほげ更新タイトル",
      content: "hogehogehogehogehogehoge更新内容",
    });
  });
});
