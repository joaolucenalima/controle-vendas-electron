import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import DeletePopUp from "../components/DeletePopUp";
import EditProducts from "../components/Edit/EditProducts";

import { listProducts, registerProduct } from "../../database/sales";
import { NotificationContext } from "../contexts/NotificationContext";

type Inputs = {
  name: string;
  priceInCents: number;
};

type ProductListType = {
  id: string;
  name: string;
  priceInCents: number;
};

export default function Products() {
  const { message, showToast } = useContext(NotificationContext);

  const [productList, setProductList] = useState<ProductListType[] | undefined>(
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    listProducts().then((product) => {
      setProductList(product);
    });
  }, [message]);

  const handleProduct: SubmitHandler<Inputs> = async (data) => {
    data.priceInCents = parseFloat((data.priceInCents * 100).toFixed(2));

    await registerProduct(data).then((response) => {
      showToast(response);
    });

    reset();
  };

  return (
    <>
      <ToastContainer />

      <div className="container">
        <form
          className="inline-form"
          autoComplete="off"
          onSubmit={handleSubmit(handleProduct)}
        >
          <h2>Registrar produto</h2>

          <div>
            <label htmlFor="name">Nome do produto: </label>
            <input
              {...register("name", {
                required: true,
              })}
              type="text"
              name="name"
            />
          </div>

          {errors?.name?.type === "required" && (
            <span className="error">O campo Nome é obrigatório</span>
          )}

          <div style={{ position: "relative" }}>
            <label htmlFor="priceInCents">Preço unitário: </label>
            <span className="money-span">R$</span>
            <input
              {...register("priceInCents", {
                required: true,
              })}
              type="number"
              name="priceInCents"
              step="0.01"
              placeholder="0.00"
              min={0.01}
            />
          </div>

          {errors?.priceInCents?.type === "required" && (
            <span className="error">O campo Preço é obrigatório</span>
          )}

          <input
            type="submit"
            value="Registrar produto"
            style={{ backgroundColor: "#748cab" }}
          />
        </form>

        <div style={{ marginTop: "1.5rem" }}>
          <h2>Produtos</h2>

          {productList?.length === 0 ? (
            <p
              style={{
                margin: "2rem auto",
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              Nenhum produto cadastrado
            </p>
          ) : (
            <table className="table-container">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th className="textCenter">Editar</th>
                  <th className="textCenter">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {productList?.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>R$ {product.priceInCents / 100}</td>
                      <td className="textCenter">
                        <EditProducts
                          id={product.id}
                          name={product.name}
                          priceInCents={product.priceInCents}
                        />
                      </td>
                      <td className="textCenter">
                        <DeletePopUp id={product.id} register={"product"} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
