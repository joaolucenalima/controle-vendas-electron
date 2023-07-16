import { useEffect, useState, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { listProducts, registerSale } from '../../database/sales'
import { NotificationContext } from '../contexts/NotificationContext';

const salesPropsSchema = z.object({
  amountInCents: z.number(),
  productID: z.string().uuid(),
  quantity: z.number().int().min(1)
})

type salesProps = z.infer<typeof salesPropsSchema>

type productsType = {
  id: string,
  name: string,
  priceInCents: number
}

export default function NewSaleModal() {

  const { showToast } = useContext(NotificationContext);

  // produtos do select
  const [products, setProducts] = useState<productsType[] | undefined>([])
  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<salesProps>({
    resolver: zodResolver(salesPropsSchema),
    defaultValues: {
      amountInCents: 0
    }
  });

  useEffect(() => {
    listProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  const handleRegister: SubmitHandler<salesProps> = async (data) => {
    // recuperar informações do produto selecionado pelo id
    products?.map((product) => {
      if (data.productID == product.id) {
        data.amountInCents = product.priceInCents * data.quantity
      }
    })

    await registerSale(data).then((response) => {
      showToast(response)
    })

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
                    defaultValue=''
                  >
                    <option value='' disabled>Selecione o produto</option>
                    {products?.map((product) =>
                      <option key={product.id} value={product.id}>{product.name}</option>
                    )}
                  </select>
                )}
            </div>

            <div className="form-field">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                {...register("quantity", {
                  required: true,
                  valueAsNumber: true
                })}
                min={1}
                defaultValue={0}
                disabled={products?.length === 0}
              />
            </div>

            {errors?.quantity && (
              <span className="error">{errors?.quantity.message}</span>
            )}

            <button
              disabled={products?.length === 0}
              style={{ backgroundColor: '#33aa47' }}
            >
              Cadastrar Venda
            </button>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}