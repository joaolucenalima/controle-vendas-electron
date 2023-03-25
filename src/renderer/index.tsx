import React from "react"
import ReactDOM from "react-dom/client"
import { ResponseProvider } from "./contexts/ResponseContext"
import { AppRoutes } from "./routes"

function App() {
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