import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

import Header from "../components/Header";
import EditMaterials from '../components/Edit/EditMaterials';
import DeletePopUp from '../components/DeletePopUp';

import { getMaterials, setMaterials } from '../../database/shopping';

import { NotificationContext } from '../contexts/NotificationContext';

type setMaterialProps = {
  name: string,
  price: number
}

type MaterialListType = {
  id: string,
  name: string,
  priceInCents: number
}

export default function Materials() {

  const { message, showToast } = useContext(NotificationContext);

  const [materialList, setMaterialList] = useState<MaterialListType[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialProps>();

  useEffect(() => {

    getMaterials().then((material) => {
      setMaterialList(material)
    })

  }, [message])

  const handleSetMaterial: SubmitHandler<setMaterialProps> = async data => {
    data.price = parseFloat((data.price * 100).toFixed(2))

    await setMaterials(data).then((response) => {
      showToast(response)
    })

    reset()
  }

  return (
    <>
      <Header />

      <ToastContainer />

      <div className="container">

        <form className="inline-form" onSubmit={handleSubmit(handleSetMaterial)}>

          <h2>Registrar materiais</h2>

          <div>
            <label htmlFor="name">Material:</label>
            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              name="name"
            />
          </div>

          {errors?.name?.type === "required" && (
            <span className="error">O campo material é obrigatório.</span>
          )}

          <div style={{ position: "relative" }}>
            <label htmlFor="price">Preço unitário:</label>
            <span className='money-span'>R$</span>
            <input
              {...register('price', {
                required: true,
              })}
              type="number"
              name="price"
              step="0.01"
              placeholder="0.00"
              min={0.01}
            />
          </div>

          {errors?.price?.type === "required" && (
            <span className="error">O campo preço é obrigatório.</span>
          )}

          <input
            type="submit"
            value="Registrar material"
            style={{ backgroundColor: 'rgb(233, 203, 105)' }}
          />

        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <h2>Materiais</h2>

          {materialList?.length === 0 ? (
            <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhum material cadastrado</p>
          ) : (
            <table className='table-container'>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Preço</th>
                  <th className="textCenter">Editar</th>
                  <th className="textCenter">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {materialList?.map((material) => {
                  return (
                    <tr key={material.id}>
                      <td>{material.name}</td>
                      <td>R$ {material.priceInCents / 100}</td>
                      <td className="textCenter">
                        <EditMaterials id={material.id} name={material.name} priceInCents={material.priceInCents} />
                      </td>
                      <td className="textCenter">
                        <DeletePopUp id={material.id} register={'material'} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </>
  )
}