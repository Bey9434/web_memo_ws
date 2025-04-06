const express = require("express");
const { validate_memo, validate_id } = require("../middlewares/validation");
const create_models = require("../models/memos_model");
const { error_handler } = require("../utils/error_handler"); //utils関数をオンポート
const router = express.Router();

// メモ作成用のルート。ミドルウェアを連結してルートを定義。コードの再利用のため。
router.post("/", validate_memo, async (req, res) => {
  const { db } = req.app.locals; // app.locals.db を取得
  const { save_memo } = create_models(db); // データベースに基づいてモデルを生成
  const { title, content, cluster_id } = req.body;
  try {
    // cluster_idが渡されていなければ0をデフォルトにする
    const final_cluster_id = cluster_id || 0;
    const last_id = await save_memo(title, content, final_cluster_id);
    res
      .status(201)
      .json({ id: last_id, title, content, cluster_id: final_cluster_id });
  } catch (err) {
    console.error("Error saving memo", err.message);
    error_handler(res, err, 500, "Failed to save memo");
  }
});

// 削除用のルート
router.delete("/:id", validate_id, async (req, res) => {
  const { db } = req.app.locals;
  const { delete_memo } = create_models(db);
  try {
    const success = await delete_memo(req.memo_id);
    if (!success) {
      return error_handler(
        res,
        new Error("Memo not found"),
        404,
        "Memo not found."
      );
    }
    res.status(200).json({ message: "Memo deleted successfully." });
  } catch (err) {
    console.error("Error deleting memo:", err.message);
    error_handler(res, err, 500, "Failed to delete memo");
  }
});

//特定のメモを取得するルート
router.get("/:id", validate_id, async (req, res) => {
  const { db } = req.app.locals;
  const { get_memo_by_id } = create_models(db);
  try {
    const memo = await get_memo_by_id(req.memo_id);
    if (!memo) {
      return error_handler(
        res,
        new Error("Memo not found"),
        404,
        "Memo not found."
      );
    }
    console.log("Memo retrieved successfully:", memo); // 取得データのログ
    res.status(200).json(memo);
  } catch (err) {
    console.error("Error fetching memo:", err.message);
    error_handler(res, err, 500, "Failed to fetch memo");
  }
});

//すべてのメモを取得するルート
router.get("/", async (req, res) => {
  const { db } = req.app.locals;
  const { get_all_memo } = create_models(db);
  try {
    const memos = await get_all_memo();
    //console.log("Retrieved memos:", memos); //メモを取得できているかの確認
    res.status(200).json(memos);
  } catch (err) {
    console.error("Error fetching memos:", err.message);
    error_handler(res, err, 500, "Failed to fetch memos.");
  }
});

//メモの更新をするルート
router.put("/:id", validate_id, validate_memo, async (req, res) => {
  const { db } = req.app.locals;
  const { put_memo } = create_models(db);
  const { title, content, cluster_id } = req.body; // 更新データをリクエストボディから取得
  console.log("PUT request received for ID:", req.memo_id); // 追加
  console.log("Data to update:", { title, content, cluster_id }); // 追加
  try {
    const memo = await put_memo(req.memo_id, title, content, cluster_id); // 修正：関数名
    if (!memo) {
      return error_handler(
        res,
        new Error("Memo not found"),
        404,
        "Memo not found"
      );
    }
    res.status(200).json({
      message: "Memo put successfully.",
      id: req.memo_id,
      title,
      content,
      cluster_id,
    });
  } catch (err) {
    console.error("Error put memo:", err.message);
    error_handler(res, err, 500, "Failed to put memo");
  }
});

router.put("/:id/cluster", validate_id, async (req, res) => {
  const { db } = req.app.locals;
  const { update_cluster_id } = create_models(db); // モデル関数名に注意
  const cluster_id = req.body.cluster_id;

  console.log("PUT request received for ID:", req.memo_id);
  console.log("Cluster ID to update:", cluster_id);

  if (typeof cluster_id !== "number" || cluster_id < 0) {
    return error_handler(
      res,
      new Error("Invalid cluster_id"),
      400,
      "Invalid cluster_id"
    );
  }

  try {
    const success = await update_cluster_id(req.memo_id, cluster_id); // 修正：関数名
    if (!success) {
      return error_handler(
        res,
        new Error("Memo not found"),
        404,
        "Memo not found"
      );
    }
    res.status(200).json({
      message: "Memo cluster updated successfully.",
      id: req.memo_id,
      cluster_id,
    });
  } catch (err) {
    console.error("Error updating memo cluster:", err.message);
    error_handler(res, err, 500, "Failed to update memo cluster");
  }
});

module.exports = router;
