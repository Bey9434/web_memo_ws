// backend/src/models/clusters_model.js
const { runAutoClustering } = require("../utils/autoCluster");

function create_clusters_model(db) {
  // 自動クラスタ削除
  const deleteAutoClusters = () =>
    new Promise((resolve, reject) =>
      db.run("DELETE FROM clusters WHERE origin='auto'", (err) =>
        err ? reject(err) : resolve()
      )
    );

  // 自動分類本体
  const autoCluster = async () => {
    await deleteAutoClusters();

    const autoResults = await runAutoClustering(); // [{auto_name, memoIds}, ...]

    const insert = db.prepare(
      "INSERT INTO clusters (name, origin) VALUES (?, 'auto')"
    );
    for (const c of autoResults) {
      await new Promise((r, e) =>
        insert.run(c.auto_name, (err) => (err ? e(err) : r()))
      );
      const lastId = await new Promise((r, e) =>
        db.get("SELECT last_insert_rowid() AS id", (err, row) =>
          err ? e(err) : r(row.id)
        )
      );
      for (const memoId of c.memoIds) {
        await new Promise((r, e) =>
          db.run(
            "UPDATE memos SET cluster_id = ? WHERE id = ?",
            [lastId, memoId],
            (err) => (err ? e(err) : r())
          )
        );
      }
    }
    insert.finalize();

    return autoResults;
  };
  // すべてのクラスタを取得
  const get_all_clusters = () => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT id, name, origin, created_at FROM clusters ORDER BY id ASC",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  };
  // 新規クラスタを作成
  const save_cluster = (name, origin = "manual") => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO clusters (name, origin) VALUES (?, ?)",
        [name.trim(), origin],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, name: name.trim(), origin });
        }
      );
    });
  };
  // クラスタ名を更新
  const update_cluster_name = (id, name) =>
    new Promise((resolve, reject) => {
      db.run(
        "UPDATE clusters SET name = ? WHERE id = ?",
        [name, id],
        function (err) {
          if (err) return reject(err);
          resolve(this.changes > 0);
        }
      );
    });
  //  クラスタを削除
  const delete_cluster = (id) =>
    new Promise((resolve, reject) => {
      db.run("DELETE FROM clusters WHERE id = ?", [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });

  return {
    get_all_clusters,
    save_cluster,
    delete_auto_clusters: deleteAutoClusters,
    auto_cluster: autoCluster,
    update_cluster_name,
    delete_cluster,
  };
}

module.exports = create_clusters_model;
