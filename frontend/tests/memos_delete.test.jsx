import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";

describe("メモの削除", () => {
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
  };
  test("選択されたメモ1を削除し、メモ1が消えていること、メモ2が残っていることを確認する", () => {
    createMemo("メモ削除のテスト１だよ");
    createMemo("メモ削除のテスト２だよ");

    // メモ1の削除ボタンを押す
    const memo1 = screen.getByText("メモ削除のテスト１だよ");
    const deleteButton = memo1.closest("li").querySelector("button");

    fireEvent.click(deleteButton);

    // メモ1が削除されているか確認
    expect(screen.queryByText("メモ削除のテスト１だよ")).toBeNull();
    expect(screen.getByText("メモ削除のテスト２だよ")).toBeInTheDocument();
  });
  test("選択されたメモ2を削除し、メモ2が消えていること、メモ1が残っていることを確認する", () => {
    createMemo("メモ削除のテスト１だよ");
    createMemo("メモ削除のテスト２だよ");

    // メモ2の削除ボタンを押す
    const memo2 = screen.getByText("メモ削除のテスト２だよ");
    const deleteButton = memo2.closest("li").querySelector("button");

    fireEvent.click(deleteButton);

    // メモ2が削除されているか確認
    expect(screen.queryByText("メモ削除のテスト２だよ")).toBeNull();
    expect(screen.getByText("メモ削除のテスト１だよ")).toBeInTheDocument();
  });
  test("メモが1つもない状態で削除ボタンを押してもエラーが出ないことを確認する", () => {
    // メモ1を作成
    createMemo("メモ削除のテスト１だよ");

    // メモ1の削除ボタンを押す
    const memo1 = screen.getByText("メモ削除のテスト１だよ");
    const deleteButton = memo1.closest("li").querySelector("button");

    fireEvent.click(deleteButton);

    // メモ1が削除されているか確認
    expect(screen.queryByText("メモ削除のテスト１だよ")).toBeNull();

    // メモが1つもない状態で削除ボタンを押す
    fireEvent.click(deleteButton);
  });
});
