import { useContext, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';

import Header from "../components/Header";
import SuccessAlert from '../components/SuccessAlert';
import NewSaleModal from '../components/NewSaleModal';
import EditSale from '../components/EditSale';
import { listSales } from '../../database/sales'
import { ResponseContext } from '../contexts/ResponseContext';

type listSalesResponse = Awaited<ReturnType<typeof listSales>>

export default function Sales() {

  const { response, setResponseValue } = useContext(ResponseContext);

  // vendas da tabela
  const [sales, setSales] = useState<listSalesResponse>([])

  useEffect(() => {

    setTimeout(() => {
      setResponseValue(undefined)
    }, 3000);

    listSales().then((sales) => {
      setSales(sales)
    })

  }, [response])

  return (
    <>
      <Header />

      {response != undefined ? (
        <div>
          {SuccessAlert(response)}
        </div>
      ) : null}

      <div className="container">

        <div>
          <h2>Vendas Registradas</h2>

          {sales?.length === 0 ? (
            <p className='no-register'>Nenhuma venda registrada</p>
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
                      <td style={{ textAlign: 'center' }}>
                        <EditSale id={sale.id} productID={sale.Product.id} quantity={sale.quantity} />
                      </td>
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