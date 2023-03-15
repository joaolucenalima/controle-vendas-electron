import { useEffect, useState } from "react";
import { countBuys, sumMaterialsAmount } from "../../database/materials";
import { countSales, getSalesAmount } from "../../database/sales";

import Header from "../components/Header";

export default function Report() {

  const [sales, setSales] = useState<number | 0>(0)
  const [salesAmount, setSalesAmount] = useState<number | 0>(0)
  const [buys, setBuys] = useState<number | 0>(0)
  const [buysAmount, setBuysAmount] = useState<number | 0>(0)

  useEffect(() => {

    countSales().then((data) => {
      setSales(data)
    })

    getSalesAmount().then((amount) => {
      setSalesAmount(amount)
    })

    countBuys().then((data) => {
      setBuys(data)
    })

    sumMaterialsAmount().then((data) => {
      setBuysAmount(data)
    })

  }, [])

  const profit = (salesAmount - buysAmount) / 100

  return (
    <>
      <Header />

      <div className="flex-records">

        <div className="first-line">
          <div className="record">
            <h1>Materiais:</h1>
            <span style={{ fontSize: "1.3rem" }}>{buys}</span>
            <strong>Gastos totais:</strong>
            <span style={{ color: "#cf231d", fontSize: "1.3rem" }}>R$ {buysAmount / 100}</span>
          </div>

          <div className="record">
            <h1>Vendas Totais:</h1>
            <span style={{ fontSize: "1.3rem" }}>{sales}</span>
            <strong>Lucro total:</strong>
            <span style={{ color: "#00CF22", fontSize: "1.3rem" }}>R$ {salesAmount / 100}</span>
          </div>
        </div>

        <div className="second-line record">
          <h1>Lucro final:</h1>
          <span
            className={profit > 0 ? "profit" : "prejudice"}
          >
            R$ {profit}
          </span>
        </div>

      </div>

    </>
  )
}