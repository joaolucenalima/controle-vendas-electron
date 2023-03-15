import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { getMaterials, setMaterials } from '../../database/materials';

type setMaterialsProps = {
  description: string,
  amount: number,
  createdAt: string
}

type getMaterialsProps = {
  id: number,
  description: string,
  amountInCents: number,
  createdAt: string
}

export default function Materials() {

  const [buys, setBuys] = useState<getMaterialsProps[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialsProps>();

  useEffect(() => {
    getMaterials().then((material) => {
      setBuys(material)
    })
  }, [])

  const handleSetMaterial: SubmitHandler<setMaterialsProps> = async data => {
    try {
      data.createdAt = (new Date()).toLocaleDateString()
      setMaterials(data).then((response) => {
        console.log(response)
      })
      reset()
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar a compra de materiais. Tente novamente mais tarde")
    }
  }

  return (
    <>
      <Header />

      <div className="container">

        <form className="material-form" onSubmit={handleSubmit(handleSetMaterial)}>

          <h2>Registrar compra de materiais</h2>

          <div>
            <label htmlFor="description">Descrição da compra:</label>
            <input
              {...register('description', {
                required: true,
              })}
              type="text"
              name="description"
            />
          </div>

          {errors?.description?.type === "required" && (
            <span className="error">O campo descrição é obrigatório.</span>
          )}

          <div style={{ position: "relative" }}>
            <label htmlFor="amount">Preço:</label>
            <span className='money-span-materials'>R$</span>
            <input
              {...register('amount', {
                required: true,
              })}
              type="number"
              name="amount"
              min={1}
              placeholder="0.00"
            />
          </div>

          {errors?.amount?.type === "required" && (
            <span className="error">O campo preço é obrigatório.</span>
          )}

          <input type="submit" value="Registrar compra" />

        </form>

        <div style={{ marginTop: "2rem" }}>
          <h2>Compras de materiais</h2>

          {buys?.length === 0 ? (
            <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhuma compra feita</p>
          ) : (
            <div className='table-container'>
              <div className='table-head'>
                <strong>ID</strong>
                <strong>Descrição</strong>
                <strong>Preço</strong>
                <strong>Data da venda</strong>
              </div>
              {buys?.map((buy, index) => {
                return (
                  <div key={index} className='table-row'>
                    <span>{buy.id}</span>
                    <span>{buy.description}</span>
                    <span>R$ {buy.amountInCents / 100}</span>
                    <span>{buy.createdAt}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </>
  )
}