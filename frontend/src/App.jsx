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
import Split from "react-split";

function App() {
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [memos, setMemos] = useState([]);
  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId) || null;
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    memo: null,
  });
  const [clusterContextMenu, setClusterContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    cluster: null,
  });
  // フィルター状態を追加（初期値は "all" で全件表示）
  const [clusterFilter, setClusterFilter] = useState("all");
  // クラスタオプション {value, label}
  const [clusterOptions, setClusterOptions] = useState([
    { value: 0, label: "未分類" },
  ]);
  const [clusters, setClusters] = useState([]);
  // 新規クラスタ名入力用
  const [newClusterLabel, setNewClusterLabel] = useState("");

  //すべて＆未分類をクラスタの先頭に追加して渡す
  const combinedClusters = [
    { id: "all", name: "すべて" },
    { id: 0, name: "未分類" },
    ...clusters,
  ];
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
      await loadAll(); // メモ一覧を再取得
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
    await loadAll(); // 削除後に一覧を再取得
    setSelectedMemoId((prevId) => (prevId === id ? null : prevId));
  };

  const handleOutsideClick = (e) => {
    const clickedInsideMenu =
      e.target.closest(".memo-item") ||
      e.target.closest("textarea") ||
      e.target.closest("input") ||
      e.target.closest("select") ||
      e.target.closest(".context-menu");

    if (!clickedInsideMenu) {
      setSelectedMemoId(null);
      setContextMenu({ visible: false, x: 0, y: 0, memo: null });
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
    await fetch("http://localhost:3001/api/clusters/auto", { method: "POST" });
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

  const handleRightClick = (e, memo) => {
    e.preventDefault();

    // すでに開いているメニューをもう一度同じメモで右クリックしたら閉じる
    if (contextMenu.visible && contextMenu.memo?.id === memo.id) {
      setContextMenu({ visible: false, x: 0, y: 0, memo: null });
      return;
    }
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, memo });
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleClusterRightClick = (e, cluster) => {
    e.preventDefault();

    // id が 'all' または 0 の場合は右クリック無効
    if (cluster.id === "all" || cluster.id === 0) return;
    if (
      clusterContextMenu.visible &&
      clusterContextMenu.cluster?.id === cluster.id
    ) {
      setClusterContextMenu({ visible: false, x: 0, y: 0, cluster: null });
    } else {
      setClusterContextMenu({ visible: true, x: e.pageX, y: e.pageY, cluster });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".context-menu")) {
        setContextMenu({ visible: false, x: 0, y: 0, memo: null });
        setClusterContextMenu({ visible: false, x: 0, y: 0, cluster: null });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClusterClick = (id) => {
    setClusterFilter(String(id)); // 表示グループ切り替えと連動
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Memo App</h1>
        <p className="sub-title"></p>
      </header>
      <Split
        className="main-split"
        sizes={[20, 30, 50]} // 左のパネル（サイドバー）のサイズを 15% に変更
        minSize={[200, 240, 300]} // 最小幅設定（ここを少し緩めに）
        gutterSize={6}
        direction="horizontal"
      >
        <aside className="sidebar">
          <h2 className="sidebar-title">グループ一覧</h2> {/* ← 追加ここ！ */}
          <ClusterList
            clusters={combinedClusters}
            onRename={handleRename}
            onDelete={handleDelete}
            onRightClick={handleClusterRightClick}
            onClick={handleClusterClick}
          />
          <div className="cluster-add">
            <input
              type="text"
              placeholder="新しいグループ名を入力"
              value={newClusterLabel}
              onChange={(e) => setNewClusterLabel(e.target.value)}
            />
            <button onClick={handleAddCluster}>グループ追加</button>
            <button onClick={handleAutoCluster}>自動分類実行</button>
          </div>
        </aside>

        <section className="memo-list-container">
          <div className="memo-list-header">
            <h2 className="memo-list-title">メモ一覧</h2>
            <label className="memo-filter-label">
              表示グループ
              <select
                value={clusterFilter}
                onChange={(e) => setClusterFilter(e.target.value)}
                className="memo-filter-select"
              >
                <option value="all">すべて</option>
                {clusterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="memo-list-body">
            <MemoList
              memos={filteredMemos}
              onSelect={handleSelectedMemo}
              selectedMemoId={selectedMemoId}
              onDelete={handleDeletedMemo}
              onRightClick={handleRightClick}
            />
          </div>
        </section>

        <section className="form-container">
          <MemoForm
            onSubmit={handleCreatedMemo}
            selectedMemo={selectedMemo}
            clusterOptions={clusterOptions}
          />
        </section>
      </Split>
      {contextMenu.visible && (
        <ul
          className="context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: "absolute",
          }}
        >
          <li
            onClick={() => {
              handleDeletedMemo(contextMenu.memo.id);
              setContextMenu({ visible: false, x: 0, y: 0, memo: null }); // 閉じる
            }}
          >
            削除
          </li>
        </ul>
      )}
      {clusterContextMenu.visible && (
        <ul
          className="context-menu"
          style={{
            top: clusterContextMenu.y,
            left: clusterContextMenu.x,
            position: "absolute",
          }}
        >
          <li
            onClick={() => {
              const newName = prompt(
                "新しいグループ名を入力",
                clusterContextMenu.cluster.name
              );
              if (newName) {
                handleRename(clusterContextMenu.cluster.id, newName.trim());
              }
              setClusterContextMenu({
                visible: false,
                x: 0,
                y: 0,
                cluster: null,
              });
            }}
          >
            名前編集
          </li>
          {clusterContextMenu.cluster.origin === "manual" && (
            <li
              onClick={() => {
                const confirmed = window.confirm(
                  `グループ「${clusterContextMenu.cluster.name}」を削除しますか？`
                );
                if (confirmed) {
                  handleDelete(clusterContextMenu.cluster.id);
                }
                setClusterContextMenu({
                  visible: false,
                  x: 0,
                  y: 0,
                  cluster: null,
                });
              }}
            >
              削除
            </li>
          )}
        </ul>
      )}

      <footer className="footer">
        <p>&copy; 2025 Memo</p>
      </footer>
    </div>
  );
}

export default App;
