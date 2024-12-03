const request = require("supertest"); // supertestをインポート
const app = require("../src/routes"); // APIをインポート

test("メモのタイトルが欠けている場合、ステータス400エラーを返す", async () => {
  //準備
  const response = await request(app).POST("/api/memo").send({
    title: " ",
    content: "テストやで。",
  });

  //実行＆検証
  expect(response.statusCode).toBe(400);
});
