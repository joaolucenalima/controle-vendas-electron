import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { registerProduct } from '../../database/sales';

type Inputs = {
  name: string,
  price: number
}

export default function Products() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const handleProduct: SubmitHandler<Inputs> = async data => {
    try {
      await registerProduct(data)
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

        <h2>Registre aqui um novo produto para adicioná-lo a uma venda</h2>

        <form className="form-products" autoComplete="off" onSubmit={handleSubmit(handleProduct)}>

          <label htmlFor="name">Nome do produto: </label>
          <input
            {...register('name', {
              required: true,
            })}
            type="text"
            name="name"
          />

          {errors?.name?.type === "required" && (
            <span className="error">Digite o nome do produto</span>
          )}

          <label htmlFor="price">Preço unitário: </label>

          <div style={{ position: "relative" }}>
            <span className='money-span'>R$</span>
            <input
              {...register('price', {
                required: true,
              })}
              type="number"
              name="price"
              placeholder="0,00"
              step="0.50"
              className='price-input'
            />
          </div>

          {errors?.price?.type === "required" && (
            <span className="error">O campo Preço é obrigatório</span>
          )}

          <input type="submit" value="Registrar produto" />

        </form>

      </div >
    </>
  )
}