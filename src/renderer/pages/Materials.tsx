import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { getMaterials, setMaterials } from '../../database/materials';

type setMaterialsProps = {
  description: string,
  amount: number
}

type getMaterialsProps = {
  id: number,
  description: string,
  amountInCents: number
}

export default function Materials() {

  const [buy, setBuy] = useState<getMaterialsProps[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialsProps>();

  useEffect(() => {
    getMaterials().then((material) => {
      setBuy(material)
    })
  }, [])

  const handleSetMaterial: SubmitHandler<setMaterialsProps> = async data => {
    try {
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

        <div>
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
        </div>

      </div>
    </>
  )
}