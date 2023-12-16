import "@/assets/styles/reset.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import "swiper/css";
import "swiper/css/scrollbar";
import { App } from "./App";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
