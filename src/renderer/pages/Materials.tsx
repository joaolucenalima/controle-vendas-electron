import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { getMaterials, setMaterials } from '../../database/shopping';
import { ResponseContext } from '../contexts/ResponseContext';
import EditMaterials from '../components/EditMaterials';

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

  const { response, setResponseValue } = useContext(ResponseContext);

  const [materialList, setMaterialList] = useState<MaterialListType[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialProps>();

  useEffect(() => {
    setResponseValue(undefined)
  }, [])

  useEffect(() => {

    setTimeout(() => {
      setResponseValue(undefined)
    }, 3000)

    getMaterials().then((material) => {
      setMaterialList(material)
    })

  }, [response])

  const handleSetMaterial: SubmitHandler<setMaterialProps> = async data => {
    try {
      data.price *= 100
      await setMaterials(data).then((response) => {
        setResponseValue(response)
      })
      reset()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      {response != undefined ? (
        <div>
          {SuccessPopUp(response)}
        </div>
      ) : null}

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

          <input type="submit" value="Registrar material" />

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
                  <th style={{ textAlign: 'center' }}>Editar</th>
                  <th style={{ textAlign: 'center' }}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {materialList?.map((material) => {
                  return (
                    <tr key={material.id}>
                      <td>{material.name}</td>
                      <td>R$ {material.priceInCents / 100}</td>
                      <td style={{ textAlign: 'center' }}>
                        <EditMaterials id={material.id} name={material.name} priceInCents={material.priceInCents} />
                      </td>
                      <td style={{ textAlign: 'center' }}><MdDelete /></td>
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