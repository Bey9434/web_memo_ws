import * as sqlite3 from "sqlite3";
const db = new sqlite3.Database("db");

db.run(`CREATE TABLE todo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 作成日時（デフォルト現在時刻）
)`);
