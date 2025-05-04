import { MemoryRouter, Route, Routes } from "react-router"
import { Header } from "./components/header"
import { Report } from "./pages/Report"

function AppRouter() {
  return (
    <>
      <MemoryRouter>

        <Header />

        <Routes>
          <Route index element={<Report />} />
        </Routes>
      </MemoryRouter>
    </>
  )
}

export default AppRouter
