import { useState, useEffect } from "react";
import "./App.css";
import { fetchClusters, createCluster } from "./utils/clusterUtils";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";
import { use } from "react";

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
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  // 初回レンダリング時にメモ一覧を取得
  useEffect(() => {
    fetchMemos();
    fetchClusters()
      .then((data) => {
        // 初期値 + API からの値 + memos に出てきたID補完
        const ids = Array.from(new Set(memos.map((m) => m.cluster_id)));
        const dynamicClusters = ids
          .filter((id) => id !== 0 && !data.some((c) => c.id === id))
          .map((id) => ({ value: id, label: `グループ${id}` }));

        setClusterOptions([
          { value: 0, label: "未分類" },
          ...data.map((c) => ({ value: c.id, label: c.name })),
          ...dynamicClusters,
        ]);
      })
      .catch((err) => console.error("クラスタ取得エラー:", err));
  }, []);

  // memos に出現する cluster_id をオプションに補完
  useEffect(() => {
    const ids = Array.from(new Set(memos.map((m) => m.cluster_id)));
    setClusterOptions((opts) => {
      const existing = new Set(opts.map((o) => o.value));
      const additions = ids
        .filter((id) => !existing.has(id))
        .map((id) => ({
          value: id,
          label: id === 0 ? "未分類" : `グループ${id}`,
        }));
      return [...opts, ...additions];
    });
  }, [memos]);

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
    const name = newClusterLabel.trim();
    if (!name) return;
    try {
      // API に POST して保存
      const newCluster = await createCluster(name);
      // 成功したらローカルにも追加
      setClusterOptions((prev) => [
        ...prev,
        { value: newCluster.id, label: newCluster.name },
      ]);
      setNewClusterLabel("");
    } catch (err) {
      console.error("クラスタ保存エラー:", err);
      alert("クラスタの保存に失敗しました");
    }
  };

  return (
    <>
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
          <button
            onClick={async () => {
              const res = await fetch(
                "http://localhost:3001/api/clusters/auto",
                { method: "POST" }
              );
              if (res.ok) {
                console.log("自動分類 API 呼び出し成功");
              } else {
                console.error("自動分類 API 呼び出し失敗");
              }
            }}
            style={{ marginLeft: 8 }}
          >
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
