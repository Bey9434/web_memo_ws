import { render, screen, fireEvent } from "@testing-library/react";
import { MemoForm } from "../src/components/MemoForm";
import { MemoList } from "../src/components/MemoList";
import "@testing-library/jest-dom";

describe("メモフォーム", () => {
  test("メモフォームがレンダリングされるか確認する。", () => {
    render(<MemoForm onMemoCreated={() => {}} />);
    expect(
      screen.getByPlaceholderText("Write your memo here...")
    ).toBeInTheDocument();
    expect(screen.getByText("メモを作成")).toBeInTheDocument();
  });

  test("メモボタン作成を押すとonSubmitが呼ばれ,新しいメモが作成される", () => {
    const handleSubmit = jest.fn();
    render(<MemoForm onSubmit={handleSubmit} />);
    const textarea = screen.getByPlaceholderText("Write your memo here...");
    const button = screen.getByText("メモを作成");

    // 入力してからボタンをクリック
    fireEvent.change(textarea, { target: { value: "新しいメモ" } });
    fireEvent.click(button);

    // onSubmitが1回呼ばれ、"新しいメモ"が渡されることを確認
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("新しいメモ");
  });

  test("メモがリストに表示される。", () => {
    const memos = [
      { id: 1, content: "hoge1" },
      { id: 2, content: "ほげ2" },
    ];
    render(<MemoList memos={memos} />);
    expect(screen.getByText("hoge1")).toBeInTheDocument();
    expect(screen.getByText("ほげ2")).toBeInTheDocument();

    // リスト内のメモが表示されているか確認
    memos.forEach((memo) => {
      expect(screen.getByText(memo.content)).toBeInTheDocument();
    });
  });
});
