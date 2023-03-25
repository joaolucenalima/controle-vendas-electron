import { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { getShopping } from '../../database/shopping';
import NewShoppingModal from '../components/NewShoppingModal';

type getShoppingProps = Awaited<ReturnType<typeof getShopping>>

export default function Shopping() {

  const [purchases, setPurchases] = useState<getShoppingProps>([])

  const [response, setResponse] = useState<string | undefined>(undefined)

  useEffect(() => {

    getShopping().then((data) => {
      setPurchases(data)
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
                      <td style={{ textAlign: 'center' }}><MdEdit /></td>
                      <td style={{ textAlign: 'center' }}><MdDelete /></td>
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