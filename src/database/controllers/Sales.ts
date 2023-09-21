import { Products } from "../models/Products";
import { Sales } from "../models/Sales";

interface salesProps {
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

type updateSalesProps = {
  id: number,
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

export async function listSales() {
  try {
    return await Sales.findAll({
      include: Products,
      order: [
        ['id', 'DESC'],
      ]
    })
  }
  catch (err) {
    console.log(err);
  }
}

export async function registerSale(props: salesProps) {
  try {
    await Sales.create({
      productID: props.productID,
      quantity: props.quantity,
      amountInCents: props.amountInCents,
      createdAt: props.createdAt
    })
    return ({ success: "Venda adicionada com sucesso!" })
  }
  catch (err) {
    console.log(err);
    return ({ error: "Não possível cadastrar a venda." })
  }
}

export async function updateSales(props: updateSalesProps) {
  try {
    await Sales.update({
      productID: props.productID,
      quantity: props.quantity,
      amountInCents: props.amountInCents,
      createdAt: props.createdAt
    },
      {
        where: {
          id: props.id
        }
      })
    return ({ success: "Edição salva com sucesso!" })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível registrar as mudanças." })
  }
}

export async function deleteSales(id: string | number) {
  try {
    await Sales.destroy({
      where: {
        id
      }
    })
    return ({ success: "Registro apagado com sucesso." })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível apagar o registro." })
  }
}