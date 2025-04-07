// backend/src/utils/autoCluster.js
const { spawn } = require("child_process");
const path = require("path");

function runAutoClustering() {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", [
      path.resolve(__dirname, "../models/clustering_min.py"),
    ]);
    let output = "";
    py.stdout.on("data", (data) => (output += data));
    py.stderr.on("data", (data) =>
      console.error("Python error:", data.toString())
    );
    py.on("close", (code) => {
      if (code !== 0) return reject(new Error(`Python exited ${code}`));
      try {
        const memos = JSON.parse(output);
        // memos: [{id, text, cluster_id}, ...]
        // clusterIds ごとにまとめる
        const clusters = {};
        memos.forEach((m) => {
          const gid = m.cluster_id;
          if (!clusters[gid])
            clusters[gid] = { auto_name: `グループ${gid}`, memoIds: [] };
          clusters[gid].memoIds.push(m.id);
        });
        resolve(Object.values(clusters));
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = { runAutoClustering };
