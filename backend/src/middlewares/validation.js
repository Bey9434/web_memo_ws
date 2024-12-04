function validate_memo(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }
  next();
}

module.exports = { validate_memo };
