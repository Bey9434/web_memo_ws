import { useMemoForm } from "../hooks/useMemoForm";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const MemoForm = ({ onSubmit, selectedMemo, clusterOptions }) => {
  const { content, handleChange, reset, setContent } = useMemoForm();
  const [title, setTitle] = useState(""); // タイトルの状態管理を追加
  const [cluster_id, setClusterId] = useState(0); // クラスタIDの状態管理を追加

  // メモ選択時にフォームへ内容を反映
  useEffect(() => {
    console.log("selectedMemo:", selectedMemo); // デバッグ
    setTitle(selectedMemo?.title || ""); // タイトルも反映
    setContent(selectedMemo?.content || ""); // 空文字をデフォルト値としてセット
    setClusterId(selectedMemo?.cluster_id || 0); // ← これを追加！
  }, [selectedMemo, setContent, setTitle]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, content, cluster_id); // タイトルと内容を送信
      reset(); // フォームをリセット
      setTitle(""); // タイトルもリセット
    } else {
      alert("タイトルを入力してください"); // タイトルが空の場合にアラート
    }
  };

  // 編集キャンセル処理
  const handleCancel = () => {
    setContent(selectedMemo?.content || "");
    setTitle(selectedMemo?.title || ""); // タイトルも元に戻す
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write your title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <textarea
        placeholder="Write your memo here..."
        value={content} // 状態を入力に反映
        onChange={handleChange} // 入力が変わるたびに呼び出される
        className="textarea-large"
      />
      {/* 🆕 クラスタIDを選ぶセレクトボックス */}
      <select
        value={cluster_id}
        onChange={(e) => setClusterId(Number(e.target.value))}
      >
        {clusterOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <p></p>
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
  selectedMemo: PropTypes.shape({
    // selectedMemoがオブジェクト型であることを定義
    title: PropTypes.string, // titleが文字列型
    content: PropTypes.string, // contentが文字列型
  }),
};
