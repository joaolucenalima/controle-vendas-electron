import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Materials from "./pages/Materials";
import Products from "./pages/Products";
import Report from "./pages/Report";
import Sales from "./pages/Sales";
import Shopping from "./pages/Shoppings";

export function AppRoutes() {
  return (
    <Router>
      <div className="layout">
        <Sidebar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Report />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
