import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import Header from "../components/Header";
import { setMaterials } from '../../database/shopping';
import SuccessPopUp from '../components/SuccessPopUp';

type setMaterialProps = {
  name: string,
  price: number
}

export default function Materials() {

  const [response, setResponse] = useState<string | undefined>(undefined)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialProps>();

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
            />
          </div>

          {errors?.price?.type === "required" && (
            <span className="error">O campo preço é obrigatório.</span>
          )}

          <input type="submit" value="Registrar material" />

        </form>

      </div>
    </>
  )
}