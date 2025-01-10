import { http, HttpResponse } from "msw";

const API_BASE_URL = "http://localhost:3001/api/memos";

// 初期データ
let memos = [
  { id: 1, title: "モックタイトル1", content: "モックメモ1" },
  { id: 2, title: "モックタイトル2", content: "モックメモ2" },
];

let memoIdCounter = 3; // IDカウンター

export const handlers = [
  http.get(`${API_BASE_URL}`, () => {
    console.debug(
      "Current memos in GET response:",
      JSON.stringify(memos, null, 2)
    );
    return HttpResponse.json(memos, { status: 200 });
  }),

  http.post(`${API_BASE_URL}`, async ({ request }) => {
    const { title, content } = await request.json();
    const newMemo = { id: memoIdCounter++, title, content };
    memos.push(newMemo);
    console.debug("New memo added:", newMemo);
    return HttpResponse.json(newMemo, { status: 201 });
  }),

  http.delete(`${API_BASE_URL}/:id`, ({ params }) => {
    const { id } = params;
    const memoId = Number(id);
    const memoExists = memos.some((memo) => memo.id === memoId);

    if (!memoExists) {
      console.warn(`DELETE /api/memos/${id} failed: Memo not found`);
      return HttpResponse.text(`Memo with id ${id} not found`, { status: 404 });
    }

    memos = memos.filter((memo) => memo.id !== memoId);
    console.debug(`DELETE /api/memos/${id} succeeded`);
    return HttpResponse.text("Deleted", { status: 200 });
  }),

  http.put(`${API_BASE_URL}/:id`, async ({ params, request }) => {
    const { id } = params;
    const { title, content } = await request.json();

    // 指定されたIDのメモを更新
    const memoIndex = memos.findIndex((memo) => memo.id === Number(id));
    if (memoIndex !== -1) {
      memos[memoIndex] = { ...memos[memoIndex], title, content };
      return HttpResponse.json(memos[memoIndex], { status: 200 });
    }

    // メモが見つからない場合
    return HttpResponse.text("Not Found", { status: 404 });
  }),
];

// テスト間でデータリセット
beforeEach(() => {
  memos = [
    { id: 1, title: "モックタイトル1", content: "モックメモ1" },
    { id: 2, title: "モックタイトル2", content: "モックメモ2" },
  ];
  memoIdCounter = 3;
});

console.debug("Handlers loaded:", handlers);
