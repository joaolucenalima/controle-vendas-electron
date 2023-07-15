import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';

import { NotificationContext } from '../../contexts/NotificationContext';
import { updateProducts } from '../../../database/sales';

type EditProductsProps = {
  id: string,
  name: string,
  priceInCents: number
}

export default function EditProducts(props: EditProductsProps) {

  const { showToast } = useContext(NotificationContext);

  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EditProductsProps>();

  const handleEdit: SubmitHandler<EditProductsProps> = async data => {

    // registrando o id no data para ser usado no where do bd
    data.id = props.id

    data.priceInCents = parseFloat((data.priceInCents * 100).toFixed(2))

    setOpen(false)

    await updateProducts(data).then(response => {
      showToast(response)
    })

  }

  return (

    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdEdit
          title='Editar produto'
          className='EditButton'
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Editar Produto
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="inline-form" autoComplete="off" onSubmit={handleSubmit(handleEdit)}>

            <div>
              <label htmlFor="name">Produto: </label>
              <input
                {...register('name', {
                  required: true,
                })}
                type="text"
                name="name"
                defaultValue={props.name}
              />
            </div>

            {errors?.name?.type === "required" && (
              <span className="error">O campo Nome é obrigatório</span>
            )}

            <div style={{ position: "relative" }}>
              <label htmlFor="priceInCents">Preço: </label>
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
                defaultValue={props.priceInCents / 100}
              />
            </div>

            {errors?.priceInCents?.type === "required" && (
              <span className="error">O campo Preço é obrigatório</span>
            )}

            <input
              type="submit"
              value="Salvar alterações"
              style={{ backgroundColor: "#748cab" }}
            />

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}