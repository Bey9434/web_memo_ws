const express = require("express");
const { validate_memo } = require("../middlewares/validation");
const { save_memo, delete_memo } = require("../models/memos_model");
const router = express.Router();

// ミドルウェアを連結してルートを定義。コードの再利用のため。
router.post("/", validate_memo, (req, res) => {
  const { title, content } = req.body;

  save_memo(title, content, (err, lastID) => {
    if (err) {
      console.error("Error saving memo:", err.message);
      return res.status(500).json({ error: "Failed to save memo." });
    }
    // 成功レスポンス
    res.status(201).json({ id: lastID, title, content });
  });
});

// 削除用のルート
router.delete("/:id", (req, res) => {
  const memo_id = parseInt(req.params.id, 10);
  // 無効なIDチェック
  if (isNaN(memo_id)) {
    return res.status(400).json({ error: "Invalid memo ID" });
  }

  delete_memo(memo_id, (err, changes) => {
    if (err) {
      console.error("Error deleting memo:", err.message);
      return res.status(500).json({ error: "Failed to delete memo." });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "Memo not found." });
    }
    res.status(200).json({ message: "Memo deleted successfully." });
  });
});

module.exports = router;
