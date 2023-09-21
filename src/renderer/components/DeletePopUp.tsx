import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { deleteMaterials } from '../../database/controllers/Material';
import { deleteProducts } from '../../database/controllers/Products';
import { deleteSales } from '../../database/controllers/Sales';
import { deleteShopping } from '../../database/controllers/Shopping';
import { NotificationContext } from '../contexts/NotificationContext';

type DeleteProps = {
  id: string | number,
  register: string
}

export default function DeletePopUp(props: DeleteProps) {

  const { showToast } = useContext(NotificationContext)

  function deleteAccepted() {

    switch (props.register) {

      case "Produto":
        deleteProducts(props.id).then(data => {
          showToast(data)
        })
        break;

      case "Material":
        deleteMaterials(props.id).then(data => {
          showToast(data)
        })
        break;

      case "Venda":
        deleteSales(props.id).then(data => {
          showToast(data)
        })
        break;

      case "Compra":
        deleteShopping(props.id).then(data => {
          showToast(data)
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
                Sim, apagar registro.
              </button>
            </AlertDialog.Action>

          </div>

        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}