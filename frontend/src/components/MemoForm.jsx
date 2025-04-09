import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMemoForm } from "../hooks/useMemoForm";
import "./MemoForm.css";

export const MemoForm = ({ onSubmit, selectedMemo, clusterOptions }) => {
  const { content, handleChange, reset, setContent } = useMemoForm();
  const [title, setTitle] = useState("");
  const [cluster_id, setClusterId] = useState(0);

  useEffect(() => {
    setTitle(selectedMemo?.title || "");
    setContent(selectedMemo?.content || "");
    setClusterId(selectedMemo?.cluster_id || 0);
  }, [selectedMemo, setContent]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, content, cluster_id);
      reset();
      setTitle("");
    } else {
      alert("タイトルを入力してください");
    }
  };

  const handleCancel = () => {
    setContent(selectedMemo?.content || "");
    setTitle(selectedMemo?.title || "");
  };

  return (
    <div className="memo-form">
      <input
        type="text"
        placeholder="Write your title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Write your memo here..."
        value={content}
        onChange={handleChange}
        className="textarea-large"
      />
      <select
        className="memo-form-cluster-select"
        value={cluster_id}
        onChange={(e) => setClusterId(Number(e.target.value))}
      >
        {clusterOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="memo-form-buttons">
        <button onClick={handleSubmit}>
          {selectedMemo ? "更新" : "メモを作成"}
        </button>
        {selectedMemo && <button onClick={handleCancel}>キャンセル</button>}
      </div>
    </div>
  );
};

MemoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedMemo: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    cluster_id: PropTypes.number,
  }),
  clusterOptions: PropTypes.array.isRequired,
};
