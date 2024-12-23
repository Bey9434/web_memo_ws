export const MemoList = ({ memos }) => {
  return (
    <ul>
      {memos.map((memo) => (
        <li key={memo.id}>{memo.content}</li>
      ))}
    </ul>
  );
};
