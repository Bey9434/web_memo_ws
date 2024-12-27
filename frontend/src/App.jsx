import { useState } from "react";
import "./App.css";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";

function App() {
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [memos, setMemos] = useState([]);

  // ボタンがクリックされたときにメモを作成する際の処理
  const handleCreatedMemo = (content) => {
    const newMemo = { id: Date.now(), content };
    setMemos((prev) => [...prev, newMemo]); // メモを配列に追加
    setSelectedMemoId((prevId) => (prevId === newMemo.id ? null : newMemo.id));
  };

  // メモを選択した時の処理
  const handleSelectedMemo = (id) => {
    setSelectedMemoId(id);
  };

  // メモを削除する処理
  const handleDeletedMemo = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
    setSelectedMemoId((prevId) => (prevId === id ? null : prevId));
  };

  return (
    <>
      <div></div>
      <h1>りあくとてすと</h1>

      <div className="Aisatsu-ga-dekinaiyatu-ha-kaihatu-mo-dekinai">
        <p>Hello World</p>
      </div>
      <div>
        <MemoForm onSubmit={handleCreatedMemo} />
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
