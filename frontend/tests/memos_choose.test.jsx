import { render, screen, fireEvent } from "@testing-library/react";
import { MemoForm } from "../src/components/MemoForm";
import { MemoList } from "../src/components/MemoList";
import "@testing-library/jest-dom";

describe("メモの選択", () => {
  test("メモをクリックすると選択状態になる", () => {
    // メモを用意する。
    const memos = [
      { id: 1, content: "hogehoge" },
      { id: 2, content: "胎児よ胎児よなぜ踊る" },
    ];
    const handleSelect = jest.fn();
    //メモリストをレンダリングする。
    render(
      <MemoList memos={memos} onSelect={handleSelect} selectedMemoId={null} />
    );

    const memo1 = screen.getByText("hogehoge");
    const memo2 = screen.getByText("胎児よ胎児よなぜ踊る");
    // メモをクリックする。
    fireEvent.click(memo1);
    expect(handleSelect).toHaveBeenCalledWith(1); // メモ1が選択されたか確認
    // 選択状態になっていることを確認する。
    // 他のメモをクリックする。
    // 以前の選択状態が解除され、新しいメモが選択状態になっていることを確認する。
  });
});
