const express = require("express");
const { validate_memo, validate_id } = require("../middlewares/validation");
const create_clusters_model = require("../models/clusters_model");
const { error_handler } = require("../utils/error_handler"); //utils関数をオンポート
const router = express.Router();

// GET /api/clusters
router.get("/", async (req, res) => {
  const { db } = req.app.locals;
  const { get_all_clusters } = create_clusters_model(db);
  try {
    const clusters = await get_all_clusters();
    res.json(clusters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clusters" });
  }
});

// POST /api/clusters
router.post("/", async (req, res) => {
  const { db } = req.app.locals;
  const { save_cluster } = create_clusters_model(db);
  const { name, origin } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const cluster = await save_cluster(name, origin);
    res.status(201).json(cluster);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create cluster" });
  }
});

router.post("/auto", async (req, res) => {
  const { db } = req.app.locals;
  const { auto_cluster } = create_clusters_model(db);
  try {
    const clusters = await auto_cluster();
    res.json({ clusters });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Auto clustering failed" });
  }
});
// PUT /api/clusters/:id — クラスタ名の更新
router.put("/:id", async (req, res) => {
  const { db } = req.app.locals;
  const { update_cluster_name } = create_clusters_model(db);
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const success = await update_cluster_name(id, name.trim());
    if (!success) return res.status(404).json({ error: "Cluster not found" });
    res.json({ id, name: name.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cluster" });
  }
});

// DELETE /api/clusters/:id — クラスタ削除
router.delete("/:id", async (req, res) => {
  const { db } = req.app.locals;
  const { delete_cluster } = create_clusters_model(db);
  const id = Number(req.params.id);
  try {
    const success = await delete_cluster(id);
    if (!success) return res.status(404).json({ error: "Cluster not found" });
    // オプション：削除したクラスタに紐づくメモは未分類(0)に戻す
    await db.run("UPDATE memos SET cluster_id = 0 WHERE cluster_id = ?", [id]);
    res.json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete cluster" });
  }
});
module.exports = router;
