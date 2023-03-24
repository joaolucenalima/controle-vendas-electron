import { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import NewSaleModal from '../components/NewSaleModal';
import { listSales } from '../../database/sales'

type listSalesResponse = Awaited<ReturnType<typeof listSales>>

export default function Sales() {

  // vendas da tabela
  const [sales, setSales] = useState<listSalesResponse>([])
  // resposta que será mostrada no popup
  const [response, setResponse] = useState<string | undefined>(undefined)

  useEffect(() => {

    listSales().then((sales) => {
      setSales(sales)
    })

  }, [, response])

  useEffect(() => {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000);
  }, [response])

  return (
    <>
      <Header />

      {response != undefined ? (
        <div>
          {SuccessPopUp(response)}
        </div>
      ) : null}

      <div className="container">

        <div>
          <h2>Vendas Registradas</h2>

          {sales?.length === 0 ? (
            <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhuma venda registrada</p>
          ) : (
            <table className='table-container'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th style={{ textAlign: 'center' }}>Data da venda</th>
                  <th style={{ textAlign: 'center' }}>Editar</th>
                  <th style={{ textAlign: 'center' }}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {sales?.map((sale, index) => {
                  return (
                    <tr key={index} >
                      <td>{sale.id}</td>
                      <td>{sale.Product.name}</td>
                      <td>{sale.quantity}</td>
                      <td>R$ {sale.amountInCents / 100}</td>
                      <td style={{ textAlign: 'center' }}>{new Date(sale.createdAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'center' }}><MdEdit /></td>
                      <td style={{ textAlign: 'center' }}><MdDelete /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <NewSaleModal />

      </div>

    </>
  )
}