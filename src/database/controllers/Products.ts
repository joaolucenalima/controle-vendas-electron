import { Products } from "../models/Products"

interface productProps {
  name: string,
  priceInCents: number
}

interface updateProductsProps {
  id: string,
  name: string,
  priceInCents: number
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