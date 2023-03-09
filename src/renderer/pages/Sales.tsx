import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { listProducts, listSales, recoverPrice, registerSale } from '../../database/sales'

type Inputs = {
  product: string,
  quantity: number,
  price: number,
  amount: number
}

type salesType = {
  product: string,
  price: number
}

type productsType = {
  id: string,
  name: string,
}

export default function Sales() {

  const [products, setProducts] = useState<productsType[] | undefined>([])
  const [sales, setSales] = useState<salesType[]>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {

    listProducts().then((data) => {
      setProducts(data)
    })

    listSales().then((sales) => {
      //console.log(sales)
    })

  }, [])

  const handleRegister: SubmitHandler<Inputs> = async data => {
    try {
      await recoverPrice(data.product).then((response) => {

        data.product = response!.name
        data.price = response!.price
        data.amount = data.price * data.quantity
      })
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

        <form className="form-sales" onSubmit={handleSubmit(handleRegister)}>

          <div className="form-field">
            <label htmlFor="product">Produto:</label>

            {products?.length === 0 ? <span className='error'>Cadastre um produto para registrar a venda</span> :
              (
                <select
                  {...register('product', {
                    required: true,
                  })}
                  name="product"
                  defaultValue=''
                >
                  <option value='' disabled>Selecione o produto</option>
                  {products?.map((product) => {
                    return (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    )
                  })}
                </select>
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

          <input type="submit" value="Cadastrar venda" />

        </form>

      </div>
    </>
  )
}