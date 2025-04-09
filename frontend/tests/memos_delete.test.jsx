import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import { createMemo } from "./utils/testUtils"; // 共通化した関数をインポート
import { within } from "@testing-library/react";

describe("メモの削除", () => {
  let textarea, titleInput, submitButton;
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
  test("選択されたメモ1を削除し、メモ1が消えていること、メモ2が残っていることを確認する", async () => {
    await createMemo(
      "メモ削除のタイトル１",
      "メモ削除のテスト１だよ",
      titleInput,
      textarea,
      submitButton
    );
    await createMemo(
      "メモ削除のタイトル２",
      "メモ削除のテスト２だよ",
      titleInput,
      textarea,
      submitButton
    );

    // メモ1の削除ボタンを押す
    const memo1 = screen.getByText("メモ削除のタイトル１");
    fireEvent.contextMenu(memo1); // 右クリック発火
    await screen.findByText("削除"); // context menu が出るまで待つ

    const deleteItem = screen.getByText("削除");
    fireEvent.click(deleteItem);

    await waitFor(() => {
      expect(screen.queryByText("メモ削除のタイトル１")).toBeNull();
      expect(screen.getByText("メモ削除のタイトル２")).toBeInTheDocument();
    });
  });
  test("選択されたメモ2を削除し、メモ2が消えていること、メモ1が残っていることを確認する", async () => {
    await createMemo(
      "メモ削除のタイトル１",
      "メモ削除のテスト１だよ",
      titleInput,
      textarea,
      submitButton
    );
    await createMemo(
      "メモ削除のタイトル２",
      "メモ削除のテスト２だよ",
      titleInput,
      textarea,
      submitButton
    );

    // メモ2の削除ボタンを押す
    const memo2 = screen.getByText("メモ削除のタイトル２");
    fireEvent.contextMenu(memo2); // 右クリック発火
    await screen.findByText("削除"); // context menu が出るまで待つ

    const deleteItem = screen.getByText("削除");
    fireEvent.click(deleteItem);

    await waitFor(() => {
      expect(screen.queryByText("メモ削除のタイトル２")).toBeNull();
      expect(screen.getByText("メモ削除のタイトル１")).toBeInTheDocument();
    });
  });
  test("メモが1つもない状態で削除ボタンを押してもエラーが出ないことを確認する", () => {
    // UI上にメモが表示されていないことを確認
    const memoItems = within(screen.getByTestId("memo-list")).queryAllByRole(
      "listitem"
    );
    expect(memoItems.length).toBe(0);

    // クラッシュしないこと（メニューが出ないことも確認）
    expect(screen.queryByText("削除")).not.toBeInTheDocument();
  });
});
