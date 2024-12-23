import { useState } from "react";
import { useMemoForm } from "../hooks/useMemoForm";

export const MemoForm = ({ onSubmit }) => {
  const { content, handleChange, reset } = useMemoForm();

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content); // 親から受け取った関数を実行
      reset(); // フォームをリセット
    }
  };

  return (
    <div>
      <textarea
        placeholder="Write your memo here..."
        value={content} // 状態を入力に反映
        onChange={handleChange} // 入力が変わるたびに呼び出される
      />
      <p>現在の入力: {content}</p>
      <button onClick={handleSubmit}>メモを作成</button> {/* ボタンを追加 */}
    </div>
  );
};
