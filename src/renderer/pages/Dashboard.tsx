import { useEffect, useMemo, useState } from "react";
import { DashboardController } from "../../database/controllers/Dashboard";
import { getMonthRange } from "../../utils/getMonthRange";

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

interface DashboardData {
  shoppingCount: number,
  salesCount: number,
  profit: number
}

export default function Dashboard() {

  // opções de data do select
  const [dateOptions, setDateOptions] = useState<string[]>([]);

  const [dashboardData, setDashboardData] = useState<DashboardData>()

  // buscar array com todos os meses desde a primeira compra ou venda realizada
  useEffect(() => {
    DashboardController.getFirstMonth().then(data => {
      if (data) {
        setDateOptions(data)
        takeMonthData(data[data.length - 1])
      } else {
        // caso não tenha compra ou venda define o valor de dateOptions para o mês atual
        const currentDate = dayjs(new Date).locale('pt-br').format('MMMM [de] YYYY')
        setDateOptions([currentDate])
      }
    })
  }, []);

  // buscando dados para mostrar na dashboard
  function takeMonthData(date: string) {
    const { firstDay, lastDay } = getMonthRange(date);

    DashboardController.getDashboardData(firstDay, lastDay).then(data => {
      setDashboardData(data)
    })
  }

  // opções do select (meses)
  const options = useMemo(() => {
    return dateOptions.map((dateOption, index) => (
      <option key={index} value={dateOption}>
        {dateOption}
      </option>
    ))
  }, [dateOptions.length, dateOptions])

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <select
        onChange={(e) => {
          takeMonthData(e.target.value);
        }}
        defaultValue={dateOptions[dateOptions.length - 1]}
      >
        {options}
      </select>

      {!dashboardData ? (
        <div className="no-info-text">
          Não há informações correspondentes a esse mês.
        </div>
      ) : (
        <span>{dashboardData.shoppingCount}</span>
      )}

    </div >
  )
}