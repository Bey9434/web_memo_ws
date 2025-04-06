//データベース関連の関数をまとめる。
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // pathモジュールをインポート

function create_clusters_model(db) {
  return {
    // すべてのクラスタを取得
    get_all_clusters: () => {
      return new Promise((resolve, reject) => {
        db.all(
          "SELECT id, name, origin, created_at FROM clusters ORDER BY id ASC",
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          }
        );
      });
    },
    // 新規クラスタを作成
    save_cluster: (name, origin = "manual") => {
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
    },
  };
}

module.exports = create_clusters_model;
