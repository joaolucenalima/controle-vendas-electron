import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { injectStyle } from "react-toastify/dist/inject-style";
<<<<<<< HEAD
=======

import { ResponseProvider } from "./contexts/NotificationContext"
import { AppRoutes } from "./routes"
>>>>>>> main

import { AppRoutes } from "./routes"
import { ResponseProvider } from "./contexts/NotificationContext"
import LoginPage from "./pages/LoginPage";

function App() {

  const [logged, setLogged] = useState(0)

  function setIsLogged() {
    setLogged(1)
  }

  injectStyle();

  if (logged == 1) {
    return (
      <React.StrictMode>
        <ResponseProvider>
          <AppRoutes />
        </ResponseProvider>
      </React.StrictMode >
    )
  } else {
    return (
      <React.StrictMode>
        <ResponseProvider>
          <LoginPage setIsLogged={setIsLogged} />
        </ResponseProvider>
      </React.StrictMode >
    )
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
)