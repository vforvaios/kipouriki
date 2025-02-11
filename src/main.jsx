import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/my-service-worker.js");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
