const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("backend/src/db/database.sqlite");

// メモを保存する関数だよ
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
module.exports = { save_memo };
