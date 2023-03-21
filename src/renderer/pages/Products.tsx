import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { registerProduct } from '../../database/sales';

type Inputs = {
  name: string,
  priceInCents: number
}

export default function Products() {

  const [response, setResponse] = useState<string | undefined>(undefined)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000);
  }, [response])

  const handleProduct: SubmitHandler<Inputs> = async data => {
    try {
      data.priceInCents *= 100
      await registerProduct(data).then((response) => {
        setResponse(response)
      })
      reset()
    } catch (err) {
      console.log(err)
      alert("Não foi possível cadastrar a venda. Tente novamente mais tarde.")
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

        <form className="inline-form" autoComplete="off" onSubmit={handleSubmit(handleProduct)}>

          <h2>Registrar produto</h2>

          <div>
            <label htmlFor="name">Nome do produto: </label>
            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              name="name"
            />
          </div>

          {errors?.name?.type === "required" && (
            <span className="error">O campo Nome é obrigatório</span>
          )}

          <div style={{ position: "relative" }}>
            <label htmlFor="priceInCents">Preço unitário: </label>
            <span className='money-span'>R$</span>
            <input
              {...register('priceInCents', {
                required: true,
              })}
              type="number"
              name="priceInCents"
              min={1}
              step="0.10"
              placeholder="0,00"
            />
          </div>

          {errors?.priceInCents?.type === "required" && (
            <span className="error">O campo Preço é obrigatório</span>
          )}

          <input type="submit" value="Registrar produto" />

        </form>

      </div >
    </>
  )
}