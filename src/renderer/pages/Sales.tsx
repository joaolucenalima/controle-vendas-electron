import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { listProducts, listSales, registerSale } from '../../database/sales'

type listSalesResponse = Awaited<ReturnType<typeof listSales>>

type salesType = {
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

type productsType = {
  id: string,
  name: string,
  priceInCents: number
}

export default function Sales() {

  const [products, setProducts] = useState<productsType[] | undefined>([])
  const [sales, setSales] = useState<listSalesResponse>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<salesType>();

  useEffect(() => {

    listProducts().then((data) => {
      setProducts(data)
    })

    listSales().then((sales) => {
      setSales(sales)
    })

  }, [])

  const handleRegister: SubmitHandler<salesType> = async data => {

    products?.map((product) => {
      data.productID == product.id ? data.amountInCents = product.priceInCents * data.quantity : null
    })

    try {
      data.createdAt = (new Date()).toLocaleDateString()
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

        {sales?.length === 0 ? (
          <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhuma venda registrada</p>
        ) : (
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Data da venda</th>
                </tr>
              </thead>
              <tbody>
                {sales?.map((sale, index) => {
                  return (
                    <tr key={index}>
                      <td>{sale.id}</td>
                      <td>{sale.Product.name}</td>
                      <td>{sale.quantity}</td>
                      <td>R$ {sale.amountInCents / 100}</td>
                      <td>{sale.createdAt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <form className="form-sales" onSubmit={handleSubmit(handleRegister)}>

          <h2>Nova venda</h2>

          <div className="form-field">
            <label htmlFor="productID">Produto:</label>

            {products?.length === 0 ? <span className='error'>Cadastre um produto para registrar a venda</span> :
              (
                <select
                  {...register('productID', {
                    required: true,
                  })}
                  name="productID"
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
            <label htmlFor="quantity">Quantidade:</label>
            <input
              {...register('quantity', {
                required: true,
              })}
              type="number"
              name="quantity"
              min={1}
              disabled={products?.length === 0}
            />

            {errors?.quantity?.type === "required" && (
              <span className="error">Digite a quantidade vendida</span>
            )}
          </div>

          <input
            type="submit"
            value="Cadastrar venda"
            disabled={products?.length === 0}
          />



        </form>

      </div>
    </>
  )
}