import { Op } from "sequelize";
import Materials from "./models/materials";
import Shopping from "./models/shopping";

type setMaterialsProps = {
  name: string,
  price: number
}

type updateMaterialsProps = {
  id: string,
  name: string,
  priceInCents: number,
}

type setShoppingProps = {
  materialID: string,
  quantity: number,
  amount: number,
  createdAt: string
}

type updateShoppingProps = {
  id: number,
  materialID: string,
  quantity: number,
  amountInCents: number
}

export async function getMaterials() {
  try {
    return await Materials.findAll()
  } catch (err) {
    console.log(err)
  }
}

export async function setMaterials(props: setMaterialsProps) {
  try {
    await Materials.create({
      name: props.name,
      priceInCents: props.price
    })
    return ({ success: "Material registrado com sucesso!" })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível cadastrar o material." })
  }
}

export async function updateMaterials(props: updateMaterialsProps) {
  try {
    await Materials.update({
      name: props.name,
      priceInCents: props.priceInCents
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

export async function deleteMaterials(id: string | number) {
  try {
    await Materials.destroy({
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
      createdAt: data.createdAt
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

export async function countAndSumShopping(firstDay: string, lastDay: string) {

  try {
    const shoppingCount = await Shopping.count({
      where: {
        createdAt: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    })
    const shoppingAmount = await Shopping.sum('amountInCents',
      {
        where: {
          createdAt: {
            [Op.between]: [firstDay, lastDay]
          }
        }
      }
    )

    return { shoppingCount, shoppingAmount }
  } catch (err) {
    console.log(err)
    return { shoppingCount: 0, shoppingAmount: 0 }
  }
}

export async function getDateofFirstShopping() {
  try {
    return await Shopping.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    })
  } catch (err) {
    console.log(err)
    return undefined
  }
}