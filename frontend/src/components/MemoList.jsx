import PropTypes from "prop-types";
export const MemoList = ({ memos, onSelect, selectedMemoId, onDelete }) => {
  const handleSelect = (id) => {
    onSelect(id); // 選択/解除のロジックは親コンポーネント
  }; // メモをクリックした時の処理

  const handleDelete = (id) => {
    onDelete(id); // 削除のロジックは親コンポーネント
  };

  return (
    <ul>
      {memos.map((memo) => (
        <li
          key={memo.id}
          onClick={() => handleSelect(memo.id)}
          className={memo.id === selectedMemoId ? "selected" : ""}
        >
          {memo.content}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 親の onClick を止める
              handleDelete(memo.id); // 削除処理を呼び出す
            }}
            style={{ marginLeft: "16px" }}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};

// PropTypesでpropsの型を定義
MemoList.propTypes = {
  memos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedMemoId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]).isRequired,
  onDelete: PropTypes.func.isRequired,
};
