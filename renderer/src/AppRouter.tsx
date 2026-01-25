import { Header } from "@components/header";
import { Expenses } from "@pages/Expenses";
import { Products } from "@pages/Products";
import { Report } from "@pages/Report";
import { Sales } from "@pages/Sales";
import { MemoryRouter, Route, Routes } from "react-router";


function AppRouter() {
  return (
    <>
      <MemoryRouter>
        <Header />

        <main className="h-full py-2">
          <Routes>
            <Route index element={<Report />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </MemoryRouter>
    </>
  );
}

export default AppRouter;
