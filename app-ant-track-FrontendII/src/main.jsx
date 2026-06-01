import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { getToken } from "./helpers/local-storage";
import "./index.css";

const token = getToken();
console.log("Sesión activa:", token ? "Sí" : "No");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);