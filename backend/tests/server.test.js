const request = require("supertest");
const app = require("../src/app"); // サーバーファイルをインポート

test("サーバーが起動してルートにアクセスできる", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello, World!");
});
