//データベース関連の関数をまとめる。
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // pathモジュールをインポート
// __dirname を基準にした絶対パスを取得
const dbPath = path.resolve(__dirname, "../db/database.sqlite");
const db = new sqlite3.Database(dbPath);

function create_models(db) {
  return {
    save_memo: (title, content) => {
      return new Promise((resolve, reject) => {
        const query = `INSERT INTO memos (title, content) VALUES (?, ?)`;
        db.run(query, [title, content], function (err) {
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
      return new Promise((resolve, reject) => {
        const query = `DELETE FROM memos WHERE id = ?`;
        db.run(query, [id], function (err) {
          if (err) {
            console.error("Database error:", err.message);
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
    },
    get_memo_by_id: (id) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM memos WHERE id = ?`;
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
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM memos ORDER BY id ASC`;
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
  };
}

module.exports = create_models;
