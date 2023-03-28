import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';

import { getMaterials, updateShopping } from '../../database/shopping';
import { ResponseContext } from '../contexts/ResponseContext';

type EditShoppingProps = {
  id: number,
  materialID: string,
  quantity: number
}

type materialsType = {
  id: string,
  name: string,
  priceInCents: number
}

type shoppingType = {
  id: number,
  materialID: string,
  quantity: number,
  amountInCents: number
}

export default function EditShopping(props: EditShoppingProps) {

  const { response, setResponseValue } = useContext(ResponseContext);

  const [materials, setMaterials] = useState<materialsType[] | undefined>([])
  // controlar se o modal está aberto ou não / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<shoppingType>();

  useEffect(() => {
    getMaterials().then(data => {
      setMaterials(data)
    })
    setResponseValue(undefined)
  }, [])

  const handleEdit: SubmitHandler<shoppingType> = async data => {

    // recuperar informações do material selecionado pelo id
    materials?.map((material) => {
      data.materialID == material.id ? data.amountInCents = material.priceInCents * data.quantity : null
    })

    data.id = props.id

    setOpen(false)

    await updateShopping(data).then(response => {
      setResponseValue(response)
    })

  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdEdit
          title='Editar compra'
          className='EditButton'
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Editar compra
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="form-sales" onSubmit={handleSubmit(handleEdit)}>

            <div className="form-field">
              <label htmlFor="materialID">Material:</label>

              {materials?.length === 0 ?
                <span className='error'>Deve ter um material cadastrado para poder editar.</span>
                :
                (
                  <select
                    {...register('materialID', {
                      required: true,
                    })}
                    name="materialID"
                    defaultValue={props.materialID}
                  >
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
                defaultValue={props.quantity}
              />
            </div>

            <input
              type="submit"
              value="Salvar alterações"
              style={{ backgroundColor: '#a8312d', color: '#ebebeb' }}
            />

          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}