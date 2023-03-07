import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { listSales, registerSale } from '../../database/sales'

type Inputs = {
  product: string,
  quantity: number,
  price: number,
  amount: number
}

export default function Sales() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {
    const response = listSales()
    console.log(response)
  }, [])

  const handleRegister: SubmitHandler<Inputs> = async data => {
    try {
      await registerSale(data)
      reset()
    } catch (err) {
      console.log(err)
      alert("Não foi possível cadastrar a venda. Tente novamente mais tarde.")
    }
  }


  return (
    <>
      <Header />

      <div className="container">

        <h2>Vendas Registradas</h2>

        <div className='table'>
          <div className='table-headers'>

          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>

          <div className="form-field">
            <label htmlFor="product">Produto:</label>
            <select>
              <option value=""></option>
            </select>

            {errors?.product?.type === "required" && (
              <span className="error">Digite o nome do produto</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="quantity">Quantidade vendida:</label>
            <input
              {...register('quantity', {
                required: true,
              })}
              type="number"
              name="quantity"
              min={1}
            />

            {errors?.quantity?.type === "required" && (
              <span className="error">Digite a quantidade vendida</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="price">Preço unitário:</label>
            <input
              {...register('price', {
                required: true,
              })}
              type="number"
              name="price"
            />

            {errors?.price?.type === "required" && (
              <span className="error">Digite o preço unitário de cada produto</span>
            )}
          </div>

          <input type="submit" value="Cadastrar venda" />

        </form>

      </div>
    </>
  )
}