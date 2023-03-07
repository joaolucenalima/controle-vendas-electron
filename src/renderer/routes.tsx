import { Route, HashRouter as Router, Routes } from "react-router-dom"

import Report from "./pages/Report"
import Materials from "./pages/Materials"
import Sales from "./pages/Sales"
import Products from "./pages/Products"

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Report />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  )
}