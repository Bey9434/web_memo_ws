const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIをインポート

//重複したリクエスト処理の共通化
const post_memo = async (data) => {
  return await request(app).post("/api/memos").send(data);
};

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
