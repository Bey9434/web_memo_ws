import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if (import.meta.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
