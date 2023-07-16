import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md';
import * as Dialog from '@radix-ui/react-dialog';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { getMaterials, setShopping } from '../../database/shopping';
import { NotificationContext } from '../contexts/NotificationContext';

const shoppingPropsSchema = z.object({
  amount: z.number(),
  materialID: z.string().uuid(),
  quantity: z.number().int().min(1)
})

type shoppingProps = z.infer<typeof shoppingPropsSchema>

type materialsProps = {
  id: string,
  name: string,
  priceInCents: number
}

export default function NewShoppingModal() {

  const { showToast } = useContext(NotificationContext);

  const [materials, setMaterials] = useState<materialsProps[] | undefined>([])
  // controlar se o modal está aberto / fechar ele após submissão
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<shoppingProps>({
    resolver: zodResolver(shoppingPropsSchema),
    defaultValues: {
      amount: 0
    }
  });

  useEffect(() => {
    getMaterials().then((data) => {
      setMaterials(data)
    })
  }, [])

  const handleSetPurchase: SubmitHandler<shoppingProps> = async (data) => {

    materials?.map((material) => {
      if (data.materialID == material.id) {
        data.amount = material.priceInCents * data.quantity
      }
    })

    await setShopping(data).then((response) => {
      showToast(response)
    })

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>

      <Dialog.Trigger asChild>
        <MdAdd
          title='Cadastrar nova compra'
          className='ModalButton'
          style={{ backgroundColor: '#ca413c', color: 'white' }}
        />
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            Nova compra
          </Dialog.Title>

          <Dialog.Close className="CloseButton">
            &times;
          </Dialog.Close>

          <form className="form-sales" onSubmit={handleSubmit(handleSetPurchase)}>

            <div className="form-field">
              <label htmlFor="materialID">Material:</label>

              {materials?.length === 0 ? <span className='error'>Cadastre um material para registrar a compra</span> :
                (
                  <select
                    {...register('materialID', {
                      required: true,
                    })}
                    defaultValue=''
                  >
                    <option value='' disabled>Selecione o material</option>
                    {materials?.map((material) => (
                      <option key={material.id} value={material.id}>{material.name}</option>
                    ))}
                  </select>
                )}
            </div>

            <div className="form-field">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                {...register('quantity', {
                  required: true,
                  valueAsNumber: true
                })}
                min={1}
                defaultValue={0}
                disabled={materials?.length === 0}
              />
            </div>

            {errors?.quantity && (
              <span className="error" style={{ textAlign: "end" }}>{errors.quantity.message}</span>
            )}

            <button
              disabled={materials?.length === 0}
              style={{ backgroundColor: '#a8312d', color: '#ebebeb' }}>
              Cadastrar compra
            </button>

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}