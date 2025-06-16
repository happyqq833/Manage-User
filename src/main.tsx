import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";


if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

