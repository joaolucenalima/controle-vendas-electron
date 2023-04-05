import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { MdDelete } from 'react-icons/md';

import { deleteMaterials, deleteShopping } from '../../database/shopping'
import { deleteProducts, deleteSales } from '../../database/sales'
import { useContext } from 'react';
import { ResponseContext } from '../contexts/ResponseContext';

type DeleteProps = {
  id: string | number,
  register: "product" | "material" | "sale" | "shopping"
}

export default function DeletePopUp(props: DeleteProps) {

  const { response, setResponseValue } = useContext(ResponseContext)

  async function deleteAccepted() {

    switch (props.register) {

      case "product":
        await deleteProducts(props.id).then(data => {
          setResponseValue(data)
        })
        break;

      case "material":
        await deleteMaterials(props.id).then(data => {
          setResponseValue(data)
        })
        break;

      case "sale":
        await deleteSales(props.id).then(data => {
          setResponseValue(data)
        })
        break;

      case "shopping":
        await deleteShopping(props.id).then(data => {
          setResponseValue(data)
        })
        break;

      default:
        alert("Erro ao excluir registro")
        break;
    }

  }

  return (
    <AlertDialog.Root>

      <AlertDialog.Trigger asChild>
        <MdDelete
          title="Apagar registro"
          className="DeleteButton"
        />
      </AlertDialog.Trigger>

      <AlertDialog.Portal>

        <AlertDialog.Overlay className="DialogOverlay" />

        <AlertDialog.Content className="DialogContent">

          <AlertDialog.Title className="DialogTitle">Tem certeza de que deseja apagar?</AlertDialog.Title>

          <AlertDialog.Description className="DialogDescription textCenter">
            Essa ação é irreversível.
          </AlertDialog.Description>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <AlertDialog.Cancel asChild>
              <button style={{ backgroundColor: '#a09fa6', fontWeight: '600' }}>Cancelar</button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                style={{ backgroundColor: '#822025', color: '#ebebeb', fontWeight: '600' }}
                onClick={deleteAccepted}
              >
                Sim, apagar registro
              </button>
            </AlertDialog.Action>

          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}