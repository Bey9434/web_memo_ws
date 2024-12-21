import React, { useState } from "react";

const MemoForm = () => {
  // 状態を作成（入力内容を追跡）
  const [content, setContent] = useState("");

  // 入力が変化したときに状態を更新
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <textarea
        placeholder="Write your memo here..."
        value={content} // 状態を入力に反映
        onChange={handleInputChange} // 入力が変わるたびに呼び出される
      />
      <p>現在の入力: {content}</p>
    </div>
  );
};

export { MemoForm };
