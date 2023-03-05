import { useEffect, useState } from "react";

import Header from "../components/Header";

export default function Report() {

  useEffect(() => {

  }, [])

  return (
    <>
      <Header />

      <div className="flex-records">

        <div className="first-line">
          <div className="record">
            <h1>Materiais:</h1>
            <span>10 compras realizadas</span>
            <strong>Gastos totais:</strong>
            <span>R$ 10</span>
          </div>

          <div className="record">
            <h1>Vendas Totais:</h1>
            <span>10</span>
            <strong>Lucros totais:</strong>
            <span>R$ 10</span>
          </div>
        </div>

        <div className="second-line record">
          <h1>Lucro final:</h1>
          <span>R$ 10</span>
        </div>

      </div>

    </>
  )
}