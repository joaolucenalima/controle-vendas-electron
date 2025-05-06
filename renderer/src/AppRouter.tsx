import { MemoryRouter, Route, Routes } from "react-router"
import { Header } from "./components/header"
import { Expenses } from "./pages/Expenses"
import { Report } from "./pages/Report"
import { Sales } from "./pages/Sales"

function AppRouter() {
  return (
    <>
      <MemoryRouter>

        <Header />

        <Routes>
          <Route index element={<Report />} />
          <Route path="/sales" element={<Sales />}/>
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </MemoryRouter>
    </>
  )
}

export default AppRouter
