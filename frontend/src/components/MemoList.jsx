import PropTypes from "prop-types";
import "./MemoList.css"; // CSSファイルをインポート
export const MemoList = ({
  memos,
  onSelect,
  selectedMemoId,
  onDelete,
  onRightClick,
}) => {
  const handleSelect = (id) => {
    if (selectedMemoId === id) {
      // すでに選択されているメモを再度クリックした場合は選択解除
      onSelect(null);
    } else {
      // それ以外は通常の選択
      onSelect(id);
    }
  }; // メモをクリックした時の処理

  const handleDelete = (id) => {
    onDelete(id); // 削除のロジックは親コンポーネント
  };

  return (
    <ul data-testid="memo-list">
      {memos.map((memo) => (
        <li
          key={memo.id}
          onClick={() => handleSelect(memo.id)}
          onContextMenu={(e) => onRightClick(e, memo)}
          className={`memo-item ${
            memo.id === selectedMemoId ? "selected" : ""
          }`}
        >
          {memo.title}
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
