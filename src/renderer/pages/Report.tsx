import { useEffect, useState } from "react";

import Header from "../components/Header";

import { countAndSumShopping, getDateofFirstShopping } from "../../database/shopping";
import { countAndSumSales, getDateofFirstSale } from "../../database/sales";

import { getMonthsUntilNow } from "../../utils/getMonthsUntilNow";
import { getMonthRange } from "../../utils/getMonthRange";

export default function Report() {

  // período escolhido para gerar relatório
  const [selectedDate, setSelectedDate] = useState('')
  // opções de data do select
  const [dateOptions, setDateOptions] = useState<string[]>([])

  const [salesData, setSalesData] = useState({
    salesCount: 0,
    salesAmount: 0
  })

  const [shoppingData, setShoppingData] = useState({
    shoppingCount: 0,
    shoppingAmount: 0
  })

  useEffect(() => { // busca os meses possíveis (options)

    let firstSaleMonth = getDateofFirstSale()
    let firstShoppingMonth = getDateofFirstShopping()

    Promise.all([firstSaleMonth, firstShoppingMonth]).then(values => {

      if (values[1] !== null && values[0] === null) {
        setDateOptions(getMonthsUntilNow(values[1]!.createdAt))
      }
      else if (values[1] === null && values[0] !== null) {
        setDateOptions(getMonthsUntilNow(values[0]!.createdAt))
      }
      else if (values[1] !== null && values[0] !== null) {

        if (values[0]!.createdAt < values[1]!.createdAt) {
          setDateOptions(getMonthsUntilNow(values[0]!.createdAt))
        } else {
          setDateOptions(getMonthsUntilNow(values[1]!.createdAt))
        }

      }

    })

  }, [])

  useEffect(() => { // faz a busca quando um mês é selecionado

    if (selectedDate != '') {

      const { firstDay, lastDay } = getMonthRange(selectedDate)

      countAndSumSales(firstDay, lastDay).then((data) => {
        setSalesData({ salesCount: data.salesCount, salesAmount: data.salesAmount })
      })

      countAndSumShopping(firstDay, lastDay).then((data) => {
        setShoppingData({ shoppingCount: data.shoppingCount, shoppingAmount: data.shoppingAmount })
      })
    }

  }, [selectedDate])

  const profit = (salesData.salesAmount - shoppingData.shoppingAmount) / 100

  return (
    <>
      <Header />

      <div className="dateSelectContainer">

        <h2>Selecione um mês para gerar o relatório</h2>

        <select
          name="date"
          value={selectedDate}
          onChange={(e) => { setSelectedDate(e.target.value) }}
          style={{ fontSize: "1.3rem" }}
        >
          <option value="" disabled>Escolha um mês</option>

          {dateOptions.map((dateOption, index) => {
            return (
              <option key={index} value={dateOption} >{dateOption}</option>
            )

          })}

        </select>
      </div>

      {
        selectedDate.length > 0 ? (
          <div className="flex-records">

            <div className="first-line">
              <div className="record">
                <h1>Materiais:</h1>
                <span style={{ fontSize: "1.3rem" }}>{shoppingData.shoppingCount}</span>
                <strong>Gastos totais:</strong>
                <span style={{ color: "#cf231d", fontSize: "1.3rem" }}>R$ {shoppingData.shoppingAmount / 100}</span>
              </div>

              <div className="record">
                <h1>Vendas Totais:</h1>
                <span style={{ fontSize: "1.3rem" }}>{salesData.salesCount}</span>
                <strong>Lucro total:</strong>
                <span style={{ color: "#00CF22", fontSize: "1.3rem" }}>R$ {salesData.salesAmount / 100}</span>
              </div>
            </div>

            <div className="second-line record">
              <h1>Lucro final:</h1>
              <span className={profit > 0 ? "profit" : "prejudice"}>
                R$ {profit}
              </span>
            </div>

          </div>
        ) : null
      }

    </>
  )
}