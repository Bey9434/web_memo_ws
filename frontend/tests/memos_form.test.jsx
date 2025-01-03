import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import "@testing-library/jest-dom";
import { createMemo } from "./utils/testUtils"; // 共通化した関数をインポート

describe("メモフォームとメモリストの統合テスト", () => {
  let textarea, titleInput, submitButton;

  beforeEach(() => {
    render(<App />);
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

  test("メモがリストに表示され、タイトルクリックでtextareaに内容が反映される", () => {
    // メモを2つ作成
    createMemo("タイトル1", "hoge1", titleInput, textarea, submitButton);
    createMemo("タイトル2", "ほげ2", titleInput, textarea, submitButton);

    // タイトル1をクリックしてメモを選択
    fireEvent.click(screen.getByText("タイトル1"));

    // textareaを再取得して内容が反映されているか確認
    textarea = screen.getByPlaceholderText("Write your memo here...");
    expect(textarea.value).toBe("hoge1");

    // タイトル2をクリックして内容が切り替わることを確認
    fireEvent.click(screen.getByText("タイトル2"));
    textarea = screen.getByPlaceholderText("Write your memo here...");
    expect(textarea.value).toBe("ほげ2");
  });
});
