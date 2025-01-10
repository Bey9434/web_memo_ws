// jest-dom をインポート
import "@testing-library/jest-dom";

import { server } from "./src/mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers(); // ハンドラーの状態をリセット
});
afterAll(() => server.close());
