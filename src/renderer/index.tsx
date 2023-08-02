import React from "react";
import ReactDOM from "react-dom/client";
import { injectStyle } from "react-toastify/dist/inject-style";

import { connectDB } from "../database/connection";
import { ResponseProvider } from "./contexts/NotificationContext";
import { AppRoutes } from "./routes";

function App() {

  injectStyle();

  return (
    <React.StrictMode>
      <ResponseProvider>
        <AppRoutes />
      </ResponseProvider>
    </React.StrictMode >
  )
}

connectDB().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  )
})