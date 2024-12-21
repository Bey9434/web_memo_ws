import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoForm } from "../src/components/MemoForm";

test("メモフォームがレンダリングされるか確認する。", () => {
  render(<MemoForm onMemoCreated={() => {}} />);
  expect(
    screen.getByPlaceholderText("Write your memo here...")
  ).toBeInTheDocument();
  expect(screen.getByText("メモを作成")).toBeInTheDocument();
});
