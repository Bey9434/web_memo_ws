const sqlite3 = require("sqlite3").verbose();

/**
 * SQLiteのメモリ内データベースを作成します。
 * @returns {sqlite3.Database} 新しいメモリ内データベースインスタンス
 */
function create_test_database() {
  const db = new sqlite3.Database(":memory:");
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `);
  });
  return db;
}

module.exports = { create_test_database };
