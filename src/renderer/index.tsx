import React from "react"
import ReactDOM from "react-dom/client"
import { injectStyle } from "react-toastify/dist/inject-style";

import { ResponseProvider } from "./contexts/NotificationContext"
import { AppRoutes } from "./routes"

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
)