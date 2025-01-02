import { useState } from "react";

export const useMemoForm = (initialValue = "") => {
  // 状態を作成（入力内容を追跡）
  const [content, setContent] = useState(initialValue);

  // 入力が変化したときに状態を更新
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const reset = () => {
    setContent(""); // フォームをリセット
  };
  return { content, handleChange, reset, setContent };
};
