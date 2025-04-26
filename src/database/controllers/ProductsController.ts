import Products from "../models/products"

export class ProductsController {
  public async registerProduct(props: any) {
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
  
  public async listProducts() {
    try {
      return await Products.findAll()
    }
    catch (err) {
      console.log(err);
    }
  }
  
  public async updateProducts(props: any) {
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
    } 
    catch (err) {
      console.log(err)
      return ({ error: "Não foi possível registrar as mudanças." })
    }
  }
  
  public async deleteProducts(id: string | number) {
    try {
      await Products.destroy({
        where: {
          id
        }
      })
      return ({ success: "Registro apagado com sucesso." })
    } 
    catch (err) {
      console.log(err)
      return ({ error: "Não foi possível apagar o registro." })
    }
  }
}