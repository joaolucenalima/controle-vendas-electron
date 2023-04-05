import { useEffect, useState, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';

import { listProducts, registerSale } from '../../database/sales'
import { ResponseContext } from '../contexts/ResponseContext';

type productsType = {
  id: string,
  name: string,
  priceInCents: number
}

type salesType = {
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

export default function NewSaleModal() {

  const { setResponseValue } = useContext(ResponseContext);

  // produtos do select
  const [products, setProducts] = useState<productsType[] | undefined>([])
  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<salesType>();

  useEffect(() => {

    listProducts().then((data) => {
      setProducts(data)
    })

  }, [])

  const handleRegister: SubmitHandler<salesType> = async data => {

    // recuperar informações do produto selecionado pelo id
    products?.map((product) => {
      data.productID == product.id ? data.amountInCents = product.priceInCents * data.quantity : null
    })

    try {
      await registerSale(data).then((response) => {
        setResponseValue(response)
      })
    } catch (err) {
      console.log(err)
      alert("Não foi possível cadastrar a venda. Tente novamente mais tarde.")
    }

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdAdd
          title='Cadastrar nova venda'
          className='ModalButton'
          style={{ backgroundColor: '#2cd448', color: '#404040' }}
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Nova venda
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="form-sales" onSubmit={handleSubmit(handleRegister)}>

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
            </div>

            {errors?.quantity?.type === "required" && (
              <span className="error">Digite a quantidade vendida</span>
            )}

            <input
              type="submit"
              value="Cadastrar venda"
              disabled={products?.length === 0}
              style={{ backgroundColor: '#33aa47' }}
            />

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}