import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

import { getMaterials } from "../../database/controllers/Material";
import { setShopping } from "../../database/controllers/Shopping";
import { formatDateToISO } from '../../utils/formatDate';
import { NotificationContext } from '../contexts/NotificationContext';

type shoppingProps = {
  amount: number,
  materialID: string,
  quantity: number,
  createdAt: string
}

type materialsProps = {
  id: string,
  name: string,
  priceInCents: number
}

export default function NewShoppingModal() {

  const { showToast } = useContext(NotificationContext);

  const [materials, setMaterials] = useState<materialsProps[] | undefined>([])
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<shoppingProps>({
    defaultValues: {
      amount: 0
    }
  });

  useEffect(() => {
    getMaterials().then((data) => {
      setMaterials(data)
    })
  }, [])

  const handleSetPurchase: SubmitHandler<shoppingProps> = (data) => {
    materials?.map((material) => {
      if (data.materialID == material.id) {
        data.amount = material.priceInCents * data.quantity
      }
    })

    setShopping(data).then((response) => {
      showToast(response)
    })

    setOpen(false)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <MdAdd
          title='Cadastrar nova compra'
          className='ModalButton'
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

          <form onSubmit={handleSubmit(handleSetPurchase)}>

            <div className='modal-form'>
              <div className="form-field entire-row">
                <label>Material</label>
                {!materials ?
                  <span className='error'>Nenhum material registrado</span>
                  : (
                    <select
                      {...register('materialID', {
                        required: "Campo obrigatório",
                      })}
                      defaultValue=''
                      className={errors.materialID && 'input-error'}
                      autoFocus
                    >
                      <option value='' disabled>Selecione o material</option>
                      {materials.map((material) => (
                        <option key={material.id} value={material.id}>{material.name}</option>
                      ))}
                    </select>
                  )}
                {errors?.materialID && (
                  <span className="error">{errors?.materialID.message}</span>
                )}
              </div>

              <div className="form-field">
                <label>Quantidade</label>
                <input
                  type="number"
                  {...register('quantity', {
                    required: "Campo obrigatório",
                    min: { value: 1, message: "Quantidade mínima: 1" },
                    valueAsNumber: true
                  })}
                  disabled={!materials}
                  className={errors.quantity && 'input-error'}
                />
                {errors?.quantity && (
                  <span className="error">{errors.quantity.message}</span>
                )}
              </div>

              <div className='form-field'>
                <label>Data da Compra</label>
                <input
                  type='date'
                  {...register('createdAt', {
                    required: "Campo obrigatório",
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
                disabled={!materials}
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