import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.scss";
import App from "./components/app/App";
import "./locales/i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App/>
);
