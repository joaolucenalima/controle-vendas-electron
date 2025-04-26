import { Op } from "sequelize";
import Products from "./models/products";
import Sales from "./models/sales";

interface productProps {
  name: string,
  priceInCents: number
}

interface updateProductsProps {
  id: string,
  name: string,
  priceInCents: number
}
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
  amountInCents: number
}

export async function registerProduct(props: productProps) {
  try {
    await Products.create({
      name: props.name,
      priceInCents: props.priceInCents
    })
    return ({ success: "Produto cadastrado com sucesso!" })
  }
  catch (err) {
    console.log(err)
    return ({ error: "Não foi possível cadastrar o produto." })
  }
}

export async function listProducts() {
  try {
    return await Products.findAll()
  }
  catch (err) {
    console.log(err);
  }
}

export async function updateProducts(props: updateProductsProps) {
  try {
    await Products.update({
      name: props.name,
      priceInCents: props.priceInCents
    }, {
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

export async function deleteProducts(id: string | number) {
  try {
    await Products.destroy({
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
      amountInCents: props.amountInCents
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

export async function countAndSumSales(firstDay: string, lastDay: string) {
  try {
    const salesCount = await Sales.count({
      where: {
        createdAt: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    })
    const salesAmount = await Sales.sum('amountInCents',
      {
        where: {
          createdAt: {
            [Op.between]: [firstDay, lastDay]
          }
        }
      })

    return { salesCount, salesAmount }
  } catch (err) {
    console.log(err)
    return { salesCount: 0, salesAmount: 0 }
  }
}

export async function getDateofFirstSale() {
  try {
    return await Sales.findOne({
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