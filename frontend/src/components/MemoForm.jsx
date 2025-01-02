import { useMemoForm } from "../hooks/useMemoForm";
import PropTypes from "prop-types";
import { useEffect } from "react";
export const MemoForm = ({ onSubmit, selectedMemo }) => {
  const { content, handleChange, reset, setContent } = useMemoForm();

  // メモ選択時にフォームへ内容を反映
  useEffect(() => {
    console.log("selectedMemo:", selectedMemo); // デバッグ
    setContent(selectedMemo?.content || ""); // 空文字をデフォルト値としてセット
  }, [selectedMemo, setContent]);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content); // 親から受け取った関数を実行
      reset(); // フォームをリセット
    }
  };

  // 編集キャンセル処理
  const handleCancel = () => {
    setContent(selectedMemo?.content || "");
  };

  return (
    <div>
      <textarea
        placeholder="Write your memo here..."
        value={content} // 状態を入力に反映
        onChange={handleChange} // 入力が変わるたびに呼び出される
      />
      <p>現在の入力: {content}</p>
      <button onClick={handleSubmit}>
        {selectedMemo ? "更新" : "メモを作成"}
      </button>
      {selectedMemo && (
        <button onClick={handleCancel} style={{ marginLeft: "10px" }}>
          キャンセル
        </button>
      )}
    </div>
  );
};

// PropTypesでpropsの型を定義
MemoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // onSubmitが関数であることを明示
};
