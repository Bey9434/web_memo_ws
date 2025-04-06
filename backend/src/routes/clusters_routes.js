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

module.exports = router;
