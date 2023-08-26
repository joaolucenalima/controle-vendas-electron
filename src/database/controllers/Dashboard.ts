import { Op } from "sequelize";
import { getMonthsUntilNow } from "../../utils/getMonthsUntilNow";
import { Sales } from "../models/Sales";
import { Shopping } from "../models/Shopping";

export class DashboardController {

  static async getDashboardData(firstDay: string, lastDay: string) {

    const shoppingCount = await Shopping.count({
      where: {
        createdAt: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    })

    const salesCount = await Sales.count({
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

    const salesAmount = await Sales.sum('amountInCents',
      {
        where: {
          createdAt: {
            [Op.between]: [firstDay, lastDay]
          }
        }
      })

    const profit = (salesAmount - shoppingAmount) / 100

    return ({
      shoppingCount,
      salesCount,
      profit
    })
  }

  static async getFirstMonth() {
    const firstShoppingMonth = await Shopping.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    }) as Shopping

    const firstSaleMonth = await Sales.findOne({
      attributes: ['createdAt'],
      order: [
        ['id', 'ASC']
      ]
    }) as Sales

    if (!firstSaleMonth && !firstShoppingMonth) {
      return null
    }

    if (firstShoppingMonth && !firstSaleMonth) {
      return getMonthsUntilNow(firstShoppingMonth?.createdAt)
    } else if (!firstShoppingMonth && firstSaleMonth) {
      return getMonthsUntilNow(firstSaleMonth?.createdAt)
    }

    if (firstSaleMonth?.createdAt < firstShoppingMonth?.createdAt) {
      return getMonthsUntilNow(firstSaleMonth?.createdAt)
    }

    return getMonthsUntilNow(firstShoppingMonth?.createdAt)
  }
}