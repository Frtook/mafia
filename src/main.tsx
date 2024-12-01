import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Start from "./start/Start.tsx";
import Status from "./status/Status.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/start" element={<Start />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
