import { screen, fireEvent } from "@testing-library/react";

// メモ作成関数を共通化
export const createMemo = (title, text, titleInput, textarea, submitButton) => {
  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(textarea, { target: { value: text } });
  fireEvent.click(submitButton);
  // 作成されたメモ要素を返す
  return screen.getByText(title);
};

/**
 * メモを作成する共通関数
 *
 * なぜtitleInputやtextareaを引数として渡すのか？
 *
 * 理由：
 * 1. `createMemo`内で`screen.getByPlaceholderText()`を直接呼び出すと、
 *    すでに描画された要素とは異なる要素を取得する可能性がある。
 * 2. テストごとに`beforeEach`で`render`が呼ばれるため、要素は毎回新しく生成される。
 *    その結果、`createMemo`内で新たに要素を取得すると、
 *    古い要素を参照してしまうリスクが生じる。
 * 3. 一度取得した`titleInput`や`textarea`を`createMemo`に渡すことで、
 *    一貫して同じ要素を操作でき、テストの安定性が向上する。
 * 4. `submitButton`も同様に、すでに取得済みのものを使うことで、
 *    要素の不一致を防ぐ。
 *
 *
 * @param {string} title - メモのタイトル
 * @param {string} text - メモの内容
 * @param {HTMLElement} titleInput - タイトル入力用のinput要素
 * @param {HTMLElement} textarea - メモ入力用のtextarea要素
 * @param {HTMLElement} submitButton - メモ作成ボタン
 */
