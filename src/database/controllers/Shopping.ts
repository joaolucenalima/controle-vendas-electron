import { Materials } from "../models/Materials";
import { Shopping } from "../models/Shopping";

type setShoppingProps = {
  materialID: string,
  quantity: number,
  amount: number,
}

type updateShoppingProps = {
  id: number,
  materialID: string,
  quantity: number,
  amountInCents: number
}

// busca informações para a tabela
export async function getShopping() {
  try {
    return await Shopping.findAll({
      include: Materials,
      order: [
        ['id', 'DESC'],
      ]
    })
  }
  catch (err) {
    console.log(err);
  }
}

// registra da compra 
export async function setShopping(data: setShoppingProps) {
  try {
    await Shopping.create({
      materialID: data.materialID,
      quantity: data.quantity,
      amountInCents: data.amount,
    })
    return ({ success: "Compra registrada com sucesso!" })
  } catch (err) {
    console.log(err)
    return ({ error: "Erro ao registrar compra no banco de dados" })
  }
}

export async function updateShopping(props: updateShoppingProps) {
  try {
    await Shopping.update({
      materialID: props.materialID,
      quantity: props.quantity,
      amountInCents: props.amountInCents,
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

export async function deleteShopping(id: string | number) {
  try {
    await Shopping.destroy({
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