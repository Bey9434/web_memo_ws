const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート
const { post_memo } = require("../src/utils/api_utiles"); //utils関数をオンポート

describe("メモ作成のテスト", () => {
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
      title: "テストタイトル",
      content: "テストやで",
    });
    //実行＆検証
    expect(response.statusCode).toBe(201);
  });
});
