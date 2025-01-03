import { useState } from "react";
import "./App.css";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";

function App() {
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [memos, setMemos] = useState([]);

  // 現在選択されているメモを取得する関数
  const selectedMemo = memos.find((memo) => memo.id === selectedMemoId) || null;

  // ボタンがクリックされたときにメモを作成する際の処理
  const handleCreatedMemo = (title, content) => {
    if (selectedMemo) {
      // 編集モード - メモを更新
      setMemos((prev) =>
        prev.map((memo) =>
          memo.id === selectedMemo.id ? { ...memo, title, content } : memo
        )
      );
      setSelectedMemoId(null); // 編集後に選択解除
    } else {
      // 新規作成モード
      const newMemo = { id: Date.now(), title, content };
      setMemos((prev) => [...prev, newMemo]);
    }
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
