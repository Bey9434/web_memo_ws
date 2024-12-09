const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // pathモジュールをインポート
// __dirname を基準にした絶対パスを取得
const dbPath = path.resolve(__dirname, "../db/database.sqlite");
const db = new sqlite3.Database(dbPath);

// メモを保存する関数
function save_memo(title, content, callback) {
  const query = `INSERT INTO memos (title, content) VALUES (?, ?)`;
  db.run(query, [title, content], function (err) {
    if (err) {
      console.error("Database error:", err.message); // エラー出力
      callback(err, null);
      return;
    }
    callback(null, this.lastID); // 挿入されたIDを返す
  });
}
//メモを削除する関数
function delete_memo(id, callback) {
  const query = `DELETE FROM memos WHERE id = ?`;
  console.log("Executing query:", query, "with ID:", id);
  db.run(query, [id], function (err) {
    if (err) {
      console.error("Database error:", err.message); // エラー出力
      callback(err, null);
      return;
    }
    console.log(`Changes after delete: ${this.changes}`); // 削除結果を確認
    callback(null, this.changes);
  });
}
module.exports = { save_memo, delete_memo };
