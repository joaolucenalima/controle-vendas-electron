import { useEffect, useState } from "react";
import { countSales, getSalesAmount } from "../../database/sales";

import Header from "../components/Header";

export default function Report() {

  const [sales, setSales] = useState<number | undefined>(0)
  const [salesAmount, setSalesAmount] = useState<number | undefined>(0)

  useEffect(() => {

    countSales().then((data) => {
      setSales(data)
    })

    getSalesAmount().then((amount) => {
      setSalesAmount(amount)
    })

  }, [])

  return (
    <>
      <Header />

      <div className="flex-records">

        <div className="first-line">
          <div className="record">
            <h1>Materiais:</h1>
            <span style={{ fontSize: "1.3rem" }}>10 compras</span>
            <strong>Gastos totais:</strong>
            <span style={{ color: "rgb(233, 113, 113)", fontSize: "1.3rem" }}>R$ 10</span>
          </div>

          <div className="record">
            <h1>Vendas Totais:</h1>
            <span style={{ fontSize: "1.3rem" }}>{sales == undefined ? '0' : sales}</span>
            <strong>Lucro total:</strong>
            <span style={{ color: "#00CF66", fontSize: "1.3rem" }}>R$ {salesAmount == undefined ? '0' : salesAmount / 100}</span>
          </div>
        </div>

        <div className="second-line record">
          <h1>Lucro final:</h1>
          <span
            style={{ fontSize: "1.7rem" }}
          >
            R$ 10
          </span>
        </div>

      </div>

    </>
  )
}