const request = require("supertest"); // supertestをインポート
const app = require("../src/app"); // APIアプリケーションをインポート
const { create_test_database } = require("../src/db/test_memory_db"); // テスト用DB作成関数

describe("メモのクラスタID更新テスト", () => {
  let db;

  beforeEach(async () => {
    db = create_test_database();
    app.locals.db = db;

    // テスト用に1件メモを追加
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO memos (title, content, cluster_id) VALUES (?, ?, ?)`,
        ["テストタイトル", "テスト内容", 0],
        (err) => (err ? reject(err) : resolve())
      );
    });
  });

  afterEach(() => {
    db.close();
  });

  test("メモのクラスタIDを正常に更新できる", async () => {
    const res = await request(app)
      .put("/api/memos/1/cluster")
      .send({ cluster_id: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Memo cluster updated successfully.",
      id: 1,
      cluster_id: 3,
    });
  });

  test("存在しないメモIDの場合、404を返す", async () => {
    const res = await request(app)
      .put("/api/memos/999/cluster")
      .send({ cluster_id: 2 });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Memo not found" });
  });

  test("cluster_id が未指定の場合、400を返す", async () => {
    const res = await request(app).put("/api/memos/1/cluster").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid cluster_id" });
  });

  test("cluster_id が数値でない場合、400を返す", async () => {
    const res = await request(app)
      .put("/api/memos/1/cluster")
      .send({ cluster_id: "abc" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid cluster_id" });
  });
});
