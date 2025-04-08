import { useState, useEffect } from "react";
import "./App.css";
import {
  fetchClusters,
  createCluster,
  updateCluster,
  deleteCluster,
} from "./utils/clusterUtils";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";
import { ClusterList } from "./components/ClusterList";

function App() {
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [memos, setMemos] = useState([]);
  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId) || null;

  // フィルター状態を追加（初期値は "all" で全件表示）
  const [clusterFilter, setClusterFilter] = useState("all");
  // クラスタオプション {value, label}
  const [clusterOptions, setClusterOptions] = useState([
    { value: 0, label: "未分類" },
  ]);
  const [clusters, setClusters] = useState([]);
  // 新規クラスタ名入力用
  const [newClusterLabel, setNewClusterLabel] = useState("");

  // メモ一覧を取得する関数
  const fetchMemos = async () => {
    try {
      console.log("💡 fetchMemos called");
      const response = await fetch("http://localhost:3001/api/memos");
      const data = await response.json();
      console.log("💡 fetchMemos response:", data);
      setMemos(data);
      return data;
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  // メモ＋クラスタ＋オプションを一度に更新
  const loadAll = async () => {
    const memData = await fetchMemos();
    setMemos(memData);

    const clsData = await fetchClusters();
    setClusters(clsData);

    const staticOpts = clsData.map((c) => ({ value: c.id, label: c.name }));
    const ids = Array.from(new Set(memData.map((m) => m.cluster_id)));
    const dynamic = ids
      .filter((id) => id !== 0 && !clsData.some((c) => c.id === id))
      .map((id) => ({ value: id, label: `グループ${id}` }));

    setClusterOptions([
      { value: 0, label: "未分類" },
      ...staticOpts,
      ...dynamic,
    ]);
  };

  // 初回レンダリング時にメモ一覧を取得
  useEffect(() => {
    // メモ取得 → クラスタ取得 を順に実行
    loadAll();
  }, []);

  // フィルタリング
  const filteredMemos = memos.filter((m) =>
    clusterFilter === "all" ? true : m.cluster_id === Number(clusterFilter)
  );

  // メモの作成または更新処理
  const handleCreatedMemo = async (title, content, cluster_id) => {
    console.log("Sending cluster_id:", cluster_id); // ここで確認
    const method = selectedMemo ? "PUT" : "POST";
    const url = selectedMemo
      ? `http://localhost:3001/api/memos/${selectedMemo.id}`
      : "http://localhost:3001/api/memos";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, cluster_id }),
    });

    if (response.ok) {
      await fetchMemos(); // メモ一覧を再取得
      setSelectedMemoId(null);
    } else {
      alert("メモの保存に失敗しました");
    }
  };

  // メモを選択した時の処理
  const handleSelectedMemo = (id) => {
    setSelectedMemoId(id);
  };

  // メモを削除する処理
  const handleDeletedMemo = async (id) => {
    await fetch(`http://localhost:3001/api/memos/${id}`, {
      method: "DELETE",
    });
    await fetchMemos(); // 削除後に一覧を再取得
    setSelectedMemoId((prevId) => (prevId === id ? null : prevId));
  };

  const handleOutsideClick = (e) => {
    if (
      !e.target.closest(".memo-item") &&
      !e.target.closest("textarea") &&
      !e.target.closest("input") &&
      !e.target.closest("select") // 追加！
    ) {
      setSelectedMemoId(null);
    }
  };

  // 新しいクラスタを追加する処理
  const handleAddCluster = async () => {
    if (!newClusterLabel.trim()) return;
    await createCluster(newClusterLabel.trim());
    setNewClusterLabel("");
    await loadAll();
  };
  // 自動クラスタリング実行ハンドラ
  const handleAutoCluster = async () => {
    await fetch("/api/clusters/auto", { method: "POST" });
    await loadAll();
    alert("自動分類が完了しました！");
  };

  const handleRename = async (id, name) => {
    await updateCluster(id, name);
    await loadAll();
  };

  const handleDelete = async (id) => {
    await deleteCluster(id);
    await loadAll();
  };

  return (
    <>
      <ClusterList
        clusters={clusters}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <div onClick={handleOutsideClick}>
        {/* フィルター用セレクト */}
        <div style={{ marginBottom: 16 }}>
          <label>表示クラスタ：</label>
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value)}
          >
            <option value="all">すべて</option>
            {clusterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ margin: "1rem 0" }}>
          <input
            type="text"
            placeholder="新しいクラスタ名を入力"
            value={newClusterLabel}
            onChange={(e) => setNewClusterLabel(e.target.value)}
          />
          <button onClick={handleAddCluster} style={{ marginLeft: 8 }}>
            クラスタ追加
          </button>
          <button onClick={handleAutoCluster} style={{ marginLeft: 8 }}>
            自動分類実行
          </button>
        </div>

        <MemoForm
          onSubmit={handleCreatedMemo}
          selectedMemo={selectedMemo}
          clusterOptions={clusterOptions}
        />
        <MemoList
          memos={filteredMemos}
          onSelect={handleSelectedMemo}
          selectedMemoId={selectedMemoId}
          onDelete={handleDeletedMemo}
        />
      </div>
    </>
  );
}

export default App;
