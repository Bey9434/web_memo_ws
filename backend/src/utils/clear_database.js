const { db } = require("../models/memos_model");

/**
 * データベースを初期化する関数
 * @returns {Promise<void>}
 */
async function clear_database() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM memos", (err) => {
        if (err) {
          console.error("Failed to clear database:", err.message);
          reject(err);
        } else {
          console.log("Database cleared successfully.");
          resolve();
        }
      });
    });
  });
}

module.exports = { clear_database };
