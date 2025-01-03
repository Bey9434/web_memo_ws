import { screen, fireEvent } from "@testing-library/react";

// メモ作成関数を共通化
export const createMemo = (title, text, titleInput, textarea, submitButton) => {
  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(textarea, { target: { value: text } });
  fireEvent.click(submitButton);
  // 作成されたメモ要素を返す
  return screen.getByText(title);
};
