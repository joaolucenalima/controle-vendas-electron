import { SubmitHandler, useForm } from 'react-hook-form'

import Header from "../components/Header";
import { setMaterials } from '../../database/shopping';

type setMaterialProps = {
  name: string,
  price: number
}

export default function Materials() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<setMaterialProps>();

  const handleSetMaterial: SubmitHandler<setMaterialProps> = async data => {
    try {
      data.price *= 100
      await setMaterials(data)
      reset()
    } catch (error) {
      console.log(error);
      alert("Não foi possível cadastrar o material. Tente novamente mais tarde")
    }
  }

  return (
    <>
      <Header />

      <div className="container">

        <form className="material-form" onSubmit={handleSubmit(handleSetMaterial)}>

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
            <span className='money-span-materials'>R$</span>
            <input
              {...register('price', {
                required: true,
              })}
              type="number"
              name="price"
              min={1}
              step="0.50"
              placeholder="0.00"
            />
          </div>

          {errors?.price?.type === "required" && (
            <span className="error">O campo preço é obrigatório.</span>
          )}

          <input type="submit" value="Registrar compra" />

        </form>

      </div>
    </>
  )
}