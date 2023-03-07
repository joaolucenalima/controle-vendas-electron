import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { listProducts, registerProduct } from '../../database/sales';

type Inputs = {
  product: string,
  price: number
}

export default function Products() {

  const [products, setProducts] = useState([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {
    // listProducts().then((products) => setProducts(products))
  }, [])

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

          <label htmlFor="product">Nome do produto: </label>
          <input
            {...register('product', {
              required: true,
            })}
            type="text"
            name="product"
          />

          {errors?.product?.type === "required" && (
            <span className="error">Digite o nome do produto</span>
          )}

          <label htmlFor="price">Preço unitário: </label>
          <input
            {...register('price', {
              required: true,
            })}
            type="text"
            name="price"
            placeholder="00,00"
          />

          {errors?.price?.type === "required" && (
            <span className="error">O campo Preço é obrigatório</span>
          )}

          <input type="submit" value="Registrar produto" />

        </form>

      </div>
    </>
  )
}