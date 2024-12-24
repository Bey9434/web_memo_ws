import { useState } from "react";
import "./App.css";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";

function App() {
  const [count, setCount] = useState(0);
  const [selectedMemoId, setSelectedMemoId] = useState(null);

  const [memos, setMemos] = useState([]);
  const handleMemoCreated = (content) => {
    const newMemo = { id: Date.now(), content };
    setMemos((prev) => [...prev, newMemo]);
  };
  const handleSelectMemo = (id) => {
    setSelectedMemoId(id);
  };

  return (
    <>
      <div></div>
      <h1>りあくとてすと</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="Aisatsu-ga-dekinaiyatu-ha-kaihatu-mo-dekinai">
        <p>Hello World</p>
      </div>
      <div>
        <MemoForm onSubmit={handleMemoCreated} />
        <MemoList
          memos={memos}
          onSelect={handleSelectMemo}
          selectedMemoId={selectedMemoId}
        />
      </div>
    </>
  );
}

export default App;
