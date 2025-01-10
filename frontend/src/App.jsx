import { useState, useEffect } from "react";
import "./App.css";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";

function App() {
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [memos, setMemos] = useState([]);
  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId) || null;

  // メモ一覧を取得する関数
  const fetchMemos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/memos");
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error("エラー発生:", error);
    }
  };

  // 初回レンダリング時にメモ一覧を取得
  useEffect(() => {
    fetchMemos();
  }, []);

  // メモの作成または更新処理
  const handleCreatedMemo = async (title, content) => {
    const method = selectedMemo ? "PUT" : "POST";
    const url = selectedMemo
      ? `http://localhost:3001/api/memos/${selectedMemo.id}`
      : "http://localhost:3001/api/memos";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
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
      !e.target.closest("input")
    ) {
      setSelectedMemoId(null);
    }
  };

  return (
    <>
      <div></div>
      <h1>りあくとてすと</h1>

      <div className="Aisatsu-ga-dekinaiyatu-ha-kaihatu-mo-dekinai">
        <p>Hello World</p>
      </div>
      <div onClick={handleOutsideClick}>
        <MemoForm onSubmit={handleCreatedMemo} selectedMemo={selectedMemo} />
        <MemoList
          memos={memos}
          onSelect={handleSelectedMemo}
          selectedMemoId={selectedMemoId}
          onDelete={handleDeletedMemo}
        />
      </div>
    </>
  );
}

export default App;
