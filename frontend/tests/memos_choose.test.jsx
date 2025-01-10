import { render, screen, fireEvent } from "@testing-library/react";
import { MemoList } from "../src/components/MemoList";
import "@testing-library/jest-dom";

const setup = (selectedMemoId = null) => {
  //メモを用意する。
  const memos = [
    { id: 1, title: "hogehoge1", content: "hogehoge" },
    { id: 2, title: "夢野久作", content: "胎児よ胎児よなぜ踊る" },
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

describe("メモの選択", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterAll(() => {
    window.alert.mockRestore();
  });

  test("メモをクリックすると選択状態になる", () => {
    const { handleSelect } = setup();
    const memo1 = screen.getByText("hogehoge1");
    const memo2 = screen.getByText("夢野久作");
    // メモをクリックする。
    fireEvent.click(memo1);
    expect(handleSelect).toHaveBeenCalledWith(1); // メモ1が選択されたか確認
    fireEvent.click(memo2);
    expect(handleSelect).toHaveBeenCalledWith(2); // メモ2が選択されたか確認
  });
});
