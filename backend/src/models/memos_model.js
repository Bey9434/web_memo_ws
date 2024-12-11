//データベース関連の関数をまとめる。
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // pathモジュールをインポート
// __dirname を基準にした絶対パスを取得
const dbPath = path.resolve(__dirname, "../db/database.sqlite");
const db = new sqlite3.Database(dbPath);

// メモを保存する関数
function save_memo(title, content) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO memos (title, content) VALUES (?, ?)`;
    db.run(query, [title, content], function (err) {
      if (err) {
        console.error("Database error:", err.message); // エラー出力
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}
//メモを削除する関数
function delete_memo(id, callback) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM memos WHERE id = ?`;
    console.log("Executing query:", query, "with ID:", id);
    db.run(query, [id], function (err) {
      if (err) {
        console.error("Database error:", err.message); // エラー出力
        reject(err);
      }
      console.log(`Changes after delete: ${this.changes}`); // 削除結果を確認
      resolve(this.changes); //削除された行数を返す。
    });
  });
}

//メモを取得する関数
function get_memo_by_id(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM memos WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error("Database error:", err.message); // エラー出力
        reject(err);
      }
      resolve(row);
    });
  });
}
module.exports = { save_memo, delete_memo, get_memo_by_id };
