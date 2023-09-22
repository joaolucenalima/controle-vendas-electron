import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import { getMaterials, setMaterials } from "../../database/controllers/Material";
import Table from "../components/Table";
import { NotificationContext } from "../contexts/NotificationContext";

type setMaterialProps = {
  name: string;
  price: number;
};

type MaterialListType = {
  id: string;
  name: string;
  priceInCents: number;
};

export default function Materials() {
  const { message, showToast } = useContext(NotificationContext);

  const [materialList, setMaterialList] = useState<MaterialListType[] | undefined>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<setMaterialProps>();

  useEffect(() => {
    getMaterials().then((material) => {
      setMaterialList(material);
    });
  }, [message]);

  const handleSetMaterial: SubmitHandler<setMaterialProps> = (data) => {
    data.price = parseFloat((data.price * 100).toFixed(2));

    setMaterials(data).then((response) => {
      showToast(response);
    });

    reset();
  };

  return (
    <>
      <ToastContainer />

      <h1>Materiais</h1>

      <form
        className="inline-form"
        onSubmit={handleSubmit(handleSetMaterial)}
      >

        <div>
          <label>Nome:</label>
          <input
            {...register("name", {
              required: true,
            })}
            type="text"
          />
        </div>

        {errors?.name?.type === "required" && (
          <span className="error">O campo material é obrigatório.</span>
        )}

        <div>
          <label>Preço unitário:</label>
          <input
            {...register("price", {
              required: true,
            })}
            type="number"
            placeholder="0.00"
            step={0.01}
            min={0.01}
          />
        </div>

        {errors?.price?.type === "required" && (
          <span className="error">O campo preço é obrigatório.</span>
        )}

        <button>
          Registar material
        </button>
      </form>

      {!materialList ? (
        <p className="no-elements-text">
          Nenhum material cadastrado
        </p>
      ) : (
        <Table
          title="Material"
          elementList={materialList}
        />
      )}
    </>
  );
}
