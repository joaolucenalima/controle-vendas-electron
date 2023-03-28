import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';

import { ResponseContext } from '../contexts/ResponseContext';
import { updateMaterials } from '../../database/shopping';

type EditMaterialsProps = {
  id: string,
  name: string,
  priceInCents: number
}

export default function EditMaterials(props: EditMaterialsProps) {

  const { response, setResponseValue } = useContext(ResponseContext);

  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EditMaterialsProps>();

  useEffect(() => {
    setResponseValue(undefined)
  }, [])

  const handleEdit: SubmitHandler<EditMaterialsProps> = async data => {

    // registrando o id no data para ser usado no where do bd
    data.id = props.id

    data.priceInCents *= 100

    setOpen(false)

    await updateMaterials(data).then(response => {
      setResponseValue(response)
    })

  }

  return (

    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdEdit
          title='Editar material'
          className='EditButton'
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Editar Material
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="inline-form" autoComplete="off" onSubmit={handleSubmit(handleEdit)}>

            <div>
              <label htmlFor="name">Material: </label>
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
              style={{ backgroundColor: '#33aa47' }}
            />

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >

  )
}