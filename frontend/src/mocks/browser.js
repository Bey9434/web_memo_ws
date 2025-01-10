import { setupWorker } from "msw";
import { handlers } from "./handlers";

// モックサービスワーカーを作成
export const worker = setupWorker(...handlers);
