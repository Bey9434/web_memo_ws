const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート
const { clear_database } = require("../src/utils/clear_database");
const { create_test_database } = require("../src/db/test_memory_db");
describe("メモ保存のテスト", () => {
  let db;
  beforeEach(async () => {
    db = create_test_database();
    app.locals.db = db; // アプリケーションで使用するデータベースを上書き
  });
  afterEach(async () => {
    db.close();
  });
  test("メモ保存をするとステータス201が返され、データが保存される", async () => {
    //準備
    const response = await post_memo({
      title: "保存テストだよ",
      content: "これは保存テストの内容やで",
    });
    //実行＆検証
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("保存テストだよ");
    expect(response.body.content).toBe("これは保存テストの内容やで");
  });
});
