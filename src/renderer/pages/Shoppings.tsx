import { useContext, useEffect, useState } from 'react'

import Header from "../components/Header";
import SuccessAlert from '../components/SuccessAlert';
import NewShoppingModal from '../components/NewShoppingModal';
import EditShopping from '../components/EditShopping';
import DeletePopUp from '../components/DeletePopUp';
import { getShopping } from '../../database/shopping';

import { ResponseContext } from '../contexts/ResponseContext';

type getShoppingProps = Awaited<ReturnType<typeof getShopping>>

export default function Shopping() {

  const { response, setResponseValue } = useContext(ResponseContext);

  const [purchases, setPurchases] = useState<getShoppingProps>([])

  useEffect(() => {

    setTimeout(() => {
      setResponseValue(undefined)
    }, 3000);

    getShopping().then((data) => {
      setPurchases(data)
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

      <div className='container'>

        <div>
          <h2>Compras de materiais</h2>

          {purchases?.length === 0 ? (
            <p className='no-register'>Nenhuma compra feita</p>
          ) : (
            <table className='table-container'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Material</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th style={{ textAlign: 'center' }}>Data da compra</th>
                  <th style={{ textAlign: 'center' }}>Editar</th>
                  <th style={{ textAlign: 'center' }}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {purchases?.map((purchase, index) => {
                  return (
                    <tr key={index} >
                      <td>{purchase.id}</td>
                      <td>{purchase.Material.name}</td>
                      <td>{purchase.quantity}</td>
                      <td>R$ {purchase.amountInCents / 100}</td>
                      <td style={{ textAlign: 'center' }}>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'center' }}>
                        <EditShopping id={purchase.id} materialID={purchase.Material.id} quantity={purchase.quantity} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <DeletePopUp id={purchase.id} register={'shopping'} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <NewShoppingModal />

      </div>
    </>
  )
}