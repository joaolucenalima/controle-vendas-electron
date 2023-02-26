import React from "react"
import ReactDOM from "react-dom/client"
import { AppRoutes } from "./routes"

function App() {
  return (
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <App />
)