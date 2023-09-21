import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdEdit } from 'react-icons/md';

import { listProducts } from '../../../database/controllers/Products';
import { updateSales } from '../../../database/controllers/Sales';
import { NotificationContext } from '../../contexts/NotificationContext';

type EditSaleProps = {
  id: number,
  productID: string,
  quantity: number
}

type productsType = {
  id: string,
  name: string,
  priceInCents: number
}

type salesType = {
  id: number,
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

export default function EditSale(props: EditSaleProps) {

  const { showToast } = useContext(NotificationContext);

  const [products, setProducts] = useState<productsType[] | undefined>([])
  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<salesType>();

  useEffect(() => {
    listProducts().then(data => {
      setProducts(data)
    })
  }, [])

  const handleEdit: SubmitHandler<salesType> = data => {
    // recuperar informações do produto selecionado pelo id
    products?.map((product) => {
      data.productID == product.id ? data.amountInCents = product.priceInCents * data.quantity : null
    })

    data.id = props.id

    updateSales(data).then(response => {
      showToast(response)
    })

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdEdit
          title='Editar venda'
          className='EditButton'
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Editar venda
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="form-sales" onSubmit={handleSubmit(handleEdit)}>

            <div className="form-field">
              <label>Produto:</label>

              {products?.length === 0 ? <span className='error'>Deve ter um produto cadastrado para poder editar.</span> :
                (
                  <select
                    {...register('productID', {
                      required: true,
                    })}
                    defaultValue={props.productID}
                  >
                    {products?.map((product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                )}
            </div>

            <div className="form-field">
              <label>Quantidade:</label>
              <input
                {...register('quantity', {
                  required: true,
                })}
                type="number"
                min={1}
                defaultValue={props.quantity}
              />
            </div>

            <button>
              Salvar alterações
            </button>

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}