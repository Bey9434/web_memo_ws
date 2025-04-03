const sqlite3 = require("sqlite3").verbose();

function create_clusters_table(db) {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS clusters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      origin TEXT DEFAULT 'manual',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) console.error("Error creating clusters table:", err.message);
      else console.log("Table 'clusters' created.");
    }
  );
}

module.exports = create_clusters_table;
