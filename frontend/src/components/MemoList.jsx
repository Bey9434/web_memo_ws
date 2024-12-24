export const MemoList = ({ memos, onSelect, selectedMemoId }) => {
  return (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          onClick={() => onSelect(memo.id)}
          style={{
            cursor: "pointer",
            backgroundColor:
              memo.id === selectedMemoId ? "#ddd" : "transparent",
          }}
        >
          {memo.content}
        </li>
      ))}
    </ul>
  );
};
