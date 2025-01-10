import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  test("編集後に保存ボタンを押すとメモが更新される", async () => {
    // メモを作成
    await createMemo(
      "編集前のタイトル",
      "編集前のメモ",
      titleInput,
      textarea,
      submitButton
    );

    // メモが表示されるまで待機
    const memoElement = await screen.findByText("編集前のタイトル");
    expect(memoElement).toBeInTheDocument();
    console.log("Memo rendered:", memoElement);

    // メモをクリックして編集モードに切り替える
    fireEvent.click(memoElement);
    expect(textarea.value).toBe("編集前のメモ");

    // メモを編集する
    fireEvent.change(titleInput, { target: { value: "編集後のタイトル" } });
    fireEvent.change(textarea, { target: { value: "編集後のメモ" } });
    fireEvent.click(submitButton);

    // メモが編集されていることを確認
    await waitFor(() => {
      expect(screen.getByText("編集後のタイトル")).toBeInTheDocument();
      expect(screen.queryByText("編集前のタイトル")).toBeNull();
    });
  });
});
