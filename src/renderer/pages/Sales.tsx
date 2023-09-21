import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import DeletePopUp from "../components/DeletePopUp";
import EditSale from "../components/Edit/EditSale";
import NewSaleModal from "../components/NewSaleModal";

import { listSales } from "../../database/controllers/Sales";
import { formatDateToLocale } from "../../utils/formatDate";
import { NotificationContext } from "../contexts/NotificationContext";

type listSalesResponse = Awaited<ReturnType<typeof listSales>>;

export default function Sales() {
  const { message } = useContext(NotificationContext);
  const [sales, setSales] = useState<listSalesResponse>([]);

  useEffect(() => {
    listSales().then((sales) => {
      setSales(sales);
    });
  }, [message]);

  return (
    <>
      <ToastContainer />

      <h1>Vendas</h1>

      {!sales ? (
        <p className="no-elements-text">Nenhuma venda registrada</p>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Data da venda</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => {
              return (
                <tr key={index}>
                  <td>{sale.id}</td>
                  <td>{sale.Product.name}</td>
                  <td>{sale.quantity}</td>
                  <td>R$ {sale.amountInCents / 100}</td>
                  <td>
                    {formatDateToLocale(sale.createdAt)}
                  </td>
                  <td>
                    <EditSale
                      id={sale.id}
                      productID={sale.Product.id}
                      quantity={sale.quantity}
                    />
                  </td>
                  <td>
                    <DeletePopUp id={sale.id} register={"Venda"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <NewSaleModal />
    </>
  );
}
