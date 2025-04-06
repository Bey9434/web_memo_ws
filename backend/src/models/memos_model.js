//データベース関連の関数をまとめる。
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // pathモジュールをインポート
// __dirname を基準にした絶対パスを取得
//const dbPath = path.resolve(__dirname, "../db/database.sqlite");
//const db = new sqlite3.Database(dbPath);

function create_models(db) {
  return {
    save_memo: (title, content, cluster_id) => {
      const query = `INSERT INTO memos (title, content, cluster_id) VALUES (?, ?, ?)`;
      return new Promise((resolve, reject) => {
        db.run(query, [title, content, cluster_id], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    },
    delete_memo: (id) => {
      const query = `DELETE FROM memos WHERE id = ?`;
      return new Promise((resolve, reject) => {
        db.run(query, [id], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.changes > 0);
            //this.changesは削除された行の数を返す。
            //DELETE FROM memos WHERE id = 1 の場合、id = 1 が存在し削除が成功すると、this.changes は1を返す。
          }
        });
      });
    },
    get_memo_by_id: (id) => {
      const query = `SELECT * FROM memos WHERE id = ?`;
      return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    },
    get_all_memo: () => {
      const query = `SELECT * FROM memos ORDER BY id ASC`;
      return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
    put_memo: (id, title, content, cluster_id) => {
      const query =
        "UPDATE memos SET title = ?, content = ?, cluster_id = ? WHERE id = ?";
      return new Promise((resolve, reject) => {
        db.run(query, [title, content, cluster_id, id], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.changes > 0);
            //更新された行の数を返す。
            //UPDATE memos SET title = 'new title' WHERE id = 1 の場合、その id = 1 が存在し、更新が成功すると this.changes は 1 を返す。
          }
        });
      });
    },
    update_cluster_id: (id, cluster_id) => {
      const query = "UPDATE memos SET cluster_id = ? WHERE id = ?";
      return new Promise((resolve, reject) => {
        db.run(query, [cluster_id, id], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.changes > 0);
          }
        });
      });
    },
  }; //return.この内側にメソッドを定義する。
}

module.exports = create_models;
