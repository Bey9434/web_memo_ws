import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import { createMemo } from "./utils/testUtils"; // 共通化した関数をインポート

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
  test("選択されたメモ1を削除し、メモ1が消えていること、メモ2が残っていることを確認する", () => {
    createMemo(
      "メモ削除のタイトル１",
      "メモ削除のテスト１だよ",
      titleInput,
      textarea,
      submitButton
    );
    createMemo(
      "メモ削除のタイトル２",
      "メモ削除のテスト２だよ",
      titleInput,
      textarea,
      submitButton
    );

    // メモ1の削除ボタンを押す
    const memo1 = screen.getByText("メモ削除のタイトル１");
    const deleteButton = memo1.closest("li").querySelector("button");

    fireEvent.click(deleteButton);

    // メモ1が削除されているか確認
    expect(screen.queryByText("メモ削除のタイトル１")).toBeNull();
    expect(screen.getByText("メモ削除のタイトル２")).toBeInTheDocument();
  });
  test("選択されたメモ2を削除し、メモ2が消えていること、メモ1が残っていることを確認する", () => {
    createMemo(
      "メモ削除のタイトル１",
      "メモ削除のテスト１だよ",
      titleInput,
      textarea,
      submitButton
    );
    createMemo(
      "メモ削除のタイトル２",
      "メモ削除のテスト２だよ",
      titleInput,
      textarea,
      submitButton
    );

    // メモ2の削除ボタンを押す
    const memo2 = screen.getByText("メモ削除のタイトル２");
    const deleteButton = memo2.closest("li").querySelector("button");

    fireEvent.click(deleteButton);

    // メモ2が削除されているか確認
    expect(screen.queryByText("メモ削除のタイトル２")).toBeNull();
    expect(screen.getByText("メモ削除のタイトル１")).toBeInTheDocument();
  });
  test("メモが1つもない状態で削除ボタンを押してもエラーが出ないことを確認する", () => {
    const deleteButton = screen.queryByText("削除"); // 存在しないボタンを探す
    expect(deleteButton).toBeNull(); // ボタンが存在しないことを確認
  });
});
