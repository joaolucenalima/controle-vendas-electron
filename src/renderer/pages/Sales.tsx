import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import DeletePopUp from '../components/DeletePopUp';
import EditSale from '../components/Edit/EditSale';
import Header from "../components/Header";
import NewSaleModal from '../components/NewSaleModal';

import { listSales } from '../../database/sales';

import { NotificationContext } from '../contexts/NotificationContext';

type listSalesResponse = Awaited<ReturnType<typeof listSales>>

export default function Sales() {

  const { message } = useContext(NotificationContext);
  // vendas da tabela
  const [sales, setSales] = useState<listSalesResponse>([])

  useEffect(() => {

    listSales().then((sales) => {
      setSales(sales)
    })

  }, [message])

  return (
    <>
      <Header />

      <ToastContainer />

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
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th className="textCenter">Data da venda</th>
                  <th className="textCenter">Editar</th>
                  <th className="textCenter">Excluir</th>
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
                      <td className="textCenter">{new Date(sale.createdAt).toLocaleDateString()}</td>
                      <td className="textCenter">
                        <EditSale id={sale.id} productID={"dasd"} quantity={sale.quantity} />
                      </td>
                      <td className="textCenter">
                        <DeletePopUp id={sale.id} register={'sale'} />
                      </td>
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