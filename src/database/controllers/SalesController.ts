import { Op } from "sequelize";
import Products from "../models/products";
import Sales from "../models/sales";

export class SalesController {
  public async getSales() {
    return await Sales.findAll({
      include: Products,
      order: [
        ['id', 'DESC'],
      ]
    })
  }

  public async registerSale(props: any) {
    try {
      await Sales.create({
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

  public async updateSales(props: any) {
    try {
      await Sales.update({
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

  public async deleteSales(id: string | number) {
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

  public async countAndSumSales(firstDay: string, lastDay: string) {
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

  public async getDateofFirstSale() {
    return await Sales.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    })
  }
}