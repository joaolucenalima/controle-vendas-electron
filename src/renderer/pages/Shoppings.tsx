import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import DeletePopUp from "../components/DeletePopUp";
import EditShopping from "../components/Edit/EditShopping";
import NewShoppingModal from "../components/NewShoppingModal";

import { getShopping } from "../../database/shopping";
import { NotificationContext } from "../contexts/NotificationContext";

type getShoppingProps = Awaited<ReturnType<typeof getShopping>>;

export default function Shopping() {
  const { message } = useContext(NotificationContext);
  const [purchases, setPurchases] = useState<getShoppingProps>([]);

  useEffect(() => {
    getShopping().then((data) => {
      setPurchases(data);
    });
  }, [message]);

  return (
    <>
      <ToastContainer />

      <div className="container">
        <div>
          <h2>Compras de materiais</h2>

          {purchases?.length === 0 ? (
            <p className="no-register">Nenhuma compra feita</p>
          ) : (
            <table className="table-container">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Material</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th className="textCenter">Data da compra</th>
                  <th className="textCenter">Editar</th>
                  <th className="textCenter">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {purchases?.map((purchase, index) => {
                  return (
                    <tr key={index}>
                      <td>{purchase.id}</td>
                      <td>{purchase.Material.name}</td>
                      <td>{purchase.quantity}</td>
                      <td>R$ {purchase.amountInCents / 100}</td>
                      <td className="textCenter">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </td>
                      <td className="textCenter">
                        <EditShopping
                          id={purchase.id}
                          materialID={purchase.Material.id}
                          quantity={purchase.quantity}
                        />
                      </td>
                      <td className="textCenter">
                        <DeletePopUp id={purchase.id} register={"shopping"} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <NewShoppingModal />
      </div>
    </>
  );
}
