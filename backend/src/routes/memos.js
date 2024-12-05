const express = require("express");
const { validate_memo } = require("../middlewares/validation");
const { save_memo } = require("../models/memos_model");
const router = express.Router();

// ミドルウェアを連結してルートを定義。コードの再利用のため。
router.post("/", validate_memo, (req, res) => {
  const { title, content } = req.body;

  save_memo(title, content, (err, lastID) => {
    if (err) {
      console.error("Error saving memo:", err.message);
      return res.status(500).json({ error: "Failed to save memo." });
    }
  });

  // 成功レスポンス
  res.status(201).json({ title, content });
});

module.exports = router;
