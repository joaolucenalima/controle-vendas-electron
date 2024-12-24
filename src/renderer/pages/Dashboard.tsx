import { useEffect, useState } from "react";

import { countAndSumSales, getDateofFirstSale } from "../../database/sales";
import { countAndSumShopping, getDateofFirstShopping } from "../../database/shopping";
import { getMonthRange } from "../../utils/getMonthRange";
import { getMonthsUntilNow } from "../../utils/getMonthsUntilNow";

export default function Dashboard() {
  // opções de data do select
  const [dateOptions, setDateOptions] = useState<string[]>([]);

  const [salesData, setSalesData] = useState({
    salesCount: 0,
    salesAmount: 0,
  });

  const [shoppingData, setShoppingData] = useState({
    shoppingCount: 0,
    shoppingAmount: 0,
  });

  useEffect(() => {
    // busca os meses possíveis (options)
    let firstSaleMonth = getDateofFirstSale();
    let firstShoppingMonth = getDateofFirstShopping();

    Promise.all([firstSaleMonth, firstShoppingMonth]).then((values) => {
      if (values[1] !== null && values[0] === null) {
        setDateOptions(getMonthsUntilNow(values[1]!.createdAt));
      } else if (values[1] === null && values[0] !== null) {
        setDateOptions(getMonthsUntilNow(values[0]!.createdAt));
      } else if (values[1] !== null && values[0] !== null) {
        if (values[0]!.createdAt < values[1]!.createdAt) {
          setDateOptions(getMonthsUntilNow(values[0]!.createdAt));
        } else {
          setDateOptions(getMonthsUntilNow(values[1]!.createdAt));
        }
      }
    });
  }, []);

  async function takeMonthData(date: string) {
    const { firstDay, lastDay } = getMonthRange(date);

    await countAndSumSales(firstDay, lastDay).then((data) => {
      setSalesData({
        salesCount: data.salesCount,
        salesAmount: data.salesAmount,
      });
    });

    await countAndSumShopping(firstDay, lastDay).then((data) => {
      setShoppingData({
        shoppingCount: data.shoppingCount,
        shoppingAmount: data.shoppingAmount,
      });
    });
  }

  const profit = (salesData.salesAmount - shoppingData.shoppingAmount) / 100;

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <select
        name="date"
        onChange={(e) => {
          takeMonthData(e.target.value);
        }}
      >
        {dateOptions.map((dateOption, index) => {
          return (
            <option key={index} value={dateOption}>
              {dateOption}
            </option>
          )
        })}
      </select>

      <div className="no-info-text">
        Não há informações correspondentes a esse mês.
      </div>
    </div>
  )
}