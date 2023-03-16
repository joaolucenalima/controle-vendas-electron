import { Route, HashRouter as Router, Routes } from "react-router-dom"

import Report from "./pages/Report"
import Shopping from "./pages/Shoppings"
import Sales from "./pages/Sales"
import Materials from "./pages/Materials"
import Products from "./pages/Products"

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Report />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  )
}