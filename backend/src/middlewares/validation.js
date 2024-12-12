const validate_memo = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }
  next();
};

const validate_id = (req, res, next) => {
  const memo_id = parseInt(req.params.id, 10);
  // 無効なIDチェック
  if (isNaN(memo_id)) {
    return res.status(400).json({ error: "Invalid memo ID" });
  }
  req.memo_id = memo_id;
  next();
};

module.exports = { validate_memo, validate_id };
