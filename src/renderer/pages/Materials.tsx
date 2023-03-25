import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { getMaterials, setMaterials } from '../../database/shopping';
import { MdDelete, MdEdit } from 'react-icons/md';

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

  const [response, setResponse] = useState<string | undefined>(undefined)
  const [materialList, setMaterialList] = useState<MaterialListType[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialProps>();

  useEffect(() => {
    getMaterials().then((material) => {
      setMaterialList(material)
    })
  }, [, response])

  useEffect(() => {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000);
  }, [response])

  const handleSetMaterial: SubmitHandler<setMaterialProps> = async data => {
    try {
      data.price *= 100
      await setMaterials(data).then((response) => {
        setResponse(response)
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
                      <td style={{ textAlign: 'center' }}><MdEdit /></td>
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