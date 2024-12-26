import { render, screen, fireEvent } from "@testing-library/react";
import { MemoList } from "../src/components/MemoList";
import "@testing-library/jest-dom";

const setup = (selectedMemoId = null) => {
  //メモを用意する。
  const memos = [
    { id: 1, content: "hogehoge" },
    { id: 2, content: "胎児よ胎児よなぜ踊る" },
  ];
  const handleSelect = jest.fn();

  //メモリストをレンダリングする。
  render(
    <MemoList
      memos={memos}
      onSelect={handleSelect}
      selectedMemoId={selectedMemoId}
    />
  );
  return { memos, handleSelect };
};

describe("メモの削除", () => {
  test("選択されたメモを削除する", () => {
    const { handleSelect } = setup();
    const memo1 = screen.getByText("hogehoge");
    const memo2 = screen.getByText("胎児よ胎児よなぜ踊る");
    // メモをクリックする。
    fireEvent.click(memo1);
    expect(handleSelect).toHaveBeenCalledWith(1); // メモ1が選択されたか確認
    //メモを消す処理
  });
});
