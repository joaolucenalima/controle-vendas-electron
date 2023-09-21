import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import DeletePopUp from "../components/DeletePopUp";
import EditShopping from "../components/Edit/EditShopping";
import NewShoppingModal from "../components/NewShoppingModal";

import { getShopping } from "../../database/controllers/Shopping";
import { formatDateToLocale } from "../../utils/formatDate";
import { NotificationContext } from "../contexts/NotificationContext";

export type ShoppingType = Awaited<ReturnType<typeof getShopping>>;

export default function Shopping() {
  const { message } = useContext(NotificationContext);
  const [purchases, setPurchases] = useState<ShoppingType>([]);

  useEffect(() => {
    getShopping().then((data) => {
      setPurchases(data);
    });
  }, [message]);

  return (
    <>
      <ToastContainer />

      <h1>Compras</h1>

      {!purchases ? (
        <p className="no-elements-text">Nenhuma compra registrada</p>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Material</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Data da compra</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => {
              return (
                <tr key={index}>
                  <td>{purchase.id}</td>
                  <td>{purchase.Material.name}</td>
                  <td>{purchase.quantity}</td>
                  <td>R$ {purchase.amountInCents / 100}</td>
                  <td>
                    {formatDateToLocale(purchase.createdAt)}
                  </td>
                  <td>
                    <EditShopping
                      id={purchase.id}
                      materialID={purchase.Material.id}
                      quantity={purchase.quantity}
                      createdAt={purchase.createdAt}
                    />
                  </td>
                  <td>
                    <DeletePopUp id={purchase.id} register={"Compra"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <NewShoppingModal />
    </>
  );
}
