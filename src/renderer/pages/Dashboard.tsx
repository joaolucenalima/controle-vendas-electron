import { useEffect, useMemo, useState } from "react";
import { DashboardController } from "../../database/controllers/Dashboard";
import { getMonthRange } from "../../utils/getMonthRange";

export default function Dashboard() {

  // opções de data do select
  const [dateOptions, setDateOptions] = useState<string[]>([]);

  const [salesData, setSalesData] = useState({})

  useEffect(() => {
    DashboardController.getFirstMonth().then(data => {
      if (data) {
        setDateOptions(data)
      }
    })
  }, []);

  async function takeMonthData(date: string) {
    const { firstDay, lastDay } = getMonthRange(date);

    await DashboardController.
  }

  const options = useMemo(() => {
    if (!dateOptions.length) {
      return <option></option>
    }

    return dateOptions.reverse().map((dateOption, index) => (
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
      >
        {options}
      </select>

      <div className="no-info-text">
        Não há informações correspondentes a esse mês.
      </div>
    </div>
  )
}