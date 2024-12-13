const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート
const { clear_database } = require("../src/utils/clear_database");
describe("メモ作成のテスト", () => {
  beforeEach(async () => {
    await clear_database();
  });
  test("メモのタイトルが欠けている場合、ステータス400エラーを返す", async () => {
    //準備
    const response = await post_memo({
      title: "",
      content: "テストやで",
    });
    //実行＆検証
    expect(response.statusCode).toBe(400);
  });

  test("メモのタイトルが正常に入力されたとき、ステータス201を返す。", async () => {
    //準備
    const response = await post_memo({
      title: "メモ作成のテストタイトル",
      content: "作成のテストやで",
    });
    //実行＆検証
    expect(response.statusCode).toBe(201);
  });
});
