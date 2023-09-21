import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

import { listProducts } from "../../database/controllers/Products";
import { registerSale } from "../../database/controllers/Sales";
import { formatDateToISO } from '../../utils/formatDate';
import { NotificationContext } from '../contexts/NotificationContext';

type salesProps = {
  amountInCents: number,
  productID: string,
  quantity: number,
  createdAt: string
}

type productsType = {
  id: string,
  name: string,
  priceInCents: number
}

export default function NewSaleModal() {

  const { showToast } = useContext(NotificationContext);

  // produtos do select
  const [products, setProducts] = useState<productsType[] | undefined>([])
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<salesProps>({
    defaultValues: {
      amountInCents: 0
    }
  });

  useEffect(() => {
    listProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  const handleRegister: SubmitHandler<salesProps> = (data) => {
    console.log(data.createdAt)
    // recuperar informações do produto selecionado pelo id
    products?.map((product) => {
      if (data.productID == product.id) {
        data.amountInCents = product.priceInCents * data.quantity
      }
    })

    registerSale(data).then((response) => {
      showToast(response)
    })

    setOpen(false)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdAdd
          title='Cadastrar nova venda'
          className='ModalButton'
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

          <form onSubmit={handleSubmit(handleRegister)}>

            <div className="modal-form">
              <div className="form-field entire-row">
                <label>Produto</label>
                {!products ?
                  <span className='error'>Nenhum produto registrado</span>
                  : (
                    <select
                      {...register('productID', {
                        required: "Campo obrigatório",
                      })}
                      defaultValue=''
                      autoFocus
                    >
                      <option value='' disabled>Selecione o produto</option>
                      {products.map((product) =>
                        <option key={product.id} value={product.id}>{product.name}</option>
                      )}
                    </select>
                  )}
                {errors?.productID && (
                  <span className="error">{errors?.productID.message}</span>
                )}
              </div>

              <div className='form-field'>
                <label>Quantidade</label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Campo obrigatório",
                    min: { value: 1, message: "Quantidade mínima: 1" },
                    valueAsNumber: true
                  })}
                  disabled={!products}
                />
                {errors?.quantity && (
                  <span className="error">{errors?.quantity.message}</span>
                )}
              </div>

              <div className='form-field'>
                <label>Data da Compra</label>
                <input
                  type='date'
                  {...register('createdAt', {
                    required: "Campo obrigatório"
                  })}
                  className={errors.createdAt && 'input-error'}
                  defaultValue={formatDateToISO(new Date())}
                />
                {errors?.createdAt && (
                  <span className="error">{errors.createdAt.message}</span>
                )}
              </div>
            </div>

            <div className='form-buttons'>
              <button
                type='button'
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>

              <button
                type='submit'
                disabled={!products}
              >
                Cadastrar
              </button>
            </div>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}