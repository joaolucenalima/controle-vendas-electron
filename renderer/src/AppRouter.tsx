import { BrowserRouter, Route, Routes } from "react-router"
import { Header } from "./components/header"
import { Report } from "./pages/Report"

function AppRouter() {
  return (
    <>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route index element={<Report />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
