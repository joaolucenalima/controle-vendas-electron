import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import SuccessPopUp from '../components/SuccessPopUp';
import { getMaterials, getShopping, setShopping } from '../../database/shopping';

type getShoppingProps = Awaited<ReturnType<typeof getShopping>>

type shoppingProps = {
  materialID: string,
  quantity: number,
  amount: number,
  createdAt: string
}

type materialsProps = {
  id: string,
  name: string,
  priceInCents: number
}

export default function Shopping() {

  const [purchases, setPurchases] = useState<getShoppingProps>([])
  const [materials, setMaterials] = useState<materialsProps[] | undefined>([])
  const [response, setResponse] = useState<string | undefined>(undefined)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<shoppingProps>();

  useEffect(() => {

    getShopping().then((data) => {
      setPurchases(data)
    })

    getMaterials().then((data) => {
      setMaterials(data)
    })

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000);
  }, [response])

  const handleSetPurchase: SubmitHandler<shoppingProps> = async data => {

    materials?.map((material) => {
      data.materialID == material.id ? data.amount = material.priceInCents * data.quantity : null
    })

    try {
      await setShopping(data).then((response) => {
        setResponse(response)
      })
      reset()
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar a compra de materiais. Tente novamente mais tarde.")
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

      <div className='container'>

        <h2>Compras de materiais</h2>

        {purchases?.length === 0 ? (
          <p style={{ margin: "2rem auto", textAlign: "center", fontSize: "1.2rem" }}>Nenhuma compra feita</p>
        ) : (
          <div className='table-container'>
            <div className='table-head'>
              <strong>ID</strong>
              <strong>Material</strong>
              <strong>Quantidade</strong>
              <strong>Preço</strong>
              <strong>Data da venda</strong>
            </div>
            {purchases?.map((purchase, index) => {
              return (
                <div key={index} className='table-row'>
                  <span>{purchase.id}</span>
                  <span>{purchase.Material.name}</span>
                  <span>{purchase.quantity}</span>
                  <span>R$ {purchase.amountInCents / 100}</span>
                  <span>{new Date(purchase.createdAt).toLocaleDateString()}</span>
                </div>
              )
            })}
          </div>
        )}

        <form className="form-sales" onSubmit={handleSubmit(handleSetPurchase)}>

          <h2>Nova compra</h2>

          <div className="form-field">
            <label htmlFor="productID">Produto:</label>

            {materials?.length === 0 ? <span className='error'>Cadastre um produto para registrar a venda</span> :
              (
                <select
                  {...register('materialID', {
                    required: true,
                  })}
                  name="materialID"
                  defaultValue=''
                >
                  <option value='' disabled>Selecione o produto</option>
                  {materials?.map((material) => {
                    return (
                      <option key={material.id} value={material.id}>{material.name}</option>
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
              disabled={materials?.length === 0}
            />
          </div>

          {errors?.quantity?.type === "required" && (
            <span className="error" style={{ textAlign: "end" }}>Digite a quantidade vendida</span>
          )}

          <input
            type="submit"
            value="Cadastrar venda"
            disabled={materials?.length === 0}
          />

        </form>

      </div>
    </>
  )
}