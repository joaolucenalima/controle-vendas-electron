import { Route, HashRouter as Router, Routes } from "react-router-dom"

import Home from './pages/Home'
import Clientes from "./pages/Clientes"
import Materiais from "./pages/Materiais"
import Compras from "./pages/Compras"
import Vendas from "./pages/Vendas"

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/materiais" element={<Materiais />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  )
}