const express = require("express");
const { validate_memo } = require("../middlewares/validation");
const router = express.Router();

// ミドルウェアを連結してルートを定義。コードの再利用のため。
router.post("/", validate_memo, (req, res) => {
  // 成功レスポンス
  const { title, content } = req.body;
  res.status(201).json({ title, content });
});

module.exports = router;
