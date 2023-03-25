import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdDelete, MdEdit } from 'react-icons/md';

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { listProducts, registerProduct } from '../../database/sales';

type Inputs = {
  name: string,
  priceInCents: number
}

type ProductListType = {
  id: string,
  name: string,
  priceInCents: number
}

export default function Products() {

  const [response, setResponse] = useState<string | undefined>(undefined)
  const [productList, setProductList] = useState<ProductListType[] | undefined>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  useEffect(() => {
    listProducts().then((product) => {
      setProductList(product)
    })
  }, [, response])

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
              step="0.01"
              placeholder="0.00"
              min={0.01}
            />
          </div>

          {errors?.priceInCents?.type === "required" && (
            <span className="error">O campo Preço é obrigatório</span>
          )}

          <input type="submit" value="Registrar produto" />

        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <h2>Materiais</h2>

          {productList?.length === 0 ? (
            <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhum produto cadastrado</p>
          ) : (
            <table className='table-container'>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th style={{ textAlign: 'center' }}>Editar</th>
                  <th style={{ textAlign: 'center' }}>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {productList?.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>R$ {product.priceInCents / 100}</td>
                      <td style={{ textAlign: 'center' }}><MdEdit /></td>
                      <td style={{ textAlign: 'center' }}><MdDelete /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

      </div >
    </>
  )
}