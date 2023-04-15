import React from "react"
import ReactDOM from "react-dom/client"
import { ResponseProvider } from "./contexts/NotificationContext"
import { AppRoutes } from "./routes"
import { injectStyle } from "react-toastify/dist/inject-style";

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

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
)