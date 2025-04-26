import { Op } from "sequelize";
import Materials from "../models/materials";
import Shopping from "../models/shopping";

export class ShoppingController {
  public async getShoppings() {
    return await Shopping.findAll({
      include: Materials,
      order: [
        ['id', 'DESC'],
      ]
    })
  }
  
  public async createShopping(data: any) {
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
  
  public async updateShopping(props: any) {
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
  
  public async deleteShopping(id: string | number) {
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
  
  public async countAndSumShopping(firstDay: string, lastDay: string) {
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
  
  public async getDateofFirstShopping() {
    return await Shopping.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    })
  }
}