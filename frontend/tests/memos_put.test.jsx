import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import { createMemo } from "./utils/testUtils"; // 共通化した関数をインポート

describe("メモの編集", () => {
  let textarea;
  let titleInput;
  let submitButton;
  beforeEach(() => {
    render(<App />);
    // メモを追加する
    textarea = screen.getByPlaceholderText("Write your memo here...");
    titleInput = screen.getByPlaceholderText("Write your title here...");
    submitButton = screen.getByText("メモを作成");
  });
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterAll(() => {
    window.alert.mockRestore();
  });

  test("編集後に保存ボタンを押すとメモが更新される", () => {
    // メモを作成
    createMemo(
      "編集前のタイトル",
      "編集前のメモ",
      titleInput,
      textarea,
      submitButton
    );

    // メモをクリックして編集モードに切り替える
    fireEvent.click(screen.getByText("編集前のタイトル"));
    // フォームにメモの内容が反映されていることを確認
    expect(textarea.value).toBe("編集前のメモ");

    // メモを編集する
    fireEvent.change(titleInput, { target: { value: "編集後のタイトル" } });
    fireEvent.change(textarea, { target: { value: "編集後のメモ" } });
    fireEvent.click(submitButton);

    // メモが編集されていることを確認
    expect(screen.getByText("編集後のタイトル")).toBeInTheDocument();
    expect(screen.queryByText("編集前のタイトル")).toBeNull();
  });
});
