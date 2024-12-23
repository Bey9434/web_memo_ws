import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MemoForm } from "./components/MemoForm";
import { MemoList } from "./components/MemoList";

function App() {
  const [count, setCount] = useState(0);

  const [memos, setMemos] = useState([]);
  const handleMemoCreated = (content) => {
    const newMemo = { id: Date.now(), content };
    setMemos((prev) => [...prev, newMemo]);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
        <MemoList memos={memos} />
      </div>
    </>
  );
}

export default App;
