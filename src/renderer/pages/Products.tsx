import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import { listProducts, registerProduct } from "../../database/controllers/Products";
import Table from "../components/Table";
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

  const [productList, setProductList] = useState<ProductListType[] | undefined>([]);

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

  const handleProduct: SubmitHandler<Inputs> = (data) => {
    data.priceInCents = parseFloat((data.priceInCents * 100).toFixed(2));

    registerProduct(data).then((response) => {
      showToast(response);
    });

    reset();
  };

  return (
    <>
      <ToastContainer />

      <h1>Produtos</h1>

      <form
        className="inline-form"
        autoComplete="off"
        onSubmit={handleSubmit(handleProduct)}
      >

        <div>
          <label>Nome:</label>
          <input
            {...register("name", {
              required: true,
            })}
            type="text"
          />
          {errors?.name && (
            <span className="error">Campo obrigatório</span>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <label>Preço unitário:</label>
          <span className="money-span">R$</span>
          <input
            {...register("priceInCents", {
              required: true,
            })}
            type="number"
            placeholder="0.00"
            step={0.01}
            min={0.01}
          />
          {errors?.priceInCents?.type === "required" && (
            <span className="error">Campo obrigatório</span>
          )}
        </div>

        <button>
          Registrar produto
        </button>
      </form>

      {!productList ? (
        <p className="no-elements-text">
          Nenhum produto cadastrado
        </p>
      ) : (
        <Table
          title="Produto"
          elementList={productList}
        />
      )}
    </>
  );
}
