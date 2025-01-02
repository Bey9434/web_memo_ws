import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

describe("メモの編集", () => {
  let input;
  let submitButton;
  beforeEach(() => {
    render(<App />);
    // メモを追加する
    input = screen.getByPlaceholderText("Write your memo here...");
    submitButton = screen.getByText("メモを作成");
  });
  const createMemo = (text) => {
    fireEvent.change(input, { target: { value: text } });
    fireEvent.click(submitButton);
    // メモが作成されるとき、DOM内のメモ要素を返す
    return screen.getByText(text);
  };
  test("編集後に保存ボタンを押すとメモが更新される", () => {
    // メモを作成
    const memoItem = createMemo("編集前のメモ");

    // メモをクリックして編集モードに切り替える
    fireEvent.click(memoItem);
    // フォームにメモの内容が反映されていることを確認
    expect(input.value).toBe("編集前のメモ");

    // メモを編集する
    fireEvent.change(input, { target: { value: "編集後のメモ" } });
    fireEvent.click(submitButton);

    // メモが編集されていることを確認
    expect(screen.getByText("編集後のメモ")).toBeInTheDocument();
    expect(screen.queryByText("編集前のメモ")).toBeNull();
  });
});
