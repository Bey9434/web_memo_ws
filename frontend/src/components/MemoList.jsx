export const MemoList = ({ memos, onSelect, selectedMemoId }) => {
  const handleSelect = (id) => {
    onSelect(id); // 選択/解除のロジックは親コンポーネントに任せる
  }; // メモをクリックした時の処理
  return (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          onClick={() => handleSelect(memo.id)}
          className={memo.id === selectedMemoId ? "selected" : ""}
        >
          {memo.content}
        </li>
      ))}
    </ul>
  );
};
